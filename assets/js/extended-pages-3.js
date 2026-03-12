(() => {
  const { renderInsightPage, renderManagementPage, renderFormPage, clonePage, actionMenu, badge } = window.KAExtendedFactory;
  const { campaigns, cmsPages, adminUsers, integrations } = KADashboardData;
  const rowMenu = () => actionMenu(["Detay", "Düzenle", "Dışa Aktar"]);

  Object.assign(window.KAPageRegistry, {
    "reviews-management": clonePage("product-reviews", {
      title: "Reviews Management",
      eyebrow: "Pazarlama moderasyon merkezi",
      description: "Ürün yorumlarını kampanya, marka ve iade sinyallerine göre yönetin.",
      href: "marketing/reviews-management.html",
    }),
    "expense-reports": {
      title: "Expense Reports",
      eyebrow: "Maliyet ve gider dağılımı",
      description: "Reklam, lojistik, operasyon ve iade maliyetlerini detaylı finans icgoruleriyle izleyin.",
      href: "finance/expense-reports.html",
      actions: [{ label: "Gider Export", icon: "file-output", href: "#", variant: "primary" }],
      highlights: [
        { label: "Aylık Gider", value: "482K TRY" },
        { label: "Reklam Payı", value: "%42" },
        { label: "Lojistik", value: "%26" },
        { label: "İade Etkisi", value: "%14" },
      ],
      render: () =>
        renderInsightPage({
          metrics: [
            { label: "Toplam Gider", value: KAUtils.money(482000), delta: "+4,1%", note: "Son 30 gün", icon: "banknote-arrow-down", spark: [8, 10, 12, 14, 15, 18], accent: "amber" },
            { label: "Reklam Harcamasi", value: KAUtils.money(202400), delta: "+6,8%", note: "Tüm kanallar", icon: "megaphone", spark: [9, 11, 13, 15, 17, 20], accent: "sky" },
            { label: "Lojistik Gideri", value: KAUtils.money(125300), delta: "+2,4%", note: "Taşıyıcı ve paketleme", icon: "truck", spark: [6, 8, 9, 10, 11, 12], accent: "teal" },
            { label: "İade Maliyeti", value: KAUtils.money(38120), delta: "-12%", note: "Kontrollü dusus", icon: "rotate-ccw", spark: [16, 14, 12, 10, 9, 8], accent: "rose" },
          ],
          primaryTitle: "Expense mix",
          primarySubtitle: "Kategori ve operasyon bazlı maliyet dağılımını görün.",
          primaryChart: "expenseMix",
          primaryStats: [
            { label: "Reklam", value: KAUtils.money(202400), note: "Meta + Google + affiliate" },
            { label: "Lojistik", value: KAUtils.money(125300), note: "Taşıyıcı ve paketleme" },
            { label: "Operasyon", value: KAUtils.money(87200), note: "Depo ve fulfillment" },
            { label: "İade", value: KAUtils.money(38120), note: "Ters lojistik maliyeti" },
          ],
          secondaryTitle: "Invoice volume",
          secondaryChart: "invoiceVolume",
          insights: [
            { title: "Kargo maliyeti dengelendi", text: "Bölgesel kural optimizasyonu sayesinde sipariş başı lojistik maliyeti geriledi.", tag: "Iyi", tone: "emerald" },
            { title: "Reklam karması", text: "Meta ve e-posta karması daha verimli gider dağılımı üretti.", tag: "%42", tone: "sky" },
            { title: "İade maliyeti izlenmeli", text: "Ayakkabı kategorisinde ters lojistik maliyeti diger kategorilerin üzerinde.", tag: "Izle", tone: "amber" },
          ],
        }),
    },
    "tax-settings": {
      title: "Tax Settings",
      eyebrow: "Vergi ve KDV kuralları",
      description: "KDV sınıfları, belge politikası ve kanal bazlı vergi kurallarını yönetin.",
      href: "finance/tax-settings.html",
      actions: [{ label: "Vergi Kurallarını Kaydet", icon: "save", href: "#", variant: "primary" }],
      highlights: [
        { label: "KDV Sınıfı", value: "4 aktif kural" },
        { label: "E-Fatura", value: "Varsayılan" },
        { label: "Kanallar", value: "6 senkron" },
        { label: "Uyum", value: "Hazır" },
      ],
      render: () =>
        renderFormPage({
          formTitle: "Tax policy workspace",
          formSubtitle: "KDV, belge tipi ve entegrasyon bazlı vergi varsayımlarını ayarlayın.",
          fields: [
            { label: "Varsayılan Vergi Sınıfı", type: "select", value: "KDV %20", options: ["KDV %20", "KDV %10", "KDV %1", "Istisna"] },
            { label: "Belge Tipi", type: "select", value: "E-Fatura", options: ["E-Fatura", "E-Arşiv", "Manuel Belge"] },
            { label: "Kategori Eşleme", type: "textarea", value: "Elektronik -> %20\nKozmetik -> %20\nTekstil -> %10\nKitap -> %1", span: "lg:col-span-2" },
            { label: "Kanal Uygulamasi", type: "checkbox-group", options: ["Web Store", "Trendyol", "Amazon", "Hepsiburada"], checkedCount: 4 },
            { label: "İade Belge Politikası", type: "radio-group", options: ["Otomatik iade faturası", "Finans onayı ile", "Manuel belge"], name: "tax-return-policy" },
            { label: "Muhasebe Notu", type: "textarea", value: "Muhasebe entegrasyonu ile belge tipi ve KDV sınıfı otomatiktir.", span: "lg:col-span-2" },
          ],
          sideChecklist: {
            title: "Uyum durumu",
            items: [
              { label: "KDV sınıfları", value: 100, text: "Tamam", color: "bg-emerald-500" },
              { label: "Kanal eşlemesi", value: 94, text: "%94", color: "bg-slate-900" },
              { label: "Belge politikası", value: 86, text: "%86", color: "bg-sky-500" },
            ],
          },
          sideChart: { title: "Belge hacmi", preset: "invoiceVolume" },
        }),
    },
    "invoice-archive": {
      title: "Invoice Archive",
      eyebrow: "Belge ve arşiv merkezi",
      description: "E-fatura, e-arşiv ve iade belgelerini hızlı filtrelerle yönetin.",
      href: "finance/invoice-archive.html",
      actions: [{ label: "Arşiv Export", icon: "file-output", href: "#", variant: "primary" }],
      highlights: [
        { label: "E-Fatura", value: "1.128" },
        { label: "E-Arşiv", value: "912" },
        { label: "İade", value: "38" },
        { label: "Uyumsuz", value: "3 belge" },
      ],
      render: () =>
        renderManagementPage({
          metrics: [
            { label: "Toplam Belge", value: "2.078", delta: "+9%", note: "Aylık üretim", icon: "file-stack", spark: [8, 10, 12, 13, 15, 18], accent: "teal" },
            { label: "E-Fatura", value: "1.128", delta: "+7%", note: "Kurumsal faturalar", icon: "receipt-text", spark: [10, 11, 13, 14, 15, 16], accent: "sky" },
            { label: "E-Arşiv", value: "912", delta: "+12%", note: "Bireysel siparişler", icon: "folder-archive", spark: [7, 8, 10, 12, 13, 16], accent: "amber" },
            { label: "Uyumsuz Belge", value: "3", delta: "-2", note: "Elle inceleme", icon: "triangle-alert", spark: [8, 7, 6, 5, 4, 3], accent: "rose" },
          ],
          tableTitle: "Invoice registry",
          tableSubtitle: "Belge tipi, sipariş iliskisi ve muhasebe durumu.",
          table: {
            searchPlaceholder: "Belge veya sipariş ara...",
            filters: ["Tümü", "E-Fatura", "E-Arşiv", "İade"],
            columns: [
              { label: "Belge No", key: "invoice" },
              { label: "Sipariş", key: "order" },
              { label: "Tip", key: "type" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "INV-2026-1482 ORD-12984", sort: { invoice: "1482", order: "12984", type: "E-Fatura", status: "Arşivlendi" }, cells: ["<p class='text-sm font-bold text-slate-900'>INV-2026-1482</p>", "<p class='text-sm text-slate-600'>#ORD-12984</p>", badge("E-Fatura", "emerald"), badge("Arşivlendi", "emerald"), rowMenu()] },
              { search: "ARS-2026-2211 ORD-12972", sort: { invoice: "2211", order: "12972", type: "E-Arşiv", status: "Gönderildi" }, cells: ["<p class='text-sm font-bold text-slate-900'>ARS-2026-2211</p>", "<p class='text-sm text-slate-600'>#ORD-12972</p>", badge("E-Arşiv", "sky"), badge("Gönderildi", "sky"), rowMenu()] },
              { search: "RET-2026-0038 ORD-12888", sort: { invoice: "38", order: "12888", type: "İade", status: "İncele" }, cells: ["<p class='text-sm font-bold text-slate-900'>RET-2026-0038</p>", "<p class='text-sm text-slate-600'>#ORD-12888</p>", badge("İade", "amber"), badge("İncele", "amber"), rowMenu()] },
            ],
          },
          sideChart: { title: "Belge dağılımı", preset: "invoiceVolume" },
          sideInsights: {
            title: "Arşiv notlari",
            items: [
              { title: "Uyumsuz belge", text: "Uç belge muhasebe kod eslesmesi nedeniyle manuel kontrole dustu.", tag: "3", tone: "amber" },
              { title: "E-fatura artışı", text: "Kurumsal siparişlerde ay bazında düzenli belge artışı var.", tag: "+%7", tone: "emerald" },
            ],
          },
        }),
    },
    "payment-methods": {
      title: "Payment Methods",
      eyebrow: "Ödeme orkestrasyonu",
      description: "Kredi kartı, havale, kapıda ödeme ve cüzdan metodlarını performans ve komisyon bazlı yönetin.",
      href: "finance/payment-methods.html",
      actions: [{ label: "Ödeme Yöntemi Ekle", icon: "plus", href: "#", variant: "primary" }],
      highlights: [
        { label: "Aktif Yöntem", value: "4" },
        { label: "Kart Payı", value: "%68" },
        { label: "Komisyon", value: "%2,49" },
        { label: "Chargeback", value: "Düşük" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Payment method matrix",
          tableSubtitle: "Kullanım oranı, komisyon ve iade davranışı.",
          table: {
            searchPlaceholder: "Yöntem ara...",
            filters: ["Tümü", "Aktif", "Pilot", "Riskli"],
            columns: [
              { label: "Yöntem", key: "name" },
              { label: "Pay", key: "share" },
              { label: "Komisyon", key: "fee" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "Kredi Kartı", sort: { name: "Kredi Kartı", share: 68, fee: 2.49, status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>Kredi Kartı</p><p class='mt-1 text-sm text-slate-500'>3D Secure + taksit</p>", "<p class='text-sm text-slate-600'>%68</p>", "<p class='text-sm text-slate-600'>%2,49</p>", badge("Aktif", "emerald"), rowMenu()] },
              { search: "Havale EFT", sort: { name: "Havale", share: 18, fee: 0, status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>Havale / EFT</p><p class='mt-1 text-sm text-slate-500'>Kurumsal sipariş ağırlıklı</p>", "<p class='text-sm text-slate-600'>%18</p>", "<p class='text-sm text-slate-600'>%0</p>", badge("Aktif", "emerald"), rowMenu()] },
              { search: "Kapıda Ödeme", sort: { name: "Kapıda Ödeme", share: 9, fee: 1.5, status: "Pilot" }, cells: ["<p class='text-sm font-bold text-slate-900'>Kapıda Ödeme</p><p class='mt-1 text-sm text-slate-500'>Adres risk skoru ile kontrol</p>", "<p class='text-sm text-slate-600'>%9</p>", "<p class='text-sm text-slate-600'>%1,5</p>", badge("Pilot", "amber"), rowMenu()] },
            ],
          },
          sideChart: { title: "Ödeme karması", preset: "expenseMix" },
          sideProgress: {
            title: "Sağlık skorlari",
            items: [
              { label: "Başarılı tahsilat", value: 97, text: "%97", color: "bg-emerald-500" },
              { label: "Refund hızı", value: 82, text: "%82", color: "bg-sky-500" },
              { label: "Chargeback riski", value: 14, text: "Düşük", color: "bg-amber-500" },
            ],
          },
        }),
    },
  });
  Object.assign(window.KAPageRegistry, {
    "sales-report": {
      title: "Sales Report",
      eyebrow: "Yönetici satış raporu",
      description: "Kanal, gün ve kategori bazlı satış raporlamasını özet panellerle izleyin.",
      href: "reports/sales-report.html",
      actions: [{ label: "PDF Export", icon: "file-output", href: "#", variant: "primary" }],
      highlights: [
        { label: "GMV", value: "12,8M TRY" },
        { label: "Net Gelir", value: "1,48M TRY" },
        { label: "Sipariş", value: "1.842" },
        { label: "AOV", value: "1.688 TRY" },
      ],
      render: () =>
        renderInsightPage({
          metrics: [
            { label: "Toplam Satış", value: KAUtils.money(12800000), delta: "+21,4%", note: "YTD", icon: "receipt-text", spark: [10, 14, 18, 24, 30, 36], accent: "teal" },
            { label: "Net Gelir", value: KAUtils.money(1482000), delta: "+18,2%", note: "Aylık", icon: "wallet", spark: [8, 12, 16, 19, 22, 26], accent: "sky" },
            { label: "Sipariş", value: "1.842", delta: "+9,3%", note: "Bugün toplam", icon: "shopping-cart", spark: [8, 10, 13, 16, 18, 21], accent: "amber" },
            { label: "Dönüşüm", value: "%4,86", delta: "+0,4 puan", note: "Tüm trafik", icon: "target", spark: [4, 4, 5, 5, 6, 7], accent: "rose" },
          ],
          primaryTitle: "Sales growth",
          primarySubtitle: "Toplam satış ve GMV trendini yönetsel seviyede takip edin.",
          primaryChart: "salesGrowth",
          primaryStats: [
            { label: "Web", value: "5,2M TRY", note: "En yüksek net gelir" },
            { label: "Marketplace", value: "4,8M TRY", note: "En yüksek sipariş hacmi" },
            { label: "Mobil App", value: "2,8M TRY", note: "Yukselen kanal" },
            { label: "Retail", value: "0,0M", note: "Template placeholder" },
          ],
          secondaryTitle: "Regional revenue",
          secondaryChart: "regionalRevenue",
          insights: [
            { title: "Marmara lider", text: "Gelirin en büyük bölgesel katkısı Marmara tarafından geliyor.", tag: "Lider", tone: "emerald" },
            { title: "Pazar yeri hızlı", text: "Pazar yerlerinde sipariş hacmi buyuse de marj baskisi devam ediyor.", tag: "Izle", tone: "amber" },
            { title: "Mobil ivme", text: "Mobil uygulama tarafında tekrar satın alma kaynakli yukselis suruyor.", tag: "+%11", tone: "sky" },
          ],
        }),
    },
    "product-performance": {
      title: "Product Performance",
      eyebrow: "Ürün performans raporu",
      description: "En çok satan, en yüksek marjli ve yavaşlayan ürünleri aynı analizde görün.",
      href: "reports/product-performance.html",
      actions: [{ label: "SKU Export", icon: "download", href: "#", variant: "primary" }],
      highlights: [
        { label: "Top Seller", value: "Nebula X1" },
        { label: "Margin Star", value: "Luna Serum" },
        { label: "Slow Mover", value: "Bloom Set" },
        { label: "Review", value: "4.6 / 5" },
      ],
      render: () =>
        renderInsightPage({
          primaryTitle: "Product trend",
          primarySubtitle: "Satış ve yorum davranışlarına göre SKU performansı.",
          primaryChart: "salesGrowth",
          primaryStats: [
            { label: "Nebula X1", value: "982 sipariş", note: "Lider ürün" },
            { label: "Luna Serum", value: "1.332 sipariş", note: "Hızlı tukenen" },
            { label: "AeroTrail", value: "540 sipariş", note: "İade sinyali var" },
            { label: "Nova Lamp", value: "318 sipariş", note: "Yukselen ürün" },
          ],
          secondaryTitle: "Review split",
          secondaryChart: "productReviews",
          insights: [
            { title: "Yorum gücü", text: "Yüksek puan alan ürünlerde dönüşüm hissedilir seviyede daha güçlü.", tag: "4.6/5", tone: "emerald" },
            { title: "İade etkisi", text: "Ayakkabı kategorisinde puan ve iade davranışı daha yakından izlenmeli.", tag: "Uyarı", tone: "amber" },
            { title: "Stok surekliligi", text: "Best seller ürünlerde tekrar sipariş hızı stok planlamasını zorluyor.", tag: "Planla", tone: "sky" },
          ],
        }),
    },
    "customer-behavior": {
      title: "Customer Behavior",
      eyebrow: "Müşteri davranış raporu",
      description: "Tekrar satın alma, LTV ve segment davranışlarını raporlayın.",
      href: "reports/customer-behavior.html",
      actions: [{ label: "Segment Export", icon: "file-output", href: "#", variant: "primary" }],
      highlights: [
        { label: "Repeat Rate", value: "%38" },
        { label: "VIP", value: "486" },
        { label: "Riskli", value: "162" },
        { label: "LTV", value: "12.420 TRY" },
      ],
      render: () =>
        renderInsightPage({
          primaryTitle: "Segment behavior",
          primarySubtitle: "Müşteri değerini ve segment hacmini davranış olarak izleyin.",
          primaryChart: "customerSegments",
          primaryStats: [
            { label: "VIP", value: "486", note: "Yüksek frekans" },
            { label: "Sadık", value: "1.242", note: "Aylık tekrar satın alan" },
            { label: "Yeni", value: "1.980", note: "Hos geldin akışında" },
            { label: "Riskli", value: "162", note: "Winback gerekiyor" },
          ],
          secondaryTitle: "Repeat purchase",
          secondaryChart: "conversionTrend",
          insights: [
            { title: "VIP grubu buyuyor", text: "Premium ürün karması ile VIP segment gelir payı artıyor.", tag: "+%9", tone: "emerald" },
            { title: "Yeni müşteri akışı", text: "İlk sipariş sonrasi ikinci siparişe geçiş daha da iyileştirilebilir.", tag: "Izle", tone: "amber" },
            { title: "Winback tetigi", text: "45 gün pasif müşteriler için e-posta ve push karması verimli çalışıyor.", tag: "Aksiyon", tone: "sky" },
          ],
        }),
    },
    "conversion-reports": {
      title: "Conversion Reports",
      eyebrow: "Huniler ve verimlilik",
      description: "Trafik, sepet ve checkout adimlarindaki dönüşüm davranışını raporlayın.",
      href: "reports/conversion-reports.html",
      actions: [{ label: "Huniyi Dışa Aktar", icon: "download", href: "#", variant: "primary" }],
      highlights: [
        { label: "Checkout", value: "%28" },
        { label: "Satınalım", value: "%4,86" },
        { label: "Bounce", value: "%31" },
        { label: "Mobil", value: "%64" },
      ],
      render: () =>
        renderInsightPage({
          primaryTitle: "Conversion trend",
          primarySubtitle: "Kanal ve cihaz bazlı dönüşüm oranlarını izleyin.",
          primaryChart: "conversionTrend",
          primaryStats: [
            { label: "Landing -> PLP", value: "%62", note: "Sağlıklı geçiş" },
            { label: "PLP -> PDP", value: "%28", note: "Filtre etkisi var" },
            { label: "PDP -> Cart", value: "%16", note: "Görsel kalite güçlü" },
            { label: "Checkout -> Order", value: "%4,86", note: "Tüm oturumlar bazında" },
          ],
          secondaryTitle: "Traffic mix",
          secondaryChart: "trafficMix",
          insights: [
            { title: "Mobil ağırlıklı trafik", text: "Mobil checkout hızı arttıkça siparişe giden yol daha sağlıklı görünüyor.", tag: "%64", tone: "sky" },
            { title: "Paid kalite farki", text: "Bazi paid kaynaklarin sepetten siparişe geçişi digerlerine göre daha zayif.", tag: "Izle", tone: "amber" },
            { title: "SEO landing etkisi", text: "Organik trafik landing kurgusu ile daha yüksek ürün görüntüleme oranı üretiyor.", tag: "+%16", tone: "emerald" },
          ],
        }),
    },
    "abandoned-cart-report": {
      title: "Abandoned Cart Report",
      eyebrow: "Sepet kurtarma merkezi",
      description: "Terk edilen sepetleri segment, tutar ve geri kazanım aksiyonları ile yönetin.",
      href: "reports/abandoned-cart-report.html",
      actions: [{ label: "Winback Akışı", icon: "mail-plus", href: "#", variant: "primary" }],
      highlights: [
        { label: "Açık Sepet", value: "1.214" },
        { label: "Kurtarilan", value: "284" },
        { label: "Geri Kazanim", value: "%23,4" },
        { label: "Tutar", value: "612K TRY" },
      ],
      render: () =>
        renderManagementPage({
          metrics: [
            { label: "Terk Edilen Sepet", value: "1.214", delta: "-5%", note: "Son 7 gün", icon: "shopping-basket", spark: [18, 17, 16, 14, 13, 11], accent: "amber" },
            { label: "Kurtarilan", value: "284", delta: "+9%", note: "E-posta + push", icon: "badge-check", spark: [6, 7, 8, 10, 11, 13], accent: "teal" },
            { label: "Geri Kazanim", value: "%23,4", delta: "+2 puan", note: "Performans", icon: "target", spark: [3, 3, 4, 4, 5, 6], accent: "sky" },
            { label: "Potansiyel Tutar", value: KAUtils.money(612000), delta: "Izleniyor", note: "Açık sepet GMV", icon: "wallet", spark: [10, 11, 12, 13, 15, 17], accent: "rose" },
          ],
          tableTitle: "Cart rescue queue",
          tableSubtitle: "Segment, tutar ve son temas bazlı kurtarma kuyrugu.",
          table: {
            searchPlaceholder: "Müşteri veya sepet ara...",
            filters: ["Tümü", "VIP", "Yeni", "Winback"],
            columns: [
              { label: "Müşteri", key: "name" },
              { label: "Tutar", key: "amount" },
              { label: "Kaynak", key: "source" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "Elif Yıldırım VIP", sort: { name: "Elif", amount: 6840, source: "Push", status: "Bekliyor" }, cells: ["<p class='text-sm font-bold text-slate-900'>Elif Yıldırım</p><p class='mt-1 text-sm text-slate-500'>VIP segment</p>", `<p class='text-sm font-semibold text-slate-900'>${KAUtils.money(6840)}</p>`, "<p class='text-sm text-slate-600'>Push + mail</p>", badge("Bekliyor", "amber"), rowMenu()] },
              { search: "Sena Arslan Yeni", sort: { name: "Sena", amount: 1320, source: "Mail", status: "Akışta" }, cells: ["<p class='text-sm font-bold text-slate-900'>Sena Arslan</p><p class='mt-1 text-sm text-slate-500'>Yeni müşteri</p>", `<p class='text-sm font-semibold text-slate-900'>${KAUtils.money(1320)}</p>`, "<p class='text-sm text-slate-600'>Mail otomasyonu</p>", badge("Akışta", "sky"), rowMenu()] },
              { search: "Berk Çetin Sadık", sort: { name: "Berk", amount: 2190, source: "SMS", status: "Kurtarildi" }, cells: ["<p class='text-sm font-bold text-slate-900'>Berk Çetin</p><p class='mt-1 text-sm text-slate-500'>Sadık müşteri</p>", `<p class='text-sm font-semibold text-slate-900'>${KAUtils.money(2190)}</p>`, "<p class='text-sm text-slate-600'>SMS</p>", badge("Kurtarildi", "emerald"), rowMenu()] },
            ],
          },
          sideChart: { title: "Dönüşüm trendi", preset: "conversionTrend" },
          sideInsights: {
            title: "Kurtarma notlari",
            items: [
              { title: "VIP kurtarma oranı", text: "VIP segmentte push + mail kombinasyonu en iyi sonucu veriyor.", tag: "%31", tone: "emerald" },
              { title: "Fiyat hassasiyeti", text: "Yeni kullanıcılar ödeme aşamasında fiyat ve kargo esigine daha duyarlı.", tag: "Izle", tone: "amber" },
            ],
          },
        }),
    },
    "coupon-management": {
      title: "Coupon Management",
      eyebrow: "Kupon ve indirim motoru",
      description: "Kupon kodları, limitler ve segment bazlı kullanım kurallarını yönetin.",
      href: "marketing/coupon-management.html",
      actions: [{ label: "Kupon Olustur", icon: "ticket-plus", modalKey: "createCoupon", variant: "primary" }],
      highlights: [
        { label: "Aktif Kupon", value: "24" },
        { label: "Kullanım", value: "1.294" },
        { label: "AOV Etkisi", value: "+%7" },
        { label: "ROAS", value: "6.2x" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Coupon registry",
          tableSubtitle: "Kod, segment ve kullanım limitleri ile kupon yönetimi.",
          table: {
            searchPlaceholder: "Kupon kodu ara...",
            filters: ["Tümü", "Aktif", "Taslak", "Sinirli"],
            columns: [
              { label: "Kupon", key: "name" },
              { label: "Segment", key: "segment" },
              { label: "Kullanım", key: "usage" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "SPRINGVIP VIP", sort: { name: "SPRINGVIP", segment: "VIP", usage: 218, status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>SPRINGVIP</p><p class='mt-1 text-sm text-slate-500'>%15 + ücretsiz kargo</p>", "<p class='text-sm text-slate-600'>VIP + terk edilen sepet</p>", "<p class='text-sm text-slate-600'>218 / 500</p>", badge("Aktif", "emerald"), rowMenu()] },
              { search: "NEW10 Yeni", sort: { name: "NEW10", segment: "Yeni", usage: 432, status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>NEW10</p><p class='mt-1 text-sm text-slate-500'>İlk siparişe %10</p>", "<p class='text-sm text-slate-600'>Yeni müşteri</p>", "<p class='text-sm text-slate-600'>432 / limitsiz</p>", badge("Aktif", "emerald"), rowMenu()] },
              { search: "FLASHNIGHT Tüm", sort: { name: "FLASHNIGHT", segment: "Tüm", usage: 88, status: "Planlandı" }, cells: ["<p class='text-sm font-bold text-slate-900'>FLASHNIGHT</p><p class='mt-1 text-sm text-slate-500'>3 saatlik gece kampanyası</p>", "<p class='text-sm text-slate-600'>Tüm kanal</p>", "<p class='text-sm text-slate-600'>88 / 200</p>", badge("Planlandı", "amber"), rowMenu()] },
            ],
          },
          sideChart: { title: "Kampanya performansı", preset: "campaignPerformance" },
        }),
    },
  });
  Object.assign(window.KAPageRegistry, {
    "campaign-management": {
      title: "Campaign Management",
      eyebrow: "Omni-channel kampanyalar",
      description: "İndirim, performans ve yayın planı ile kampanya operasyonunu yönetin.",
      href: "marketing/campaign-management.html",
      actions: [{ label: "Kampanya Ekle", icon: "plus", href: "#", variant: "primary" }],
      highlights: [
        { label: "Aktif", value: "18 akış" },
        { label: "ROAS", value: "6.2x" },
        { label: "Spend", value: "48K TRY" },
        { label: "Gelir", value: "297K TRY" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Campaign workspace",
          tableSubtitle: "Kanal, harcama ve gelir bilgileriyle büyüme akışlarını yönetin.",
          table: {
            searchPlaceholder: "Kampanya ara...",
            filters: ["Tümü", "Aktif", "Planlandı", "Durdu"],
            columns: [
              { label: "Kampanya", key: "name" },
              { label: "Kanal", key: "channel" },
              { label: "ROAS", key: "roas" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: campaigns.map((campaign) => ({
              search: `${campaign.name} ${campaign.channel}`,
              sort: { name: campaign.name, channel: campaign.channel, roas: campaign.roas, status: campaign.status },
              cells: [
                `<p class='text-sm font-bold text-slate-900'>${campaign.name}</p><p class='mt-1 text-sm text-slate-500'>${KAUtils.money(campaign.revenue)} gelir</p>`,
                `<p class='text-sm text-slate-600'>${campaign.channel}</p>`,
                `<p class='text-sm font-semibold text-slate-900'>${campaign.roas}x</p>`,
                badge(campaign.status, KAUtils.toneForStatus(campaign.status)),
                rowMenu(),
              ],
            })),
          },
          sideChart: { title: "ROAS dağılımı", preset: "campaignPerformance" },
          sideInsights: {
            title: "Kampanya notlari",
            items: [
              { title: "Cart rescue güçlü", text: "E-posta tabanlı cart rescue akışı en yüksek verimliliği üretiyor.", tag: "8.9x", tone: "emerald" },
              { title: "Flash weekend", text: "Flash Weekend planlı durumda, stok ve banner senkronu hazırlanıyor.", tag: "Plan", tone: "amber" },
            ],
          },
        }),
    },
    "flash-sale": {
      title: "Flash Sale",
      eyebrow: "Zaman bazlı kampanya operasyonu",
      description: "Kısa süreli indirim, stok ve yayın planını aynı panelden yönetin.",
      href: "marketing/flash-sale.html",
      actions: [{ label: "Flash Sale Baslat", icon: "zap", href: "#", variant: "primary" }],
      highlights: [
        { label: "Aktif Slot", value: "3" },
        { label: "Açılış", value: "Cuma 20:00" },
        { label: "SKU", value: "42 ürün" },
        { label: "Stok Koruma", value: "Aktif" },
      ],
      render: () =>
        renderManagementPage({
          metrics: [
            { label: "Yaklasan Slot", value: "3", delta: "+1", note: "Bu hafta", icon: "zap", spark: [3, 4, 5, 6, 7, 8], accent: "amber" },
            { label: "Flash SKU", value: "42", delta: "+6", note: "Kampanyaya dahil", icon: "package-check", spark: [5, 6, 7, 8, 9, 11], accent: "teal" },
            { label: "Stok Koruma", value: "%92", delta: "Stabil", note: "Eşik bazlı", icon: "shield-check", spark: [8, 8, 8, 9, 9, 10], accent: "sky" },
            { label: "Tahmini Gelir", value: KAUtils.money(324000), delta: "+12%", note: "3 saatlik slot", icon: "wallet", spark: [8, 10, 12, 14, 15, 17], accent: "rose" },
          ],
          tableTitle: "Flash sale slots",
          tableSubtitle: "Saat, ürün seti ve stok güvencesi ile flash sale planları.",
          table: {
            searchPlaceholder: "Slot veya ürün ara...",
            filters: ["Tümü", "Hazır", "Planlandı", "Canlı"],
            columns: [
              { label: "Slot", key: "slot" },
              { label: "Kapsam", key: "scope" },
              { label: "Stok", key: "stock" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "Friday Night 20:00", sort: { slot: "Friday Night", scope: 24, stock: 92, status: "Hazır" }, cells: ["<p class='text-sm font-bold text-slate-900'>Friday Night</p><p class='mt-1 text-sm text-slate-500'>20:00 - 23:59</p>", "<p class='text-sm text-slate-600'>24 ürün / tüm kanal</p>", "<p class='text-sm text-slate-600'>%92 güvence</p>", badge("Hazır", "emerald"), rowMenu()] },
              { search: "App Drop 18:00", sort: { slot: "App Drop", scope: 12, stock: 88, status: "Planlandı" }, cells: ["<p class='text-sm font-bold text-slate-900'>App Drop</p><p class='mt-1 text-sm text-slate-500'>18:00 - 20:00</p>", "<p class='text-sm text-slate-600'>12 ürün / app only</p>", "<p class='text-sm text-slate-600'>%88 güvence</p>", badge("Planlandı", "amber"), rowMenu()] },
            ],
          },
          sideChart: { title: "Kampanya performansı", preset: "campaignPerformance" },
        }),
    },
    "email-marketing": {
      title: "Email Marketing",
      eyebrow: "Mail akış ve performans analizi",
      description: "Açılma, tıklama ve gelir katkısı ile e-posta kampanyalarını yönetin.",
      href: "marketing/email-marketing.html",
      actions: [{ label: "Mail Akışı Olustur", icon: "mail-plus", href: "#", variant: "primary" }],
      highlights: [
        { label: "Open Rate", value: "%39" },
        { label: "CTR", value: "%5,4" },
        { label: "Flow", value: "12 aktif" },
        { label: "Gelir", value: "55180 TRY" },
      ],
      render: () =>
        renderInsightPage({
          metrics: [
            { label: "Açılma Oranı", value: "%39", delta: "+4 puan", note: "En iyi kampanya", icon: "mail-open", spark: [20, 24, 28, 32, 35, 39], accent: "teal" },
            { label: "Tıklama", value: "%5,4", delta: "+1 puan", note: "CTR", icon: "mouse-pointer-click", spark: [2, 3, 4, 4, 5, 6], accent: "sky" },
            { label: "Abonelikten Çıkış", value: "%0,3", delta: "Stabil", note: "Düşük churn", icon: "user-x", spark: [4, 4, 3, 3, 3, 3], accent: "amber" },
            { label: "Gelir Katkısı", value: KAUtils.money(55180), delta: "+11%", note: "Son kampanya", icon: "wallet", spark: [6, 8, 10, 12, 13, 15], accent: "rose" },
          ],
          primaryTitle: "Email engagement",
          primarySubtitle: "Kampanya ve otomasyon bazlı mail performansı.",
          primaryChart: "emailEngagement",
          primaryStats: [
            { label: "Cart Rescue", value: "%39 open", note: "En iyi performans" },
            { label: "Welcome", value: "%34 open", note: "Yeni müşteri" },
            { label: "VIP Drop", value: "%31 open", note: "Yüksek gelir" },
            { label: "Winback", value: "%28 open", note: "Riskli segment" },
          ],
          secondaryTitle: "Campaign ROAS",
          secondaryChart: "campaignPerformance",
          insights: [
            { title: "Cart rescue lider", text: "Sepet terk eden kullanıcılarda mail + push kombinasyonu güçlü çalışıyor.", tag: "8.9x", tone: "emerald" },
            { title: "Subject testleri", text: "Urgency içeren konu satırları CTR tarafında daha başarılı.", tag: "A/B", tone: "sky" },
            { title: "Frekans dengesi", text: "Yoğun gönderim haftalarında unsubscribe oranları dikkatle izlenmeli.", tag: "Izle", tone: "amber" },
          ],
        }),
    },
    "push-notifications": {
      title: "Push Notifications",
      eyebrow: "Mobil ve web push merkezi",
      description: "Segment hedeflemesi, teslimat ve tıklama performansı ile push akışlarını yönetin.",
      href: "marketing/push-notifications.html",
      actions: [{ label: "Push Gönder", icon: "bell-ring", href: "#", variant: "primary" }],
      highlights: [
        { label: "Cihaz", value: "15,8K" },
        { label: "CTR", value: "%4,1" },
        { label: "Açılış", value: "%18" },
        { label: "Aktif Akış", value: "7" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Push notification queue",
          tableSubtitle: "Segment, cihaz ve hedeflenen aksiyon bazlı push akışlarını yönetin.",
          table: {
            searchPlaceholder: "Push akışı ara...",
            filters: ["Tümü", "Canlı", "Taslak", "Segment"],
            columns: [
              { label: "Akış", key: "name" },
              { label: "Segment", key: "segment" },
              { label: "Erişim", key: "reach" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "Yeni Sezon Drop Sadık", sort: { name: "Yeni Sezon Drop", segment: "Sadık", reach: 4200, status: "Canlı" }, cells: ["<p class='text-sm font-bold text-slate-900'>Yeni Sezon Drop</p><p class='mt-1 text-sm text-slate-500'>Ürün çıkışı bildirimi</p>", "<p class='text-sm text-slate-600'>Sadık müşteri</p>", "<p class='text-sm text-slate-600'>4.200 cihaz</p>", badge("Canlı", "emerald"), rowMenu()] },
              { search: "Cart Rescue VIP", sort: { name: "Cart Rescue", segment: "VIP", reach: 980, status: "Canlı" }, cells: ["<p class='text-sm font-bold text-slate-900'>Cart Rescue</p><p class='mt-1 text-sm text-slate-500'>1 saat gecikmeli tetik</p>", "<p class='text-sm text-slate-600'>VIP + terk edilen sepet</p>", "<p class='text-sm text-slate-600'>980 cihaz</p>", badge("Canlı", "emerald"), rowMenu()] },
              { search: "Flash Reminder Tüm", sort: { name: "Flash Reminder", segment: "Tüm", reach: 6200, status: "Taslak" }, cells: ["<p class='text-sm font-bold text-slate-900'>Flash Reminder</p><p class='mt-1 text-sm text-slate-500'>Flash sale hatirlaticisi</p>", "<p class='text-sm text-slate-600'>Tüm cihazlar</p>", "<p class='text-sm text-slate-600'>6.200 cihaz</p>", badge("Taslak", "amber"), rowMenu()] },
            ],
          },
          sideChart: { title: "Kampanya performansı", preset: "campaignPerformance" },
          sideProgress: {
            title: "Push skorlarI",
            items: [
              { label: "Teslim edilen", value: 94, text: "%94", color: "bg-emerald-500" },
              { label: "Açılan", value: 18, text: "%18", color: "bg-sky-500" },
              { label: "Tıklanan", value: 41, text: "%4,1", color: "bg-slate-900" },
            ],
          },
        }),
    },
    "shipping-providers": {
      title: "Shipping Providers",
      eyebrow: "Taşıyıcı entegrasyonlari",
      description: "Kargo firmalarını SLA, teslimat kalitesi ve entegrasyon sagligi ile yönetin.",
      href: "shipping/shipping-providers.html",
      actions: [{ label: "Taşıyıcı Ekle", icon: "plus", href: "#", variant: "primary" }],
      highlights: [
        { label: "Aktif Carrier", value: "7" },
        { label: "SLA", value: "%96" },
        { label: "Webhook", value: "Sağlıklı" },
        { label: "Açıl Durum", value: "1 provider" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Provider registry",
          tableSubtitle: "Taşıyıcı bazlı entegrasyon ve performans tablosu.",
          table: {
            searchPlaceholder: "Taşıyıcı ara...",
            filters: ["Tümü", "Aktif", "Pilot", "Uyarı"],
            columns: [
              { label: "Provider", key: "name" },
              { label: "Model", key: "model" },
              { label: "SLA", key: "sla" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "Yurtiçi API", sort: { name: "Yurtiçi", model: "API", sla: 98.9, status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>Yurtiçi Kargo</p><p class='mt-1 text-sm text-slate-500'>Canlı barkod akışı</p>", "<p class='text-sm text-slate-600'>API</p>", "<p class='text-sm text-slate-600'>%98,9</p>", badge("Aktif", "emerald"), rowMenu()] },
              { search: "MNG API", sort: { name: "MNG", model: "API", sla: 96.4, status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>MNG</p><p class='mt-1 text-sm text-slate-500'>Otomatik etiket</p>", "<p class='text-sm text-slate-600'>API</p>", "<p class='text-sm text-slate-600'>%96,4</p>", badge("Aktif", "emerald"), rowMenu()] },
              { search: "Amazon Shipping Pilot", sort: { name: "Amazon Shipping", model: "Webhook", sla: 92.1, status: "Pilot" }, cells: ["<p class='text-sm font-bold text-slate-900'>Amazon Shipping</p><p class='mt-1 text-sm text-slate-500'>Pilot entegrasyon</p>", "<p class='text-sm text-slate-600'>Webhook</p>", "<p class='text-sm text-slate-600'>%92,1</p>", badge("Pilot", "amber"), rowMenu()] },
            ],
          },
          sideChart: { title: "Shipping status", preset: "shippingStatus" },
          sideInsights: {
            title: "Provider notlari",
            items: [
              { title: "SLA lideri", text: "Yurtiçi Kargo en yüksek zamanında teslim skoruna sahip.", tag: "%98,9", tone: "emerald" },
              { title: "Pilot akış", text: "Amazon Shipping pilotunda barkod geri bildirimi izleniyor.", tag: "Pilot", tone: "amber" },
            ],
          },
        }),
    },
  });
  Object.assign(window.KAPageRegistry, {
    "shipping-rules": {
      title: "Shipping Rules",
      eyebrow: "Kural motoru",
      description: "Ağırlık, bölge, sepet tutari ve teslimat slotu bazlı kargo kurallarını yönetin.",
      href: "shipping/shipping-rules.html",
      actions: [{ label: "Kural Ekle", icon: "plus", href: "#", variant: "primary" }],
      highlights: [
        { label: "Aktif Kural", value: "14" },
        { label: "Free Shipping", value: "1500 TRY" },
        { label: "Pilot", value: "2" },
        { label: "Bölge", value: "7" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Rule engine",
          tableSubtitle: "Kapsam, ücret ve öncelik bilgisi ile kargo kuralları.",
          table: {
            searchPlaceholder: "Kural ara...",
            filters: ["Tümü", "Aktif", "Bölgesel", "Pilot"],
            columns: [
              { label: "Kural", key: "name" },
              { label: "Kapsam", key: "scope" },
              { label: "Ücret", key: "rate" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "0-2 kg Türkiye", sort: { name: "0-2 kg", scope: "Türkiye", rate: 79, status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>0-2 kg / Tüm Türkiye</p>", "<p class='text-sm text-slate-600'>Standart taşıma</p>", `<p class='text-sm font-semibold text-slate-900'>${KAUtils.money(79)}</p>`, badge("Aktif", "emerald"), rowMenu()] },
              { search: "Marmara 2-5 kg", sort: { name: "Marmara", scope: "Bölgesel", rate: 95, status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>2-5 kg / Marmara</p>", "<p class='text-sm text-slate-600'>Bölgesel kural</p>", `<p class='text-sm font-semibold text-slate-900'>${KAUtils.money(95)}</p>`, badge("Aktif", "emerald"), rowMenu()] },
              { search: "Same Day Istanbul", sort: { name: "Aynı Gün", scope: "Istanbul", rate: 149, status: "Pilot" }, cells: ["<p class='text-sm font-bold text-slate-900'>Aynı gün teslimat</p>", "<p class='text-sm text-slate-600'>Istanbul seçili ilçeler</p>", `<p class='text-sm font-semibold text-slate-900'>${KAUtils.money(149)}</p>`, badge("Pilot", "amber"), rowMenu()] },
            ],
          },
          sideChart: { title: "Maliyet trendi", preset: "shippingCosts" },
        }),
    },
    "delivery-zones": {
      title: "Delivery Zones",
      eyebrow: "Bölgesel dağılım ve performans",
      description: "Teslimat bölgelerini hacim, SLA ve maliyet acisindan analiz edin.",
      href: "shipping/delivery-zones.html",
      actions: [{ label: "Bölge Ekle", icon: "plus", href: "#", variant: "primary" }],
      highlights: [
        { label: "Bölge", value: "7 aktif" },
        { label: "Marmara", value: "%38" },
        { label: "Ege", value: "%24" },
        { label: "Istisna", value: "12" },
      ],
      render: () =>
        renderInsightPage({
          primaryTitle: "Zone split",
          primarySubtitle: "Teslimat hacmi ve bölgesel dağılım.",
          primaryChart: "shippingZones",
          primaryStats: [
            { label: "Marmara", value: "%38", note: "En yüksek hacim" },
            { label: "Ege", value: "%24", note: "Dengeli SLA" },
            { label: "Akdeniz", value: "%18", note: "Mevsimsel artış" },
            { label: "Ic Anadolu", value: "%20", note: "Standart akış" },
          ],
          secondaryTitle: "Regional revenue",
          secondaryChart: "regionalRevenue",
          insights: [
            { title: "Marmara yoğun", text: "Sipariş hacmi ve gelir katkısı birlikte zirvede.", tag: "%38", tone: "emerald" },
            { title: "Ege hatti", text: "Son haftada teslimat gecikmeleri hafif yukselis gosterdi.", tag: "Izle", tone: "amber" },
            { title: "Aynı gün fırsatı", text: "Seçili ilçelerde aynı gün teslimat daha büyük hacme cikabilir.", tag: "Pilot", tone: "sky" },
          ],
        }),
    },
    "shipping-rates": {
      title: "Shipping Rates",
      eyebrow: "Ücretlendirme matrisi",
      description: "Taşıyıcı ve bölge bazlı kargo ücretlerini tek tabloda yönetin.",
      href: "shipping/shipping-rates.html",
      actions: [{ label: "Rate Ekle", icon: "plus", href: "#", variant: "primary" }],
      highlights: [
        { label: "Rate Card", value: "18 satır" },
        { label: "Min Ücret", value: "79 TRY" },
        { label: "Max Ücret", value: "149 TRY" },
        { label: "Promo", value: "Aktif" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Rate cards",
          tableSubtitle: "Bölge ve ağırlık bazlı rate kartları.",
          table: {
            searchPlaceholder: "Bölge veya taşıyıcı ara...",
            filters: ["Tümü", "Standart", "Bölgesel", "Promo"],
            columns: [
              { label: "Taşıyıcı", key: "name" },
              { label: "Kapsam", key: "scope" },
              { label: "Rate", key: "rate" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "Yurtiçi Standart Türkiye", sort: { name: "Yurtiçi", scope: "Türkiye", rate: 79, status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>Yurtiçi Kargo</p>", "<p class='text-sm text-slate-600'>0-2 kg / Tüm Türkiye</p>", `<p class='text-sm font-semibold text-slate-900'>${KAUtils.money(79)}</p>`, badge("Aktif", "emerald"), rowMenu()] },
              { search: "MNG Marmara", sort: { name: "MNG", scope: "Marmara", rate: 95, status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>MNG</p>", "<p class='text-sm text-slate-600'>2-5 kg / Marmara</p>", `<p class='text-sm font-semibold text-slate-900'>${KAUtils.money(95)}</p>`, badge("Aktif", "emerald"), rowMenu()] },
              { search: "Same Day Istanbul", sort: { name: "Same Day", scope: "Istanbul", rate: 149, status: "Promo" }, cells: ["<p class='text-sm font-bold text-slate-900'>Aynı Gün</p>", "<p class='text-sm text-slate-600'>Istanbul seçili ilçeler</p>", `<p class='text-sm font-semibold text-slate-900'>${KAUtils.money(149)}</p>`, badge("Promo", "amber"), rowMenu()] },
            ],
          },
          sideChart: { title: "Maliyet trendi", preset: "shippingCosts" },
        }),
    },
    "page-management": {
      title: "Page Management",
      eyebrow: "Kurumsal ve landing sayfalar",
      description: "Yayın durumları ve içerik akışlarıyla sayfa yönetimini tek panelden yapın.",
      href: "cms/page-management.html",
      actions: [{ label: "Yeni Sayfa", icon: "file-plus", href: "#", variant: "primary" }],
      highlights: [
        { label: "Yayında", value: "42 sayfa" },
        { label: "Taslak", value: "4 sayfa" },
        { label: "Landing", value: "12" },
        { label: "CTR", value: "%3,9" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Page library",
          tableSubtitle: "Yayın, tip ve güncellenme bilgileriyle sayfa yönetimi.",
          table: {
            searchPlaceholder: "Sayfa ara...",
            filters: ["Tümü", "Yayında", "Taslak", "Landing"],
            columns: [
              { label: "Sayfa", key: "name" },
              { label: "Tip", key: "type" },
              { label: "Güncelleme", key: "updated" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: cmsPages.map((page) => ({
              search: `${page.name} ${page.type}`,
              sort: { name: page.name, type: page.type, updated: page.updated, status: page.status },
              cells: [
                `<p class='text-sm font-bold text-slate-900'>${page.name}</p>`,
                `<p class='text-sm text-slate-600'>${page.type}</p>`,
                `<p class='text-sm text-slate-600'>${page.updated}</p>`,
                badge(page.status, KAUtils.toneForStatus(page.status)),
                rowMenu(),
              ],
            })),
          },
          sideChart: { title: "İçerik etkileşimi", preset: "contentEngagement" },
        }),
    },
    "blog-management": {
      title: "Blog Management",
      eyebrow: "Blog ve haber modülü",
      description: "Blog içeriklerini yayın, kategori ve trafik performansı ile yönetin.",
      href: "cms/blog-management.html",
      actions: [{ label: "Yazi Ekle", icon: "plus", href: "#", variant: "primary" }],
      highlights: [
        { label: "Yazi", value: "26" },
        { label: "Planlı", value: "6" },
        { label: "CTR", value: "%2,8" },
        { label: "SEO", value: "%90" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Editorial calendar",
          tableSubtitle: "Planlı yazi takvimi ve yayın performansı.",
          table: {
            searchPlaceholder: "Yazi ara...",
            filters: ["Tümü", "Yayında", "Planlı", "SEO"],
            columns: [
              { label: "Yazi", key: "name" },
              { label: "Kategori", key: "category" },
              { label: "Yayın", key: "publish" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "Yeni sezon trend raporu", sort: { name: "Trend Raporu", category: "Moda", publish: "14 Mart", status: "Planlı" }, cells: ["<p class='text-sm font-bold text-slate-900'>Yeni sezon trend raporu</p>", "<p class='text-sm text-slate-600'>Moda</p>", "<p class='text-sm text-slate-600'>14 Mart 10:00</p>", badge("Planlı", "amber"), rowMenu()] },
              { search: "Kulaklik secim rehberi", sort: { name: "Kulaklik", category: "Elektronik", publish: "18 Mart", status: "Planlı" }, cells: ["<p class='text-sm font-bold text-slate-900'>Kulaklik secim rehberi</p>", "<p class='text-sm text-slate-600'>Elektronik</p>", "<p class='text-sm text-slate-600'>18 Mart 13:00</p>", badge("Planlı", "amber"), rowMenu()] },
              { search: "Kargo teslimat ipuçları", sort: { name: "Kargo", category: "Lojistik", publish: "20 Mart", status: "Yayında" }, cells: ["<p class='text-sm font-bold text-slate-900'>Kargo teslimat ipuçları</p>", "<p class='text-sm text-slate-600'>Lojistik</p>", "<p class='text-sm text-slate-600'>Canlı</p>", badge("Yayında", "emerald"), rowMenu()] },
            ],
          },
          sideChart: { title: "İçerik etkileşimi", preset: "contentEngagement" },
        }),
    },
  });
  Object.assign(window.KAPageRegistry, {
    "banner-management": {
      title: "Banner Management",
      eyebrow: "Hero ve vitrin alanları",
      description: "Banner setlerini cihaz ve kampanya bazlı performansla yönetin.",
      href: "cms/banner-management.html",
      actions: [{ label: "Banner Ekle", icon: "plus", href: "#", variant: "primary" }],
      highlights: [
        { label: "Banner", value: "18 set" },
        { label: "Hero", value: "6" },
        { label: "Mobil", value: "8" },
        { label: "CTR", value: "%4,1" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Banner sets",
          tableSubtitle: "Cihaz varyanti ve yayın performansı ile banner yönetimi.",
          table: {
            searchPlaceholder: "Banner ara...",
            filters: ["Tümü", "Hero", "Mobil", "Flash Sale"],
            columns: [
              { label: "Banner", key: "name" },
              { label: "Kanal", key: "channel" },
              { label: "CTR", key: "ctr" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "Anasayfa Hero", sort: { name: "Anasayfa Hero", channel: "Web", ctr: 4.8, status: "Yayında" }, cells: ["<p class='text-sm font-bold text-slate-900'>Anasayfa Hero</p>", "<p class='text-sm text-slate-600'>Web + mobil</p>", "<p class='text-sm text-slate-600'>%4,8</p>", badge("Yayında", "emerald"), rowMenu()] },
              { search: "Flash Weekend Banner", sort: { name: "Flash Weekend", channel: "Web", ctr: 5.1, status: "Planlı" }, cells: ["<p class='text-sm font-bold text-slate-900'>Flash Weekend Banner</p>", "<p class='text-sm text-slate-600'>Web store</p>", "<p class='text-sm text-slate-600'>%5,1</p>", badge("Planlı", "amber"), rowMenu()] },
              { search: "Mobil Slider 01", sort: { name: "Mobil Slider", channel: "Mobil", ctr: 3.7, status: "Yayında" }, cells: ["<p class='text-sm font-bold text-slate-900'>Mobil Slider 01</p>", "<p class='text-sm text-slate-600'>Mobil app</p>", "<p class='text-sm text-slate-600'>%3,7</p>", badge("Yayında", "emerald"), rowMenu()] },
            ],
          },
          sideChart: { title: "CTR trendi", preset: "contentEngagement" },
        }),
    },
    "popup-management": {
      title: "Popup Management",
      eyebrow: "Onsite mesajlasma merkezi",
      description: "Popup akışlarını segment, trigger ve performans bazlı yönetin.",
      href: "cms/popup-management.html",
      actions: [{ label: "Popup Ekle", icon: "plus", href: "#", variant: "primary" }],
      highlights: [
        { label: "Aktif Popup", value: "7" },
        { label: "Segment", value: "5" },
        { label: "CTR", value: "%4,1" },
        { label: "Display", value: "%88" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Popup flows",
          tableSubtitle: "Gosterim, kapanis ve tıklama performansı ile popup akışlarını yönetin.",
          table: {
            searchPlaceholder: "Popup ara...",
            filters: ["Tümü", "Yeni", "VIP", "Cart"],
            columns: [
              { label: "Popup", key: "name" },
              { label: "Trigger", key: "trigger" },
              { label: "Segment", key: "segment" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "Welcome Popup Yeni", sort: { name: "Welcome Popup", trigger: "Giriş", segment: "Yeni", status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>Welcome Popup</p>", "<p class='text-sm text-slate-600'>İlk oturum</p>", "<p class='text-sm text-slate-600'>Yeni ziyaretci</p>", badge("Aktif", "emerald"), rowMenu()] },
              { search: "VIP Campaign Popup", sort: { name: "VIP Campaign", trigger: "PDP", segment: "VIP", status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>VIP Campaign Popup</p>", "<p class='text-sm text-slate-600'>Ürün detay 20 sn</p>", "<p class='text-sm text-slate-600'>VIP</p>", badge("Aktif", "emerald"), rowMenu()] },
              { search: "Cart Exit Popup", sort: { name: "Cart Exit", trigger: "Exit", segment: "Cart", status: "Pilot" }, cells: ["<p class='text-sm font-bold text-slate-900'>Cart Exit Popup</p>", "<p class='text-sm text-slate-600'>Exit intent</p>", "<p class='text-sm text-slate-600'>Terk edilen sepet</p>", badge("Pilot", "amber"), rowMenu()] },
            ],
          },
          sideChart: { title: "İçerik etkileşimi", preset: "contentEngagement" },
        }),
    },
    "menu-builder": {
      title: "Menü Builder",
      eyebrow: "Navigasyon ve tıklama davranışı",
      description: "Header, mega menü ve footer yapılarını etkileşim verileriyle yönetin.",
      href: "cms/menu-builder.html",
      actions: [{ label: "Menü Dugumu Ekle", icon: "plus", href: "#", variant: "primary" }],
      highlights: [
        { label: "Header", value: "24 dugum" },
        { label: "Mega", value: "8 grup" },
        { label: "Footer", value: "12 link" },
        { label: "Klik", value: "1.824" },
      ],
      render: () =>
        renderInsightPage({
          primaryTitle: "Menü interactions",
          primarySubtitle: "Navigasyon alanlarının tıklama hacmi ve davranışı.",
          primaryChart: "menuInteractions",
          primaryStats: [
            { label: "Header", value: "1.824", note: "En yüksek hacim" },
            { label: "Mega Menü", value: "1.240", note: "Kategori odakli" },
            { label: "Sidebar", value: "1.468", note: "Admin akışı" },
            { label: "Footer", value: "840", note: "Destek ve kurumsal" },
          ],
          secondaryTitle: "Content engagement",
          secondaryChart: "contentEngagement",
          insights: [
            { title: "Header lider", text: "Ana kategori geçişlerinde header navigasyonu en fazla tıklanan alan.", tag: "Lider", tone: "emerald" },
            { title: "Mega menü fırsatı", text: "Promo kartları mega menü içinde daha görünür hale getirilebilir.", tag: "Fırsat", tone: "sky" },
            { title: "Footer düşük", text: "Footer linkleri daha çok destek ve yasal sayfalarda kullaniliyor.", tag: "Normal", tone: "amber" },
          ],
        }),
    },
    "role-management": {
      title: "Role Management",
      eyebrow: "RBAC rol tanimlari",
      description: "Admin rollerini kapsam ve güvenlik seviyesi ile yönetin.",
      href: "users/role-management.html",
      actions: [{ label: "Rol Ekle", icon: "plus", href: "#", variant: "primary" }],
      highlights: [
        { label: "Rol", value: "5" },
        { label: "2FA", value: "%83" },
        { label: "Yetki Seti", value: "Hazır" },
        { label: "Audit", value: "Aktif" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Role catalog",
          tableSubtitle: "Erişim alanı ve güvenlik seviyeleriyle rol yönetimi.",
          table: {
            searchPlaceholder: "Rol ara...",
            filters: ["Tümü", "Admin", "Operasyon", "Finans"],
            columns: [
              { label: "Rol", key: "name" },
              { label: "Kapsam", key: "scope" },
              { label: "Uye", key: "users" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "Super Admin", sort: { name: "Super Admin", scope: "Tüm modüller", users: 2, status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>Super Admin</p>", "<p class='text-sm text-slate-600'>Tüm modüller ve ayarlar</p>", "<p class='text-sm text-slate-600'>2 kullanıcı</p>", badge("Aktif", "emerald"), rowMenu()] },
              { search: "Operasyon", sort: { name: "Operasyon", scope: "Sipariş", users: 4, status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>Operasyon Yöneticisi</p>", "<p class='text-sm text-slate-600'>Sipariş, stok, kargo</p>", "<p class='text-sm text-slate-600'>4 kullanıcı</p>", badge("Aktif", "emerald"), rowMenu()] },
              { search: "Finans", sort: { name: "Finans", scope: "Finance", users: 2, status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>Finans Yetkilisi</p>", "<p class='text-sm text-slate-600'>Finans ve rapor export</p>", "<p class='text-sm text-slate-600'>2 kullanıcı</p>", badge("Aktif", "emerald"), rowMenu()] },
            ],
          },
          sideChart: { title: "Rol dağılımı", preset: "roleDistribution" },
        }),
    },
    "permission-matrix": {
      title: "Permission Matrix",
      eyebrow: "Modül bazlı yetki matrisi",
      description: "Görüntüle, düzenle ve yayınla yetkilerini modül bazlı yönetin.",
      href: "users/permission-matrix.html",
      actions: [{ label: "Matrisi Güncelle", icon: "save", href: "#", variant: "primary" }],
      highlights: [
        { label: "Modül", value: "12" },
        { label: "Rol", value: "5" },
        { label: "Audit", value: "Açık" },
        { label: "2FA", value: "Zorunlu" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Permission matrix",
          tableSubtitle: "Modül bazlı okuma, düzenleme ve yayınlama erişimi.",
          table: {
            searchPlaceholder: "Modül ara...",
            filters: ["Tümü", "Tam Yetki", "Sinirli", "Yayın"],
            columns: [
              { label: "Modül", key: "module" },
              { label: "Görüntüle", key: "read" },
              { label: "Düzenle", key: "edit" },
              { label: "Yayınla", key: "publish" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "Ürünler", sort: { module: "Ürünler", read: 1, edit: 1, publish: 1 }, cells: ["<p class='text-sm font-bold text-slate-900'>Ürünler</p>", badge("Evet", "emerald"), badge("Evet", "emerald"), badge("Evet", "emerald"), rowMenu()] },
              { search: "Finans", sort: { module: "Finans", read: 1, edit: 0, publish: 0 }, cells: ["<p class='text-sm font-bold text-slate-900'>Finans</p>", badge("Evet", "emerald"), badge("Hayir", "amber"), badge("Hayir", "amber"), rowMenu()] },
              { search: "Ayarlar", sort: { module: "Ayarlar", read: 1, edit: 0, publish: 0 }, cells: ["<p class='text-sm font-bold text-slate-900'>Ayarlar</p>", badge("Sinirli", "sky"), badge("Hayir", "amber"), badge("Hayir", "amber"), rowMenu()] },
            ],
          },
          sideChart: { title: "Rol dağılımı", preset: "roleDistribution" },
          sideInsights: {
            title: "Yetki notlari",
            items: [
              { title: "Finans erişimi", text: "Finans modülü yalnizca read/export seviyesinde tutuluyor.", tag: "Sinirli", tone: "amber" },
              { title: "Yayın yetkisi", text: "Yayın yetkileri yalnizca katalog ve CMS tarafında tam açık.", tag: "Kontrol", tone: "sky" },
            ],
          },
        }),
    },
  });
  Object.assign(window.KAPageRegistry, {
    "activity-logs": {
      title: "Activity Logs",
      eyebrow: "Denetim ve audit loglari",
      description: "Kullanıcı aksiyonlarını zaman, modül ve risk seviyesine göre izleyin.",
      href: "users/activity-logs.html",
      actions: [{ label: "Log Export", icon: "download", href: "#", variant: "primary" }],
      highlights: [
        { label: "Log", value: "12,4K" },
        { label: "Kritik", value: "14" },
        { label: "2FA", value: "%83" },
        { label: "Audit", value: "Canlı" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Audit trail",
          tableSubtitle: "Modül, aksiyon ve IP bilgileriyle aktivite kayitlari.",
          table: {
            searchPlaceholder: "Kullanıcı veya olay ara...",
            filters: ["Tümü", "Kritik", "Login", "Export"],
            columns: [
              { label: "Kullanıcı", key: "user" },
              { label: "Olay", key: "event" },
              { label: "Modül", key: "module" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "Selin Akin export", sort: { user: "Selin", event: "Export", module: "Finans", status: "Başarılı" }, cells: ["<p class='text-sm font-bold text-slate-900'>Selin Akin</p><p class='mt-1 text-sm text-slate-500'>09:13 / Istanbul</p>", "<p class='text-sm text-slate-600'>Finans raporu export</p>", "<p class='text-sm text-slate-600'>Finans</p>", badge("Başarılı", "emerald"), rowMenu()] },
              { search: "Melis Sahin 2FA", sort: { user: "Melis", event: "2FA", module: "Users", status: "İncele" }, cells: ["<p class='text-sm font-bold text-slate-900'>Melis Sahin</p><p class='mt-1 text-sm text-slate-500'>Dun 18:22 / Chrome</p>", "<p class='text-sm text-slate-600'>2FA devre disi birakma talebi</p>", "<p class='text-sm text-slate-600'>Users</p>", badge("İncele", "amber"), rowMenu()] },
              { search: "Cem Yılmaz login", sort: { user: "Cem", event: "Login", module: "Orders", status: "Başarılı" }, cells: ["<p class='text-sm font-bold text-slate-900'>Cem Yılmaz</p><p class='mt-1 text-sm text-slate-500'>Bugün 08:47 / Ankara</p>", "<p class='text-sm text-slate-600'>Yönetici girişi</p>", "<p class='text-sm text-slate-600'>Orders</p>", badge("Başarılı", "emerald"), rowMenu()] },
            ],
          },
          sideChart: { title: "Login activity", preset: "loginActivity" },
        }),
    },
    "login-history": {
      title: "Login History",
      eyebrow: "Giriş davranışı ve güvenlik",
      description: "Admin girişlerini cihaz, bölge ve 2FA sinyalleriyle takip edin.",
      href: "users/login-history.html",
      actions: [{ label: "Güvenlik Export", icon: "file-output", href: "#", variant: "primary" }],
      highlights: [
        { label: "Bugün", value: "36 giriş" },
        { label: "2FA", value: "%83" },
        { label: "Anomali", value: "1" },
        { label: "Başarısız", value: "3" },
      ],
      render: () =>
        renderInsightPage({
          primaryTitle: "Login activity",
          primarySubtitle: "Gün ve ekip bazlı giriş yoğunluğu.",
          primaryChart: "loginActivity",
          primaryStats: [
            { label: "Super Admin", value: "6 giriş", note: "Düşük hacim" },
            { label: "Operasyon", value: "14 giriş", note: "En yoğun ekip" },
            { label: "Pazarlama", value: "9 giriş", note: "Mesai saatleri" },
            { label: "Finans", value: "7 giriş", note: "Günlük kontrol" },
          ],
          secondaryTitle: "Role split",
          secondaryChart: "roleDistribution",
          insights: [
            { title: "Anomali tespiti", text: "Bir kullanıcıda farkli sehirden ardIsik giriş sinyali kaydedildi.", tag: "1 olay", tone: "amber" },
            { title: "2FA kapsamı", text: "Yönetici hesaplarının büyük kısmı iki aşamalı doğrulama ile korunuyor.", tag: "%83", tone: "emerald" },
            { title: "Başarısız denemeler", text: "Uç başarısız deneme rate limit sonrasinda bloke edildi.", tag: "3", tone: "sky" },
          ],
        }),
    },
    "marketplace-integrations": {
      title: "Marketplace Integrations",
      eyebrow: "Pazar yeri baglantilari",
      description: "Sipariş, stok ve fiyat senkronunu pazar yerleri bazında yönetin.",
      href: "integrations/marketplace-integrations.html",
      actions: [{ label: "Marketplace Sync", icon: "refresh-cw", modalKey: "syncIntegration", variant: "primary" }],
      highlights: [
        { label: "Kanal", value: "3 aktif" },
        { label: "Sağlık", value: "%99,2" },
        { label: "Uyarı", value: "1 kanal" },
        { label: "Webhook", value: "Canlı" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Marketplace registry",
          tableSubtitle: "Pazar yeri bazlı sağlık ve son senkron durumu.",
          table: {
            searchPlaceholder: "Kanal ara...",
            filters: ["Tümü", "Senkron", "Uyarı", "Pilot"],
            columns: [
              { label: "Servis", key: "name" },
              { label: "Tip", key: "type" },
              { label: "Sağlık", key: "health" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: integrations
              .filter((item) => item.type === "Pazar Yeri")
              .map((item) => ({
                search: `${item.name} ${item.type}`,
                sort: { name: item.name, type: item.type, health: parseFloat(String(item.health).replace("%", "")), status: item.status },
                cells: [
                  `<p class='text-sm font-bold text-slate-900'>${item.name}</p><p class='mt-1 text-sm text-slate-500'>${item.lastSync}</p>`,
                  `<p class='text-sm text-slate-600'>${item.type}</p>`,
                  `<p class='text-sm text-slate-600'>${item.health}</p>`,
                  badge(item.status, item.tone),
                  rowMenu(),
                ],
              })),
          },
          sideChart: { title: "Marketplace health", preset: "marketplaceHealth" },
        }),
    },
    "accounting-integrations": {
      title: "Accounting Integrations",
      eyebrow: "Muhasebe baglantilari",
      description: "Fatura, tahsilat ve vergi senkronlarını muhasebe servisleriyle yönetin.",
      href: "integrations/accounting-integrations.html",
      actions: [{ label: "Muhasebe Sync", icon: "refresh-cw", modalKey: "syncIntegration", variant: "primary" }],
      highlights: [
        { label: "Servis", value: "3" },
        { label: "Sağlık", value: "%99,8" },
        { label: "Belge", value: "E-Fatura" },
        { label: "KDV", value: "Senkron" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Accounting stack",
          tableSubtitle: "Muhasebe servislerinin belge ve tahsilat senkronu.",
          table: {
            searchPlaceholder: "Servis ara...",
            filters: ["Tümü", "Aktif", "Yedek", "Pilot"],
            columns: [
              { label: "Servis", key: "name" },
              { label: "Görev", key: "scope" },
              { label: "Sağlık", key: "health" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "Parasut Muhasebe", sort: { name: "Parasut", scope: "Belge", health: 99.8, status: "Senkron" }, cells: ["<p class='text-sm font-bold text-slate-900'>Parasut</p><p class='mt-1 text-sm text-slate-500'>Birincil muhasebe entegrasyonu</p>", "<p class='text-sm text-slate-600'>Fatura + tahsilat</p>", "<p class='text-sm text-slate-600'>%99,8</p>", badge("Senkron", "emerald"), rowMenu()] },
              { search: "Logo Yedek", sort: { name: "Logo", scope: "Belge", health: 97.2, status: "Hazır" }, cells: ["<p class='text-sm font-bold text-slate-900'>Logo</p><p class='mt-1 text-sm text-slate-500'>Yedek belge akışı</p>", "<p class='text-sm text-slate-600'>Belge senkronu</p>", "<p class='text-sm text-slate-600'>%97,2</p>", badge("Hazır", "sky"), rowMenu()] },
              { search: "Mikro Pilot", sort: { name: "Mikro", scope: "Vergi", health: 94.9, status: "Pilot" }, cells: ["<p class='text-sm font-bold text-slate-900'>Mikro</p><p class='mt-1 text-sm text-slate-500'>Vergi ve stok pilotu</p>", "<p class='text-sm text-slate-600'>Vergi + stok</p>", "<p class='text-sm text-slate-600'>%94,9</p>", badge("Pilot", "amber"), rowMenu()] },
            ],
          },
          sideChart: { title: "API calls", preset: "apiCalls" },
        }),
    },
  });
  Object.assign(window.KAPageRegistry, {
    "crm-integrations": {
      title: "CRM Integrations",
      eyebrow: "CRM ve sadakat baglantilari",
      description: "Müşteri profili, segment ve not senkronlarını CRM servisleriyle yönetin.",
      href: "integrations/crm-integrations.html",
      actions: [{ label: "CRM Sync", icon: "refresh-cw", modalKey: "syncIntegration", variant: "primary" }],
      highlights: [
        { label: "CRM", value: "2 servis" },
        { label: "Segment", value: "8 aktif" },
        { label: "Sync", value: "%99" },
        { label: "Note", value: "Canlı" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "CRM connections",
          tableSubtitle: "Segment, not ve profil senkronlarını yönetin.",
          table: {
            searchPlaceholder: "CRM servis ara...",
            filters: ["Tümü", "Aktif", "Pilot", "Webhook"],
            columns: [
              { label: "Servis", key: "name" },
              { label: "Kapsam", key: "scope" },
              { label: "Sync", key: "sync" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "HubSpot Segment", sort: { name: "HubSpot", scope: "Segment", sync: 99, status: "Bagli" }, cells: ["<p class='text-sm font-bold text-slate-900'>HubSpot</p><p class='mt-1 text-sm text-slate-500'>Segment + lifecycle sync</p>", "<p class='text-sm text-slate-600'>Profil ve segment</p>", "<p class='text-sm text-slate-600'>%99</p>", badge("Bagli", "sky"), rowMenu()] },
              { search: "Salesforce Note", sort: { name: "Salesforce", scope: "Notlar", sync: 96, status: "Pilot" }, cells: ["<p class='text-sm font-bold text-slate-900'>Salesforce</p><p class='mt-1 text-sm text-slate-500'>Destek ve note akışı</p>", "<p class='text-sm text-slate-600'>Not + ticket</p>", "<p class='text-sm text-slate-600'>%96</p>", badge("Pilot", "amber"), rowMenu()] },
            ],
          },
          sideChart: { title: "CRM sync", preset: "crmSync" },
        }),
    },
    "analytics-integrations": {
      title: "Analytics Integrations",
      eyebrow: "Ölçümleme ve event altyapısı",
      description: "Analytics, pixel ve feed servislerini event kalitesi ile yönetin.",
      href: "integrations/analytics-integrations.html",
      actions: [{ label: "Event Sync", icon: "refresh-cw", modalKey: "syncIntegration", variant: "primary" }],
      highlights: [
        { label: "Analytics", value: "4 servis" },
        { label: "Event", value: "Canlı" },
        { label: "Latency", value: "142 ms" },
        { label: "Health", value: "%99,3" },
      ],
      render: () =>
        renderInsightPage({
          primaryTitle: "API calls",
          primarySubtitle: "Event hacmi ve API çağrılarını izleyin.",
          primaryChart: "apiCalls",
          primaryStats: [
            { label: "Google Analytics", value: "Aktif", note: "Server-side event" },
            { label: "Merchant Center", value: "Aktif", note: "Feed senkronu" },
            { label: "Meta Pixel", value: "Aktif", note: "Conversions API" },
            { label: "TikTok Pixel", value: "Hazır", note: "Event mapping" },
          ],
          secondaryTitle: "Marketplace health",
          secondaryChart: "marketplaceHealth",
          insights: [
            { title: "Event kalitesi iyi", text: "Purchase, add_to_cart ve view_item eventleri tutarli ilerliyor.", tag: "Sağlıklı", tone: "emerald" },
            { title: "Latency geriledi", text: "Ölçümleme katmaninda ortalama API gecikmesi iyileşti.", tag: "142 ms", tone: "sky" },
            { title: "Feed kontrolü", text: "Merchant Center tarafında feed validasyonları düzenli izlenmeli.", tag: "Izle", tone: "amber" },
          ],
        }),
    },
    "currency-settings": {
      title: "Currency Settings",
      eyebrow: "Para birimi ve kur mantigi",
      description: "Varsayılan para birimi, desteklenen dövizler ve yuvarlama kurallarını yönetin.",
      href: "settings/currency-settings.html",
      actions: [{ label: "Kuralları Kaydet", icon: "save", href: "#", variant: "primary" }],
      highlights: [
        { label: "Varsayılan", value: "TRY" },
        { label: "Destek", value: "4 döviz" },
        { label: "Rounding", value: "Aktif" },
        { label: "Kur", value: "Güncel" },
      ],
      render: () =>
        renderFormPage({
          formTitle: "Currency workspace",
          formSubtitle: "Desteklenen para birimleri ve fiyat kurallarını yönetin.",
          fields: [
            { label: "Varsayılan Para Birimi", type: "select", value: "TRY", options: ["TRY", "EUR", "USD", "GBP"] },
            { label: "Kur Kaynagi", type: "select", value: "Merkez banka feed", options: ["Merkez banka feed", "Manuel", "Sabit kur"] },
            { label: "Yuvarlama Kuralı", type: "select", value: "Psikolojik fiyat", options: ["Psikolojik fiyat", "Tam kur", "Elle"] },
            { label: "Fiyat Notu", type: "textarea", value: "Çoklu para birimi vitrinde, checkout aşamasında TRY tahsilati uygulanir.", span: "lg:col-span-2" },
            { label: "Aktif Dövizler", type: "checkbox-group", options: ["TRY", "EUR", "USD", "GBP"], checkedCount: 4 },
          ],
          sideChecklist: {
            title: "Kur durumu",
            items: [
              { label: "TRY", value: 100, text: "Aktif", color: "bg-emerald-500" },
              { label: "EUR", value: 82, text: "Hazır", color: "bg-slate-900" },
              { label: "USD", value: 78, text: "Hazır", color: "bg-sky-500" },
            ],
          },
          sideChart: { title: "Currency mix", preset: "currencyMix" },
        }),
    },
    "language-settings": {
      title: "Language Settings",
      eyebrow: "Dil ve locale kuralları",
      description: "Platform dil seçenekleri, lokalizasyon ve fallback davranışını yönetin.",
      href: "settings/language-settings.html",
      actions: [{ label: "Dil Ayarlarını Kaydet", icon: "save", href: "#", variant: "primary" }],
      highlights: [
        { label: "Varsayılan", value: "TR" },
        { label: "Destek", value: "3 locale" },
        { label: "Fallback", value: "EN" },
        { label: "CMS", value: "Hazır" },
      ],
      render: () =>
        renderFormPage({
          formTitle: "Language workspace",
          formSubtitle: "Dil seçenekleri, fallback ve locale davranışlarını yönetin.",
          fields: [
            { label: "Varsayılan Dil", type: "select", value: "Turkce", options: ["Turkce", "English", "Arabic"] },
            { label: "Fallback Dil", type: "select", value: "English", options: ["English", "Turkce", "Arabic"] },
            { label: "Tarih Formatı", type: "select", value: "tr-TR", options: ["tr-TR", "en-US", "ar-SA"] },
            { label: "Lokalizasyon Notu", type: "textarea", value: "CMS alanları locale bazlı yayına hazırdır. E-posta ve ödeme metinleri fallback ile çalışır.", span: "lg:col-span-2" },
            { label: "Aktif Localeler", type: "checkbox-group", options: ["TR", "EN", "AR", "DE"], checkedCount: 3 },
          ],
          sideChecklist: {
            title: "Dil kapsamı",
            items: [
              { label: "Storefront", value: 100, text: "Tamam", color: "bg-emerald-500" },
              { label: "CMS", value: 86, text: "%86", color: "bg-slate-900" },
              { label: "Mail şablonları", value: 72, text: "%72", color: "bg-sky-500" },
            ],
          },
          sideChart: { title: "Menü interactions", preset: "menuInteractions" },
        }),
    },
  });
  Object.assign(window.KAPageRegistry, {
    "email-templates": {
      title: "Email Templates",
      eyebrow: "Transactional mail merkezi",
      description: "Sipariş, teslimat ve pazarlama e-posta şablonlarını yönetin.",
      href: "settings/email-templates.html",
      actions: [{ label: "Şablon Ekle", icon: "plus", href: "#", variant: "primary" }],
      highlights: [
        { label: "Şablon", value: "16" },
        { label: "Locale", value: "3" },
        { label: "Preview", value: "Hazır" },
        { label: "Open Rate", value: "%39" },
      ],
      render: () =>
        renderManagementPage({
          tableTitle: "Template library",
          tableSubtitle: "Transactional ve marketing email şablonları.",
          table: {
            searchPlaceholder: "Şablon ara...",
            filters: ["Tümü", "Transactional", "Marketing", "Locale"],
            columns: [
              { label: "Şablon", key: "name" },
              { label: "Tip", key: "type" },
              { label: "Locale", key: "locale" },
              { label: "Durum", key: "status" },
              { label: "Aksiyon", key: "menu" },
            ],
            rows: [
              { search: "Order Confirmation", sort: { name: "Order Confirmation", type: "Transactional", locale: "TR", status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>Order Confirmation</p>", "<p class='text-sm text-slate-600'>Transactional</p>", "<p class='text-sm text-slate-600'>TR / EN / AR</p>", badge("Aktif", "emerald"), rowMenu()] },
              { search: "Shipping Update", sort: { name: "Shipping Update", type: "Transactional", locale: "TR", status: "Aktif" }, cells: ["<p class='text-sm font-bold text-slate-900'>Shipping Update</p>", "<p class='text-sm text-slate-600'>Transactional</p>", "<p class='text-sm text-slate-600'>TR / EN</p>", badge("Aktif", "emerald"), rowMenu()] },
              { search: "VIP Campaign", sort: { name: "VIP Campaign", type: "Marketing", locale: "TR", status: "Taslak" }, cells: ["<p class='text-sm font-bold text-slate-900'>VIP Campaign</p>", "<p class='text-sm text-slate-600'>Marketing</p>", "<p class='text-sm text-slate-600'>TR</p>", badge("Taslak", "amber"), rowMenu()] },
            ],
          },
          sideChart: { title: "Email engagement", preset: "emailEngagement" },
        }),
    },
    "notification-settings": {
      title: "Notification Settings",
      eyebrow: "Bildirim kanalları",
      description: "Admin, müşteri ve operasyon bildirim akışları ile kanal secimlerini yönetin.",
      href: "settings/notification-settings.html",
      actions: [{ label: "Bildirimleri Kaydet", icon: "save", href: "#", variant: "primary" }],
      highlights: [
        { label: "Mail", value: "Aktif" },
        { label: "Push", value: "Aktif" },
        { label: "SMS", value: "Sinirli" },
        { label: "Admin", value: "Canlı" },
      ],
      render: () =>
        renderFormPage({
          formTitle: "Notification workspace",
          formSubtitle: "Kanal bazlı bildirim tercihlerini ve kritik alarm akışlarını yönetin.",
          fields: [
            { label: "Sipariş Bildirimleri", type: "checkbox-group", options: ["Mail", "Push", "SMS", "In-app"], checkedCount: 3 },
            { label: "Stok Alarmi", type: "checkbox-group", options: ["Admin Mail", "Push", "Slack", "Webhook"], checkedCount: 3 },
            { label: "Kritik Alarm Politikası", type: "radio-group", options: ["Aninda", "15 dk özet", "Saatlik"], name: "notif-policy" },
            { label: "Bildirim Notu", type: "textarea", value: "Düşük stok, iade ve webhook hatalari için anlik yönetici bildirimi açıktır.", span: "lg:col-span-2" },
          ],
          sideChecklist: {
            title: "Kanal sagligi",
            items: [
              { label: "Mail", value: 100, text: "Aktif", color: "bg-emerald-500" },
              { label: "Push", value: 94, text: "%94", color: "bg-slate-900" },
              { label: "SMS", value: 68, text: "%68", color: "bg-amber-500" },
            ],
          },
          sideChart: { title: "API calls", preset: "apiCalls" },
        }),
    },
    "api-webhooks": {
      title: "API & Webhooks",
      eyebrow: "Entegrasyon altyapısı",
      description: "API çağrıları, webhook endpointleri ve retry politikalarını yönetin.",
      href: "settings/api-webhooks.html",
      actions: [{ label: "Endpoint Ekle", icon: "plus", href: "#", variant: "primary" }],
      highlights: [
        { label: "Endpoint", value: "3 aktif" },
        { label: "Retry", value: "3 deneme" },
        { label: "Latency", value: "142 ms" },
        { label: "Health", value: "%99,3" },
      ],
      render: () =>
        renderInsightPage({
          primaryTitle: "API calls",
          primarySubtitle: "Saat bazlı API çağrısı ve genel sağlık trendi.",
          primaryChart: "apiCalls",
          primaryStats: [
            { label: "order.created", value: "Aktif", note: "Canlı endpoint" },
            { label: "inventory.updated", value: "Aktif", note: "Canlı endpoint" },
            { label: "customer.updated", value: "Pilot", note: "Kontrollü rollout" },
            { label: "retry policy", value: "3x", note: "Exponential backoff" },
          ],
          secondaryTitle: "Compliance requests",
          secondaryChart: "complianceRequests",
          insights: [
            { title: "Latency düşük", text: "Ortalama API yanit suresi hedefin altında seyrediyor.", tag: "142 ms", tone: "emerald" },
            { title: "Webhook sagligi", text: "Sipariş ve stok endpointleri tutarli teslimat yapıyor.", tag: "%99,3", tone: "sky" },
            { title: "Pilot endpoint", text: "Customer update webhook'u kontrollü rollout aşamasında.", tag: "Pilot", tone: "amber" },
          ],
        }),
    },
    "gdpr-kvkk": {
      title: "GDPR / KVKK",
      eyebrow: "Uyumluluk ve veri talepleri",
      description: "Veri erişim, silme ve rıza akışlarını yönetin.",
      href: "settings/gdpr-kvkk.html",
      actions: [{ label: "Uyum Politikasını Kaydet", icon: "save", href: "#", variant: "primary" }],
      highlights: [
        { label: "Talep", value: "25" },
        { label: "Silme", value: "7" },
        { label: "SLA", value: "72 saat" },
        { label: "Rıza", value: "Arşivli" },
      ],
      render: () =>
        renderFormPage({
          formTitle: "Compliance workspace",
          formSubtitle: "Veri saklama, silme ve rıza politikalarını tek panelden yönetin.",
          fields: [
            { label: "Veri Saklama Suresi", type: "select", value: "24 ay", options: ["12 ay", "24 ay", "36 ay"] },
            { label: "Silme Talebi SLA", type: "select", value: "72 saat", options: ["24 saat", "72 saat", "7 gün"] },
            { label: "Rıza Kanalları", type: "checkbox-group", options: ["Mail", "SMS", "Push", "Cookie"], checkedCount: 4 },
            { label: "Talep Politikası", type: "radio-group", options: ["Otomatik queue", "DPO onayı", "Manuel inceleme"], name: "compliance-policy" },
            { label: "Uyum Notu", type: "textarea", value: "Veri erişim ve silme talepleri merkezi queue üzerinden operasyon ve hukuk takibi ile işlenir.", span: "lg:col-span-2" },
          ],
          sideChecklist: {
            title: "Uyum kapsamı",
            items: [
              { label: "Rıza kaydi", value: 100, text: "Tamam", color: "bg-emerald-500" },
              { label: "Silme akışı", value: 88, text: "%88", color: "bg-slate-900" },
              { label: "Export talebi", value: 76, text: "%76", color: "bg-sky-500" },
            ],
          },
          sideChart: { title: "Compliance requests", preset: "complianceRequests" },
        }),
    },
  });
})();
