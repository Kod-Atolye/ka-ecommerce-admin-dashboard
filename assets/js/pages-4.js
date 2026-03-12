(() => {
  const { adminUsers, integrations } = KADashboardData;
  const { metricCard, sectionCard, progressRows, timeline, tableShell, badge } = KAComponents;

  function renderSettings() {
    return `
      ${sectionCard({
        eyebrow: "Platform Ayarları",
        title: "Genel sistem ayarları",
        subtitle: "Site bilgileri, para birimi, dil, bildirimler ve API yapılandırmalarını tab bazlı yönetin.",
        body: `
          <div class="rounded-[30px] border border-slate-200 bg-slate-50/80 p-3">
            <div data-tab-group class="flex flex-wrap gap-2">
              ${[["general", "Genel"], ["notifications", "Bildirimler"], ["api", "API & Webhook"], ["compliance", "GDPR / KVKK"]].map(([key, label], index) => `<button type="button" data-tab-target="${key}" class="tab-button ${index === 0 ? "is-active" : ""} rounded-2xl px-4 py-2.5 text-sm font-semibold text-slate-600 transition">${label}</button>`).join("")}
            </div>
            <div class="mt-4">
              <div data-tab-panel="general"><div class="grid gap-4 lg:grid-cols-2">${[["Site Adı", "KA Commerce"], ["Para Birimi", "TRY / Türk Lirası"], ["Varsayılan Dil", "Türkçe"], ["Favicon", "favicon-ka.svg"]].map(([label, value]) => `<label class="surface-ring rounded-3xl border border-slate-200 bg-white px-4 py-3"><span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${label}</span><input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="${value}" /></label>`).join("")}</div></div>
              <div data-tab-panel="notifications" class="hidden"><div class="grid gap-4 lg:grid-cols-2">${[["Sipariş e-postaları", "Aktif"], ["Stok uyarıları", "Aktif"], ["Yönetici push bildirimleri", "Aktif"], ["Pazarlama tetikleyicileri", "Kontrollü"]].map(([label, value]) => `<div class="rounded-3xl border border-slate-200 bg-white p-4"><p class="text-sm font-bold text-slate-900">${label}</p><p class="mt-2 text-sm text-slate-500">${value}</p></div>`).join("")}</div></div>
              <div data-tab-panel="api" class="hidden"><div class="grid gap-4">${[["Webhook Endpoint", "https://api.ka-commerce.com/webhooks/order"], ["API Key Alias", "ka-prod-server-key"], ["Retry Politikası", "3 deneme / exponential backoff"]].map(([label, value]) => `<label class="surface-ring rounded-3xl border border-slate-200 bg-white px-4 py-3"><span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${label}</span><input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="${value}" /></label>`).join("")}</div></div>
              <div data-tab-panel="compliance" class="hidden"><div class="grid gap-4 lg:grid-cols-2">${[["Çerez onayı", "Aktif"], ["Açık rıza kayıtları", "Arşivleniyor"], ["Veri silme talebi SLA", "72 saat"], ["KVKK log export", "Haftalık"]].map(([label, value]) => `<div class="rounded-3xl border border-slate-200 bg-white p-4"><p class="text-sm font-bold text-slate-900">${label}</p><p class="mt-2 text-sm text-slate-500">${value}</p></div>`).join("")}</div></div>
            </div>
          </div>`,
      })}
    `;
  }

  function renderUsers() {
    return `
      <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        ${[
          { label: "Admin Kullanıcı", value: KAUtils.number(12), delta: "+1", note: "Aktif ekip hesabı", icon: "users-round", spark: [3, 4, 5, 6, 7, 8], accent: "teal" },
          { label: "2FA Açık", value: "%83", delta: "+12 puan", note: "Güvenlik kapsamı", icon: "shield-check", spark: [8, 11, 14, 16, 19, 22], accent: "sky" },
          { label: "Rol Şablonu", value: KAUtils.number(5), delta: "+1", note: "RBAC hazır set", icon: "folders", spark: [2, 3, 3, 4, 5, 5], accent: "amber" },
          { label: "Aktivite Kaydı", value: KAUtils.compact(12400), delta: "+8%", note: "Son 30 gün log", icon: "history", spark: [10, 13, 15, 18, 22, 25], accent: "rose" },
        ].map(metricCard).join("")}
      </div>
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        ${sectionCard({
          eyebrow: "Admin Kullanıcılar",
          title: "Kullanıcı listesi",
          action: KAComponents.actionButton({ label: "Yeni Kullanıcı", icon: "user-plus", modalKey: "inviteUser", variant: "primary" }, true),
          body: tableShell({
            headers: ["Kullanıcı", "Rol", "Son Giriş", "2FA", "Kapsam"],
            rows: adminUsers.map((user) => `<tr><td><div class="flex items-center gap-3">${KAComponents.avatar(user.initials, "from-cyan-100 to-teal-100", "h-12 w-12")}<p class="text-sm font-semibold text-slate-900">${user.name}</p></div></td><td><p class="text-sm text-slate-600">${user.role}</p></td><td><p class="text-sm text-slate-600">${user.lastLogin}</p></td><td>${badge(user.twoFactor, user.twoFactor === "Açık" ? "emerald" : "amber")}</td><td><p class="text-sm text-slate-600">${user.scope}</p></td></tr>`),
          }),
        })}
        ${sectionCard({
          eyebrow: "RBAC Sistemi",
          title: "Rol kartları",
          body: `<div class="grid gap-3">${[
            ["Süper Admin", "Tüm modüller, tüm ayarlar"],
            ["Operasyon", "Sipariş, stok, kargo, müşteri notları"],
            ["Pazarlama", "Kampanya, CMS, segment yönetimi"],
            ["Finans", "Gelir, gider, vergi, rapor export"],
          ].map(([label, text]) => `<div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4"><p class="text-sm font-bold text-slate-900">${label}</p><p class="mt-2 text-sm text-slate-500">${text}</p></div>`).join("")}</div>`,
        })}
      </div>
      ${sectionCard({
        eyebrow: "İzin Matrisi",
        title: "Yetki matrisi ve giriş geçmişi",
        body: `
          <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div>${tableShell({
              headers: ["Modül", "Görüntüle", "Düzenle", "Yayınla"],
              rows: [
                ["Siparişler", "Evet", "Evet", "Hayır"],
                ["Ürünler", "Evet", "Evet", "Evet"],
                ["Finans", "Evet", "Hayır", "Hayır"],
                ["Ayarlar", "Sınırlı", "Hayır", "Hayır"],
              ].map((row) => `<tr><td><p class="text-sm font-semibold text-slate-900">${row[0]}</p></td><td><p class="text-sm text-slate-600">${row[1]}</p></td><td><p class="text-sm text-slate-600">${row[2]}</p></td><td><p class="text-sm text-slate-600">${row[3]}</p></td></tr>`),
            })}</div>
            <div>${timeline([
              { title: "Selin Akın giriş yaptı", body: "İstanbul / Chrome / 09:13", time: "Bugün", icon: "log-in" },
              { title: "Melis Şahin 2FA devre dışı bıraktı", body: "Güvenlik ek onayı bekleniyor", time: "Dün", icon: "shield-off" },
              { title: "Kaan Erel rapor export aldı", body: "Finans özet paketi PDF olarak oluşturuldu", time: "Dün", icon: "file-output" },
            ])}</div>
          </div>`,
      })}
    `;
  }

  function renderIntegrations() {
    return `
      <div class="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        ${[
          { label: "Bağlı Entegrasyon", value: KAUtils.number(14), delta: "+2", note: "Muhasebe + analitik + pazar yeri", icon: "plug-zap", spark: [4, 6, 7, 9, 11, 14], accent: "teal" },
          { label: "Webhook Sağlığı", value: "%99,3", delta: "+0,4 puan", note: "Son 7 gün", icon: "activity", spark: [12, 15, 18, 20, 23, 25], accent: "sky" },
          { label: "API Gecikmesi", value: "142 ms", delta: "-18 ms", note: "Medyan yanıt süresi", icon: "timer", spark: [24, 22, 20, 18, 16, 13], accent: "amber" },
          { label: "Senkron Hatası", value: KAUtils.number(3), delta: "-5", note: "İşlem kuyruğunda", icon: "triangle-alert", spark: [10, 8, 7, 6, 5, 3], accent: "rose" },
        ].map(metricCard).join("")}
      </div>
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        ${sectionCard({ eyebrow: "Entegrasyon Sağlığı", title: "Servis bağlantı grafiği", body: `<div class="page-chart-shell h-[300px]"><canvas id="integration-health-chart"></canvas></div>` })}
        ${sectionCard({
          eyebrow: "Pazar Yerleri",
          title: "Senkron durumları",
          action: KAComponents.actionButton({ label: "Yeniden Senkron", icon: "refresh-cw", modalKey: "syncIntegration", variant: "primary" }, true),
          body: tableShell({
            headers: ["Servis", "Tip", "Durum", "Sağlık", "Son Senkron"],
            rows: integrations.map((integration) => `<tr><td><p class="text-sm font-semibold text-slate-900">${integration.name}</p></td><td><p class="text-sm text-slate-600">${integration.type}</p></td><td>${badge(integration.status, integration.tone)}</td><td><p class="text-sm font-semibold text-slate-900">${integration.health}</p></td><td><p class="text-sm text-slate-600">${integration.lastSync}</p></td></tr>`),
          }),
        })}
      </div>
      <div class="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        ${sectionCard({
          eyebrow: "Muhasebe & Analitik",
          title: "Bağlı servisler",
          body: `<div class="grid gap-4 sm:grid-cols-2">${[
            ["Logo", "Muhasebe entegrasyonu", "Aktif"],
            ["Mikro", "Yedek muhasebe akışı", "Hazır"],
            ["Google Analytics", "Server-side event", "Aktif"],
            ["Merchant Center", "Feed senkronu", "Aktif"],
            ["Meta Pixel", "Dönüşüm API", "Aktif"],
            ["TikTok Pixel", "Event eşleme", "Hazır"],
          ].map(([title, text, status]) => `<div class="rounded-[28px] border border-slate-200 bg-slate-50/75 p-5"><p class="text-sm font-bold text-slate-900">${title}</p><p class="mt-2 text-sm text-slate-500">${text}</p><div class="mt-4">${badge(status, status === "Aktif" ? "emerald" : "amber")}</div></div>`).join("")}</div>`,
        })}
        ${sectionCard({
          eyebrow: "API & Token",
          title: "Webhook ve token yönetimi",
          body: `<div class="space-y-3">${[
            ["order.created", "Aktif", "https://api.ka-commerce.com/webhooks/order"],
            ["inventory.updated", "Aktif", "https://api.ka-commerce.com/webhooks/stock"],
            ["customer.updated", "Pilot", "https://api.ka-commerce.com/webhooks/customer"],
          ].map(([event, status, url]) => `<div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4"><div class="flex items-center justify-between gap-3"><p class="text-sm font-bold text-slate-900">${event}</p>${badge(status, status === "Aktif" ? "emerald" : "amber")}</div><p class="mt-2 break-all text-sm text-slate-500">${url}</p></div>`).join("")}</div>`,
        })}
      </div>
    `;
  }

  window.KAPageFns = Object.assign(window.KAPageFns || {}, {
    renderSettings,
    renderUsers,
    renderIntegrations,
  });
})();
