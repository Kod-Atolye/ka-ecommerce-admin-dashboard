window.KAInteractions = {
  themeStorageKey: "kae-theme",
  searchKeydownHandler: null,
  clockIntervalId: null,
  syncIntervalId: null,

  searchEntries() {
    const pageEntries = Object.values(window.KAPageRegistry || {}).map((page) => ({
      label: page.title,
      description: page.description,
      href: page.href,
      type: "Sayfa",
    }));
    return [...pageEntries, ...KADashboardData.quickActions];
  },

  currentTheme() {
    return document.body.classList.contains("theme-light") ? "light" : "dark";
  },

  applyTheme(theme, persist = true) {
    const nextTheme = theme === "light" ? "light" : "dark";
    document.body.classList.toggle("theme-light", nextTheme === "light");
    document.body.classList.toggle("theme-dark", nextTheme === "dark");
    document.body.dataset.theme = nextTheme;
    if (persist) {
      safeStorageSet(this.themeStorageKey, nextTheme);
    }
    this.updateThemeToggle();
  },

  initializeThemePreference() {
    const storedTheme = safeStorageGet(this.themeStorageKey, "dark");
    this.applyTheme(storedTheme, false);
    if (!safeStorageGet(this.themeStorageKey)) {
      safeStorageSet(this.themeStorageKey, storedTheme);
    }
  },

  updateThemeToggle() {
    const isDark = this.currentTheme() === "dark";
    document.querySelectorAll("[data-theme-toggle]").forEach((button) => {
      const icon = button.querySelector("[data-theme-icon]");
      const label = button.querySelector("[data-theme-label]");
      const nextLabel = isDark ? "Aydınlık" : "Koyu";
      const nextIcon = isDark ? "sun-medium" : "moon-star";
      const buttonTitle = isDark ? "Aydınlık temaya geç" : "Koyu temaya geç";

      button.setAttribute("aria-label", buttonTitle);
      button.setAttribute("title", buttonTitle);

      if (icon) {
        icon.setAttribute("data-lucide", nextIcon);
      }
      if (label) {
        label.textContent = nextLabel;
      }
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  setCollapsedState(nextState) {
    document.body.classList.toggle("sidebar-collapsed", nextState);
    safeStorageSet("kae-sidebar-collapsed", nextState ? "1" : "0");
  },

  unreadNotificationCount() {
    return KADashboardData.notificationFeed.filter((item) => !item.read).length;
  },

  updateNotificationIndicators() {
    const unreadCount = this.unreadNotificationCount();
    document.querySelectorAll("[data-notification-count]").forEach((badge) => {
      badge.textContent = unreadCount;
      badge.classList.toggle("hidden", unreadCount === 0);
    });
    document.querySelectorAll("[data-notification-badge]").forEach((shell) => {
      shell.innerHTML = KAComponents.badge(unreadCount ? `${unreadCount} yeni` : "Tümü okundu", unreadCount ? "rose" : "slate");
    });
  },

  markNotificationAsRead(index) {
    const item = KADashboardData.notificationFeed[index];
    if (!item || item.read) {
      return;
    }

    item.read = true;

    const card = document.querySelector(`[data-notification-id="${index}"]`);
    if (card) {
      card.classList.remove("border-teal-200", "bg-teal-50/60");
      card.classList.add("border-slate-200", "bg-slate-50/75");
    }

    this.updateNotificationIndicators();
  },

  closeDropdowns() {
    document.querySelectorAll("[data-dropdown-menu]").forEach((menu) => menu.classList.add("hidden"));
  },

  toggleDropdown(target) {
    document.querySelectorAll("[data-dropdown-menu]").forEach((menu) => {
      const shouldOpen = menu.dataset.dropdownMenu === target && menu.classList.contains("hidden");
      menu.classList.toggle("hidden", !shouldOpen);
    });
  },

  openModal(key) {
    const config = KADashboardData.modalPresets[key];
    const shell = document.getElementById("global-modal");
    if (!config || !shell) {
      return;
    }
    document.getElementById("modal-eyebrow").textContent = config.eyebrow;
    document.getElementById("modal-title").textContent = config.title;
    document.getElementById("modal-description").textContent = config.description;
    document.getElementById("modal-body").innerHTML = config.body;
    document.getElementById("modal-footer").innerHTML = config.actions
      .map((action) => KAComponents.actionButton({ label: action.label, variant: action.variant, href: "#" }, true).replace("<a ", '<a data-modal-close '))
      .join("");
    shell.classList.add("is-open");
    document.body.classList.add("overflow-hidden");
    if (window.lucide) {
      window.lucide.createIcons();
    }
  },

  closeModal() {
    document.getElementById("global-modal")?.classList.remove("is-open");
    document.body.classList.remove("overflow-hidden");
  },

  renderUploadFiles(files) {
    const shell = document.querySelector("[data-upload-list]");
    if (!shell) {
      return;
    }
    shell.innerHTML = Array.from(files)
      .map(
        (file, index) => `
          <div class="rounded-3xl border border-slate-200 bg-slate-50/75 p-4">
            <div class="flex items-center justify-between gap-3">
              <div>
                <p class="text-sm font-bold text-slate-900">${file.name}</p>
                <p class="mt-1 text-sm text-slate-500">${Math.max(1, Math.round(file.size / 1024))} KB • görsel ${index + 1}</p>
              </div>
              ${KAComponents.badge("Hazır", "emerald")}
            </div>
          </div>`,
      )
      .join("");
  },

  initializeSearch() {
    const input = document.getElementById("global-search-input");
    const resultShell = document.getElementById("search-suggestions");
    if (!input || !resultShell) {
      return;
    }
    const entries = this.searchEntries();
    const drawResults = (query = "") => {
      const normalized = query.trim().toLowerCase();
      const results = entries
        .filter((item) => `${item.label} ${item.description} ${item.type}`.toLowerCase().includes(normalized))
        .slice(0, 6);
      resultShell.innerHTML = results.length
        ? results
            .map((item) => {
              const attrs = item.modalKey ? `href="#" data-modal-key="${item.modalKey}"` : `href="${item.href}"`;
              return `
                <a ${attrs} data-search-link class="flex items-start gap-3 rounded-3xl px-3 py-3 transition hover:bg-slate-50">
                  <span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                    <i data-lucide="${item.type === "Sayfa" ? "layout-panel-top" : "sparkles"}" class="h-4 w-4"></i>
                  </span>
                  <span class="min-w-0 flex-1">
                    <span class="block text-sm font-bold text-slate-900">${item.label}</span>
                    <span class="mt-1 block text-sm leading-6 text-slate-500">${item.description}</span>
                  </span>
                  <span class="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">${item.type}</span>
                </a>
              `;
            })
            .join("")
        : `<div class="rounded-3xl border border-slate-200 bg-slate-50/80 px-4 py-5 text-sm text-slate-500">Arama sonucu bulunamadı. Ürün adı, sipariş kodu veya modül adı deneyin.</div>`;
      resultShell.classList.remove("hidden");
      if (window.lucide) {
        window.lucide.createIcons();
      }
    };
    input.addEventListener("focus", () => drawResults(input.value));
    input.addEventListener("input", () => drawResults(input.value));
    input.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const firstResult = resultShell.querySelector("[data-search-link]");
        if (firstResult) {
          event.preventDefault();
          firstResult.click();
        }
      }
      if (event.key === "Escape") {
        input.blur();
        resultShell.classList.add("hidden");
      }
    });
    if (this.searchKeydownHandler) {
      document.removeEventListener("keydown", this.searchKeydownHandler);
    }
    this.searchKeydownHandler = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        document.getElementById("global-search-input")?.focus();
        drawResults(input.value);
      }
      if (event.key === "Escape") {
        document.getElementById("global-search-input")?.blur();
        document.getElementById("search-suggestions")?.classList.add("hidden");
      }
    };
    document.addEventListener("keydown", this.searchKeydownHandler);
    resultShell.addEventListener("click", (event) => {
      const target = event.target.closest("[data-modal-key]");
      if (target) {
        event.preventDefault();
        this.openModal(target.dataset.modalKey);
        resultShell.classList.add("hidden");
      }
    });
    document.addEventListener("click", (event) => {
      if (!resultShell.contains(event.target) && event.target !== input) {
        resultShell.classList.add("hidden");
      }
    });
  },

  initializeTabs() {
    document.querySelectorAll("[data-tab-group]").forEach((group) => {
      const buttons = group.querySelectorAll("[data-tab-target]");
      const scope = group.parentElement;
      buttons.forEach((button) => {
        button.addEventListener("click", () => {
          buttons.forEach((node) => node.classList.remove("is-active"));
          button.classList.add("is-active");
          const target = button.dataset.tabTarget;
          scope.querySelectorAll("[data-tab-panel]").forEach((panel) => {
            panel.classList.toggle("hidden", panel.dataset.tabPanel !== target);
          });
        });
      });
    });
  },

  initializeSlugGenerators() {
    document.querySelectorAll("[data-slug-source]").forEach((source) => {
      const targetKey = source.dataset.slugSource;
      const target = document.querySelector(`[data-slug-target="${targetKey}"]`);
      if (!target) {
        return;
      }

      const syncSlug = () => {
        const normalized = source.value
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^a-z0-9\s-]/g, "")
          .trim()
          .replace(/\s+/g, "-")
          .replace(/-+/g, "-");
        target.value = normalized ? `/${normalized}` : "/";
      };

      source.addEventListener("input", syncSlug);
      if (!target.value || target.value === "/") {
        syncSlug();
      }
    });
  },

  closeRowMenus(activeMenu = null) {
    document.querySelectorAll("[data-row-menu]").forEach((menu) => {
      if (menu !== activeMenu) {
        menu.classList.add("hidden");
      }
    });
  },

  initializeDataTables() {
    document.querySelectorAll("[data-table-widget]").forEach((widget) => {
      const body = widget.querySelector("[data-table-body]");
      if (!body) {
        return;
      }

      const rows = () => Array.from(body.querySelectorAll("[data-row]"));

      const searchInput = widget.querySelector("[data-table-search]");
      if (searchInput) {
        searchInput.addEventListener("input", () => {
          const query = searchInput.value.trim().toLowerCase();
          rows().forEach((row) => {
            const haystack = (row.dataset.search || row.textContent || "").toLowerCase();
            row.classList.toggle("hidden", query && !haystack.includes(query));
          });
        });
      }

      widget.querySelectorAll("[data-sort-key]").forEach((button) => {
        button.addEventListener("click", () => {
          const sortKey = button.dataset.sortKey;
          const datasetKey = `sort${sortKey.charAt(0).toUpperCase()}${sortKey.slice(1)}`;
          const direction = button.dataset.sortDirection === "asc" ? "desc" : "asc";
          button.dataset.sortDirection = direction;

          widget.querySelectorAll("[data-sort-key]").forEach((node) => {
            if (node !== button) {
              node.dataset.sortDirection = "";
            }
          });

          const sorted = rows().sort((rowA, rowB) => {
            const valueA = rowA.dataset[datasetKey] || "";
            const valueB = rowB.dataset[datasetKey] || "";
            const numericA = Number(valueA);
            const numericB = Number(valueB);

            let result = 0;
            if (!Number.isNaN(numericA) && !Number.isNaN(numericB) && valueA !== "" && valueB !== "") {
              result = numericA - numericB;
            } else {
              result = String(valueA).localeCompare(String(valueB), "tr", { sensitivity: "base" });
            }
            return direction === "asc" ? result : -result;
          });

          sorted.forEach((row) => body.appendChild(row));
        });
      });
    });
  },

  initializeChips() {
    document.querySelectorAll("[data-chip-group]").forEach((group) => {
      const chips = group.querySelectorAll("[data-chip]");
      chips.forEach((chip) => {
        chip.addEventListener("click", () => {
          chips.forEach((node) => node.classList.remove("is-active"));
          chip.classList.add("is-active");
        });
      });
    });
  },

  initializeUpload() {
    const dropzone = document.querySelector("[data-upload-dropzone]");
    const input = document.querySelector("[data-upload-input]");
    if (!dropzone || !input) {
      return;
    }
    const selectFiles = () => input.click();
    dropzone.addEventListener("click", (event) => {
      if (!event.target.closest("button") && event.target !== input) {
        selectFiles();
      }
    });
    dropzone.querySelector("button")?.addEventListener("click", (event) => {
      event.preventDefault();
      selectFiles();
    });
    input.addEventListener("change", () => {
      if (input.files?.length) {
        this.renderUploadFiles(input.files);
      }
    });
    ["dragenter", "dragover"].forEach((eventName) => {
      dropzone.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropzone.classList.add("is-dragover");
      });
    });
    ["dragleave", "dragend", "drop"].forEach((eventName) => {
      dropzone.addEventListener(eventName, (event) => {
        event.preventDefault();
        dropzone.classList.remove("is-dragover");
      });
    });
    dropzone.addEventListener("drop", (event) => {
      if (event.dataTransfer?.files?.length) {
        this.renderUploadFiles(event.dataTransfer.files);
      }
    });
  },

  initializeNotifications() {
    document.querySelectorAll("[data-notification-id]").forEach((card) => {
      card.addEventListener("click", () => {
        this.markNotificationAsRead(Number(card.dataset.notificationId));
      });
    });
    this.updateNotificationIndicators();
  },

  initializeGlobalActions() {
    document.querySelector("[data-sidebar-toggle]")?.addEventListener("click", () => {
      this.setCollapsedState(!document.body.classList.contains("sidebar-collapsed"));
    });
    document.querySelector("[data-mobile-sidebar-toggle]")?.addEventListener("click", () => {
      document.body.classList.add("sidebar-open");
    });
    document.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
      const nextTheme = this.currentTheme() === "dark" ? "light" : "dark";
      this.applyTheme(nextTheme);
      window.KAApp?.render();
    });
    document.querySelector("[data-overlay]")?.addEventListener("click", () => {
      document.body.classList.remove("sidebar-open");
    });
    document.querySelectorAll("[data-dropdown-trigger]").forEach((trigger) => {
      trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        this.toggleDropdown(trigger.dataset.dropdownTrigger);
      });
    });
    document.addEventListener("click", (event) => {
      if (!event.target.closest("[data-dropdown-menu]") && !event.target.closest("[data-dropdown-trigger]")) {
        this.closeDropdowns();
      }
      if (event.target.closest("[data-modal-close]")) {
        event.preventDefault();
        this.closeModal();
      }
      const modalTrigger = event.target.closest("[data-modal-key]");
      if (modalTrigger) {
        event.preventDefault();
        this.openModal(modalTrigger.dataset.modalKey);
      }

      const rowTrigger = event.target.closest("[data-row-menu-trigger]");
      if (rowTrigger) {
        event.preventDefault();
        event.stopPropagation();
        const menu = rowTrigger.parentElement?.querySelector("[data-row-menu]");
        const shouldOpen = menu?.classList.contains("hidden");
        this.closeRowMenus();
        if (menu && shouldOpen) {
          menu.classList.remove("hidden");
        }
      } else if (!event.target.closest("[data-row-menu]")) {
        this.closeRowMenus();
      }
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        this.closeModal();
        this.closeDropdowns();
      }
    });
  },

  initialize() {
    this.initializeGlobalActions();
    this.updateThemeToggle();
    this.initializeNotifications();
    this.initializeSearch();
    this.initializeTabs();
    this.initializeChips();
    this.initializeUpload();
    this.initializeSlugGenerators();
    this.initializeDataTables();

    // Canlı saat
    const clockEl = document.getElementById("live-clock");
    if (this.clockIntervalId) {
      clearInterval(this.clockIntervalId);
      this.clockIntervalId = null;
    }
    if (clockEl) {
      const tick = () => {
        clockEl.textContent = new Intl.DateTimeFormat("tr-TR", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        }).format(new Date());
      };
      tick();
      this.clockIntervalId = setInterval(tick, 1000);
    }

    const syncEl = document.getElementById("sidebar-sync-time");
    if (this.syncIntervalId) {
      clearInterval(this.syncIntervalId);
      this.syncIntervalId = null;
    }
    if (syncEl) {
      let mins = 6;
      syncEl.textContent = KAUtils.relativeTime(mins);
      this.syncIntervalId = setInterval(() => {
        mins++;
        syncEl.textContent = KAUtils.relativeTime(mins);
      }, 60000);
    }
  },
};
