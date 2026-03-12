(() => {
  const { products, orders, categoryData, inventoryAlerts, reviewQueue, customers } = KADashboardData;
  const { metricCard, sectionCard, progressRows, timeline, tableShell, pagination, badge, productRow, orderRow } = KAComponents;

  function renderDashboardLegacy() {
    const liveStream = [
      { title: "Yeni sipariş", body: "#ORD-12984 / Shopify / 6.840 TRY", time: "Şimdi", icon: "shopping-bag" },
      { title: "İade talebi açıldı", body: "AeroTrail koşu ayakkabısı için beden değişimi", time: "4 dk", icon: "rotate-ccw" },
      { title: "Webhook doğrulandı", body: "Meta Pixel purchase event akışı yeniden onaylandı", time: "11 dk", icon: "shield-check" },
      { title: "Toplu ürün içe aktarma", body: "CSV ile 28 yeni SKU taslak duruma alındı", time: "18 dk", icon: "file-up" },
    ];

    return `
      <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        ${[
          { label: "Bugünkü Satışlar", value: KAUtils.money(128450), delta: "+14,8%", note: "Düne göre artış", icon: "receipt-text", spark: [18, 22, 27, 30, 33, 38], accent: "teal" },
          { label: "Toplam Sipariş", value: KAUtils.number(1842), delta: "+9,3%", note: "Bugün açılan kayıt", icon: "shopping-cart", spark: [15, 19, 18, 26, 31, 36], accent: "sky" },
          { label: "Toplam Müşteri", value: KAUtils.compact(24890), delta: "+6,1%", note: "Aktif alışverişçi havuzu", icon: "users-round", spark: [12, 16, 21, 24, 26, 29], accent: "amber" },
          { label: "Toplam Gelir", value: KAUtils.money(12840000), delta: "+21,4%", note: "Yıl başından bu yana", icon: "wallet", spark: [14, 18, 22, 29, 37, 40], accent: "rose" },
        ].map(metricCard).join("")}
      </div>

      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.65fr)_minmax(0,0.95fr)]">
        ${sectionCard({
          eyebrow: "Gelir Performansı",
          title: "Satış grafiği",
          subtitle: "Web, pazar yeri ve mobil uygulama kanallarından gelen satış akışını tek grafikte izleyin.",
          action: `${badge("Bu ay", "sky")}${badge("Hedef +12%", "emerald")}`,
          body: `
            <div class="page-chart-shell h-[320px]"><canvas id="dashboard-sales-chart"></canvas></div>
            <div class="mt-5 grid gap-3 sm:grid-cols-3">
              ${[
                ["Web", KAUtils.money(482000), "text-slate-900"],
                ["Pazar Yerleri", KAUtils.money(391000), "text-teal-700"],
                ["Mobil Uygulama", KAUtils.money(174000), "text-amber-700"],
              ]
                .map(([label, value, tone]) => `
                  <div class="rounded-3xl border border-slate-200 bg-slate-50/70 p-4">
                    <p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${label}</p>
                    <p class="mt-2 text-lg font-bold ${tone}">${value}</p>
                  </div>`)
                .join("")}
            </div>`,
        })}
        <div class="space-y-6">
          ${sectionCard({
            eyebrow: "Kategori Analizi",
            title: "Kategori satış grafiği",
            subtitle: "Gelirin kategori bazındaki dağılımı.",
            body: `
              <div class="page-chart-shell h-[250px]"><canvas id="dashboard-category-chart"></canvas></div>
              <div class="mt-5">
                ${progressRows([
                  { label: "Elektronik", value: 44, text: KAUtils.money(482000), color: "bg-slate-900" },
                  { label: "Moda", value: 31, text: KAUtils.money(391000), color: "bg-teal-600" },
                  { label: "Kozmetik", value: 17, text: KAUtils.money(214000), color: "bg-amber-500" },
                  { label: "Spor", value: 8, text: KAUtils.money(173000), color: "bg-sky-500" },
                ])}
              </div>`,
          })}
          ${sectionCard({
            eyebrow: "Canlı Sipariş Akışı",
            title: "Gerçek zamanlı akış",
            subtitle: "Son operasyon olayları ve otomasyon tetikleyicileri.",
            body: timeline(liveStream),
          })}
        </div>
      </div>

      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        ${sectionCard({
          eyebrow: "Sipariş Sağlığı",
          title: "Sipariş grafiği",
          subtitle: "Hazırlanıyor, kargoda ve teslim edildi durumlarının günlük dağılımı.",
          body: `<div class="page-chart-shell h-[280px]"><canvas id="dashboard-orders-chart"></canvas></div>`,
        })}
        ${sectionCard({
          eyebrow: "Performans Liderleri",
          title: "En çok satan ürünler",
          subtitle: "Son 30 günün yüksek hacimli ürünleri.",
          body: `
            <div class="space-y-4">
              ${products
                .slice(0, 4)
                .map(
                  (product, index) => `
                    <div class="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50/75 p-4">
                      ${KAComponents.avatar(product.initials, product.accent, "h-12 w-12")}
                      <div class="min-w-0 flex-1">
                        <p class="truncate text-sm font-bold text-slate-900">${index + 1}. ${product.name}</p>
                        <p class="mt-1 text-sm text-slate-500">${product.brand} • ${product.category}</p>
                      </div>
                      <div class="text-right">
                        <p class="text-sm font-bold text-slate-900">${KAUtils.number(product.sales)}</p>
                        <p class="mt-1 text-xs text-slate-500">sipariş</p>
                      </div>
                    </div>`,
                )
                .join("")}
            </div>`,
        })}
      </div>

      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
        ${sectionCard({
          eyebrow: "Operasyon Tablosu",
          title: "Son siparişler",
          subtitle: "Ödeme, kargo ve risk durumu ile birlikte güncel sipariş akışı.",
          body: tableShell({ headers: ["Sipariş", "Müşteri", "Tutar", "Durum", "Ödeme", "Kargo"], rows: orders.slice(0, 5).map(orderRow) }),
          footer: pagination("1-5 / 124 sipariş"),
        })}
        <div class="space-y-6">
          ${sectionCard({
            eyebrow: "Risk Merkezi",
            title: "Stok uyarıları",
            subtitle: "Kritik eşik altındaki varyantlar.",
            body: `
              <div class="space-y-3">
                ${inventoryAlerts
                  .map(
                    (item) => `
                      <div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4">
                        <div class="flex items-start justify-between gap-3">
                          <div>
                            <p class="text-sm font-bold text-slate-900">${item.name}</p>
                            <p class="mt-1 text-sm text-slate-500">${item.warehouse}</p>
                          </div>
                          ${badge(`${item.qty} adet`, item.tone)}
                        </div>
                        <p class="mt-3 text-sm font-medium text-slate-500">Son 48 saat: ${item.trend}</p>
                      </div>`,
                  )
                  .join("")}
              </div>`,
          })}
          ${sectionCard({
            eyebrow: "Hazırlık Kalitesi",
            title: "Operasyon KPI",
            subtitle: "Sipariş işleme zincirindeki darboğazlar.",
            body: progressRows([
              { label: "Paketleme doğruluğu", value: 96, color: "bg-emerald-500", text: "%96" },
              { label: "Aynı gün çıkış", value: 78, color: "bg-sky-500", text: "%78" },
              { label: "İade işleme SLA", value: 64, color: "bg-amber-500", text: "%64" },
              { label: "Otomatik fraud kontrolü", value: 88, color: "bg-slate-900", text: "%88" },
            ]),
          })}
        </div>
      </div>

      <div class="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        ${sectionCard({
          eyebrow: "Traffic Sources",
          title: "Kanal dağılımı",
          subtitle: "Organik, paid, direct ve social kaynaklarinin siparişe etkisi.",
          body: `
            <div class="grid gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div class="page-chart-shell h-[260px]"><canvas data-chart-preset="trafficMix"></canvas></div>
              <div class="space-y-4">
                ${progressRows([
                  { label: "Organik", value: 36, text: "89K oturum", color: "bg-slate-900" },
                  { label: "Paid", value: 28, text: "69K oturum", color: "bg-teal-600" },
                  { label: "Direct", value: 22, text: "54K oturum", color: "bg-sky-500" },
                  { label: "Social", value: 14, text: "36K oturum", color: "bg-amber-500" },
                ])}
              </div>
            </div>`,
        })}
        ${sectionCard({
          eyebrow: "Conversion Rate",
          title: "Dönüşüm görünümü",
          subtitle: "Oturumdan siparişe giden yolun haftalık trendi.",
          body: `
            <div class="page-chart-shell h-[260px]"><canvas data-chart-preset="conversionTrend"></canvas></div>
            <div class="mt-5 grid gap-3 sm:grid-cols-4">
              ${[
                ["Landing", "%62"],
                ["PDP", "%28"],
                ["Sepet", "%16"],
                ["Sipariş", "%4,86"],
              ]
                .map(
                  ([label, value]) => `
                    <div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4">
                      <p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${label}</p>
                      <p class="mt-2 text-lg font-bold text-slate-900">${value}</p>
                    </div>`,
                )
                .join("")}
            </div>`,
        })}
      </div>

      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
        ${sectionCard({
          eyebrow: "Kategori ve Bölge",
          title: "Top categories & regional revenue",
          subtitle: "Kategori liderligini ve bölgesel gelir dağılımını birlikte inceleyin.",
          body: `
            <div class="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
              <div>
                ${progressRows(
                  categoryData.map((category, index) => ({
                    label: category.name,
                    value: [44, 31, 17, 8][index] || 12,
                    text: KAUtils.money(category.revenue),
                    color: ["bg-slate-900", "bg-teal-600", "bg-amber-500", "bg-sky-500"][index] || "bg-slate-900",
                  })),
                )}
              </div>
              <div class="page-chart-shell h-[260px]"><canvas data-chart-preset="regionalRevenue"></canvas></div>
            </div>`,
        })}
        <div class="space-y-6">
          ${sectionCard({
            eyebrow: "Abandoned Carts",
            title: "Kurtarma kuyrugu",
            subtitle: "Yüksek potansiyelli terk edilen sepetler.",
            body: `
              <div class="space-y-3">
                ${[
                  ["Elif Yıldırım", KAUtils.money(6840), "VIP segment / 42 dk once", "Push + mail"],
                  ["Sena Arslan", KAUtils.money(1320), "Yeni müşteri / 1 saat once", "Mail akışı"],
                  ["Berk Çetin", KAUtils.money(2190), "Sadık segment / 2 saat once", "SMS hatirlatma"],
                ]
                  .map(
                    ([name, total, meta, action]) => `
                      <div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4">
                        <div class="flex items-start justify-between gap-3">
                          <div>
                            <p class="text-sm font-bold text-slate-900">${name}</p>
                            <p class="mt-1 text-sm text-slate-500">${meta}</p>
                          </div>
                          ${badge(total, "amber")}
                        </div>
                        <p class="mt-3 text-sm font-medium text-slate-500">${action}</p>
                      </div>`,
                  )
                  .join("")}
              </div>`,
          })}
          ${sectionCard({
            eyebrow: "Shipping Status",
            title: "Teslimat dağılımı",
            subtitle: "Hazırlanıyor, yolda ve teslim edilen siparişlerin durum görünümü.",
            body: `
              <div class="grid gap-5 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div class="page-chart-shell h-[230px]"><canvas data-chart-preset="shippingStatus"></canvas></div>
                <div class="space-y-4">
                  ${progressRows([
                    { label: "Hazırlanıyor", value: 28, text: "186 sipariş", color: "bg-amber-500" },
                    { label: "Yolda", value: 34, text: "243 sipariş", color: "bg-sky-500" },
                    { label: "Teslim", value: 26, text: "1.198 sipariş", color: "bg-emerald-500" },
                    { label: "Sorunlu", value: 12, text: "12 olay", color: "bg-slate-900" },
                  ])}
                </div>
              </div>`,
          })}
        </div>
      </div>

      <div class="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        ${sectionCard({
          eyebrow: "Customer Activity Feed",
          title: "Müşteri hareketleri",
          subtitle: "Son oturum, satın alma ve segment hareketleri.",
          body: timeline(
            customers.slice(0, 4).map((customer, index) => ({
              title: `${customer.name} ${index === 0 ? "sipariş verdi" : index === 1 ? "mail akışına girdi" : index === 2 ? "VIP sınıfına girdi" : "sepetine ürün ekledi"}`,
              body: `${customer.segment} segmenti • ${customer.city} • Son aktivite: ${customer.lastOrder}`,
              time: index === 0 ? "Şimdi" : index === 1 ? "12 dk" : index === 2 ? "36 dk" : "1 saat",
              icon: index === 0 ? "shopping-bag" : index === 1 ? "mail-open" : index === 2 ? "crown" : "shopping-cart",
            })),
          ),
        })}
        ${sectionCard({
          eyebrow: "Latest Reviews",
          title: "Yorum sinyalleri",
          subtitle: "Marka ve ürün etkisi olan son müşteri yorumları.",
          body: `
            <div class="space-y-3">
              ${reviewQueue
                .map(
                  (item) => `
                    <div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4">
                      <div class="flex items-center justify-between gap-3">
                        <p class="text-sm font-bold text-slate-900">${item.customer} • ${item.product}</p>
                        ${badge(`${item.rating}/5`, item.rating >= 4 ? "emerald" : "amber")}
                      </div>
                      <p class="mt-2 text-sm leading-6 text-slate-500">${item.note}</p>
                    </div>`,
                )
                .join("")}
            </div>`,
        })}
      </div>
    `;
  }

  function renderDashboard() {
    const gridItem = (span, content) => `<div class="dashboard-item ${span}">${content}</div>`;
    const liveStream = [
      { title: "Yeni sipari&#351;", body: "#ORD-12984 / Shopify / 6.840 TRY", time: "&#350;imdi", icon: "shopping-bag" },
      { title: "&#304;ade talebi a&#231;&#305;ld&#305;", body: "AeroTrail ko&#351;u ayakkab&#305;s&#305; i&#231;in beden de&#287;i&#351;imi", time: "4 dk", icon: "rotate-ccw" },
      { title: "Webhook do&#287;ruland&#305;", body: "Meta Pixel purchase event ak&#305;&#351;&#305; yeniden onayland&#305;", time: "11 dk", icon: "shield-check" },
      { title: "Toplu &uuml;r&uuml;n i&#231;e aktarma", body: "CSV ile 28 yeni SKU taslak duruma al&#305;nd&#305;", time: "18 dk", icon: "file-up" },
    ];

    const topSellingMarkup = `
      <div class="dashboard-list">
        ${products
          .slice(0, 4)
          .map(
            (product, index) => `
              <div class="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50/75 p-4">
                ${KAComponents.avatar(product.initials, product.accent, "h-12 w-12")}
                <div class="min-w-0 flex-1">
                  <p class="truncate text-sm font-bold text-slate-900">${index + 1}. ${product.name}</p>
                  <p class="mt-1 text-sm text-slate-500">${product.brand} &bull; ${product.category}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-bold text-slate-900">${KAUtils.number(product.sales)}</p>
                  <p class="mt-1 text-xs text-slate-500">sipari&#351;</p>
                </div>
              </div>`,
          )
          .join("")}
      </div>`;

    const stockAlertMarkup = `
      <div class="dashboard-list">
        ${inventoryAlerts
          .map(
            (item) => `
              <div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-sm font-bold text-slate-900">${item.name}</p>
                    <p class="mt-1 text-sm text-slate-500">${item.warehouse}</p>
                  </div>
                  ${badge(`${item.qty} adet`, item.tone)}
                </div>
                <p class="mt-3 text-sm font-medium text-slate-500">Son 48 saat: ${item.trend}</p>
              </div>`,
          )
          .join("")}
      </div>`;

    const abandonedCartMarkup = `
      <div class="dashboard-list">
        ${[
          ["Elif Yıldırım", KAUtils.money(6840), "VIP segment / 42 dk once", "Push + mail"],
          ["Sena Arslan", KAUtils.money(1320), "Yeni müşteri / 1 saat once", "Mail akışı"],
          ["Berk Çetin", KAUtils.money(2190), "Sadık segment / 2 saat once", "SMS hatirlatma"],
        ]
          .map(
            ([name, total, meta, action]) => `
              <div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4">
                <div class="flex items-start justify-between gap-3">
                  <div>
                    <p class="text-sm font-bold text-slate-900">${name}</p>
                    <p class="mt-1 text-sm text-slate-500">${meta}</p>
                  </div>
                  ${badge(total, "amber")}
                </div>
                <p class="mt-3 text-sm font-medium text-slate-500">${action}</p>
              </div>`,
          )
          .join("")}
      </div>`;

    const latestReviewMarkup = `
      <div class="dashboard-list">
        ${reviewQueue
          .map(
            (item) => `
              <div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4">
                <div class="flex items-center justify-between gap-3">
                  <p class="text-sm font-bold text-slate-900">${item.customer} &bull; ${item.product}</p>
                  ${badge(`${item.rating}/5`, item.rating >= 4 ? "emerald" : "amber")}
                </div>
                <p class="mt-2 text-sm leading-6 text-slate-500">${item.note}</p>
              </div>`,
          )
          .join("")}
      </div>`;

    return `
      <div class="dashboard-grid">
        ${[
          { label: "Bug&uuml;nk&uuml; Sat&#305;&#351;lar", value: KAUtils.money(128450), delta: "+14,8%", note: "D&uuml;ne g&ouml;re art&#305;&#351;", icon: "receipt-text", spark: [18, 22, 27, 30, 33, 38], accent: "teal" },
          { label: "Toplam Sipari&#351;", value: KAUtils.number(1842), delta: "+9,3%", note: "Bug&uuml;n a&#231;&#305;lan kay&#305;t", icon: "shopping-cart", spark: [15, 19, 18, 26, 31, 36], accent: "sky" },
          { label: "Toplam M&uuml;&#351;teri", value: KAUtils.compact(24890), delta: "+6,1%", note: "Aktif al&#305;&#351;veri&#351;&#231;i havuzu", icon: "users-round", spark: [12, 16, 21, 24, 26, 29], accent: "amber" },
          { label: "Toplam Gelir", value: KAUtils.money(12840000), delta: "+21,4%", note: "Y&#305;l ba&#351;&#305;ndan bu yana", icon: "wallet", spark: [14, 18, 22, 29, 37, 40], accent: "rose" },
        ]
          .map((metric) => gridItem("dashboard-span-3", metricCard(metric)))
          .join("")}

        ${gridItem(
          "dashboard-span-8",
          sectionCard({
            eyebrow: "Gelir Performans&#305;",
            title: "Sat&#305;&#351; grafi&#287;i",
            subtitle: "Web, pazar yeri ve mobil uygulama kanallar&#305;ndan gelen sat&#305;&#351; ak&#305;&#351;&#305;n&#305; tek grafikte izleyin.",
            action: `${badge("Bu ay", "sky")}${badge("Hedef +12%", "emerald")}`,
            body: `
              <div class="dashboard-chart-shell"><canvas id="dashboard-sales-chart"></canvas></div>
              <div class="mt-5 grid gap-3 sm:grid-cols-3">
                ${[
                  ["Web", KAUtils.money(482000), "text-slate-900"],
                  ["Pazar Yerleri", KAUtils.money(391000), "text-teal-700"],
                  ["Mobil Uygulama", KAUtils.money(174000), "text-amber-700"],
                ]
                  .map(
                    ([label, value, tone]) => `
                      <div class="rounded-3xl border border-slate-200 bg-slate-50/70 p-4">
                        <p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${label}</p>
                        <p class="mt-2 text-lg font-bold ${tone}">${value}</p>
                      </div>`,
                  )
                  .join("")}
              </div>`,
          }),
        )}

        ${gridItem(
          "dashboard-span-4",
          sectionCard({
            eyebrow: "Kategori Analizi",
            title: "Kategori sat&#305;&#351; grafi&#287;i",
            subtitle: "Gelirin kategori baz&#305;ndaki da&#287;&#305;l&#305;m&#305;.",
            body: `
              <div class="dashboard-chart-shell"><canvas id="dashboard-category-chart"></canvas></div>
              <div class="mt-5">
                ${progressRows([
                  { label: "Elektronik", value: 44, text: KAUtils.money(482000), color: "bg-slate-900" },
                  { label: "Moda", value: 31, text: KAUtils.money(391000), color: "bg-teal-600" },
                  { label: "Kozmetik", value: 17, text: KAUtils.money(214000), color: "bg-amber-500" },
                  { label: "Spor", value: 8, text: KAUtils.money(173000), color: "bg-sky-500" },
                ])}
              </div>`,
          }),
        )}

        ${gridItem(
          "dashboard-span-8",
          sectionCard({
            eyebrow: "Operasyon Tablosu",
            title: "Son sipari&#351;ler",
            subtitle: "&Ouml;deme, kargo ve risk durumu ile birlikte g&uuml;ncel sipari&#351; ak&#305;&#351;&#305;.",
            body: tableShell({ headers: ["Sipari&#351;", "M&uuml;&#351;teri", "Tutar", "Durum", "&Ouml;deme", "Kargo"], rows: orders.slice(0, 5).map(orderRow) }),
            footer: pagination("1-5 / 124 sipari&#351;"),
          }),
        )}

        ${gridItem(
          "dashboard-span-4",
          sectionCard({
            eyebrow: "Canl&#305; Sipari&#351; Ak&#305;&#351;&#305;",
            title: "Ger&ccedil;ek zamanl&#305; ak&#305;&#351;",
            subtitle: "Son operasyon olaylar&#305; ve otomasyon tetikleyicileri.",
            body: timeline(liveStream),
          }),
        )}

        ${gridItem(
          "dashboard-span-6",
          sectionCard({
            eyebrow: "Sipari&#351; Sa&#287;l&#305;&#287;&#305;",
            title: "Sipari&#351; grafi&#287;i",
            subtitle: "Haz&#305;rlan&#305;yor, kargoda ve teslim edildi durumlar&#305;n&#305;n g&uuml;nl&uuml;k da&#287;&#305;l&#305;m&#305;.",
            body: `<div class="dashboard-chart-shell"><canvas id="dashboard-orders-chart"></canvas></div>`,
          }),
        )}

        ${gridItem(
          "dashboard-span-6",
          sectionCard({
            eyebrow: "Traffic Sources",
            title: "Kanal dağılımı",
            subtitle: "Organik, paid, direct ve social kaynaklarinin siparişe etkisi.",
            body: `
              <div class="grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                <div class="dashboard-chart-shell"><canvas data-chart-preset="trafficMix"></canvas></div>
                <div class="space-y-4">
                  ${progressRows([
                    { label: "Organik", value: 36, text: "89K oturum", color: "bg-slate-900" },
                    { label: "Paid", value: 28, text: "69K oturum", color: "bg-teal-600" },
                    { label: "Direct", value: 22, text: "54K oturum", color: "bg-sky-500" },
                    { label: "Social", value: 14, text: "36K oturum", color: "bg-amber-500" },
                  ])}
                </div>
              </div>`,
          }),
        )}

        ${gridItem(
          "dashboard-span-6",
          sectionCard({
            eyebrow: "Conversion Rate",
            title: "Dönüşüm görünümü",
            subtitle: "Oturumdan siparişe giden yolun haftalık trendi.",
            body: `
              <div class="dashboard-chart-shell"><canvas data-chart-preset="conversionTrend"></canvas></div>
              <div class="mt-5 grid gap-3 sm:grid-cols-4">
                ${[
                  ["Landing", "%62"],
                  ["PDP", "%28"],
                  ["Sepet", "%16"],
                  ["Sipariş", "%4,86"],
                ]
                  .map(
                    ([label, value]) => `
                      <div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4">
                        <p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${label}</p>
                        <p class="mt-2 text-lg font-bold text-slate-900">${value}</p>
                      </div>`,
                  )
                  .join("")}
              </div>`,
          }),
        )}

        ${gridItem(
          "dashboard-span-6",
          sectionCard({
            eyebrow: "Kategori ve Bölge",
            title: "Top categories & regional revenue",
            subtitle: "Kategori liderligini ve bölgesel gelir dağılımını birlikte inceleyin.",
            body: `
              <div class="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div>
                  ${progressRows(
                    categoryData.map((category, index) => ({
                      label: category.name,
                      value: [44, 31, 17, 8][index] || 12,
                      text: KAUtils.money(category.revenue),
                      color: ["bg-slate-900", "bg-teal-600", "bg-amber-500", "bg-sky-500"][index] || "bg-slate-900",
                    })),
                  )}
                </div>
                <div class="dashboard-chart-shell"><canvas data-chart-preset="regionalRevenue"></canvas></div>
              </div>`,
          }),
        )}

        ${gridItem(
          "dashboard-span-4",
          sectionCard({
            eyebrow: "Performans Liderleri",
            title: "En çok satan ürünler",
            subtitle: "Son 30 günün yüksek hacimli ürünleri.",
            body: topSellingMarkup,
          }),
        )}

        ${gridItem(
          "dashboard-span-4",
          sectionCard({
            eyebrow: "Risk Merkezi",
            title: "Stok uyarıları",
            subtitle: "Kritik eşik altındaki varyantlar.",
            body: stockAlertMarkup,
          }),
        )}

        ${gridItem(
          "dashboard-span-4",
          sectionCard({
            eyebrow: "Shipping Status",
            title: "Teslimat dağılımı",
            subtitle: "Hazırlanıyor, yolda ve teslim edilen siparişlerin durum görünümü.",
            body: `
              <div class="grid gap-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
                <div class="dashboard-chart-shell"><canvas data-chart-preset="shippingStatus"></canvas></div>
                <div class="space-y-4">
                  ${progressRows([
                    { label: "Hazırlanıyor", value: 28, text: "186 sipariş", color: "bg-amber-500" },
                    { label: "Yolda", value: 34, text: "243 sipariş", color: "bg-sky-500" },
                    { label: "Teslim", value: 26, text: "1.198 sipariş", color: "bg-emerald-500" },
                    { label: "Sorunlu", value: 12, text: "12 olay", color: "bg-slate-900" },
                  ])}
                </div>
              </div>`,
          }),
        )}

        ${gridItem(
          "dashboard-span-4",
          sectionCard({
            eyebrow: "Customer Activity Feed",
            title: "Müşteri hareketleri",
            subtitle: "Son oturum, satın alma ve segment hareketleri.",
            body: timeline(
              customers.slice(0, 4).map((customer, index) => ({
                title: `${customer.name} ${index === 0 ? "sipariş verdi" : index === 1 ? "mail akışına girdi" : index === 2 ? "VIP sınıfına girdi" : "sepetine ürün ekledi"}`,
                body: `${customer.segment} segmenti &bull; ${customer.city} &bull; Son aktivite: ${customer.lastOrder}`,
                time: index === 0 ? "Şimdi" : index === 1 ? "12 dk" : index === 2 ? "36 dk" : "1 saat",
                icon: index === 0 ? "shopping-bag" : index === 1 ? "mail-open" : index === 2 ? "crown" : "shopping-cart",
              })),
            ),
          }),
        )}

        ${gridItem(
          "dashboard-span-4",
          sectionCard({
            eyebrow: "Latest Reviews",
            title: "Yorum sinyalleri",
            subtitle: "Marka ve ürün etkisi olan son müşteri yorumları.",
            body: latestReviewMarkup,
          }),
        )}

        ${gridItem(
          "dashboard-span-4",
          sectionCard({
            eyebrow: "Abandoned Carts",
            title: "Kurtarma kuyrugu",
            subtitle: "Yüksek potansiyelli terk edilen sepetler.",
            body: abandonedCartMarkup,
          }),
        )}

        ${gridItem(
          "dashboard-span-12",
          sectionCard({
            eyebrow: "Hazırlık Kalitesi",
            title: "Operasyon KPI",
            subtitle: "Sipariş işleme zincirindeki darbozazlar.",
            body: progressRows([
              { label: "Paketleme doğruluğu", value: 96, color: "bg-emerald-500", text: "%96" },
              { label: "Aynı gün çıkış", value: 78, color: "bg-sky-500", text: "%78" },
              { label: "İade işleme SLA", value: 64, color: "bg-amber-500", text: "%64" },
              { label: "Otomatik fraud kontrolü", value: 88, color: "bg-slate-900", text: "%88" },
            ]),
          }),
        )}
      </div>
    `;
  }

  function renderProducts() {
    return `
      <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        ${[
          { label: "Aktif Ürün", value: KAUtils.number(2484), delta: "+42 SKU", note: "Bu ay yayına alındı", icon: "package-check", spark: [10, 14, 18, 22, 28, 34], accent: "teal" },
          { label: "Varyant Sayısı", value: KAUtils.number(8920), delta: "+6,5%", note: "Renk / beden / boyut", icon: "swatches", spark: [12, 13, 18, 24, 28, 31], accent: "sky" },
          { label: "Düşük Stok", value: KAUtils.number(36), delta: "-8 ürün", note: "Son replenishment sonrası", icon: "triangle-alert", spark: [28, 24, 23, 20, 17, 13], accent: "amber" },
          { label: "Taslak Ürün", value: KAUtils.number(118), delta: "+12", note: "Onay bekleyen içerik", icon: "file-pen-line", spark: [6, 8, 10, 12, 15, 19], accent: "rose" },
        ].map(metricCard).join("")}
      </div>

      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.45fr)_minmax(0,0.75fr)]">
        ${sectionCard({
          eyebrow: "Katalog Yönetimi",
          title: "Ürün listesi",
          subtitle: "Marka, kategori, kanal ve varyant bazında yönetilebilir profesyonel katalog tablosu.",
          action: `<div data-chip-group class="flex flex-wrap gap-2">${["Tümü", "Aktif", "Taslak", "Kritik Stok"].map((label, index) => `<button type="button" data-chip class="data-pill ${index === 0 ? "is-active" : ""} rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-teal-200 hover:text-teal-700">${label}</button>`).join("")}</div>`,
          body: tableShell({ headers: ["Ürün", "Kategori", "Fiyat", "Stok", "Durum", "Performans"], rows: products.map(productRow) }),
          footer: pagination("1-6 / 2.484 ürün"),
        })}
        <div class="space-y-6">
          ${sectionCard({
            eyebrow: "Toplu Ürün Yükleme",
            title: "CSV / Excel import",
            subtitle: "Büyük katalog geçişlerini şablon bazlı yönetin.",
            action: KAComponents.actionButton({ label: "Şablon İndir", icon: "download", href: "#" }, true),
            body: `
              <div class="space-y-3">
                ${[
                  ["CSV Kataloğu", "2.000 satıra kadar hızlı ön izleme", "file-spreadsheet"],
                  ["Excel Gelişmiş", "Varyant ve depo kolonlarıyla", "sheet"],
                  ["Medya Eşleme", "ZIP + SKU bazlı görsel eşleştirme", "images"],
                ]
                  .map(
                    ([title, text, icon]) => `
                      <div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4">
                        <div class="flex items-start gap-3">
                          <span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-slate-700"><i data-lucide="${icon}" class="h-5 w-5"></i></span>
                          <div><p class="text-sm font-bold text-slate-900">${title}</p><p class="mt-1 text-sm leading-6 text-slate-500">${text}</p></div>
                        </div>
                      </div>`,
                  )
                  .join("")}
              </div>`,
          })}
          ${sectionCard({
            eyebrow: "Merchandising",
            title: "Marka & SEO sağlığı",
            subtitle: "Katalog kalitesini yükselten kalite skorları.",
            body: progressRows([
              { label: "SEO başlık tamamlama", value: 92, color: "bg-emerald-500", text: "%92" },
              { label: "Görsel kapsamı", value: 84, color: "bg-sky-500", text: "%84" },
              { label: "Varyant mantığı", value: 76, color: "bg-amber-500", text: "%76" },
              { label: "Marka alanı standardı", value: 98, color: "bg-slate-900", text: "%98" },
            ]),
          })}
        </div>
      </div>
    `;
  }

  function renderProductDetail() {
    const product = products[0];
    return `
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        ${sectionCard({
          eyebrow: "Ürün Profili",
          title: product.name,
          subtitle: "Varyant, medya, SEO ve performans verilerini tek akışta yönetin.",
          action: `${badge(product.status, "emerald")}${badge("4 kanal", "sky")}`,
          body: `
            <div class="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
              <div class="space-y-4">
                <div class="rounded-[28px] border border-slate-200 bg-gradient-to-br ${product.accent} p-6">
                  <p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-500">${product.sku}</p>
                  <h4 class="mt-3 font-display text-3xl font-bold text-slate-900">${product.initials}</h4>
                  <p class="mt-2 text-sm text-slate-600">Hero görsel alanı / packshot placeholder</p>
                </div>
                <div class="grid grid-cols-3 gap-3">
                  ${["Ön", "Arka", "Lifestyle"].map((label) => `<div class="rounded-3xl border border-slate-200 bg-slate-50/75 px-3 py-6 text-center text-sm font-semibold text-slate-600">${label}</div>`).join("")}
                </div>
              </div>
              <div>
                <div class="grid gap-3 sm:grid-cols-3">
                  ${[
                    ["Liste Fiyatı", KAUtils.money(product.price)],
                    ["Satış Adedi", KAUtils.number(product.sales)],
                    ["Toplam Stok", `${KAUtils.number(product.stock)} adet`],
                  ]
                    .map(([label, value]) => `<div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4"><p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${label}</p><p class="mt-2 text-lg font-bold text-slate-900">${value}</p></div>`)
                    .join("")}
                </div>
                <div class="mt-4 h-[280px]"><canvas id="product-performance-chart"></canvas></div>
              </div>
            </div>

            <div class="mt-6 rounded-[30px] border border-slate-200 bg-slate-50/80 p-3">
              <div data-tab-group class="flex flex-wrap gap-2">
                ${[
                  ["overview", "Genel Bakış"],
                  ["variants", "Varyantlar"],
                  ["seo", "SEO"],
                  ["media", "Medya"],
                ].map(([key, label], index) => `<button type="button" data-tab-target="${key}" class="tab-button ${index === 0 ? "is-active" : ""} rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition">${label}</button>`).join("")}
              </div>
              <div class="mt-4">
                <div data-tab-panel="overview">
                  <div class="grid gap-4 lg:grid-cols-2">
                    <div class="rounded-3xl border border-slate-200 bg-white p-5">
                      <p class="text-sm font-bold text-slate-900">Ürün açıklaması</p>
                      <p class="mt-3 text-sm leading-7 text-slate-500">Aktif gürültü engelleme, 40 saat pil ömrü, hızlı şarj ve premium materyal kalitesi ile segment lideri bir ses ürünü.</p>
                      <div class="mt-4 flex flex-wrap gap-2">${["Bluetooth 5.3", "ANC", "Type-C", "Uygulama Kontrollü"].map((item) => `<span class="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">${item}</span>`).join("")}</div>
                    </div>
                    <div class="rounded-3xl border border-slate-200 bg-white p-5">
                      <p class="text-sm font-bold text-slate-900">Kanal görünürlüğü</p>
                      <div class="mt-4 space-y-3">${progressRows([
                        { label: "Shopify", value: 100, text: "Yayında", color: "bg-emerald-500" },
                        { label: "Trendyol", value: 94, text: "Senkron", color: "bg-sky-500" },
                        { label: "Amazon", value: 81, text: "İçerik uyarısı", color: "bg-amber-500" },
                        { label: "Hepsiburada", value: 96, text: "Yayında", color: "bg-slate-900" },
                      ])}</div>
                    </div>
                  </div>
                </div>
                <div data-tab-panel="variants" class="hidden">
                  ${tableShell({
                    headers: ["Varyant", "SKU", "Stok", "Depo", "Durum"],
                    rows: [
                      ["Siyah / Standart", "KA-AUD-1042-BLK", "7 adet", "İstanbul", badge("Kritik", "amber")],
                      ["Beyaz / Standart", "KA-AUD-1042-WHT", "18 adet", "Ankara", badge("Aktif", "emerald")],
                      ["Lacivert / Standart", "KA-AUD-1042-NAV", "17 adet", "İstanbul", badge("Aktif", "emerald")],
                    ].map((row) => `<tr><td><p class="text-sm font-semibold text-slate-900">${row[0]}</p></td><td><p class="text-sm text-slate-600">${row[1]}</p></td><td><p class="text-sm font-semibold text-slate-900">${row[2]}</p></td><td><p class="text-sm text-slate-600">${row[3]}</p></td><td>${row[4]}</td></tr>`),
                  })}
                </div>
                <div data-tab-panel="seo" class="hidden">
                  <div class="grid gap-4 lg:grid-cols-2">
                    <div class="rounded-3xl border border-slate-200 bg-white p-5">
                      <p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Meta Title</p>
                      <p class="mt-2 text-base font-bold text-slate-900">Nebula X1 Kablosuz Kulaklık | Premium ANC Ses Deneyimi</p>
                      <p class="mt-4 text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Slug</p>
                      <p class="mt-2 rounded-2xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700">/urun/nebula-x1-kablosuz-kulaklik</p>
                    </div>
                    <div class="rounded-3xl border border-emerald-200 bg-emerald-50/90 p-5">
                      <p class="text-sm font-bold text-emerald-900">SEO Skoru 91/100</p>
                      <p class="mt-3 text-sm leading-7 text-emerald-900/80">Title uzunluğu ideal, açıklama güçlü ve kanonik yapı doğru. Amazon listing başlığında anahtar kelime zenginleştirmesi öneriliyor.</p>
                    </div>
                  </div>
                </div>
                <div data-tab-panel="media" class="hidden">
                  <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    ${["Hero", "Lifestyle 1", "Lifestyle 2", "Kutu İçeriği"].map((label) => `<div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4"><div class="empty-state-grid rounded-[24px] border border-dashed border-slate-200 px-4 py-10 text-center text-sm font-semibold text-slate-500">${label}</div></div>`).join("")}
                  </div>
                </div>
              </div>
            </div>`,
        })}
        <div class="space-y-6">
          ${sectionCard({
            eyebrow: "Ürün Sağlığı",
            title: "Yayın kalite skoru",
            body: progressRows([
              { label: "Görsel kapsama", value: 86, text: "%86", color: "bg-slate-900" },
              { label: "Yorum skoru", value: 92, text: "4.7 / 5", color: "bg-emerald-500" },
              { label: "Stok sürekliliği", value: 68, text: "%68", color: "bg-amber-500" },
              { label: "Kanal senkronu", value: 97, text: "%97", color: "bg-sky-500" },
            ]),
          })}
          ${sectionCard({
            eyebrow: "Yorum Özetleri",
            title: "Müşteri içgörüleri",
            body: `<div class="space-y-3">${reviewQueue.map((item) => `<div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4"><div class="flex items-center justify-between gap-3"><p class="text-sm font-bold text-slate-900">${item.customer} • ${item.product}</p>${badge(`${item.rating}/5`, item.rating >= 4 ? "emerald" : "amber")}</div><p class="mt-2 text-sm leading-6 text-slate-500">${item.note}</p></div>`).join("")}</div>`,
          })}
        </div>
      </div>
    `;
  }

  function renderProductAdd() {
    return `
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)]">
        ${sectionCard({
          eyebrow: "Katalog Girişi",
          title: "Ürün ekleme sayfası",
          subtitle: "Varyant, medya, SEO, marka ve kanal yayın ayarlarını tek form akışında yönetin.",
          body: `
            <form class="grid gap-5">
              <div class="grid gap-4 lg:grid-cols-2">
                <label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3"><span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Ürün Adı</span><input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="Yeni ürün başlığı" /></label>
                <label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3"><span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Marka</span><input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="KA Brand" /></label>
              </div>
              <label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3"><span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Kısa Açıklama</span><textarea rows="4" class="mt-2 w-full resize-none border-0 bg-transparent p-0 text-sm leading-7 text-slate-700 focus:outline-none focus:ring-0">Premium kalite, yüksek dönüşüm odaklı ürün açıklaması alanı.</textarea></label>
              <div class="grid gap-4 lg:grid-cols-3">
                ${[["Satış Fiyatı", "3.490"], ["İndirimli Fiyat", "2.990"], ["Vergi Sınıfı", "KDV %20"]].map(([label, value]) => `<label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3"><span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${label}</span><input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="${value}" /></label>`).join("")}
              </div>
              <div class="rounded-[30px] border border-slate-200 bg-white p-5">
                <div class="flex flex-wrap items-center justify-between gap-3">
                  <div><p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Varyant Sistemi</p><h4 class="mt-2 text-lg font-bold text-slate-900">Renk, beden ve boyut yapılandırması</h4></div>
                  ${badge("Çoklu varyant", "sky")}
                </div>
                <div class="mt-4 grid gap-3 lg:grid-cols-3">
                  ${[["Renk", "Siyah, Beyaz, Lacivert"], ["Beden", "S, M, L, XL"], ["Boyut", "Standart"]].map(([label, value]) => `<label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3"><span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${label}</span><input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="${value}" /></label>`).join("")}
                </div>
              </div>
              <div class="rounded-[30px] border border-slate-200 bg-white p-5">
                <p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">SEO Alanları</p>
                <div class="mt-4 grid gap-4">
                  ${[["Meta Title", "Yeni ürün adı | KA Store"], ["Meta Description", "Yüksek dönüşüm odaklı, arama sonuçlarında güçlü görünen açıklama alanı."], ["Slug", "/urun/yeni-urun-adi"]].map(([label, value]) => `<label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3"><span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${label}</span><input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="${value}" /></label>`).join("")}
                </div>
              </div>
            </form>`,
        })}
        <div class="space-y-6">
          ${sectionCard({
            eyebrow: "Medya Yönetimi",
            title: "Ürün görseli yükleme",
            subtitle: "Sürükle bırak ve toplu yükleme alanı.",
            body: `
              <div data-upload-dropzone class="upload-dropzone rounded-[30px] bg-cyan-50/50 p-5">
                <input data-upload-input type="file" multiple class="hidden" />
                <div class="flex flex-col items-center justify-center text-center">
                  <span class="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-white text-slate-700 shadow-soft"><i data-lucide="upload-cloud" class="h-6 w-6"></i></span>
                  <h4 class="mt-4 text-lg font-bold text-slate-900">Görselleri buraya bırakın</h4>
                  <p class="mt-2 max-w-sm text-sm leading-6 text-slate-500">PNG, JPG veya WebP. SKU bazlı adlandırma ile medya eşleştirme desteklenir.</p>
                  <button type="button" class="mt-4 inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white"><i data-lucide="plus" class="h-4 w-4"></i>Dosya Seç</button>
                </div>
              </div>
              <div data-upload-list class="mt-4 space-y-3"></div>`,
          })}
          ${sectionCard({
            eyebrow: "Yayın & Kanal",
            title: "Kanal ayarları",
            body: `<div class="space-y-3">${[["Shopify", "Anında yayın"], ["Trendyol", "Onaylı listing"], ["Amazon", "Başlık gözden geçirme"], ["Hepsiburada", "Hazır"]].map(([label, text], index) => `<div class="flex items-center justify-between gap-3 rounded-3xl border border-slate-200 bg-slate-50/75 p-4"><div><p class="text-sm font-bold text-slate-900">${label}</p><p class="mt-1 text-sm text-slate-500">${text}</p></div>${badge(index === 2 ? "İçerik Gerekli" : "Hazır", index === 2 ? "amber" : "emerald")}</div>`).join("")}</div>`,
          })}
          ${sectionCard({
            eyebrow: "Hazırlık",
            title: "Form kontrol listesi",
            body: progressRows([
              { label: "Temel bilgiler", value: 100, color: "bg-emerald-500", text: "Tamam" },
              { label: "Varyant matrisi", value: 78, color: "bg-sky-500", text: "%78" },
              { label: "SEO tamamlama", value: 66, color: "bg-amber-500", text: "%66" },
              { label: "Görsel seti", value: 24, color: "bg-slate-900", text: "%24" },
            ]),
          })}
        </div>
      </div>
    `;
  }

  function renderCategories() {
    return `
      <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        ${[
          { label: "Kategori", value: KAUtils.number(124), delta: "+6", note: "Son çeyrekte açıldı", icon: "folder-tree", spark: [10, 12, 14, 16, 17, 19], accent: "teal" },
          { label: "Alt Kategori", value: KAUtils.number(468), delta: "+22", note: "İç içe yapı desteği", icon: "folders", spark: [11, 12, 16, 17, 19, 23], accent: "sky" },
          { label: "Ortalama Marj", value: "%22,4", delta: "+1,2 puan", note: "Kategori bazlı karlılık", icon: "badge-dollar-sign", spark: [8, 12, 14, 16, 20, 22], accent: "amber" },
          { label: "SEO Sağlığı", value: "%91", delta: "+4 puan", note: "Kategori landing kalitesi", icon: "search-check", spark: [12, 16, 19, 21, 24, 27], accent: "rose" },
        ].map(metricCard).join("")}
      </div>

      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        ${sectionCard({
          eyebrow: "Kategori Ağacı",
          title: "Kategori yönetimi",
          subtitle: "Ana ve alt kategori performanslarını aynı yapıda görün.",
          body: `<div class="grid gap-4 md:grid-cols-2">${categoryData.map((category) => `<div class="rounded-[30px] border border-slate-200 bg-slate-50/80 p-5"><div class="flex items-center justify-between gap-3"><div><p class="text-lg font-bold text-slate-900">${category.name}</p><p class="mt-1 text-sm text-slate-500">${category.subcategories} alt kategori • ${category.items} SKU</p></div>${badge(category.growth, "emerald")}</div><div class="mt-4 grid gap-3 sm:grid-cols-2"><div class="rounded-3xl bg-white px-4 py-3"><p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Gelir</p><p class="mt-2 text-lg font-bold text-slate-900">${KAUtils.money(category.revenue)}</p></div><div class="rounded-3xl bg-white px-4 py-3"><p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Dönüşüm</p><p class="mt-2 text-lg font-bold text-slate-900">${category.conversion}</p></div></div></div>`).join("")}</div>`,
        })}
        <div class="space-y-6">
          ${sectionCard({
            eyebrow: "Alt Kategori Yönetimi",
            title: "Merchandising kuralları",
            body: `<div class="space-y-3">${[["Elektronik > Kulaklık", "Dinamik upsell alanı açık"], ["Moda > Ceket", "Mevsimsel sıralama kuralı aktif"], ["Kozmetik > Serum", "Yüksek marj görünürlük önceliği"], ["Spor > Ayakkabı", "Numara filtreleri optimize edildi"]].map(([title, text]) => `<div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4"><p class="text-sm font-bold text-slate-900">${title}</p><p class="mt-1 text-sm text-slate-500">${text}</p></div>`).join("")}</div>`,
          })}
          ${sectionCard({
            eyebrow: "Arama Trendleri",
            title: "Kategori SEO içgörüleri",
            body: progressRows([
              { label: "kablosuz kulaklık", value: 88, text: "+%28", color: "bg-slate-900" },
              { label: "overshirt", value: 72, text: "+%18", color: "bg-teal-600" },
              { label: "cilt serumu", value: 64, text: "+%12", color: "bg-amber-500" },
              { label: "koşu ayakkabısı", value: 57, text: "+%9", color: "bg-sky-500" },
            ]),
          })}
        </div>
      </div>
    `;
  }

  window.KAPageFns = Object.assign(window.KAPageFns || {}, {
    renderDashboard,
    renderProducts,
    renderProductDetail,
    renderProductAdd,
    renderCategories,
  });
})();
