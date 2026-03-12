const badgeToneMap = {
  slate: { shell: "bg-slate-100 text-slate-700 ring-slate-200", dot: "bg-slate-400" },
  emerald: { shell: "bg-emerald-50 text-emerald-700 ring-emerald-200", dot: "bg-emerald-500" },
  sky: { shell: "bg-sky-50 text-sky-700 ring-sky-200", dot: "bg-sky-500" },
  amber: { shell: "bg-amber-50 text-amber-700 ring-amber-200", dot: "bg-amber-500" },
  rose: { shell: "bg-rose-50 text-rose-700 ring-rose-200", dot: "bg-rose-500" },
  teal: { shell: "bg-teal-50 text-teal-700 ring-teal-200", dot: "bg-teal-500" },
};

window.KAComponents = {
  badge(label, tone = "slate") {
    const palette = badgeToneMap[tone] || badgeToneMap.slate;
    return `<span class="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${palette.shell}"><span class="status-dot ${palette.dot}"></span>${label}</span>`;
  },

  avatar(initials, accent = "from-slate-100 to-slate-200", size = "h-12 w-12") {
    return `<div class="${size} rounded-2xl bg-gradient-to-br ${accent} flex items-center justify-center text-xs font-bold text-slate-700 shadow-inner shadow-white/80">${initials}</div>`;
  },

  actionButton(action, compactMode = false) {
    const baseClass = compactMode
      ? "inline-flex items-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition"
      : "inline-flex items-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition";
    const palette =
      action.variant === "primary"
        ? "bg-slate-900 text-white shadow-soft hover:bg-slate-800"
        : "border border-white/80 bg-white/85 text-slate-700 shadow-soft hover:border-slate-200 hover:bg-white";
    const icon = action.icon ? `<i data-lucide="${action.icon}" class="h-4 w-4"></i>` : "";
    const attrs = action.modalKey ? `data-modal-key="${action.modalKey}" href="#"` : `href="${action.href || "#"}"`;
    return `<a ${attrs} class="${baseClass} ${palette}">${icon}<span>${action.label}</span></a>`;
  },

  metricCard({ label, value, delta, note, icon, spark = [], accent = "teal" }) {
    const accentClass =
      accent === "amber"
        ? "from-amber-100 to-orange-100 text-amber-700"
        : accent === "sky"
          ? "from-sky-100 to-cyan-100 text-sky-700"
          : accent === "rose"
            ? "from-rose-100 to-orange-100 text-rose-700"
            : "from-teal-100 to-cyan-100 text-teal-700";
    const deltaTone = delta.startsWith("-") ? "text-rose-600" : "text-emerald-600";
    return `
      <article class="metric-card section-card rounded-[30px] p-5">
        <div class="flex items-start justify-between gap-4">
          <div>
            <p class="text-sm font-medium text-slate-500">${label}</p>
            <h3 class="mt-3 font-display text-3xl font-bold tracking-tight text-slate-950">${value}</h3>
          </div>
          <span class="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br ${accentClass}">
            <i data-lucide="${icon}" class="h-6 w-6"></i>
          </span>
        </div>
        <div class="mt-6 flex items-end justify-between gap-4">
          <div>
            <p class="text-sm font-semibold ${deltaTone}">${delta}</p>
            <p class="mt-1 text-sm text-slate-500">${note}</p>
          </div>
          <div class="flex h-12 items-end gap-1.5">
            ${spark
              .map(
                (value, index) => `<span title="${value} birim" class="w-2 rounded-full ${index === spark.length - 1 ? "bg-slate-900" : "bg-slate-300"}" style="height:${value}px"></span>`,
              )
              .join("")}
          </div>
        </div>
      </article>
    `;
  },

  highlightCard({ label, value }) {
    return `
      <div class="rounded-3xl border border-white/70 bg-white/70 px-4 py-4 shadow-soft">
        <p class="text-xs font-semibold uppercase tracking-[0.32em] text-slate-400">${label}</p>
        <p class="mt-2 text-lg font-bold text-slate-900">${value}</p>
      </div>
    `;
  },

  sectionCard({ eyebrow, title, subtitle = "", action = "", body, footer = "", className = "" }) {
    return `
      <section class="section-card p-5 sm:p-6 ${className}">
        <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p class="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">${eyebrow}</p>
            <h3 class="mt-2 font-display text-2xl font-bold tracking-tight text-slate-950">${title}</h3>
            ${subtitle ? `<p class="mt-2 max-w-3xl text-sm leading-6 text-slate-500">${subtitle}</p>` : ""}
          </div>
          ${action ? `<div class="flex flex-wrap items-center gap-3">${action}</div>` : ""}
        </div>
        <div class="mt-5">${body}</div>
        ${footer ? `<div class="mt-5">${footer}</div>` : ""}
      </section>
    `;
  },

  progressRows(items) {
    return `
      <div class="space-y-4">
        ${items
          .map(
            (item) => `
              <div>
                <div class="flex items-center justify-between gap-3">
                  <p class="text-sm font-semibold text-slate-700">${item.label}</p>
                  <p class="text-sm text-slate-500">${item.text || `${item.value}%`}</p>
                </div>
                <div class="mt-2 h-2.5 rounded-full bg-slate-100">
                  <div class="h-full rounded-full ${item.color || "bg-slate-900"}" style="width:${item.value}%"></div>
                </div>
              </div>`,
          )
          .join("")}
      </div>
    `;
  },

  timeline(items) {
    return `
      <div class="space-y-4">
        ${items
          .map(
            (item) => `
              <div class="flex gap-4">
                <div class="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <i data-lucide="${item.icon || "sparkles"}" class="h-4 w-4"></i>
                </div>
                <div class="min-w-0 flex-1">
                  <div class="flex items-center justify-between gap-3">
                    <p class="text-sm font-semibold text-slate-900">${item.title}</p>
                    <span class="text-xs font-medium text-slate-400">${item.time}</span>
                  </div>
                  <p class="mt-1 text-sm text-slate-500">${item.body}</p>
                </div>
              </div>`,
          )
          .join("")}
      </div>
    `;
  },

  alertBox({ tone = "slate", title, text, icon = "info" }) {
    return `
      <div class="rounded-[28px] border px-5 py-4 ${tone === "amber" ? "border-amber-200 bg-amber-50/90" : tone === "rose" ? "border-rose-200 bg-rose-50/90" : tone === "sky" ? "border-sky-200 bg-sky-50/90" : "border-slate-200 bg-slate-50/80"}">
        <div class="flex items-start gap-3">
          <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${tone === "amber" ? "bg-amber-100 text-amber-700" : tone === "rose" ? "bg-rose-100 text-rose-700" : tone === "sky" ? "bg-sky-100 text-sky-700" : "bg-slate-100 text-slate-700"}">
            <i data-lucide="${icon}" class="h-4 w-4"></i>
          </span>
          <div>
            <p class="text-sm font-bold ${tone === "amber" ? "text-amber-900" : tone === "rose" ? "text-rose-900" : tone === "sky" ? "text-sky-900" : "text-slate-900"}">${title}</p>
            <p class="mt-1 text-sm leading-6 ${tone === "amber" ? "text-amber-800" : tone === "rose" ? "text-rose-800" : tone === "sky" ? "text-sky-800" : "text-slate-600"}">${text}</p>
          </div>
        </div>
      </div>
    `;
  },

  emptyState({ icon = "inbox", title = "Sonuç bulunamadı", text = "Arama kriterlerinizi değiştirerek tekrar deneyin." }) {
    return `
      <div class="flex flex-col items-center justify-center gap-4 rounded-[30px] border border-dashed border-slate-200 bg-slate-50/60 py-12 text-center">
        <span class="inline-flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
          <i data-lucide="${icon}" class="h-7 w-7"></i>
        </span>
        <div>
          <p class="text-sm font-bold text-slate-900">${title}</p>
          <p class="mt-1 text-sm text-slate-500">${text}</p>
        </div>
      </div>
    `;
  },

  tableShell({ headers, rows }) {
    return `
      <div class="table-shell overflow-x-auto scroll-soft">
        <table>
          <thead>
            <tr>
              ${headers.map((header) => `<th class="text-left text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">${header}</th>`).join("")}
            </tr>
          </thead>
          <tbody>${rows.join("")}</tbody>
        </table>
      </div>
    `;
  },

  pagination(label = "1-6 / 48 kayıt") {
    return `
      <div class="flex flex-col gap-3 border-t border-slate-200 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <p class="text-sm text-slate-500">${label}</p>
        <div class="flex items-center gap-2">
          <button type="button" class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700"><i data-lucide="chevron-left" class="h-4 w-4"></i></button>
          <button type="button" class="inline-flex h-10 min-w-10 items-center justify-center rounded-2xl bg-slate-900 px-3 text-sm font-semibold text-white">1</button>
          <button type="button" class="inline-flex h-10 min-w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700">2</button>
          <button type="button" class="inline-flex h-10 min-w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700">3</button>
          <button type="button" class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700"><i data-lucide="chevron-right" class="h-4 w-4"></i></button>
        </div>
      </div>
    `;
  },

  productRow(product) {
    const components = window.KAComponents;
    return `
      <tr>
        <td><div class="flex items-center gap-3">${window.KAComponents.avatar(product.initials, product.accent, "h-12 w-12")}<div><a href="product-detail.html" class="text-sm font-bold text-slate-900 hover:text-teal-700">${product.name}</a><p class="mt-1 text-sm text-slate-500">${product.sku} • ${product.brand}</p></div></div></td>
        <td><p class="text-sm font-semibold text-slate-900">${product.category}</p><p class="mt-1 text-sm text-slate-500">${product.variants} varyant</p></td>
        <td><p class="text-sm font-semibold text-slate-900">${KAUtils.money(product.price)}</p><p class="mt-1 text-sm text-slate-500">KDV dahil</p></td>
        <td><p class="text-sm font-semibold text-slate-900">${KAUtils.number(product.stock)} adet</p><p class="mt-1 text-sm text-slate-500">Depo bazlı senkron</p></td>
        <td>${window.KAComponents.badge(product.status, KAUtils.toneForStatus(product.status))}</td>
        <td><p class="text-sm font-semibold text-slate-900">${KAUtils.number(product.sales)} satış</p><p class="mt-1 text-sm text-slate-500">${product.channel}</p></td>
      </tr>
    `;
  },

  orderRow(order) {
    return `
      <tr>
        <td><a href="order-detail.html" class="text-sm font-bold text-slate-900 hover:text-teal-700">${order.id}</a><p class="mt-1 text-sm text-slate-500">${order.channel}</p></td>
        <td><p class="text-sm font-semibold text-slate-900">${order.customer}</p><p class="mt-1 text-sm text-slate-500">${order.city}</p></td>
        <td><p class="text-sm font-semibold text-slate-900">${KAUtils.money(order.total)}</p><p class="mt-1 text-sm text-slate-500">${order.items} ürün</p></td>
        <td>${window.KAComponents.badge(order.status, KAUtils.toneForStatus(order.status))}</td>
        <td>${window.KAComponents.badge(order.payment, KAUtils.toneForStatus(order.payment))}</td>
        <td><p class="text-sm font-semibold text-slate-900">${order.shipping}</p><p class="mt-1 text-sm text-slate-500">Risk: ${order.risk}</p></td>
      </tr>
    `;
  },

  customerRow(customer) {
    return `
      <tr>
        <td><div class="flex items-center gap-3">${window.KAComponents.avatar(customer.initials, customer.accent, "h-12 w-12")}<div><p class="text-sm font-bold text-slate-900">${customer.name}</p><p class="mt-1 text-sm text-slate-500">${customer.email}</p></div></div></td>
        <td>${window.KAComponents.badge(customer.segment, customer.segment === "VIP" ? "amber" : customer.segment === "Riskli" ? "rose" : "sky")}</td>
        <td><p class="text-sm font-semibold text-slate-900">${KAUtils.money(customer.ltv)}</p><p class="mt-1 text-sm text-slate-500">AOV ${KAUtils.money(customer.aov)}</p></td>
        <td><p class="text-sm font-semibold text-slate-900">${KAUtils.number(customer.orders)} sipariş</p><p class="mt-1 text-sm text-slate-500">${customer.city}</p></td>
        <td><p class="text-sm font-semibold text-slate-900">${customer.lastOrder}</p><p class="mt-1 text-sm text-slate-500">Son temas: E-posta</p></td>
      </tr>
    `;
  },
};

