function safeStorageGet(key, fallback = null) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // sandboxed ortamda sessizce geç
  }
}

window.KAApp = {
  loadScript(src) {
    return new Promise((resolve, reject) => {
      const existing = document.querySelector(`script[data-extra-src="${src}"]`);
      if (existing) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.defer = true;
      script.dataset.extraSrc = src;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error(`Script yüklenemedi: ${src}`));
      document.head.appendChild(script);
    });
  },

  async bootstrap() {
    await this.loadScript("assets/js/extended-pages.js");
    await this.loadScript("assets/js/extended-pages-2.js");
    await this.loadScript("assets/js/extended-pages-3.js");
    this.render();
  },

  resolvePageKey() {
    if (document.body.dataset.page) {
      return document.body.dataset.page;
    }

    const path = window.location.pathname || "";
    const filename = path.split("/").pop() || "dashboard.html";
    return filename.replace(/\.html$/i, "") || "dashboard";
  },

  render() {
    const pageKey = this.resolvePageKey();
    const page = window.KAPageRegistry?.[pageKey] || window.KAPageRegistry?.dashboard;
    const app = document.getElementById("app");
    if (!page || !app) {
      return;
    }

    document.title = `KA-E-Ticaret | ${page.title}`;
    app.innerHTML = `
      <div class="app-shell">
        <div data-overlay class="mobile-overlay fixed inset-0 z-30 bg-slate-950/45 backdrop-blur-sm lg:hidden"></div>
        <aside class="sidebar-panel z-40">${KAShell.renderSidebar(pageKey)}</aside>
        <div class="main-shell">
          ${KAShell.renderTopbar(page)}
          <main class="px-4 pb-10 pt-2 sm:px-6 lg:px-8">
            ${KAShell.renderHero(page)}
            <div class="mt-6 space-y-6">${page.render()}</div>
          </main>
        </div>
        ${KAShell.renderModalShell()}
      </div>
    `;

    KAInteractions.initialize();
    KACharts.init();

    if (window.lucide) {
      window.lucide.createIcons();
    }
  },
};

document.addEventListener("DOMContentLoaded", () => {
  window.KAInteractions?.initializeThemePreference?.();
  if (safeStorageGet("kae-sidebar-collapsed") === "1") {
    document.body.classList.add("sidebar-collapsed");
  }
  window.KAApp.bootstrap().catch((error) => {
    console.error(error);
    window.KAApp.render();
  });
});
