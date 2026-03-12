(() => {
  const { inventoryAlerts, warehouses, stockMovements, orders, customers } = KADashboardData;
  const { metricCard, sectionCard, progressRows, timeline, tableShell, pagination, badge, orderRow, customerRow, alertBox } = KAComponents;

  function renderInventory() {
    return `
      <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        ${[
          { label: "Toplam Stok", value: KAUtils.compact(31840), delta: "+4,2%", note: "3 depo toplamı", icon: "boxes", spark: [12, 14, 18, 21, 24, 27], accent: "teal" },
          { label: "Kritik SKU", value: KAUtils.number(36), delta: "-8", note: "Düşük stok alarmı", icon: "triangle-alert", spark: [24, 21, 20, 18, 15, 11], accent: "amber" },
          { label: "Transfer Bekliyor", value: KAUtils.number(25), delta: "+5", note: "Depolar arası istek", icon: "arrow-right-left", spark: [6, 8, 10, 11, 13, 16], accent: "sky" },
          { label: "Devir Hızı", value: "31 gün", delta: "-2 gün", note: "Ortalama stok dönüşü", icon: "gauge", spark: [32, 30, 29, 28, 26, 24], accent: "rose" },
        ].map(metricCard).join("")}
      </div>
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        ${sectionCard({
          eyebrow: "Stok Analitiği",
          title: "Stok hareket geçmişi",
          subtitle: "Giriş, çıkış ve transfer hacimlerini haftalık düzlemde takip edin.",
          body: `<div class="page-chart-shell h-[300px]"><canvas id="inventory-turnover-chart"></canvas></div>`,
        })}
        ${sectionCard({
          eyebrow: "Depo Yönetimi",
          title: "Çoklu depo görünümü",
          body: `
            <div class="space-y-4">
              ${warehouses
                .map(
                  (warehouse) => `
                    <div class="rounded-[28px] border border-slate-200 bg-slate-50/80 p-5">
                      <div class="flex items-center justify-between gap-3">
                        <div>
                          <p class="text-sm font-bold text-slate-900">${warehouse.name}</p>
                          <p class="mt-1 text-sm text-slate-500">${KAUtils.number(warehouse.stock)} stok • ${warehouse.pending} bekleyen çıkış</p>
                        </div>
                        ${badge(`%${warehouse.capacity} doluluk`, warehouse.capacity > 80 ? "amber" : "emerald")}
                      </div>
                      <div class="mt-4 h-2.5 rounded-full bg-white"><div class="h-full rounded-full bg-slate-900" style="width:${warehouse.capacity}%"></div></div>
                      <p class="mt-3 text-sm text-slate-500">${warehouse.transfer} transfer talebi işlemde</p>
                    </div>`,
                )
                .join("")}
            </div>`,
        })}
      </div>
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        ${sectionCard({
          eyebrow: "Kritik Eşikler",
          title: "Düşük stok uyarıları",
          body: tableShell({
            headers: ["Varyant", "Miktar", "Depo", "Trend"],
            rows: inventoryAlerts.map((item) => `<tr><td><p class="text-sm font-semibold text-slate-900">${item.name}</p></td><td>${badge(`${item.qty} adet`, item.tone)}</td><td><p class="text-sm text-slate-600">${item.warehouse}</p></td><td><p class="text-sm font-semibold ${item.tone === "rose" ? "text-rose-600" : "text-amber-600"}">${item.trend}</p></td></tr>`),
          }),
          footer: pagination("1-4 / 36 kritik varyant"),
        })}
        ${sectionCard({
          eyebrow: "Canlı Log",
          title: "Stok hareket akışı",
          body: timeline(stockMovements.map((item) => ({ ...item, icon: "move-right" }))),
        })}
      </div>
    `;
  }

  function renderOrders() {
    return `
      <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        ${[
          { label: "Hazırlanıyor", value: KAUtils.number(186), delta: "+12", note: "Paketleme kuyruğunda", icon: "package-open", spark: [8, 11, 14, 16, 17, 20], accent: "amber" },
          { label: "Kargoda", value: KAUtils.number(243), delta: "+6", note: "Taşıyıcıya teslim edildi", icon: "truck", spark: [12, 15, 16, 17, 20, 23], accent: "sky" },
          { label: "Teslim Edildi", value: KAUtils.number(1198), delta: "+9,8%", note: "Son 30 gün", icon: "badge-check", spark: [20, 24, 28, 30, 33, 36], accent: "teal" },
          { label: "İade Akışı", value: KAUtils.number(31), delta: "-4", note: "Açık talep", icon: "rotate-ccw", spark: [14, 13, 11, 10, 8, 6], accent: "rose" },
        ].map(metricCard).join("")}
      </div>
      ${sectionCard({
        eyebrow: "Sipariş Filtreleri",
        title: "Durum bazlı operasyon",
        subtitle: "Hazırlanıyor, kargoda, teslim edildi ve iptal edilmiş siparişleri hızlı filtreleyin.",
        action: `<div data-chip-group class="flex flex-wrap gap-2">${["Tümü", "Hazırlanıyor", "Kargoda", "Teslim Edildi", "İptal"].map((label, index) => `<button type="button" data-chip class="data-pill ${index === 0 ? "is-active" : ""} rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-teal-200 hover:text-teal-700">${label}</button>`).join("")}</div>`,
        body: `
          <div class="grid gap-4 xl:grid-cols-4">
            ${[
              ["Hazırlanıyor", "186 sipariş", "bg-amber-50 text-amber-900"],
              ["Kargoda", "243 sipariş", "bg-sky-50 text-sky-900"],
              ["Teslim Edildi", "1.198 sipariş", "bg-emerald-50 text-emerald-900"],
              ["İptal / İade", "31 sipariş", "bg-rose-50 text-rose-900"],
            ].map(([label, text, className]) => `<div class="kanban-column rounded-[28px] border border-slate-200 p-5 ${className}"><p class="text-sm font-bold">${label}</p><p class="mt-2 text-2xl font-bold">${text}</p><p class="mt-2 text-sm opacity-80">Operasyon hacmi ve SLA öncelikleri görünür.</p></div>`).join("")}
          </div>`,
      })}
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
        ${sectionCard({
          eyebrow: "Sipariş Listesi",
          title: "Tüm siparişler",
          body: tableShell({ headers: ["Sipariş", "Müşteri", "Tutar", "Durum", "Ödeme", "Kargo"], rows: orders.map(orderRow) }),
          footer: pagination("1-6 / 1.842 sipariş"),
        })}
        <div class="space-y-6">
          ${sectionCard({
            eyebrow: "Operasyon Uyarıları",
            title: "Kargo istisnaları",
            body: `
              <div class="space-y-3">
                ${alertBox({ tone: "amber", title: "Gecikme riski", text: "Ankara çıkışlı 12 sipariş taşıyıcı yoğunluğu nedeniyle SLA sınırına yaklaştı." })}
                ${alertBox({ tone: "rose", title: "Adres doğrulama gerekli", text: "2 siparişte eksik apartman bilgisi tespit edildi.", icon: "map-pinned" })}
                ${alertBox({ tone: "sky", title: "Toplu fatura hazır", text: "Bugün için 48 sipariş e-fatura arşivine gönderilmeye hazır.", icon: "file-stack" })}
              </div>`,
          })}
        </div>
      </div>
    `;
  }

  function renderOrderDetail() {
    const order = orders[0];
    return `
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        ${sectionCard({
          eyebrow: "Sipariş Özeti",
          title: order.id,
          subtitle: "Fatura, irsaliye, iade ve kargo akışlarını aynı detay ekranında yönetin.",
          action: `${badge(order.status, "sky")}${badge(order.payment, "emerald")}`,
          body: `
            <div class="grid gap-3 sm:grid-cols-4">
              ${[
                ["Toplam Tutar", KAUtils.money(order.total)],
                ["Ürün Adedi", `${order.items} ürün`],
                ["Kargo Firması", order.shipping],
                ["Risk Skoru", order.risk],
              ].map(([label, value]) => `<div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4"><p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${label}</p><p class="mt-2 text-lg font-bold text-slate-900">${value}</p></div>`).join("")}
            </div>
            <div class="mt-5 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <div class="rounded-[30px] border border-slate-200 bg-white p-5">
                <p class="text-sm font-bold text-slate-900">Sipariş kalemleri</p>
                ${tableShell({
                  headers: ["Ürün", "Varyant", "Adet", "Tutar"],
                  rows: [
                    ["Nebula X1 Kablosuz Kulaklık", "Siyah", "1", KAUtils.money(4599)],
                    ["Bloom Seramik Kupa Seti", "Krem", "1", KAUtils.money(890)],
                    ["Kargo Sigortası", "-", "1", KAUtils.money(1351)],
                  ].map((row) => `<tr><td><p class="text-sm font-semibold text-slate-900">${row[0]}</p></td><td><p class="text-sm text-slate-600">${row[1]}</p></td><td><p class="text-sm font-semibold text-slate-900">${row[2]}</p></td><td><p class="text-sm font-semibold text-slate-900">${row[3]}</p></td></tr>`),
                })}
              </div>
              <div class="rounded-[30px] border border-slate-200 bg-slate-50/80 p-5">
                <p class="text-sm font-bold text-slate-900">Sipariş zaman çizelgesi</p>
                <div class="mt-4">${timeline([
                  { title: "Sipariş oluşturuldu", body: "Web checkout üzerinden başarılı ödeme alındı.", time: "09:02", icon: "badge-check" },
                  { title: "Fraud kontrolü geçti", body: "Adres ve kart doğrulaması temiz sonuç verdi.", time: "09:05", icon: "shield-check" },
                  { title: "Paketleme kuyruğuna alındı", body: "Depo istasyonu 3 atanmış durumda.", time: "09:19", icon: "package-open" },
                  { title: "E-fatura taslağı oluşturuldu", body: "Muhasebe entegrasyonu ile senkron bekleniyor.", time: "09:24", icon: "file-text" },
                ])}</div>
              </div>
            </div>`,
        })}
        <div class="space-y-6">
          ${sectionCard({
            eyebrow: "Müşteri & Teslimat",
            title: "Teslimat bilgileri",
            body: `
              <div class="space-y-4">
                <div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4"><p class="text-sm font-bold text-slate-900">${order.customer}</p><p class="mt-2 text-sm leading-6 text-slate-500">Atatürk Mah. 42/3, Kadıköy / İstanbul</p></div>
                <div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4"><p class="text-sm font-bold text-slate-900">Ödeme yöntemi</p><p class="mt-2 text-sm text-slate-500">Kredi kartı • 3D Secure doğrulandı</p></div>
              </div>`,
          })}
          ${sectionCard({
            eyebrow: "Dokümanlar",
            title: "Fatura ve irsaliye",
            body: `
              <div class="grid gap-3">
                ${[["E-fatura oluştur", "receipt"], ["İrsaliye yazdır", "printer"], ["İade akışı başlat", "rotate-ccw"]].map(([label, icon]) => `<button type="button" class="inline-flex items-center justify-between rounded-3xl border border-slate-200 bg-slate-50/75 px-4 py-4 text-left transition hover:bg-white"><span class="text-sm font-semibold text-slate-900">${label}</span><i data-lucide="${icon}" class="h-4 w-4 text-slate-500"></i></button>`).join("")}
              </div>`,
          })}
        </div>
      </div>
    `;
  }

  function renderCustomers() {
    return `
      <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        ${[
          { label: "Toplam Müşteri", value: KAUtils.compact(24890), delta: "+6,1%", note: "Aktif müşteri havuzu", icon: "users-round", spark: [8, 10, 12, 15, 18, 21], accent: "teal" },
          { label: "VIP Segment", value: KAUtils.number(486), delta: "+24", note: "Yüksek LTV müşteri", icon: "crown", spark: [6, 8, 9, 11, 13, 16], accent: "amber" },
          { label: "Terk Riski", value: KAUtils.number(162), delta: "-12", note: "Reaktivasyon akışında", icon: "siren", spark: [18, 17, 15, 13, 11, 9], accent: "rose" },
          { label: "Ortalama LTV", value: KAUtils.money(12420), delta: "+8,4%", note: "Son 90 gün", icon: "chart-line", spark: [12, 14, 18, 20, 23, 28], accent: "sky" },
        ].map(metricCard).join("")}
      </div>
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        ${sectionCard({
          eyebrow: "Müşteri Analitiği",
          title: "LTV / sipariş derinliği grafiği",
          subtitle: "Segment bazlı müşteri değerini hızlıca görselleştirin.",
          body: `<div class="page-chart-shell h-[300px]"><canvas id="customer-ltv-chart"></canvas></div>`,
        })}
        ${sectionCard({
          eyebrow: "Segmentasyon",
          title: "Müşteri kümeleri",
          body: `<div class="grid gap-3 sm:grid-cols-2">${[
            ["VIP", "486 kişi", "Yüksek sepet + yüksek frekans"],
            ["Sadık", "1.242 kişi", "Aylık tekrar satın alanlar"],
            ["Terk riski", "162 kişi", "Son 45 gündür alışveriş yapmayanlar"],
            ["Yeni", "1.980 kişi", "İlk siparişini tamamlayanlar"],
          ].map(([label, count, text]) => `<div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4"><p class="text-sm font-bold text-slate-900">${label}</p><p class="mt-2 text-lg font-bold text-slate-900">${count}</p><p class="mt-2 text-sm leading-6 text-slate-500">${text}</p></div>`).join("")}</div>`,
        })}
      </div>
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
        ${sectionCard({
          eyebrow: "CRM Görünümü",
          title: "Müşteri listesi",
          body: tableShell({ headers: ["Müşteri", "Segment", "LTV", "Sipariş", "Son Aktivite"], rows: customers.map(customerRow) }),
          footer: pagination("1-5 / 24.890 müşteri"),
        })}
        <div class="space-y-6">
          ${sectionCard({
            eyebrow: "İletişim Araçları",
            title: "Toplu e-posta & notlar",
            body: `<div class="space-y-3">${[
              ["VIP winback akışı", "243 alıcı hazır"],
              ["Terk edilen sepet hatırlatma", "1.214 alıcı hazır"],
              ["Müşteri notu özetleri", "52 yeni operasyon notu"],
            ].map(([label, text], index) => `<div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4"><div class="flex items-center justify-between gap-3"><div><p class="text-sm font-bold text-slate-900">${label}</p><p class="mt-1 text-sm text-slate-500">${text}</p></div>${badge(index === 2 ? "İncele" : "Hazır", index === 2 ? "amber" : "emerald")}</div></div>`).join("")}</div>`,
          })}
        </div>
      </div>
    `;
  }

  function renderFinance() {
    return `
      <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        ${[
          { label: "Gelir", value: KAUtils.money(1482000), delta: "+18,2%", note: "Son 30 gün", icon: "banknote-arrow-up", spark: [12, 18, 21, 24, 28, 34], accent: "teal" },
          { label: "Gider", value: KAUtils.money(482000), delta: "+4,1%", note: "Operasyon + reklam", icon: "banknote-arrow-down", spark: [9, 11, 13, 15, 16, 18], accent: "amber" },
          { label: "İade Ödemeleri", value: KAUtils.money(38120), delta: "-12%", note: "Kontrollü düşüş", icon: "rotate-ccw", spark: [16, 15, 14, 12, 11, 9], accent: "rose" },
          { label: "Net Marj", value: "%27,8", delta: "+2,4 puan", note: "Kategori miksinin etkisi", icon: "circle-dollar-sign", spark: [8, 12, 16, 19, 22, 25], accent: "sky" },
        ].map(metricCard).join("")}
      </div>
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        ${sectionCard({ eyebrow: "Gelir / Gider Analizi", title: "Nakit akışı", body: `<div class="page-chart-shell h-[310px]"><canvas id="finance-cashflow-chart"></canvas></div>` })}
        ${sectionCard({
          eyebrow: "Ödeme Dağılımı",
          title: "Ödeme yöntemleri",
          body: `
            <div class="page-chart-shell h-[250px]"><canvas id="finance-payment-chart"></canvas></div>
            <div class="mt-5">${progressRows([
              { label: "Kredi Kartı", value: 68, text: "%68", color: "bg-slate-900" },
              { label: "Havale", value: 18, text: "%18", color: "bg-sky-500" },
              { label: "Kapıda Ödeme", value: 9, text: "%9", color: "bg-amber-500" },
              { label: "Cüzdan / Puan", value: 5, text: "%5", color: "bg-emerald-500" },
            ])}</div>`,
        })}
      </div>
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        ${sectionCard({
          eyebrow: "Muhasebe İşlemleri",
          title: "Ödeme yöntemleri & arşiv",
          body: tableShell({
            headers: ["Yöntem", "Pay", "Komisyon", "Durum"],
            rows: [
              ["Kredi Kartı", "%68", "%2,49", badge("Aktif", "emerald")],
              ["Havale / EFT", "%18", "%0", badge("Aktif", "emerald")],
              ["Kapıda Ödeme", "%9", "%1,5", badge("Sınırlı", "amber")],
              ["Cüzdan / Puan", "%5", "%0,5", badge("Aktif", "emerald")],
            ].map((row) => `<tr><td><p class="text-sm font-semibold text-slate-900">${row[0]}</p></td><td><p class="text-sm text-slate-600">${row[1]}</p></td><td><p class="text-sm text-slate-600">${row[2]}</p></td><td>${row[3]}</td></tr>`),
          }),
        })}
        <div class="space-y-6">
          ${sectionCard({
            eyebrow: "Vergi Ayarları",
            title: "KDV & yasal yapı",
            body: alertBox({ tone: "sky", title: "KDV sınıfları senkron", text: "Elektronik, kozmetik ve tekstil için farklı KDV sınıfları kanallarla eşitlenmiş durumda.", icon: "badge-percent" }),
          })}
          ${sectionCard({
            eyebrow: "Fatura Arşivi",
            title: "Arşiv özeti",
            body: progressRows([
              { label: "Oluşturulan e-fatura", value: 94, text: "1.128 belge", color: "bg-slate-900" },
              { label: "Gönderilen e-arşiv", value: 88, text: "912 belge", color: "bg-sky-500" },
              { label: "İade faturaları", value: 12, text: "38 belge", color: "bg-amber-500" },
            ]),
          })}
        </div>
      </div>
    `;
  }

  window.KAPageFns = Object.assign(window.KAPageFns || {}, {
    renderInventory,
    renderOrders,
    renderOrderDetail,
    renderCustomers,
    renderFinance,
  });
})();
