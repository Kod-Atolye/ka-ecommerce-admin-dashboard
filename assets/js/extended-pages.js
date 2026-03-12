(() => {
  const {
    metricCard,
    sectionCard,
    progressRows,
    timeline,
    pagination,
    badge,
    avatar,
    alertBox,
    actionButton,
  } = KAComponents;

  const metricGrid = (metrics = []) =>
    metrics.length
      ? `<div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">${metrics.map(metricCard).join("")}</div>`
      : "";

  const statTiles = (items = []) =>
    `<div class="grid gap-3 sm:grid-cols-2">${items
      .map(
        (item) => `
          <div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4">
            <p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${item.label}</p>
            <p class="mt-2 text-lg font-bold text-slate-900">${item.value}</p>
            ${item.note ? `<p class="mt-2 text-sm text-slate-500">${item.note}</p>` : ""}
          </div>`,
      )
      .join("")}</div>`;

  const insightList = (items = []) =>
    `<div class="space-y-3">${items
      .map(
        (item) => `
          <div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4">
            <div class="flex items-center justify-between gap-3">
              <p class="text-sm font-bold text-slate-900">${item.title}</p>
              ${item.tag ? badge(item.tag, item.tone || "sky") : ""}
            </div>
            <p class="mt-2 text-sm leading-6 text-slate-500">${item.text}</p>
          </div>`,
      )
      .join("")}</div>`;

  const escapeAttr = (value) =>
    String(value)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

  const actionMenu = (actions = ["Detay", "Düzenle", "Dışa Aktar"]) => `
    <div class="relative inline-flex">
      <button type="button" data-row-menu-trigger class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700">
        <i data-lucide="more-horizontal" class="h-4 w-4"></i>
      </button>
      <div data-row-menu class="dropdown-panel hidden absolute right-0 top-[calc(100%+0.5rem)] z-20 rounded-3xl border border-white/80 bg-white/96 p-2 shadow-soft backdrop-blur-xl">
        ${actions
          .map(
            (action) => `
              <a href="#" class="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 hover:text-slate-900">
                <i data-lucide="arrow-right" class="h-4 w-4"></i>${action}
              </a>`,
          )
          .join("")}
      </div>
    </div>`;

  const advancedTable = (config) => `
    <div data-table-widget class="space-y-4">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <label class="search-surface flex items-center gap-3 rounded-[24px] border border-slate-200 bg-slate-50/80 px-4 py-3">
          <i data-lucide="search" class="h-4 w-4 text-slate-400"></i>
          <input data-table-search type="text" placeholder="${config.searchPlaceholder || "Ara..."}" class="w-full min-w-[240px] border-0 bg-transparent p-0 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0" />
        </label>
        <div class="flex flex-wrap gap-2">
          ${(config.filters || [])
            .map(
              (item, index) => `
                <button type="button" data-chip class="data-pill ${index === 0 ? "is-active" : ""} rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-600 transition hover:border-teal-200 hover:text-teal-700">
                  ${item}
                </button>`,
            )
            .join("")}
        </div>
      </div>
      <div class="table-shell overflow-x-auto scroll-soft">
        <table>
          <thead>
            <tr>
              ${config.columns
                .map(
                  (column) => `
                    <th class="text-left text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">
                      <button type="button" data-sort-key="${column.key}" class="inline-flex items-center gap-2">
                        <span>${column.label}</span>
                        <i data-lucide="chevrons-up-down" class="h-3.5 w-3.5"></i>
                      </button>
                    </th>`,
                )
                .join("")}
            </tr>
          </thead>
          <tbody data-table-body>
            ${config.rows
              .map((row) => {
                const sortAttrs = Object.entries(row.sort || {})
                  .map(([key, value]) => `data-sort-${key}="${escapeAttr(value)}"`)
                  .join(" ");
                return `
                  <tr data-row data-search="${escapeAttr(row.search || "")}" ${sortAttrs}>
                    ${row.cells.map((cell) => `<td>${cell}</td>`).join("")}
                  </tr>`;
              })
              .join("")}
          </tbody>
        </table>
      </div>
    </div>`;

  const chartBlock = (title, preset, height = "h-[260px]", subtitle = "") =>
    sectionCard({
      eyebrow: "Veri Görselleştirme",
      title,
      subtitle,
      body: `<div class="page-chart-shell ${height}"><canvas data-chart-preset="${preset}"></canvas></div>`,
    });

  const renderInsightPage = (config) => `
    ${metricGrid(config.metrics)}
    <div class="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      ${sectionCard({
        eyebrow: config.primaryEyebrow || "Analitik Görünüm",
        title: config.primaryTitle,
        subtitle: config.primarySubtitle,
        action: (config.primaryBadges || []).map((item) => badge(item.label, item.tone)).join(""),
        body: `
          <div class="page-chart-shell h-[320px]"><canvas data-chart-preset="${config.primaryChart}"></canvas></div>
          ${config.primaryStats ? `<div class="mt-5">${statTiles(config.primaryStats)}</div>` : ""}`,
      })}
      <div class="space-y-6">
        ${sectionCard({
          eyebrow: config.secondaryEyebrow || "Dağılım",
          title: config.secondaryTitle,
          subtitle: config.secondarySubtitle || "",
          body: `<div class="page-chart-shell h-[250px]"><canvas data-chart-preset="${config.secondaryChart}"></canvas></div>`,
        })}
        ${sectionCard({
          eyebrow: config.insightEyebrow || "Öne Çıkanlar",
          title: config.insightTitle || "Operasyon içgörüleri",
          body: insightList(config.insights),
        })}
      </div>
    </div>
    ${config.table
      ? sectionCard({
          eyebrow: config.table.eyebrow || "Detay Tablolar",
          title: config.table.title,
          subtitle: config.table.subtitle || "",
          body: advancedTable(config.table),
          footer: pagination(config.table.pagination || "1-5 / 48 kayıt"),
        })
      : ""}`;

  const renderManagementPage = (config) => `
    ${metricGrid(config.metrics)}
    <div class="grid gap-6 xl:grid-cols-[minmax(0,1.28fr)_minmax(0,0.72fr)]">
      ${sectionCard({
        eyebrow: config.tableEyebrow || "Operasyon Yönetimi",
        title: config.tableTitle,
        subtitle: config.tableSubtitle || "",
        action: config.primaryAction ? actionButton(config.primaryAction, true) : "",
        body: advancedTable(config.table),
        footer: pagination(config.pagination || "1-6 / 64 kayıt"),
      })}
      <div class="space-y-6">
        ${config.sideChart ? chartBlock(config.sideChart.title, config.sideChart.preset, config.sideChart.height || "h-[250px]", config.sideChart.subtitle || "") : ""}
        ${config.sideInsights ? sectionCard({ eyebrow: config.sideInsights.eyebrow || "Notlar", title: config.sideInsights.title, body: insightList(config.sideInsights.items) }) : ""}
        ${config.sideProgress ? sectionCard({ eyebrow: config.sideProgress.eyebrow || "Skorlar", title: config.sideProgress.title, body: progressRows(config.sideProgress.items) }) : ""}
        ${config.sideTimeline ? sectionCard({ eyebrow: config.sideTimeline.eyebrow || "Akış", title: config.sideTimeline.title, body: timeline(config.sideTimeline.items) }) : ""}
      </div>
    </div>`;

  const renderFormField = (field) => {
    if (field.type === "textarea") {
      return `<label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3 ${field.span || "lg:col-span-2"}"><span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${field.label}</span><textarea rows="${field.rows || 4}" class="mt-2 w-full resize-none border-0 bg-transparent p-0 text-sm leading-7 text-slate-700 focus:outline-none focus:ring-0">${field.value || ""}</textarea></label>`;
    }
    if (field.type === "select") {
      return `<label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3 ${field.span || ""}"><span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${field.label}</span><select class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0">${(field.options || []).map((option) => `<option ${option === field.value ? "selected" : ""}>${option}</option>`).join("")}</select></label>`;
    }
    if (field.type === "checkbox-group") {
      return `<div class="rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-4 ${field.span || "lg:col-span-2"}"><p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${field.label}</p><div class="mt-4 grid gap-3 sm:grid-cols-2">${(field.options || []).map((option, index) => `<label class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"><input type="checkbox" class="rounded border-slate-300 text-slate-900 focus:ring-slate-400" ${index < (field.checkedCount || 0) ? "checked" : ""} /><span>${option}</span></label>`).join("")}</div></div>`;
    }
    if (field.type === "radio-group") {
      return `<div class="rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-4 ${field.span || "lg:col-span-2"}"><p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${field.label}</p><div class="mt-4 grid gap-3 sm:grid-cols-2">${(field.options || []).map((option, index) => `<label class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700"><input type="radio" name="${field.name || field.label}" class="border-slate-300 text-slate-900 focus:ring-slate-400" ${index === 0 ? "checked" : ""} /><span>${option}</span></label>`).join("")}</div></div>`;
    }
    if (field.type === "upload") {
      return `<div class="upload-dropzone rounded-[28px] border border-dashed border-sky-200 bg-cyan-50/50 p-5 ${field.span || "lg:col-span-2"}"><div class="flex items-center gap-4"><span class="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-white text-slate-700 shadow-soft"><i data-lucide="${field.icon || "upload-cloud"}" class="h-6 w-6"></i></span><div><p class="text-sm font-bold text-slate-900">${field.label}</p><p class="mt-1 text-sm text-slate-500">${field.value}</p></div></div></div>`;
    }
    const sourceAttr = field.slugSource ? `data-slug-source="${field.slugSource}"` : "";
    const targetAttr = field.slugTarget ? `data-slug-target="${field.slugTarget}"` : "";
    return `<label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3 ${field.span || ""}"><span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${field.label}</span><input ${sourceAttr} ${targetAttr} class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="${field.value || ""}" /></label>`;
  };

  const renderFormPage = (config) => `
    ${metricGrid(config.metrics)}
    <div class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
      ${sectionCard({
        eyebrow: config.formEyebrow || "Form Akışı",
        title: config.formTitle,
        subtitle: config.formSubtitle || "",
        action: config.primaryAction ? actionButton(config.primaryAction, true) : "",
        body: `<div class="grid gap-4 lg:grid-cols-2">${(config.fields || []).map(renderFormField).join("")}</div>`,
      })}
      <div class="space-y-6">
        ${config.sideChecklist ? sectionCard({ eyebrow: "Hazırlık", title: config.sideChecklist.title, body: progressRows(config.sideChecklist.items) }) : ""}
        ${config.sideNotes ? sectionCard({ eyebrow: "Yönergeler", title: config.sideNotes.title, body: insightList(config.sideNotes.items) }) : ""}
        ${config.sideChart ? chartBlock(config.sideChart.title, config.sideChart.preset, "h-[240px]", config.sideChart.subtitle || "") : ""}
      </div>
    </div>`;

  const renderProfilePage = (config) => `
    ${metricGrid(config.metrics)}
    <div class="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
      ${sectionCard({
        eyebrow: config.mainEyebrow || "Profil Detayı",
        title: config.mainTitle,
        subtitle: config.mainSubtitle || "",
        body: `
          <div class="grid gap-4 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <div class="rounded-[30px] border border-slate-200 bg-slate-50/80 p-5">
              <div class="flex items-center gap-4">
                ${avatar(config.profile.initials, config.profile.accent || "from-cyan-100 to-teal-100", "h-16 w-16")}
                <div>
                  <p class="text-lg font-bold text-slate-900">${config.profile.name}</p>
                  <p class="mt-1 text-sm text-slate-500">${config.profile.meta}</p>
                </div>
              </div>
              <div class="mt-5">${statTiles(config.profile.stats)}</div>
            </div>
            <div class="rounded-[30px] border border-slate-200 bg-white p-5">
              <p class="text-sm font-bold text-slate-900">${config.profilePanelTitle || "Profil Akışı"}</p>
              <div class="mt-4">${timeline(config.timeline)}</div>
            </div>
          </div>
          ${config.table ? `<div class="mt-6">${advancedTable(config.table)}</div>` : ""}`,
      })}
      <div class="space-y-6">
        ${config.sideInsights ? sectionCard({ eyebrow: "İçgörüler", title: config.sideInsights.title, body: insightList(config.sideInsights.items) }) : ""}
        ${config.sideProgress ? sectionCard({ eyebrow: "Skorlar", title: config.sideProgress.title, body: progressRows(config.sideProgress.items) }) : ""}
      </div>
    </div>`;

  const clonePage = (baseKey, overrides) => {
    const basePage = window.KAPageRegistry[baseKey];
    return { ...basePage, ...overrides, actions: overrides.actions || basePage.actions, highlights: overrides.highlights || basePage.highlights, render: overrides.render || basePage.render };
  };

  window.KAExtendedFactory = {
    renderInsightPage,
    renderManagementPage,
    renderFormPage,
    renderProfilePage,
    clonePage,
    metricGrid,
    statTiles,
    insightList,
    advancedTable,
    chartBlock,
    actionMenu,
    avatar,
    badge,
    alertBox,
    progressRows,
    sectionCard,
  };

  Object.assign(window.KAPageRegistry, {
    "product-list": clonePage("products", { title: "Product List", eyebrow: "Katalog görünümü", description: "Mevcut ürün portföyünü gelişmiş katalog filtreleri ve merchandising araçları ile yönetin.", href: "products/product-list.html" }),
    "order-list": clonePage("orders", { title: "Order List", eyebrow: "Fulfillment operasyonu", description: "Siparişleri ödeme, risk, kargo ve SLA metrikleri ile birlikte operasyon tablosunda yönetin.", href: "orders/order-list.html" }),
    "customer-list": clonePage("customers", { title: "Customer List", eyebrow: "CRM görünümü", description: "Müşteri tabanını segment, yaşam boyu değer ve sipariş geçmişi ile yönetin.", href: "customers/customer-list.html" }),
    "inventory-overview": clonePage("inventory", { title: "Inventory Overview", eyebrow: "Depo ve stok operasyonu", description: "Stok sağlığı, transfer akışları ve depo kapasitesini bütünsel olarak izleyin.", href: "inventory/inventory-overview.html" }),
    "admin-users": clonePage("users", { title: "Admin Users", eyebrow: "Ekip ve yetki merkezi", description: "Yönetici hesaplarını, rol dağılımlarını ve güvenlik kapsamını tek panelden yönetin.", href: "users/admin-users.html" }),
    "general-settings": clonePage("settings", { title: "General Settings", eyebrow: "Sistem temel ayarları", description: "Marka kimliği, dil, para birimi ve platform varsayılanlarını merkezi ayar panelinden yönetin.", href: "settings/general-settings.html" }),
  });
})();

