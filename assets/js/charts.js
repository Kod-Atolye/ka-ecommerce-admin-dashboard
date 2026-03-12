const KA_CHART_IDS = {
  dashboardSales: "dashboard-sales-chart",
  dashboardCategory: "dashboard-category-chart",
  dashboardOrders: "dashboard-orders-chart",
  inventoryTurnover: "inventory-turnover-chart",
  customerLtv: "customer-ltv-chart",
  financeCashflow: "finance-cashflow-chart",
  financePayment: "finance-payment-chart",
  marketingRoas: "marketing-roas-chart",
  shippingSla: "shipping-sla-chart",
  cmsPerformance: "cms-performance-chart",
  reportsRegion: "reports-region-chart",
  reportsConversion: "reports-conversion-chart",
  integrationHealth: "integration-health-chart",
  productPerformance: "product-performance-chart",
};

window.KACharts = {
  isDarkTheme() {
    return !document.body.classList.contains("theme-light");
  },

  themePalette() {
    return this.isDarkTheme()
      ? {
          legend: "#cbd5e1",
          axis: "#94a3b8",
          grid: "rgba(148, 163, 184, 0.14)",
          tooltipBg: "rgba(2, 6, 23, 0.94)",
          tooltipTitle: "#f8fafc",
          tooltipBody: "#cbd5e1",
        }
      : {
          legend: "#475569",
          axis: "#94a3b8",
          grid: "rgba(148, 163, 184, 0.16)",
          tooltipBg: "rgba(15, 23, 42, 0.92)",
          tooltipTitle: "#fff",
          tooltipBody: "#e2e8f0",
        };
  },

  getCanvasContext(id) {
    const canvas = document.getElementById(id);
    return canvas ? canvas.getContext("2d") : null;
  },

  gradientFill(ctx, colorTop, colorBottom) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 280);
    gradient.addColorStop(0, colorTop);
    gradient.addColorStop(1, colorBottom);
    return gradient;
  },

  baseOptions() {
    const palette = this.themePalette();
    return {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: palette.legend,
            boxWidth: 8,
            boxHeight: 8,
            padding: 18,
          },
        },
        tooltip: {
          backgroundColor: palette.tooltipBg,
          titleColor: palette.tooltipTitle,
          bodyColor: palette.tooltipBody,
          padding: 14,
          cornerRadius: 18,
        },
      },
      scales: {
        x: { grid: { display: false }, ticks: { color: palette.axis, font: { weight: "600" } } },
        y: {
          grid: { color: palette.grid, drawBorder: false },
          ticks: { color: palette.axis, callback: (value) => KAUtils.compactFormatter.format(value) },
        },
      },
    };
  },

  presetConfig(ctx, preset) {
    const linePreset = (label, labels, data, borderColor) => ({
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            borderColor,
            backgroundColor: this.gradientFill(ctx, `${borderColor}33`, `${borderColor}00`),
            pointRadius: 0,
            borderWidth: 3,
            tension: 0.35,
            fill: true,
          },
        ],
      },
      options: this.baseOptions(),
    });

    const barPreset = (label, labels, data) => ({
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label,
            data,
            backgroundColor: ["#0f172a", "#0d9488", "#38bdf8", "#f59e0b", "#94a3b8", "#fb7185"].slice(0, data.length),
            borderRadius: 18,
          },
        ],
      },
      options: this.baseOptions(),
    });

    const doughnutPreset = (labels, data) => ({
      type: "doughnut",
      data: {
        labels,
        datasets: [
          {
            data,
            backgroundColor: ["#0f172a", "#0d9488", "#38bdf8", "#f59e0b", "#94a3b8", "#fb7185"].slice(0, data.length),
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "72%",
        plugins: { legend: { display: false } },
      },
    });

    const presets = {
      salesGrowth: linePreset("Satış", ["Ocak", "Şub", "Mar", "Nis", "May", "Haz"], [320, 380, 410, 470, 520, 610], "#0f172a"),
      revenueGrowth: linePreset("Gelir", ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"], [128, 146, 152, 168, 182, 204, 196], "#0d9488"),
      trafficMix: doughnutPreset(["Organik", "Paid", "Direct", "Social"], [36, 28, 22, 14]),
      conversionTrend: linePreset("Dönüşüm", ["1. hf", "2. hf", "3. hf", "4. hf", "5. hf"], [3.8, 4.1, 4.3, 4.7, 4.9], "#f59e0b"),
      customerSegments: barPreset("Müşteri", ["VIP", "Sadık", "Yeni", "Riskli"], [486, 1242, 1980, 162]),
      productReviews: barPreset("Puan", ["5 yıldız", "4 yıldız", "3 yıldız", "2 yıldız", "1 yıldız"], [642, 288, 94, 21, 11]),
      stockCapacity: barPreset("Doluluk", ["İstanbul", "Ankara", "İzmir", "Adana"], [82, 68, 57, 46]),
      stockFlow: linePreset("Hareket", ["1", "2", "3", "4", "5", "6"], [92, 118, 104, 126, 142, 154], "#38bdf8"),
      orderReturns: barPreset("İade", ["Ocak", "Şub", "Mar", "Nis", "May"], [18, 22, 19, 17, 14]),
      refundVolume: linePreset("Refund", ["Pzt", "Sal", "Çar", "Per", "Cum"], [12, 14, 11, 10, 8], "#fb7185"),
      expenseMix: doughnutPreset(["Reklam", "Lojistik", "İade", "Operasyon"], [42, 26, 14, 18]),
      invoiceVolume: barPreset("Fatura", ["E-Fatura", "E-Arşiv", "İade"], [1128, 912, 38]),
      campaignPerformance: barPreset("ROAS", ["Meta", "Google", "Push", "Mail"], [5.2, 4.8, 6.1, 8.9]),
      emailEngagement: linePreset("Open Rate", ["Kampanya 1", "Kampanya 2", "Kampanya 3", "Kampanya 4"], [28, 34, 31, 39], "#0d9488"),
      shippingZones: doughnutPreset(["Marmara", "Ege", "Akdeniz", "İç Anadolu"], [38, 24, 18, 20]),
      shippingCosts: linePreset("Kargo", ["1. hf", "2. hf", "3. hf", "4. hf"], [74, 82, 79, 88], "#0f172a"),
      regionalRevenue: barPreset("Gelir", ["Marmara", "Ic Anadolu", "Ege", "Akdeniz", "Karadeniz"], [480, 322, 288, 260, 118]),
      shippingStatus: doughnutPreset(["Hazırlanıyor", "Yolda", "Teslim", "Sorunlu"], [28, 34, 26, 12]),
      contentEngagement: linePreset("CTR", ["Banner", "Popup", "Landing", "Blog"], [3.2, 4.1, 5.4, 2.8], "#0d9488"),
      menuInteractions: barPreset("Klik", ["Header", "Mega Menü", "Footer", "Sidebar"], [1824, 1240, 840, 1468]),
      roleDistribution: doughnutPreset(["Super Admin", "Operasyon", "Pazarlama", "Finans"], [2, 4, 3, 3]),
      loginActivity: linePreset("Giriş", ["Pzt", "Sal", "Çar", "Per", "Cum"], [24, 32, 28, 34, 36], "#38bdf8"),
      marketplaceHealth: barPreset("Sağlık", ["Trendyol", "Hepsi", "Amazon"], [99.2, 98.6, 94.1]),
      crmSync: linePreset("Sync", ["1", "2", "3", "4", "5", "6"], [96, 97, 99, 98, 100, 99], "#0d9488"),
      currencyMix: doughnutPreset(["TRY", "EUR", "USD", "GBP"], [72, 14, 9, 5]),
      apiCalls: linePreset("API", ["00", "04", "08", "12", "16", "20"], [1280, 1640, 1580, 2120, 1940, 1760], "#0f172a"),
      complianceRequests: barPreset("Talep", ["Erişim", "Silme", "Düzeltme", "İtiraz"], [12, 7, 4, 2]),
    };

    return presets[preset] || null;
  },

  init() {
    if (!window.Chart) {
      return;
    }
    const palette = this.themePalette();
    Chart.defaults.color = palette.legend;
    Chart.defaults.font.family = "Manrope, system-ui, sans-serif";

    const salesCtx = this.getCanvasContext(KA_CHART_IDS.dashboardSales);
    if (salesCtx) {
      new Chart(salesCtx, {
        type: "line",
        data: {
          labels: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
          datasets: [
            { label: "Toplam Satış", data: [132000, 148000, 156000, 168000, 176000, 212000, 198000], fill: true, tension: 0.4, borderColor: "#0f766e", backgroundColor: this.gradientFill(salesCtx, "rgba(15, 118, 110, 0.25)", "rgba(15, 118, 110, 0)"), pointRadius: 0, borderWidth: 3 },
            { label: "Pazar Yerleri", data: [74000, 81000, 78000, 92000, 108000, 124000, 118000], fill: false, tension: 0.4, borderColor: "#f97316", pointRadius: 0, borderWidth: 2 },
          ],
        },
        options: this.baseOptions(),
      });
    }

    const categoryCtx = this.getCanvasContext(KA_CHART_IDS.dashboardCategory);
    if (categoryCtx) {
      new Chart(categoryCtx, {
        type: "doughnut",
        data: { labels: ["Elektronik", "Moda", "Kozmetik", "Spor"], datasets: [{ data: [44, 31, 17, 8], backgroundColor: ["#0f172a", "#0d9488", "#f59e0b", "#38bdf8"], borderWidth: 0, hoverOffset: 8 }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: "72%", plugins: { legend: { display: false } } },
      });
    }

    const orderCtx = this.getCanvasContext(KA_CHART_IDS.dashboardOrders);
    if (orderCtx) {
      new Chart(orderCtx, {
        type: "bar",
        data: {
          labels: ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"],
          datasets: [
            { label: "Hazırlanıyor", data: [26, 31, 29, 34, 38, 44, 41], backgroundColor: "#f59e0b", borderRadius: 18 },
            { label: "Kargoda", data: [21, 25, 24, 29, 30, 33, 35], backgroundColor: "#38bdf8", borderRadius: 18 },
            { label: "Teslim Edildi", data: [44, 48, 52, 58, 63, 72, 68], backgroundColor: "#0f172a", borderRadius: 18 },
          ],
        },
        options: this.baseOptions(),
      });
    }

    const simpleLine = [
      [KA_CHART_IDS.productPerformance, [320, 388, 420, 514, 560, 610], ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran"], "#0f172a"],
      [KA_CHART_IDS.inventoryTurnover, [420, 510, 488, 532, 590, 640], ["1. hf", "2. hf", "3. hf", "4. hf", "5. hf", "6. hf"], "#0d9488"],
      [KA_CHART_IDS.financeCashflow, [920000, 1010000, 1080000, 1160000, 1320000, 1482000], ["Ocak", "Şub", "Mar", "Nis", "May", "Haz"], "#0f172a"],
      [KA_CHART_IDS.marketingRoas, [5.2, 4.8, 8.9, 6.1, 3.9], ["Meta Ads", "Google Ads", "E-posta", "Push", "Affiliate"], "#0f172a", "bar"],
      [KA_CHART_IDS.shippingSla, [94, 95, 96, 97, 96, 95, 96], ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"], "#0f172a"],
      [KA_CHART_IDS.cmsPerformance, [2.8, 3.1, 3.4, 3.9, 4.2, 4.6], ["Hafta 1", "Hafta 2", "Hafta 3", "Hafta 4", "Hafta 5", "Hafta 6"], "#0d9488"],
      [KA_CHART_IDS.reportsRegion, [480, 322, 288, 260, 190, 118], ["Marmara", "İç Anadolu", "Ege", "Akdeniz", "Karadeniz", "Doğu"], "#0f172a", "bar"],
      [KA_CHART_IDS.reportsConversion, [100, 62, 28, 16, 4.8], ["Oturum", "Ürün Görüntüleme", "Sepet", "Checkout", "Satın Alım"], "#0d9488"],
    ];

    simpleLine.forEach(([id, data, labels, color, type = "line"]) => {
      const ctx = this.getCanvasContext(id);
      if (!ctx) {
        return;
      }
      new Chart(ctx, {
        type,
        data: {
          labels,
          datasets: [
            {
              label: "Veri",
              data,
              borderColor: color,
              backgroundColor: type === "bar" ? data.map((_, index) => ["#0f172a", "#0d9488", "#38bdf8", "#f59e0b", "#94a3b8"][index % 5]) : this.gradientFill(ctx, `${color}33`, `${color}00`),
              pointRadius: 0,
              borderWidth: 3,
              tension: 0.35,
              fill: type !== "bar",
              borderRadius: type === "bar" ? 18 : 0,
            },
          ],
        },
        options: this.baseOptions(),
      });
    });

    const scatterCtx = this.getCanvasContext(KA_CHART_IDS.customerLtv);
    if (scatterCtx) {
      new Chart(scatterCtx, {
        type: "scatter",
        data: {
          datasets: [
            { label: "VIP", data: [{ x: 26, y: 43890 }, { x: 22, y: 32400 }, { x: 18, y: 28500 }], backgroundColor: "#f59e0b" },
            { label: "Sadık", data: [{ x: 14, y: 21420 }, { x: 9, y: 12870 }, { x: 7, y: 10400 }], backgroundColor: "#0d9488" },
            { label: "Yeni", data: [{ x: 2, y: 2640 }, { x: 3, y: 3390 }, { x: 1, y: 980 }], backgroundColor: "#38bdf8" },
          ],
        },
        options: {
          ...this.baseOptions(),
          scales: {
            x: { title: { display: true, text: "Sipariş Adedi", color: "#94a3b8" }, grid: { display: false }, ticks: { color: "#94a3b8" } },
            y: { title: { display: true, text: "LTV", color: "#94a3b8" }, grid: { color: "rgba(148, 163, 184, 0.16)" }, ticks: { color: "#94a3b8", callback: (value) => KAUtils.compactFormatter.format(value) } },
          },
        },
      });
    }

    const paymentCtx = this.getCanvasContext(KA_CHART_IDS.financePayment);
    if (paymentCtx) {
      new Chart(paymentCtx, {
        type: "doughnut",
        data: { labels: ["Kredi Kartı", "Havale", "Kapıda Ödeme", "Cüzdan"], datasets: [{ data: [68, 18, 9, 5], backgroundColor: ["#0f172a", "#38bdf8", "#f59e0b", "#0d9488"], borderWidth: 0 }] },
        options: { responsive: true, maintainAspectRatio: false, cutout: "72%", plugins: { legend: { display: false } } },
      });
    }

    const integrationCtx = this.getCanvasContext(KA_CHART_IDS.integrationHealth);
    if (integrationCtx) {
      new Chart(integrationCtx, {
        type: "radar",
        data: {
          labels: ["Sipariş", "Stok", "Fiyat", "Webhook", "Loglama", "Yetkilendirme"],
          datasets: [
            { label: "Marketplace Stack", data: [98, 96, 94, 99, 92, 97], borderColor: "#0f172a", backgroundColor: "rgba(15, 23, 42, 0.14)", pointBackgroundColor: "#0f172a" },
            { label: "Analitik Stack", data: [100, 88, 91, 98, 94, 96], borderColor: "#0d9488", backgroundColor: "rgba(13, 148, 136, 0.14)", pointBackgroundColor: "#0d9488" },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { labels: { usePointStyle: true, color: "#475569" } } },
          scales: { r: { angleLines: { color: "rgba(148, 163, 184, 0.22)" }, grid: { color: "rgba(148, 163, 184, 0.22)" }, pointLabels: { color: "#64748b", font: { weight: "600" } }, ticks: { display: false }, suggestedMin: 80, suggestedMax: 100 } },
        },
      });
    }

    document.querySelectorAll("[data-chart-preset]").forEach((canvas) => {
      const preset = canvas.dataset.chartPreset;
      if (!preset || canvas.dataset.chartInitialized === "1") {
        return;
      }

      const ctx = canvas.getContext("2d");
      const config = this.presetConfig(ctx, preset);
      if (!config) {
        return;
      }

      new Chart(ctx, config);
      canvas.dataset.chartInitialized = "1";
    });
  },
};
