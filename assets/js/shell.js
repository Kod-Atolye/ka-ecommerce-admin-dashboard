window.KAShell = {
  renderSidebar(pageKey) {
    return `
      <div class="flex h-full flex-col gap-6 border-r border-white/50 bg-white/72 px-4 py-5">
        <div class="flex items-center gap-3 px-2">
          <div class="flex h-12 w-12 items-center justify-center rounded-3xl bg-slate-900 text-lg font-extrabold tracking-tight text-white shadow-soft">KA</div>
          <div class="brand-copy min-w-0">
            <p class="text-[11px] font-semibold uppercase tracking-[0.34em] text-teal-600">Commerce OS</p>
            <h2 class="mt-1 font-display text-lg font-bold text-slate-950">KA-E-Ticaret</h2>
          </div>
        </div>

        <div class="brand-copy rounded-[30px] border border-white/80 bg-gradient-to-br from-slate-900 via-slate-800 to-teal-900 p-5 text-white shadow-panel">
          <p class="text-xs font-semibold uppercase tracking-[0.26em] text-white/65">Canlı Durum</p>
          <h3 class="mt-3 font-display text-2xl font-bold">Operasyon sağlıklı</h3>
          <p class="mt-2 text-sm leading-6 text-white/70">Sipariş akışı, kanal senkronları ve ödeme doğrulamaları son 24 saatte stabil çalışıyor.</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold"><span class="status-dot bg-emerald-400"></span>Webhook %99,8</span>
            <span class="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold"><span class="status-dot bg-cyan-300"></span>6 kanal aktif</span>
          </div>
        </div>

        <nav class="scroll-soft flex-1 overflow-y-auto pr-1">
          ${KADashboardData.navSections
            .map(
              (section) => `
                <div class="mb-6">
                  <p class="sidebar-section-title px-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">${section.title}</p>
                  <div class="mt-3 space-y-2">
                    ${section.items
                      .map((item) => {
                        const active = item.key === pageKey;
                        return `
                          <a href="${item.href}" class="sidebar-link flex items-center gap-3 rounded-[24px] px-3 py-3 transition ${active ? "relative bg-slate-900 text-white shadow-soft" : "text-slate-600 hover:bg-white hover:text-slate-900"}">
                            ${active ? `<span class="absolute left-0 h-6 w-1 rounded-full bg-teal-400 opacity-90"></span>` : ""}
                            <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${active ? "bg-white/10 text-white" : "bg-slate-100 text-slate-700"}">
                              <i data-lucide="${item.icon}" class="h-5 w-5"></i>
                            </span>
                            <span class="sidebar-label flex-1 text-sm font-semibold">${item.label}</span>
                            ${active ? `<span class="sidebar-label rounded-full bg-white/10 px-2 py-1 text-[11px] font-semibold text-white/80">Açık</span>` : ""}
                          </a>
                        `;
                      })
                      .join("")}
                  </div>
                </div>`,
            )
            .join("")}
        </nav>

        <div class="sidebar-footer brand-copy rounded-[28px] border border-slate-200 bg-slate-50/80 p-4">
          <div class="flex items-center justify-between gap-3">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Kanal Senkronu</p>
              <span id="sidebar-sync-time" class="mt-2 block text-sm font-bold text-slate-900"></span>
            </div>
            <span class="glow-badge inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-soft">
              <i data-lucide="refresh-cw" class="h-4 w-4"></i>
            </span>
          </div>
        </div>
      </div>
    `;
  },

  renderNotifications() {
    const unreadCount = KADashboardData.notificationFeed.filter((item) => !item.read).length;
    return `
      <div class="dropdown-panel hidden absolute right-0 top-[calc(100%+1rem)] rounded-[28px] border border-white/80 bg-white/92 p-4 shadow-panel backdrop-blur-2xl" data-dropdown-menu="notifications">
        <div class="flex items-center justify-between gap-3">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Bildirim Merkezi</p>
            <h4 class="mt-1 text-lg font-bold text-slate-900">Yeni gelişmeler</h4>
          </div>
          <div data-notification-badge>${KAComponents.badge(unreadCount ? `${unreadCount} yeni` : "Tümü okundu", unreadCount ? "rose" : "slate")}</div>
        </div>
        <div class="mt-4 space-y-3">
          ${KADashboardData.notificationFeed
            .map(
              (item, index) => `
                <div data-notification-id="${index}" class="cursor-pointer rounded-3xl border p-4 transition ${item.read ? "border-slate-200 bg-slate-50/75" : "border-teal-200 bg-teal-50/60"}">
                  <div class="flex items-start gap-3">
                    <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white text-slate-700">
                      <i data-lucide="${item.icon}" class="h-5 w-5"></i>
                    </span>
                    <div>
                      <div class="flex items-center gap-2">
                        <p class="text-sm font-bold text-slate-900">${item.title}</p>
                        ${KAComponents.badge(item.time, item.tone)}
                      </div>
                      <p class="mt-1 text-sm leading-6 text-slate-500">${item.body}</p>
                    </div>
                  </div>
                </div>`,
            )
            .join("")}
        </div>
      </div>
    `;
  },

  renderProfileMenu() {
    return `
      <div class="dropdown-panel hidden absolute right-0 top-[calc(100%+1rem)] rounded-[28px] border border-white/80 bg-white/92 p-4 shadow-panel backdrop-blur-2xl" data-dropdown-menu="profile">
        <div class="flex items-center gap-3 rounded-3xl border border-slate-200 bg-slate-50/75 p-4">
          ${KAComponents.avatar("KA", "from-slate-900 to-teal-800", "h-14 w-14")}
          <div>
            <p class="text-sm font-bold text-slate-900">Kaan Aydın</p>
            <p class="mt-1 text-sm text-slate-500">Kurucu & Sistem Sahibi</p>
          </div>
        </div>
        <div class="mt-4 space-y-2">
          ${[
            ["Profil Ayarları", "user-round"],
            ["Bildirim Tercihleri", "bell-ring"],
            ["Yetki ve Güvenlik", "shield-check"],
            ["Çıkış Simülasyonu", "log-out"],
          ]
            .map(
              ([label, icon]) => `
                <a href="settings.html" class="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 hover:text-slate-900">
                  <span class="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <i data-lucide="${icon}" class="h-4 w-4"></i>
                  </span>
                  ${label}
                </a>`,
            )
            .join("")}
        </div>
      </div>
    `;
  },

  renderTopbar(page) {
    const unreadCount = KADashboardData.notificationFeed.filter((item) => !item.read).length;
    return `
      <header class="sticky top-0 z-20 px-4 pb-2 pt-4 sm:px-6 lg:px-8">
        <div class="glass-card rounded-[30px] px-4 py-4">
          <div class="flex flex-wrap items-center gap-4">
            <button type="button" data-mobile-sidebar-toggle class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden">
              <i data-lucide="menu" class="h-5 w-5"></i>
            </button>
            <button type="button" data-sidebar-toggle class="hidden h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:inline-flex">
              <i data-lucide="panel-left-close" class="h-5 w-5"></i>
            </button>
            <div class="hidden items-center gap-2 text-sm lg:flex">
              <span class="text-slate-400">${page.eyebrow}</span>
              <i data-lucide="chevron-right" class="h-3 w-3 text-slate-300"></i>
              <span class="font-semibold text-slate-700">${page.title}</span>
            </div>
            <div class="search-surface relative min-w-[260px] flex-1 rounded-[24px] border border-slate-200 bg-slate-50/80">
              <div class="flex items-center gap-3 px-4 py-3">
                <i data-lucide="search" class="h-5 w-5 text-slate-400"></i>
                <input id="global-search-input" type="text" placeholder="Ürün, sipariş, müşteri veya ekran ara..." class="w-full border-0 bg-transparent p-0 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-0" />
                <span class="hidden rounded-xl border border-slate-200 bg-white px-2 py-1 text-[11px] font-bold tracking-[0.22em] text-slate-400 md:inline-flex">CTRL K</span>
              </div>
              <div id="search-suggestions" class="dropdown-panel hidden absolute inset-x-0 top-[calc(100%+0.75rem)] rounded-[28px] border border-white/80 bg-white/95 p-3 shadow-panel backdrop-blur-2xl"></div>
            </div>
            <div class="hidden items-center gap-3 rounded-[24px] border border-slate-200 bg-white/80 px-4 py-3 xl:flex">
              <span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <i data-lucide="calendar-range" class="h-5 w-5"></i>
              </span>
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Çalışma Tarihi</p>
                <p class="mt-1 text-sm font-bold text-slate-900">${KAUtils.fullDateFormatter.format(new Date())}</p>
                <p id="live-clock" class="mt-0.5 text-xs font-semibold tabular-nums text-teal-600"></p>
              </div>
            </div>
            <button type="button" data-theme-toggle class="ml-auto inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-slate-700 shadow-soft">
              <i data-theme-icon data-lucide="sun-medium" class="h-4 w-4"></i>
              <span data-theme-label class="hidden text-sm font-semibold lg:inline">Aydınlık</span>
            </button>
            <div class="relative">
              <button type="button" data-dropdown-trigger="notifications" class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-soft">
                <i data-lucide="bell" class="h-5 w-5"></i>
              </button>
              <span data-notification-count class="absolute -right-1 -top-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[10px] font-bold text-white">${unreadCount}</span>
              ${this.renderNotifications()}
            </div>
            <div class="relative">
              <button type="button" data-dropdown-trigger="profile" class="inline-flex items-center gap-3 rounded-[24px] border border-slate-200 bg-white px-3 py-2 text-left shadow-soft">
                ${KAComponents.avatar("KA", "from-slate-900 to-teal-800", "h-11 w-11")}
                <div class="hidden sm:block">
                  <p class="text-sm font-bold text-slate-900">Kaan Aydın</p>
                  <p class="mt-1 text-xs font-medium text-slate-500">${page.title}</p>
                </div>
                <i data-lucide="chevrons-up-down" class="hidden h-4 w-4 text-slate-400 sm:block"></i>
              </button>
              ${this.renderProfileMenu()}
            </div>
          </div>
        </div>
      </header>
    `;
  },

  renderHero(page) {
    return `
      <section class="hero-card px-6 py-6 sm:px-7 sm:py-7">
        <div class="relative z-10 flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
          <div class="max-w-4xl">
            <div class="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/70 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.28em] text-teal-700 shadow-soft">
              <span class="status-dot bg-emerald-500"></span>${page.eyebrow}
            </div>
            <h1 class="mt-5 font-display text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">${page.title}</h1>
            <p class="mt-4 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">${page.description}</p>
            <div class="mt-5 flex flex-wrap items-center gap-3">
              ${page.actions.map((action) => KAComponents.actionButton(action)).join("")}
            </div>
          </div>
          <div class="grid w-full max-w-xl gap-3 sm:grid-cols-2">
            ${page.highlights.map((item) => KAComponents.highlightCard(item)).join("")}
          </div>
        </div>
      </section>
    `;
  },

  renderModalShell() {
    return `
      <div id="global-modal" class="modal-shell fixed inset-0 z-50 items-end justify-center bg-slate-950/50 px-4 py-6 sm:items-center">
        <div class="absolute inset-0" data-modal-close></div>
        <div class="relative z-10 w-full max-w-2xl rounded-[34px] border border-white/80 bg-white/96 shadow-panel backdrop-blur-2xl">
          <div class="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
            <div>
              <p id="modal-eyebrow" class="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400"></p>
              <h3 id="modal-title" class="mt-2 font-display text-3xl font-bold tracking-tight text-slate-950"></h3>
              <p id="modal-description" class="mt-2 text-sm leading-6 text-slate-500"></p>
            </div>
            <button type="button" data-modal-close class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700">
              <i data-lucide="x" class="h-5 w-5"></i>
            </button>
          </div>
          <div id="modal-body" class="max-h-[70vh] overflow-y-auto px-6 py-6 scroll-soft"></div>
          <div id="modal-footer" class="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 px-6 py-5"></div>
        </div>
      </div>
    `;
  },
};