(() => {
  const { renderInsightPage, renderManagementPage, renderFormPage, actionMenu, avatar, badge } = window.KAExtendedFactory;

  Object.assign(window.KAPageRegistry, {
    "sales-analytics": {
      title: "Sales Analytics",
      eyebrow: "Gelir ve sipariş trendleri",
      description: "Satış performansını kanal, tarih ve kategori bazında inceleyen gelişmiş analitik görünüm.",
      href: "analytics/sales-analytics.html",
      actions: [{ label: "Rapor Paketi", icon: "file-output", modalKey: "exportReports", variant: "primary" }],
      highlights: [{ label: "GMV", value: "12,8M TRY" }, { label: "AOV", value: "1.688 TRY" }, { label: "Dönüşüm", value: "%4,9" }, { label: "ROAS", value: "6.2x" }],
      render: () => renderInsightPage({
        metrics: [
          { label: "Bugünkü Satış", value: KAUtils.money(182400), delta: "+18,4%", note: "Son 24 saat", icon: "receipt-text", spark: [10, 13, 15, 19, 24, 28], accent: "teal" },
          { label: "Sipariş Hacmi", value: KAUtils.number(264), delta: "+22", note: "Tüm kanallar", icon: "shopping-cart", spark: [8, 10, 14, 16, 18, 22], accent: "sky" },
          { label: "İptal Oranı", value: "%1,8", delta: "-0,3 puan", note: "İyileşme", icon: "triangle-alert", spark: [18, 16, 14, 12, 10, 8], accent: "amber" },
          { label: "Yeni Müşteri", value: KAUtils.number(84), delta: "+9", note: "İlk satın alım", icon: "users-round", spark: [4, 6, 8, 9, 10, 12], accent: "rose" },
        ],
        primaryTitle: "Sales overview",
        primarySubtitle: "Satış trafiğini ve günlük GMV hareketini izleyin.",
        primaryChart: "salesGrowth",
        primaryStats: [
          { label: "Web", value: "5,2M TRY", note: "Toplam GMV'nin %41'i" },
          { label: "Marketplace", value: "4,8M TRY", note: "Toplam GMV'nin %37'si" },
          { label: "Mobil App", value: "2,8M TRY", note: "Toplam GMV'nin %22'si" },
          { label: "İade etkisi", value: "-381K TRY", note: "Netleşmiş kesinti" },
        ],
        secondaryTitle: "Conversion rate",
        secondaryChart: "conversionTrend",
        insights: [
          { title: "AOV yükseldi", text: "Bundle satışların artmasıyla ortalama sepet tutarı hafta bazında %7 yükseldi.", tag: "+%7", tone: "emerald" },
          { title: "Marketplace kampanyası", text: "Trendyol sponsorlu ürün akışı sipariş hacmine en güçlü katkıyı verdi.", tag: "ROAS 6.4", tone: "sky" },
          { title: "İptal riski", text: "Kapıda ödeme siparişlerinde adres doğrulama kaynaklı risk sinyali sürüyor.", tag: "İzle", tone: "amber" },
        ],
      }),
    },
    "revenue-analytics": {
      title: "Revenue Analytics",
      eyebrow: "Net gelir ve marj takibi",
      description: "Brüt gelir, iade etkisi ve marj kalitesini kanal bazında izleyen finansal analitik ekranı.",
      href: "analytics/revenue-analytics.html",
      actions: [{ label: "Finans Export", icon: "file-output", modalKey: "exportReports", variant: "primary" }],
      highlights: [{ label: "Net Gelir", value: "1,48M TRY" }, { label: "Brüt Marj", value: "%27,8" }, { label: "Refund", value: "38K TRY" }, { label: "Vergi Yükü", value: "%11,2" }],
      render: () => renderInsightPage({
        metrics: [
          { label: "Brüt Gelir", value: KAUtils.money(1842000), delta: "+13,1%", note: "Ay başından bu yana", icon: "banknote-arrow-up", spark: [12, 18, 20, 24, 27, 34], accent: "teal" },
          { label: "Net Kasa", value: KAUtils.money(1284000), delta: "+8,2%", note: "Komisyon ve iadeler sonrası", icon: "wallet", spark: [10, 12, 16, 18, 23, 27], accent: "sky" },
          { label: "İade Kesintisi", value: KAUtils.money(38120), delta: "-12%", note: "Düşen refund maliyeti", icon: "rotate-ccw", spark: [18, 16, 13, 11, 10, 8], accent: "amber" },
          { label: "Vergi Tahsilatı", value: KAUtils.money(206400), delta: "+4,5%", note: "KDV dahil", icon: "badge-percent", spark: [7, 8, 10, 12, 14, 16], accent: "rose" },
        ],
        primaryTitle: "Revenue trend",
        primarySubtitle: "Günlük net gelir trendi ve marj hareketi.",
        primaryChart: "revenueGrowth",
        primaryStats: [
          { label: "Elektronik", value: "%31 marj", note: "En yüksek katkı" },
          { label: "Moda", value: "%22 marj", note: "İade etkisi daha yüksek" },
          { label: "Kozmetik", value: "%28 marj", note: "En dengeli kategori" },
          { label: "Spor", value: "%19 marj", note: "Kargo maliyeti baskısı" },
        ],
        secondaryTitle: "Expense mix",
        secondaryChart: "expenseMix",
        insights: [
          { title: "Komisyon optimizasyonu", text: "Pazar yeri kampanya maliyetleri geçen haftaya göre 2,3 puan geriledi.", tag: "İyi", tone: "emerald" },
          { title: "KDV senkronu", text: "Vergi sınıfları ve sipariş muhasebesi arasında tutarsızlık tespit edilmedi.", tag: "Stabil", tone: "sky" },
          { title: "Refund takibi", text: "Ayakkabı kategorisinde refund seviyesi diğer kategorilerin üzerinde kaldı.", tag: "Uyarı", tone: "amber" },
        ],
      }),
    },
    "traffic-analytics": {
      title: "Traffic Analytics",
      eyebrow: "Kanal ve trafik kalite takibi",
      description: "Ziyaret trafiğini kaynak, cihaz ve kampanya kalitesi perspektifinden yöneten analitik ekranı.",
      href: "analytics/traffic-analytics.html",
      actions: [{ label: "UTM Özeti", icon: "download", href: "#", variant: "primary" }],
      highlights: [{ label: "Session", value: "248K" }, { label: "Direct", value: "%22" }, { label: "Paid", value: "%28" }, { label: "Organic", value: "%36" }],
      render: () => renderInsightPage({
        metrics: [
          { label: "Oturum", value: KAUtils.compact(248000), delta: "+11%", note: "7 günlük hareket", icon: "activity", spark: [12, 14, 16, 18, 20, 24], accent: "teal" },
          { label: "Yeni Ziyaretçi", value: KAUtils.compact(91400), delta: "+7%", note: "Paid ve social etkisi", icon: "users-round", spark: [9, 11, 13, 14, 16, 18], accent: "sky" },
          { label: "Bounce Rate", value: "%31", delta: "-2 puan", note: "Landing iyileşti", icon: "move-right", spark: [20, 18, 17, 15, 13, 11], accent: "amber" },
          { label: "Mobil Pay", value: "%64", delta: "+4 puan", note: "App ve web mobile", icon: "smartphone", spark: [10, 12, 14, 16, 18, 22], accent: "rose" },
        ],
        primaryTitle: "Traffic sources",
        primarySubtitle: "Kaynak kırılımını ve oturum kalitesini izleyin.",
        primaryChart: "trafficMix",
        primaryStats: [
          { label: "Organik", value: "89K oturum", note: "SEO performansı güçlü" },
          { label: "Paid", value: "69K oturum", note: "Meta + Google" },
          { label: "Direct", value: "54K oturum", note: "Sadık kullanıcı etkisi" },
          { label: "Social", value: "36K oturum", note: "Influencer yönlendirmeleri" },
        ],
        secondaryTitle: "Traffic to conversion",
        secondaryChart: "conversionTrend",
        insights: [
          { title: "Mobil yoğunluğu arttı", text: "Özellikle akşam saatlerinde mobil kaynaklı checkout akışı belirginleşiyor.", tag: "%64", tone: "sky" },
          { title: "SEO ivmesi", text: "Kategori landing sayfaları organik trafikte beklentinin üzerine çıktı.", tag: "+%16", tone: "emerald" },
          { title: "Paid kalite farkı", text: "Affiliate kaynaklar yüksek oturum getirirken dönüşüm kalitesi düşük kaldı.", tag: "İzle", tone: "amber" },
        ],
      }),
    },
    "customer-analytics": {
      title: "Customer Analytics",
      eyebrow: "Yaşam boyu değer ve segment kalitesi",
      description: "Müşteri kümelerini, sadakat seviyesini ve tekrar satın alma davranışını analitik bakışla inceleyin.",
      href: "analytics/customer-analytics.html",
      actions: [{ label: "Segment Export", icon: "file-output", href: "#", variant: "primary" }],
      highlights: [{ label: "VIP", value: "486 kişi" }, { label: "Repeat Rate", value: "%38" }, { label: "LTV", value: "12.420 TRY" }, { label: "Winback", value: "162 kişi" }],
      render: () => renderInsightPage({
        metrics: [
          { label: "Tekrar Satın Alma", value: "%38", delta: "+3 puan", note: "Son 90 gün", icon: "refresh-cw", spark: [7, 8, 10, 12, 13, 15], accent: "teal" },
          { label: "VIP Gelir Payı", value: "%24", delta: "+2 puan", note: "Üst segment katkısı", icon: "crown", spark: [8, 10, 11, 13, 15, 18], accent: "amber" },
          { label: "Churn Riski", value: KAUtils.number(162), delta: "-12", note: "Reactivation akışında", icon: "triangle-alert", spark: [16, 14, 13, 11, 9, 7], accent: "rose" },
          { label: "Sadakat Puanı", value: "74/100", delta: "+4", note: "NPS + tekrar satın alma", icon: "badge-check", spark: [10, 12, 14, 16, 18, 21], accent: "sky" },
        ],
        primaryTitle: "Customer segment split",
        primarySubtitle: "Müşteri değerinin segment bazında dağılımı.",
        primaryChart: "customerSegments",
        primaryStats: [
          { label: "VIP", value: "486", note: "Yüksek sepet ve frekans" },
          { label: "Sadık", value: "1.242", note: "Aylık tekrar satın alan" },
          { label: "Yeni", value: "1.980", note: "İlk siparişini veren" },
          { label: "Riskli", value: "162", note: "Winback hedefli" },
        ],
        secondaryTitle: "LTV trend",
        secondaryChart: "revenueGrowth",
        insights: [
          { title: "VIP büyüyor", text: "Premium kategori satışları sayesinde VIP segment geliri düzenli artıyor.", tag: "+%9", tone: "emerald" },
          { title: "Riskli kullanıcılar", text: "Moda kategorisinde 45+ gün pasif kalan kullanıcı sayısı beklenenden yüksek.", tag: "162", tone: "amber" },
          { title: "İlk sipariş akışı", text: "Hoş geldin kuponu kullanan kullanıcıların ikinci sipariş oranı kuvvetli seyrediyor.", tag: "Winback", tone: "sky" },
        ],
      }),
    },
    "product-edit": {
      title: "Edit Product",
      eyebrow: "Ürün form akışı",
      description: "Mevcut ürün kartını varyant, medya, SEO ve kanal yayın alanlarıyla düzenleyin.",
      href: "products/product-edit.html",
      actions: [{ label: "Ürünü Kaydet", icon: "save", href: "#", variant: "primary" }],
      highlights: [{ label: "SKU", value: "KA-AUD-1042" }, { label: "Durum", value: "Aktif" }, { label: "Kanal", value: "4 yayın" }, { label: "SEO", value: "91/100" }],
      render: () => renderFormPage({
        metrics: [
          { label: "Yayın Skoru", value: "91/100", delta: "+4", note: "SEO ve medya sağlığı", icon: "search-check", spark: [8, 10, 12, 14, 16, 18], accent: "teal" },
          { label: "Varyant", value: "6 aktif", delta: "+1", note: "Hazır kombinasyon", icon: "swatches", spark: [4, 4, 5, 5, 6, 6], accent: "sky" },
          { label: "Eksik İçerik", value: "2 alan", delta: "-1", note: "Amazon listing", icon: "triangle-alert", spark: [8, 7, 6, 5, 4, 3], accent: "amber" },
          { label: "Medya", value: "8 görsel", delta: "+2", note: "Lifestyle dahil", icon: "image-up", spark: [3, 4, 5, 6, 7, 8], accent: "rose" },
        ],
        formTitle: "Product edit workspace",
        formSubtitle: "Temel bilgi, yayın alanları ve SEO kurgusunu güncelleyin.",
        fields: [
          { label: "Ürün Başlığı", value: "Nebula X1 Kablosuz Kulaklık", slugSource: "product-edit-title" },
          { label: "Marka", type: "select", value: "Auris", options: ["Auris", "Modeva", "Volt", "Stride"] },
          { label: "Slug", value: "/nebula-x1-kablosuz-kulaklik", slugTarget: "product-edit-title" },
          { label: "Kategori", type: "select", value: "Elektronik", options: ["Elektronik", "Moda", "Kozmetik", "Spor"] },
          { label: "Açıklama", type: "textarea", value: "Aktif gürültü engelleme, premium ses sürücüsü ve uygulama destekli kontrol arayüzü.", span: "lg:col-span-2" },
          { label: "Satış Kanalları", type: "checkbox-group", options: ["Web Store", "Trendyol", "Amazon", "Hepsiburada"], checkedCount: 3 },
          { label: "Varsayılan Varyant Politikası", type: "radio-group", options: ["Tek stok havuzu", "Depo bazlı stok", "Kanal bazlı stok"], name: "variant-policy" },
          { label: "Görsel Yükleme", type: "upload", value: "Packshot, lifestyle ve kutu içeriği görselleri" },
          { label: "Meta Title", value: "Nebula X1 Kablosuz Kulaklık | Premium ANC Deneyimi" },
          { label: "Meta Description", type: "textarea", value: "Yüksek batarya ömrü, güçlü ANC ve premium malzeme kalitesi ile segment lideri ürün sayfası.", span: "lg:col-span-2" },
        ],
        sideChecklist: {
          title: "Tamamlama seviyesi",
          items: [
            { label: "Temel bilgi", value: 100, text: "Tamam", color: "bg-emerald-500" },
            { label: "SEO alanları", value: 88, text: "%88", color: "bg-slate-900" },
            { label: "Kanal içerikleri", value: 72, text: "%72", color: "bg-sky-500" },
            { label: "Görsel seti", value: 64, text: "%64", color: "bg-amber-500" },
          ],
        },
        sideNotes: {
          title: "Editör notları",
          items: [
            { title: "Amazon listing", text: "Başlık uzunluğu optimize edilmeli.", tag: "Eksik", tone: "amber" },
            { title: "Lifestyle görseller", text: "İki yeni açı ürün detay dönüşümünü yükseltiyor.", tag: "Öneri", tone: "sky" },
          ],
        },
        sideChart: { title: "Review distribution", preset: "productReviews" },
      }),
    },
    "product-variants": {
      title: "Product Variants",
      eyebrow: "Varyant matrisi ve stok görünümü",
      description: "Renk, beden ve kanal bazlı varyant kombinasyonlarını profesyonel stok görünümüyle yönetin.",
      href: "products/product-variants.html",
      actions: [{ label: "Varyant Ekle", icon: "plus", href: "#", variant: "primary" }],
      highlights: [{ label: "Aktif Kombinasyon", value: "18" }, { label: "Kritik Stok", value: "3 varyant" }, { label: "Depo", value: "3 lokasyon" }, { label: "SKU", value: "18 alt SKU" }],
      render: () => renderManagementPage({
        metrics: [
          { label: "Aktif Varyant", value: "18", delta: "+2", note: "Yeni renk açıldı", icon: "swatches", spark: [4, 5, 6, 7, 8, 9], accent: "teal" },
          { label: "Kritik Stok", value: "3", delta: "-1", note: "Replenishment sonrası", icon: "triangle-alert", spark: [9, 8, 7, 6, 5, 4], accent: "amber" },
          { label: "Channel Sync", value: "%96", delta: "+1 puan", note: "Marketplace eşleşmesi", icon: "refresh-cw", spark: [8, 9, 10, 11, 12, 13], accent: "sky" },
          { label: "SKU Derinliği", value: "18", delta: "Stabil", note: "Alt SKU sayısı", icon: "package-check", spark: [4, 4, 4, 4, 4, 4], accent: "rose" },
        ],
        tableTitle: "Variant matrix",
        tableSubtitle: "Kombinasyon bazlı stok, depo ve kanal görünürlüğü.",
        table: {
          searchPlaceholder: "Renk, beden veya SKU ara...",
          filters: ["Tümü", "Aktif", "Kritik", "Taslak"],
          columns: [{ label: "Varyant", key: "name" }, { label: "SKU", key: "sku" }, { label: "Stok", key: "stock" }, { label: "Kanal", key: "channel" }, { label: "Aksiyon", key: "menu" }],
          rows: [
            { search: "Siyah Standart KA-AUD-1042-BLK", sort: { name: "Siyah Standart", sku: "1042", stock: 7, channel: 3 }, cells: ["<p class='text-sm font-bold text-slate-900'>Siyah / Standart</p><p class='mt-1 text-sm text-slate-500'>İstanbul Merkez</p>", "<p class='text-sm font-semibold text-slate-900'>KA-AUD-1042-BLK</p>", badge("7 adet", "amber"), "<p class='text-sm text-slate-600'>Web, Trendyol, Hepsi</p>", actionMenu()] },
            { search: "Beyaz Standart KA-AUD-1042-WHT", sort: { name: "Beyaz Standart", sku: "1043", stock: 18, channel: 4 }, cells: ["<p class='text-sm font-bold text-slate-900'>Beyaz / Standart</p><p class='mt-1 text-sm text-slate-500'>Ankara Fulfillment</p>", "<p class='text-sm font-semibold text-slate-900'>KA-AUD-1042-WHT</p>", badge("18 adet", "emerald"), "<p class='text-sm text-slate-600'>4 kanal</p>", actionMenu()] },
            { search: "Lacivert Standart KA-AUD-1042-NAV", sort: { name: "Lacivert Standart", sku: "1044", stock: 17, channel: 2 }, cells: ["<p class='text-sm font-bold text-slate-900'>Lacivert / Standart</p><p class='mt-1 text-sm text-slate-500'>İzmir Mikro Depo</p>", "<p class='text-sm font-semibold text-slate-900'>KA-AUD-1042-NAV</p>", badge("17 adet", "emerald"), "<p class='text-sm text-slate-600'>Web, Amazon</p>", actionMenu()] },
          ],
        },
        sideChart: { title: "Stock capacity", preset: "stockCapacity" },
      }),
    },
    "product-reviews": {
      title: "Product Reviews",
      eyebrow: "Yorum ve puan operasyonu",
      description: "Ürün bazlı müşteri yorumlarını, puan dağılımını ve moderasyon sürecini tek merkezde yönetin.",
      href: "products/product-reviews.html",
      actions: [{ label: "Moderasyon Kuyruğu", icon: "message-square-more", href: "marketing/reviews-management.html", variant: "primary" }],
      highlights: [{ label: "Yeni Yorum", value: "48" }, { label: "Ortalama Puan", value: "4.6/5" }, { label: "Onay Bekleyen", value: "7" }, { label: "İade Sinyali", value: "3 ürün" }],
      render: () => renderManagementPage({
        metrics: [
          { label: "Yeni Review", value: "48", delta: "+12", note: "Son 7 gün", icon: "message-square-more", spark: [3, 5, 6, 8, 10, 12], accent: "teal" },
          { label: "Olumlu Duygu", value: "%88", delta: "+3 puan", note: "Sentiment analizi", icon: "badge-check", spark: [8, 10, 12, 14, 15, 17], accent: "sky" },
          { label: "Negatif Sinyal", value: "7", delta: "-2", note: "İade riski içeren", icon: "triangle-alert", spark: [9, 8, 7, 6, 5, 4], accent: "amber" },
          { label: "Onay Kuyruğu", value: "7", delta: "Stabil", note: "Moderatör bekliyor", icon: "shield-check", spark: [4, 4, 4, 4, 4, 4], accent: "rose" },
        ],
        tableTitle: "Review moderation",
        tableSubtitle: "Yorum içeriği, ürün etkisi ve moderasyon durumu.",
        table: {
          searchPlaceholder: "Ürün veya müşteri ara...",
          filters: ["Tümü", "Olumlu", "Nötr", "Riskli"],
          columns: [{ label: "Yorum", key: "name" }, { label: "Ürün", key: "product" }, { label: "Puan", key: "rating" }, { label: "Durum", key: "status" }, { label: "Aksiyon", key: "menu" }],
          rows: [
            { search: "Aslı Nebula X1", sort: { name: "Aslı", product: "Nebula", rating: 5, status: "Yayında" }, cells: ["<p class='text-sm font-bold text-slate-900'>Aslı</p><p class='mt-1 text-sm text-slate-500'>Ses kalitesi çok güçlü.</p>", "<p class='text-sm font-semibold text-slate-900'>Nebula X1</p>", badge("5/5", "emerald"), badge("Yayında", "emerald"), actionMenu()] },
            { search: "Tuna AeroTrail", sort: { name: "Tuna", product: "AeroTrail", rating: 3, status: "İncele" }, cells: ["<p class='text-sm font-bold text-slate-900'>Tuna</p><p class='mt-1 text-sm text-slate-500'>Numara kalıbı dar geldi.</p>", "<p class='text-sm font-semibold text-slate-900'>AeroTrail</p>", badge("3/5", "amber"), badge("İncele", "amber"), actionMenu()] },
            { search: "Zeynep Luna Serum", sort: { name: "Zeynep", product: "Luna", rating: 4, status: "Yayında" }, cells: ["<p class='text-sm font-bold text-slate-900'>Zeynep</p><p class='mt-1 text-sm text-slate-500'>Ambalaj premium hissediyor.</p>", "<p class='text-sm font-semibold text-slate-900'>Luna Serum</p>", badge("4/5", "sky"), badge("Yayında", "emerald"), actionMenu()] },
          ],
        },
        sideChart: { title: "Rating distribution", preset: "productReviews" },
      }),
    },
    "brands": {
      title: "Brands",
      eyebrow: "Marka portföyü yönetimi",
      description: "Marka bazlı içerik, performans ve görünürlük yönetimini tek katalog modülünde yönetin.",
      href: "products/brands.html",
      actions: [{ label: "Marka Ekle", icon: "plus", href: "#", variant: "primary" }],
      highlights: [{ label: "Aktif Marka", value: "186" }, { label: "Öne Çıkan", value: "24" }, { label: "Eksik SEO", value: "12" }, { label: "Logo Seti", value: "%94" }],
      render: () => renderManagementPage({
        metrics: [
          { label: "Aktif Marka", value: "186", delta: "+8", note: "Katalog partnerleri", icon: "badge-check", spark: [4, 5, 6, 7, 8, 10], accent: "teal" },
          { label: "Öne Çıkan Marka", value: "24", delta: "+2", note: "Hero vitrinlerinde", icon: "sparkles", spark: [2, 3, 4, 5, 6, 7], accent: "sky" },
          { label: "Eksik İçerik", value: "12", delta: "-3", note: "Logo veya banner", icon: "triangle-alert", spark: [9, 8, 7, 6, 5, 4], accent: "amber" },
          { label: "SEO Sağlığı", value: "%94", delta: "+2 puan", note: "Marka landing'leri", icon: "search-check", spark: [8, 9, 10, 11, 12, 13], accent: "rose" },
        ],
        tableTitle: "Brand library",
        tableSubtitle: "Marka kartları, performans ve içerik sağlığı.",
        table: {
          searchPlaceholder: "Marka adı ara...",
          filters: ["Tümü", "Öne Çıkan", "Eksik İçerik", "Yüksek Satış"],
          columns: [{ label: "Marka", key: "name" }, { label: "Kategori", key: "category" }, { label: "Satış", key: "sales" }, { label: "Durum", key: "status" }, { label: "Aksiyon", key: "menu" }],
          rows: [
            { search: "Auris Elektronik", sort: { name: "Auris", category: "Elektronik", sales: 982, status: "Aktif" }, cells: ["<div class='flex items-center gap-3'>" + avatar("AU", "from-cyan-100 to-teal-100", "h-12 w-12") + "<div><p class='text-sm font-bold text-slate-900'>Auris</p><p class='mt-1 text-sm text-slate-500'>Premium audio</p></div></div>", "<p class='text-sm text-slate-600'>Elektronik</p>", "<p class='text-sm font-semibold text-slate-900'>982 satış</p>", badge("Aktif", "emerald"), actionMenu()] },
            { search: "Modeva Moda", sort: { name: "Modeva", category: "Moda", sales: 744, status: "Öne Çıkan" }, cells: ["<div class='flex items-center gap-3'>" + avatar("MO", "from-amber-100 to-orange-100", "h-12 w-12") + "<div><p class='text-sm font-bold text-slate-900'>Modeva</p><p class='mt-1 text-sm text-slate-500'>Seasonal fashion</p></div></div>", "<p class='text-sm text-slate-600'>Moda</p>", "<p class='text-sm font-semibold text-slate-900'>744 satış</p>", badge("Öne Çıkan", "sky"), actionMenu()] },
            { search: "Volt Akıllı Ev", sort: { name: "Volt", category: "Akıllı Ev", sales: 318, status: "Eksik İçerik" }, cells: ["<div class='flex items-center gap-3'>" + avatar("VO", "from-sky-100 to-indigo-100", "h-12 w-12") + "<div><p class='text-sm font-bold text-slate-900'>Volt</p><p class='mt-1 text-sm text-slate-500'>Smart living</p></div></div>", "<p class='text-sm text-slate-600'>Akıllı Ev</p>", "<p class='text-sm font-semibold text-slate-900'>318 satış</p>", badge("Eksik İçerik", "amber"), actionMenu()] },
          ],
        },
        sideChart: { title: "Kategori dağılımı", preset: "trafficMix" },
      }),
    },
  });
})();

