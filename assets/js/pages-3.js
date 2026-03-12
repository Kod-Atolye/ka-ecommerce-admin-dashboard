(() => {
  const { reportsCatalog, campaigns, reviewQueue, cmsPages } = KADashboardData;
  const { metricCard, sectionCard, progressRows, tableShell, badge } = KAComponents;

  function renderReports() {
    return `
      <div class="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        ${sectionCard({
          eyebrow: "Rapor Merkezi",
          title: "Hazır rapor setleri",
          subtitle: "PDF ve Excel export seçenekleriyle profesyonel rapor paketleri.",
          action: KAComponents.actionButton({ label: "Rapor Paketi Oluştur", icon: "file-output", modalKey: "exportReports", variant: "primary" }, true),
          body: `<div class="grid gap-4 sm:grid-cols-2">${reportsCatalog.map((report) => `<div class="rounded-[28px] border border-slate-200 bg-slate-50/75 p-5"><p class="text-lg font-bold text-slate-900">${report.title}</p><p class="mt-2 text-sm leading-6 text-slate-500">${report.description}</p><div class="mt-4 flex items-center justify-between gap-3">${badge(report.type, "sky")}<a href="#" class="text-sm font-semibold text-teal-700">Aç</a></div></div>`).join("")}</div>`,
        })}
        <div class="space-y-6">
          ${sectionCard({ eyebrow: "Bölgesel Satış", title: "Bölgesel satış analizi", body: `<div class="page-chart-shell h-[280px]"><canvas id="reports-region-chart"></canvas></div>` })}
          ${sectionCard({ eyebrow: "Dönüşüm Hunisi", title: "Terk edilen sepet / dönüşüm oranı", body: `<div class="page-chart-shell h-[220px]"><canvas id="reports-conversion-chart"></canvas></div>` })}
        </div>
      </div>
      ${sectionCard({
        eyebrow: "Otomasyon",
        title: "Planlanmış rapor teslimleri",
        body: tableShell({
          headers: ["Rapor", "Kitle", "Periyot", "Biçim", "Durum"],
          rows: [
            ["Yönetici satış özeti", "C-level", "Her Pazartesi 09:00", "PDF", badge("Aktif", "emerald")],
            ["Pazar yeri performansı", "Operasyon", "Her gün 08:30", "Excel", badge("Aktif", "emerald")],
            ["KPI takip raporu", "Pazarlama", "Her gün 10:00", "PDF + Excel", badge("Taslak", "amber")],
          ].map((row) => `<tr><td><p class="text-sm font-semibold text-slate-900">${row[0]}</p></td><td><p class="text-sm text-slate-600">${row[1]}</p></td><td><p class="text-sm text-slate-600">${row[2]}</p></td><td><p class="text-sm text-slate-600">${row[3]}</p></td><td>${row[4]}</td></tr>`),
        }),
      })}
    `;
  }

  function renderMarketing() {
    return `
      <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        ${[
          { label: "Aktif Kampanya", value: KAUtils.number(18), delta: "+3", note: "Tüm kanallar", icon: "sparkles", spark: [4, 7, 8, 10, 13, 16], accent: "teal" },
          { label: "Kupon Kullanımı", value: KAUtils.number(1294), delta: "+18%", note: "Son 30 gün", icon: "ticket-percent", spark: [10, 12, 15, 19, 24, 27], accent: "amber" },
          { label: "ROAS", value: "6.2x", delta: "+0.9x", note: "Ağırlıklı ortalama", icon: "target", spark: [8, 10, 13, 17, 19, 22], accent: "sky" },
          { label: "Push Erişimi", value: KAUtils.compact(15800), delta: "+11%", note: "Aktif cihaz", icon: "bell-ring", spark: [11, 13, 16, 18, 21, 25], accent: "rose" },
        ].map(metricCard).join("")}
      </div>
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        ${sectionCard({ eyebrow: "Kampanya Analitiği", title: "ROAS ve kanal katkısı", body: `<div class="page-chart-shell h-[300px]"><canvas id="marketing-roas-chart"></canvas></div>` })}
        ${sectionCard({
          eyebrow: "Kupon Yönetimi",
          title: "Kupon kodu merkezi",
          action: KAComponents.actionButton({ label: "Yeni Kupon", icon: "plus", modalKey: "createCoupon", variant: "primary" }, true),
          body: tableShell({
            headers: ["Kampanya", "Kanal", "ROAS", "Harcama", "Durum"],
            rows: campaigns.map((campaign) => `<tr><td><p class="text-sm font-semibold text-slate-900">${campaign.name}</p></td><td><p class="text-sm text-slate-600">${campaign.channel}</p></td><td><p class="text-sm font-semibold text-slate-900">${campaign.roas}x</p></td><td><p class="text-sm text-slate-600">${KAUtils.money(campaign.spend)}</p></td><td>${badge(campaign.status, KAUtils.toneForStatus(campaign.status))}</td></tr>`),
          }),
        })}
      </div>
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        ${sectionCard({
          eyebrow: "Büyüme Akışları",
          title: "Flash sale / upsell / push",
          body: `<div class="grid gap-4 sm:grid-cols-2">${[
            ["Flash Sale", "Cuma 20:00 - 23:59", "Anlık stok countdown ve banner tetikleme"],
            ["Cross-sell", "Sipariş sonrası teşekkür sayfası", "Kulaklık + taşıma çantası önerisi"],
            ["Push Notification", "Segment: Sadık müşteriler", "Yeni sezon ürün drop bildirimi"],
            ["Sezonluk Kampanya", "Yaz ön sipariş akışı", "Mail + SMS + onsite popup kombinasyonu"],
          ].map(([label, time, text]) => `<div class="rounded-[28px] border border-slate-200 bg-slate-50/75 p-5"><p class="text-sm font-bold text-slate-900">${label}</p><p class="mt-2 text-sm font-semibold text-teal-700">${time}</p><p class="mt-3 text-sm leading-6 text-slate-500">${text}</p></div>`).join("")}</div>`,
        })}
        ${sectionCard({
          eyebrow: "Yorum ve Puan",
          title: "Moderasyon kuyruğu",
          body: `<div class="space-y-3">${reviewQueue.map((item) => `<div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4"><div class="flex items-center justify-between gap-3"><p class="text-sm font-bold text-slate-900">${item.customer} • ${item.product}</p>${badge(`${item.rating}/5`, item.rating >= 4 ? "emerald" : "amber")}</div><p class="mt-2 text-sm leading-6 text-slate-500">${item.note}</p></div>`).join("")}</div>`,
        })}
      </div>
    `;
  }

  function renderShipping() {
    return `
      <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        ${[
          { label: "Aktif Taşıyıcı", value: KAUtils.number(7), delta: "+1", note: "Bölgesel entegrasyonlar", icon: "truck", spark: [4, 5, 5, 6, 6, 7], accent: "teal" },
          { label: "Ücretsiz Kargo Eşiği", value: KAUtils.money(1500), delta: "+200 TRY", note: "Global kural", icon: "badge-percent", spark: [6, 8, 10, 11, 13, 14], accent: "amber" },
          { label: "SLA Uyum", value: "%96", delta: "+3 puan", note: "Zamanında teslimat", icon: "timer-reset", spark: [10, 14, 16, 18, 19, 22], accent: "sky" },
          { label: "Açık İstisna", value: KAUtils.number(12), delta: "-5", note: "Adres / rota sorunları", icon: "triangle-alert", spark: [18, 16, 14, 12, 10, 8], accent: "rose" },
        ].map(metricCard).join("")}
      </div>
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        ${sectionCard({ eyebrow: "Teslimat Performansı", title: "Kargo SLA grafiği", body: `<div class="page-chart-shell h-[300px]"><canvas id="shipping-sla-chart"></canvas></div>` })}
        ${sectionCard({
          eyebrow: "Kargo Firmaları",
          title: "Taşıyıcı entegrasyonları",
          body: `<div class="grid gap-3 sm:grid-cols-2">${[
            ["Yurtiçi Kargo", "API bağlı", "%98,9 SLA"],
            ["MNG", "API bağlı", "%96,4 SLA"],
            ["Aras", "Webhook bağlı", "%95,8 SLA"],
            ["HepsiJET", "Marketplace native", "%97,1 SLA"],
          ].map(([label, state, perf]) => `<div class="rounded-[28px] border border-slate-200 bg-slate-50/75 p-5"><p class="text-sm font-bold text-slate-900">${label}</p><p class="mt-2 text-sm text-slate-500">${state}</p><p class="mt-3 text-lg font-bold text-slate-900">${perf}</p></div>`).join("")}</div>`,
        })}
      </div>
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        ${sectionCard({
          eyebrow: "Kural Motoru",
          title: "Ağırlık ve bölge bazlı kargo kuralları",
          body: tableShell({
            headers: ["Kural", "Kapsam", "Ücret", "Durum"],
            rows: [
              ["0-2 kg / Tüm Türkiye", "Standart", KAUtils.money(79), badge("Aktif", "emerald")],
              ["2-5 kg / Marmara", "Bölgesel", KAUtils.money(95), badge("Aktif", "emerald")],
              ["Ücretsiz kargo", `${KAUtils.money(1500)} üzeri`, KAUtils.money(0), badge("Aktif", "emerald")],
              ["Aynı gün teslim", "İstanbul seçili ilçeler", KAUtils.money(149), badge("Pilot", "amber")],
            ].map((row) => `<tr><td><p class="text-sm font-semibold text-slate-900">${row[0]}</p></td><td><p class="text-sm text-slate-600">${row[1]}</p></td><td><p class="text-sm font-semibold text-slate-900">${row[2]}</p></td><td>${row[3]}</td></tr>`),
          }),
        })}
        <div class="space-y-6">
          ${sectionCard({
            eyebrow: "Teslimat Slotları",
            title: "Zaman dilimi ayarları",
            body: progressRows([
              { label: "09:00 - 12:00", value: 62, text: "Yoğunluk %62", color: "bg-slate-900" },
              { label: "12:00 - 16:00", value: 78, text: "Yoğunluk %78", color: "bg-sky-500" },
              { label: "16:00 - 20:00", value: 84, text: "Yoğunluk %84", color: "bg-amber-500" },
            ]),
          })}
          ${sectionCard({
            eyebrow: "Operasyon İstisnaları",
            title: "Aktif olaylar",
            body: KAComponents.alertBox({ tone: "amber", title: "İzmir dağıtım yoğunluğu", text: "Ege hattında teslimat süresi ortalama 0,4 gün uzadı.", icon: "map-pinned" }),
          })}
        </div>
      </div>
    `;
  }

  function renderCms() {
    return `
      <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        ${[
          { label: "Yayınlanan Sayfa", value: KAUtils.number(42), delta: "+3", note: "Kurumsal + landing", icon: "files", spark: [8, 9, 10, 12, 13, 15], accent: "teal" },
          { label: "Banner Seti", value: KAUtils.number(18), delta: "+2", note: "Masaüstü + mobil", icon: "image-up", spark: [5, 6, 7, 9, 10, 12], accent: "amber" },
          { label: "Blog İçeriği", value: KAUtils.number(26), delta: "+4", note: "Planlı yayın", icon: "newspaper", spark: [4, 5, 7, 8, 10, 13], accent: "sky" },
          { label: "Popup Akışı", value: KAUtils.number(7), delta: "+1", note: "Segment bazlı tetik", icon: "panel-top-open", spark: [2, 3, 4, 5, 6, 7], accent: "rose" },
        ].map(metricCard).join("")}
      </div>
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
        ${sectionCard({ eyebrow: "İçerik Performansı", title: "CMS performans grafiği", body: `<div class="page-chart-shell h-[300px]"><canvas id="cms-performance-chart"></canvas></div>` })}
        ${sectionCard({
          eyebrow: "Banner & Slider",
          title: "Hero alanları",
          body: `<div class="grid gap-3">${["Anasayfa Hero", "Mobil Slider 01", "Flash Sale Banner", "Blog Spotlight"].map((item, index) => `<div class="rounded-[28px] border border-slate-200 ${index === 0 ? "bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 text-white" : "bg-slate-50/75"} p-5"><p class="text-sm font-bold">${item}</p><p class="mt-2 text-sm ${index === 0 ? "text-white/70" : "text-slate-500"}">CTR, görünürlük ve varyant yayını tek panelde takip edilir.</p></div>`).join("")}</div>`,
        })}
      </div>
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        ${sectionCard({
          eyebrow: "Sayfa Yönetimi",
          title: "CMS sayfaları",
          body: tableShell({
            headers: ["Sayfa", "Tip", "Güncelleme", "Durum"],
            rows: cmsPages.map((page) => `<tr><td><p class="text-sm font-semibold text-slate-900">${page.name}</p></td><td><p class="text-sm text-slate-600">${page.type}</p></td><td><p class="text-sm text-slate-600">${page.updated}</p></td><td>${badge(page.status, KAUtils.toneForStatus(page.status))}</td></tr>`),
          }),
        })}
        <div class="space-y-6">
          ${sectionCard({
            eyebrow: "Blog / Haber",
            title: "Yayın takvimi",
            body: `<div class="space-y-3">${[["Yeni sezon trend raporu", "14 Mart / 10:00"], ["Kulaklık seçim rehberi", "18 Mart / 13:00"], ["Kargo teslimat ipuçları", "20 Mart / 11:00"]].map(([title, time]) => `<div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4"><p class="text-sm font-bold text-slate-900">${title}</p><p class="mt-2 text-sm text-slate-500">${time}</p></div>`).join("")}</div>`,
          })}
          ${sectionCard({
            eyebrow: "Popup Yönetimi",
            title: "Segment bazlı popup akışları",
            body: progressRows([
              { label: "Yeni ziyaretçi", value: 88, text: "%88 görünürlük", color: "bg-slate-900" },
              { label: "Terk edilen sepet", value: 74, text: "%74 gösterim", color: "bg-sky-500" },
              { label: "VIP kampanya", value: 52, text: "%52 erişim", color: "bg-amber-500" },
            ]),
          })}
        </div>
      </div>
    `;
  }

  window.KAPageFns = Object.assign(window.KAPageFns || {}, {
    renderReports,
    renderMarketing,
    renderShipping,
    renderCms,
  });
})();
