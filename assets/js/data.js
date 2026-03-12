window.KAUtils = {
  currencyFormatter: new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }),
  numberFormatter: new Intl.NumberFormat("tr-TR"),
  compactFormatter: new Intl.NumberFormat("tr-TR", {
    notation: "compact",
    maximumFractionDigits: 1,
  }),
  fullDateFormatter: new Intl.DateTimeFormat("tr-TR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
  money(value) {
    return this.currencyFormatter.format(value);
  },
  number(value) {
    return this.numberFormatter.format(value);
  },
  compact(value) {
    return this.compactFormatter.format(value);
  },
  relativeTime(minutesAgo) {
    if (minutesAgo < 1) return "Şimdi";
    if (minutesAgo < 60) return `${minutesAgo} dk önce`;
    const hours = Math.floor(minutesAgo / 60);
    if (hours < 24) return `${hours} sa önce`;
    const days = Math.floor(hours / 24);
    return days === 1 ? "Dün" : `${days} gün önce`;
  },
  toneForStatus(status) {
    if (["Aktif", "Ödendi", "Teslim Edildi", "Senkron", "Bağlı", "Yayında"].includes(status)) {
      return "emerald";
    }
    if (["Kargoda", "Canlı", "Hazırlanıyor"].includes(status)) {
      return "sky";
    }
    if (["Kritik Stok", "Uyarı", "Planlandı", "Pilot"].includes(status)) {
      return "amber";
    }
    if (["İptal", "İade Bekliyor", "Kapalı", "Riskli"].includes(status)) {
      return "rose";
    }
    return "slate";
  },
};

window.KADashboardData = {
  navSections: [
    {
      title: "Kontrol Merkezi",
      items: [
        { key: "dashboard", label: "Kontrol Merkezi", href: "dashboard.html", icon: "layout-dashboard" },
      ],
    },
    {
      title: "Analitik",
      items: [
        { key: "sales-analytics", label: "Satış Analitiği", href: "analytics/sales-analytics.html", icon: "chart-column-big" },
        { key: "revenue-analytics", label: "Gelir Analitiği", href: "analytics/revenue-analytics.html", icon: "wallet" },
        { key: "traffic-analytics", label: "Trafik Analitiği", href: "analytics/traffic-analytics.html", icon: "activity" },
        { key: "customer-analytics", label: "Müşteri Analitiği", href: "analytics/customer-analytics.html", icon: "users-round" },
        { key: "sales-reports", label: "Satış Raporları", href: "analytics/sales-reports.html", icon: "file-output" },
        { key: "customer-insights", label: "Müşteri İçgörüsü", href: "analytics/customer-insights.html", icon: "search-check" },
      ],
    },
    {
      title: "Ürünler",
      items: [
        { key: "products", label: "Ürün Listesi", href: "products.html", icon: "package-search" },
        { key: "product-add", label: "Ürün Ekle", href: "products/product-add.html", icon: "plus" },
        { key: "categories", label: "Kategoriler", href: "categories.html", icon: "folders" },
        { key: "brands", label: "Markalar", href: "products/brands.html", icon: "badge-check" },
        { key: "product-reviews", label: "Yorumlar", href: "products/product-reviews.html", icon: "message-square-more" },
      ],
    },
    {
      title: "Stok & Depo",
      items: [
        { key: "inventory-overview", label: "Stok Genel Görünüm", href: "inventory/inventory-overview.html", icon: "boxes" },
        { key: "stock-list", label: "Stok Listesi", href: "inventory/stock-list.html", icon: "package-open" },
        { key: "warehouses", label: "Depolar", href: "inventory/warehouses.html", icon: "warehouse" },
        { key: "low-stock-alerts", label: "Kritik Stok Uyarıları", href: "inventory/low-stock-alerts.html", icon: "triangle-alert" },
        { key: "stock-movements", label: "Stok Hareket Geçmişi", href: "inventory/stock-movements.html", icon: "move-right" },
      ],
    },
    {
      title: "Siparişler",
      items: [
        { key: "orders", label: "Sipariş Listesi", href: "orders.html", icon: "shopping-cart" },
        { key: "returns-management", label: "İadeler", href: "orders/returns-management.html", icon: "rotate-ccw" },
        { key: "refund-management", label: "Geri Ödemeler", href: "orders/refund-management.html", icon: "banknote-arrow-down" },
        { key: "order-invoice", label: "Sipariş Faturası", href: "orders/order-invoice.html", icon: "receipt-text" },
        { key: "shipping-label", label: "Kargo Etiketi", href: "orders/shipping-label.html", icon: "tag" },
      ],
    },
    {
      title: "Müşteriler",
      items: [
        { key: "customers", label: "Müşteri Listesi", href: "customers.html", icon: "users-round" },
        { key: "customer-profile", label: "Müşteri Profili", href: "customers/customer-profile.html", icon: "user-round" },
        { key: "customer-segments", label: "Segmentler", href: "customers/customer-segments.html", icon: "folders" },
        { key: "customer-notes", label: "Müşteri Notları", href: "customers/customer-notes.html", icon: "file-pen-line" },
      ],
    },
    {
      title: "Finans",
      items: [
        { key: "revenue-reports", label: "Gelir Raporları", href: "finance/revenue-reports.html", icon: "banknote-arrow-up" },
        { key: "expense-reports", label: "Gider Raporları", href: "finance/expense-reports.html", icon: "banknote-arrow-down" },
        { key: "invoice-archive", label: "Fatura Arşivi", href: "finance/invoice-archive.html", icon: "file-stack" },
        { key: "payment-methods", label: "Ödeme Yöntemleri", href: "finance/payment-methods.html", icon: "credit-card" },
        { key: "tax-settings", label: "Vergi Ayarları", href: "finance/tax-settings.html", icon: "badge-percent" },
      ],
    },
    {
      title: "Pazarlama",
      items: [
        { key: "coupon-management", label: "Kupon Yönetimi", href: "marketing/coupon-management.html", icon: "ticket-percent" },
        { key: "campaign-management", label: "Kampanya Yönetimi", href: "marketing/campaign-management.html", icon: "megaphone" },
        { key: "flash-sale", label: "Flash Sale", href: "marketing/flash-sale.html", icon: "zap" },
        { key: "email-marketing", label: "E-posta Pazarlama", href: "marketing/email-marketing.html", icon: "mail-plus" },
        { key: "push-notifications", label: "Push Bildirimleri", href: "marketing/push-notifications.html", icon: "bell-ring" },
        { key: "reviews-management", label: "Yorum Yönetimi", href: "marketing/reviews-management.html", icon: "message-square-more" },
      ],
    },
    {
      title: "Kargo & Lojistik",
      items: [
        { key: "shipping-providers", label: "Kargo Firmaları", href: "shipping/shipping-providers.html", icon: "truck" },
        { key: "shipping-rules", label: "Kargo Kuralları", href: "shipping/shipping-rules.html", icon: "sliders-horizontal" },
        { key: "delivery-zones", label: "Teslimat Bölgeleri", href: "shipping/delivery-zones.html", icon: "map" },
        { key: "shipping-rates", label: "Kargo Ücretleri", href: "shipping/shipping-rates.html", icon: "badge-dollar-sign" },
      ],
    },
    {
      title: "İçerik Yönetimi",
      items: [
        { key: "page-management", label: "Sayfa Yönetimi", href: "cms/page-management.html", icon: "files" },
        { key: "blog-management", label: "Blog Yönetimi", href: "cms/blog-management.html", icon: "newspaper" },
        { key: "banner-management", label: "Banner Yönetimi", href: "cms/banner-management.html", icon: "image-up" },
        { key: "popup-management", label: "Popup Yönetimi", href: "cms/popup-management.html", icon: "panel-top-open" },
        { key: "menu-builder", label: "Menü Oluşturucu", href: "cms/menu-builder.html", icon: "panel-top-open" },
      ],
    },
    {
      title: "Kullanıcılar & Yetkiler",
      items: [
        { key: "admin-users", label: "Admin Kullanıcılar", href: "users/admin-users.html", icon: "shield-check" },
        { key: "role-management", label: "Rol Yönetimi", href: "users/role-management.html", icon: "shield-check" },
        { key: "permission-matrix", label: "Yetki Matrisi", href: "users/permission-matrix.html", icon: "file-stack" },
        { key: "activity-logs", label: "Aktivite Kayıtları", href: "users/activity-logs.html", icon: "history" },
        { key: "login-history", label: "Giriş Geçmişi", href: "users/login-history.html", icon: "log-in" },
      ],
    },
    {
      title: "Entegrasyonlar",
      items: [
        { key: "marketplace-integrations", label: "Pazar Yerleri", href: "integrations/marketplace-integrations.html", icon: "shopping-cart" },
        { key: "accounting-integrations", label: "Muhasebe", href: "integrations/accounting-integrations.html", icon: "wallet" },
        { key: "crm-integrations", label: "CRM", href: "integrations/crm-integrations.html", icon: "users-round" },
        { key: "analytics-integrations", label: "Analitik Araçlar", href: "integrations/analytics-integrations.html", icon: "chart-column-big" },
      ],
    },
    {
      title: "Ayarlar",
      items: [
        { key: "general-settings", label: "Genel Ayarlar", href: "settings/general-settings.html", icon: "settings-2" },
        { key: "currency-settings", label: "Para Birimi Ayarları", href: "settings/currency-settings.html", icon: "coins" },
        { key: "language-settings", label: "Dil Ayarları", href: "settings/language-settings.html", icon: "languages" },
        { key: "email-templates", label: "E-posta Şablonları", href: "settings/email-templates.html", icon: "mail" },
        { key: "notification-settings", label: "Bildirim Ayarları", href: "settings/notification-settings.html", icon: "bell-dot" },
        { key: "api-webhooks", label: "API & Webhooklar", href: "settings/api-webhooks.html", icon: "webhook" },
        { key: "gdpr-kvkk", label: "GDPR / KVKK", href: "settings/gdpr-kvkk.html", icon: "shield-alert" },
      ],
    },
  ],
  notificationFeed: [
    {
      title: "Düşük stok alarmı",
      body: "Nebula X1 Siyah varyantı kritik eşik altına düştü.",
      time: "2 dk önce",
      tone: "amber",
      icon: "triangle-alert",
      read: false,
    },
    {
      title: "Yeni sipariş akışı",
      body: "Amazon kanalından 14 sipariş başarıyla içeri aktarıldı.",
      time: "12 dk önce",
      tone: "sky",
      icon: "truck",
      read: false,
    },
    {
      title: "Kupon performansı arttı",
      body: "SPRING26 kampanyası hedef ROAS değerini geçti.",
      time: "28 dk önce",
      tone: "emerald",
      icon: "badge-percent",
      read: false,
    },
  ],
  products: [
    {
      name: "Nebula X1 Kablosuz Kulaklık",
      sku: "KA-AUD-1042",
      brand: "Auris",
      category: "Elektronik",
      price: 4599,
      stock: 42,
      sales: 982,
      variants: 6,
      status: "Aktif",
      channel: "4 kanal",
      accent: "from-cyan-100 to-teal-100",
      initials: "NX",
    },
    {
      name: "Vertex Denim Overshirt",
      sku: "KA-FSN-8831",
      brand: "Modeva",
      category: "Moda",
      price: 3299,
      stock: 18,
      sales: 744,
      variants: 8,
      status: "Aktif",
      channel: "3 kanal",
      accent: "from-amber-100 to-orange-100",
      initials: "VD",
    },
    {
      name: "Luna Skin Repair Serum",
      sku: "KA-BEA-5520",
      brand: "Lunelle",
      category: "Kozmetik",
      price: 1199,
      stock: 126,
      sales: 1332,
      variants: 2,
      status: "Aktif",
      channel: "5 kanal",
      accent: "from-rose-100 to-orange-100",
      initials: "LS",
    },
    {
      name: "AeroTrail Koşu Ayakkabısı",
      sku: "KA-SPR-2194",
      brand: "Stride",
      category: "Spor",
      price: 3890,
      stock: 9,
      sales: 540,
      variants: 10,
      status: "Kritik Stok",
      channel: "2 kanal",
      accent: "from-lime-100 to-emerald-100",
      initials: "AT",
    },
    {
      name: "Bloom Seramik Kupa Seti",
      sku: "KA-HOM-4802",
      brand: "Noma",
      category: "Ev & Yaşam",
      price: 890,
      stock: 76,
      sales: 402,
      variants: 4,
      status: "Taslak",
      channel: "1 kanal",
      accent: "from-violet-100 to-slate-100",
      initials: "BK",
    },
    {
      name: "Nova Akıllı Masa Lambası",
      sku: "KA-HOM-9304",
      brand: "Volt",
      category: "Akıllı Ev",
      price: 2790,
      stock: 31,
      sales: 318,
      variants: 3,
      status: "Aktif",
      channel: "2 kanal",
      accent: "from-sky-100 to-indigo-100",
      initials: "NL",
    },
  ],
  orders: [
    {
      id: "#ORD-12984",
      customer: "Elif Yıldırım",
      city: "İstanbul",
      total: 6840,
      items: 3,
      status: "Hazırlanıyor",
      payment: "Ödendi",
      shipping: "Yurtiçi Kargo",
      channel: "Shopify",
      risk: "Düşük",
    },
    {
      id: "#ORD-12983",
      customer: "Berk Çetin",
      city: "Ankara",
      total: 2190,
      items: 1,
      status: "Kargoda",
      payment: "Ödendi",
      shipping: "MNG",
      channel: "Trendyol",
      risk: "Düşük",
    },
    {
      id: "#ORD-12982",
      customer: "Ayşe Demir",
      city: "İzmir",
      total: 15990,
      items: 5,
      status: "Teslim Edildi",
      payment: "Ödendi",
      shipping: "Aras",
      channel: "Web",
      risk: "Orta",
    },
    {
      id: "#ORD-12981",
      customer: "Mert Kaya",
      city: "Bursa",
      total: 980,
      items: 2,
      status: "İptal",
      payment: "İade Bekliyor",
      shipping: "Yurtiçi Kargo",
      channel: "Amazon",
      risk: "Düşük",
    },
    {
      id: "#ORD-12980",
      customer: "Sena Arslan",
      city: "Antalya",
      total: 4340,
      items: 2,
      status: "Kargoda",
      payment: "Ödendi",
      shipping: "HepsiJET",
      channel: "Hepsiburada",
      risk: "Yüksek",
    },
    {
      id: "#ORD-12979",
      customer: "Kerem Güneş",
      city: "Adana",
      total: 7720,
      items: 4,
      status: "Hazırlanıyor",
      payment: "Kapıda Ödeme",
      shipping: "Sürat Kargo",
      channel: "Web",
      risk: "Orta",
    },
  ],
  customers: [
    {
      name: "Elif Yıldırım",
      email: "elif@ornek.com",
      segment: "VIP",
      city: "İstanbul",
      orders: 26,
      ltv: 43890,
      aov: 1688,
      lastOrder: "Bugün",
      initials: "EY",
      accent: "from-cyan-100 to-teal-100",
    },
    {
      name: "Berk Çetin",
      email: "berk@ornek.com",
      segment: "Sadık",
      city: "Ankara",
      orders: 14,
      ltv: 21420,
      aov: 1530,
      lastOrder: "Dün",
      initials: "BÇ",
      accent: "from-amber-100 to-orange-100",
    },
    {
      name: "Ayşe Demir",
      email: "ayse@ornek.com",
      segment: "Tekrar Satın Alan",
      city: "İzmir",
      orders: 9,
      ltv: 12870,
      aov: 1430,
      lastOrder: "2 gün önce",
      initials: "AD",
      accent: "from-rose-100 to-orange-100",
    },
    {
      name: "Mert Kaya",
      email: "mert@ornek.com",
      segment: "Riskli",
      city: "Bursa",
      orders: 4,
      ltv: 4890,
      aov: 1222,
      lastOrder: "4 gün önce",
      initials: "MK",
      accent: "from-lime-100 to-emerald-100",
    },
    {
      name: "Sena Arslan",
      email: "sena@ornek.com",
      segment: "Yeni",
      city: "Antalya",
      orders: 2,
      ltv: 2640,
      aov: 1320,
      lastOrder: "Bugün",
      initials: "SA",
      accent: "from-sky-100 to-indigo-100",
    },
  ],
  categoryData: [
    { name: "Elektronik", revenue: 482000, growth: "+18%", items: 320, subcategories: 24, conversion: "%5,4" },
    { name: "Moda", revenue: 391000, growth: "+11%", items: 510, subcategories: 38, conversion: "%4,8" },
    { name: "Kozmetik", revenue: 214000, growth: "+22%", items: 180, subcategories: 15, conversion: "%6,1" },
    { name: "Spor", revenue: 173000, growth: "+9%", items: 136, subcategories: 11, conversion: "%4,2" },
  ],
  inventoryAlerts: [
    { name: "AeroTrail / Siyah / 42", qty: 3, warehouse: "İstanbul Merkez", trend: "-12 adet", tone: "rose" },
    { name: "Vertex Denim / Indigo / L", qty: 5, warehouse: "Ankara Fulfillment", trend: "-7 adet", tone: "amber" },
    { name: "Nebula X1 / Siyah", qty: 7, warehouse: "İstanbul Merkez", trend: "-9 adet", tone: "amber" },
    { name: "Nova Masa Lambası / Beyaz", qty: 4, warehouse: "Ege Mikro Depo", trend: "-6 adet", tone: "rose" },
  ],
  warehouses: [
    { name: "İstanbul Merkez", stock: 18420, capacity: 82, pending: 128, transfer: 14 },
    { name: "Ankara Fulfillment", stock: 9230, capacity: 68, pending: 76, transfer: 7 },
    { name: "Ege Mikro Depo", stock: 4140, capacity: 57, pending: 29, transfer: 4 },
  ],
  stockMovements: [
    { title: "Transfer talebi onaylandı", body: "İstanbul Merkez -> Ankara Fulfillment / 120 adet", time: "09:12" },
    { title: "Toplu stok güncellemesi", body: "CSV ile 44 varyant stok seviyesi güncellendi", time: "08:48" },
    { title: "Kritik stok alarmı", body: "AeroTrail koşu ayakkabısı 3 adet seviyesine indi", time: "08:17" },
    { title: "Depo sayımı tamamlandı", body: "Ege Mikro Depo için sapma oranı %0,8 olarak kaydedildi", time: "Dün" },
  ],
  campaigns: [
    { name: "SPRING26", channel: "Tüm kanallar", roas: 6.2, spend: 48000, revenue: 297000, status: "Aktif" },
    { name: "Flash Weekend", channel: "Web + App", roas: 4.1, spend: 19000, revenue: 78100, status: "Planlandı" },
    { name: "Cart Rescue Flow", channel: "E-posta", roas: 8.9, spend: 6200, revenue: 55180, status: "Aktif" },
  ],
  reportsCatalog: [
    { title: "Satış Raporu", description: "Günlük, haftalık ve kanal bazlı gelir kırılımları.", type: "PDF + Excel" },
    { title: "Kategori Bazlı Satış", description: "Kategori performansı, marj ve stok dönüş hızı.", type: "Excel" },
    { title: "Terk Edilen Sepet", description: "Kurtarma akışları ve segment bazlı geri kazanım oranı.", type: "PDF" },
    { title: "Dönüşüm Oranı", description: "Kanal, cihaz ve kampanya bazlı dönüşüm kıyasları.", type: "PDF + Excel" },
  ],
  cmsPages: [
    { name: "Anasayfa", type: "Landing", updated: "1 saat önce", status: "Yayında" },
    { name: "Hakkımızda", type: "Kurumsal", updated: "Dün", status: "Yayında" },
    { name: "İletişim", type: "Bilgilendirme", updated: "3 gün önce", status: "Yayında" },
    { name: "İlkbahar Kampanyası", type: "Landing", updated: "Taslak", status: "Taslak" },
  ],
  adminUsers: [
    { name: "Selin Akın", role: "Süper Admin", lastLogin: "Bugün 09:13", twoFactor: "Açık", scope: "Tüm modüller", initials: "SA" },
    { name: "Cem Yılmaz", role: "Operasyon Müdürü", lastLogin: "Bugün 08:47", twoFactor: "Açık", scope: "Sipariş, Kargo", initials: "CY" },
    { name: "Melis Şahin", role: "Pazarlama Uzmanı", lastLogin: "Dün 18:22", twoFactor: "Kapalı", scope: "Pazarlama, CMS", initials: "MŞ" },
    { name: "Kaan Erel", role: "Finans Yetkilisi", lastLogin: "Dün 17:05", twoFactor: "Açık", scope: "Finans, Raporlar", initials: "KE" },
  ],
  integrations: [
    { name: "Trendyol", type: "Pazar Yeri", status: "Senkron", health: "%99,2", lastSync: "3 dk önce", tone: "emerald" },
    { name: "Hepsiburada", type: "Pazar Yeri", status: "Senkron", health: "%98,6", lastSync: "8 dk önce", tone: "emerald" },
    { name: "Amazon", type: "Pazar Yeri", status: "Uyarı", health: "%94,1", lastSync: "17 dk önce", tone: "amber" },
    { name: "Paraşüt", type: "Muhasebe", status: "Senkron", health: "%99,8", lastSync: "12 dk önce", tone: "emerald" },
    { name: "Google Analytics", type: "Analitik", status: "Bağlı", health: "%100", lastSync: "Canlı", tone: "sky" },
    { name: "Meta Pixel", type: "Pazarlama", status: "Bağlı", health: "%97,4", lastSync: "Canlı", tone: "sky" },
  ],
  reviewQueue: [
    { customer: "Aslı", product: "Nebula X1", rating: 5, note: "Ses kalitesi çok güçlü, teslimat hızlı.", sentiment: "Olumlu" },
    { customer: "Tuna", product: "AeroTrail", rating: 3, note: "Numara kalıbı biraz dar, iade talebi açıldı.", sentiment: "Nötr" },
    { customer: "Zeynep", product: "Luna Serum", rating: 4, note: "Ambalaj premium, tekrar alırım.", sentiment: "Olumlu" },
  ],
  quickActions: [
    { label: "Yeni Ürün Ekle", description: "Kataloğa yeni ürün girin", href: "product-add.html", type: "Aksiyon" },
    { label: "Sipariş Detayı Aç", description: "Örnek sipariş detayı sayfası", href: "order-detail.html", type: "Kısayol" },
    { label: "Ürün Detayı Aç", description: "Detaylı ürün yönetim ekranı", href: "product-detail.html", type: "Kısayol" },
    { label: "Raporu Dışa Aktar", description: "Yönetici özeti oluştur", modalKey: "exportReports", type: "Aksiyon" },
    { label: "Yeni Kupon Akışı", description: "Kampanya kurgusunu başlat", modalKey: "createCoupon", type: "Aksiyon" },
  ],
  modalPresets: {
    exportReports: {
      eyebrow: "Dışa Aktarım",
      title: "Rapor Paketini Oluştur",
      description: "PDF, Excel veya e-posta akışı ile rapor paketini dışa aktarın.",
      body: `
        <div class="grid gap-4 md:grid-cols-3">
          ${["PDF Yönetici Özeti", "Excel Ham Veri", "Paylaşılabilir Link"]
            .map(
              (item, index) => `
                <div class="rounded-3xl border border-slate-200 bg-slate-50/80 p-4">
                  <span class="inline-flex h-11 w-11 items-center justify-center rounded-2xl ${index === 0 ? "bg-slate-900 text-white" : "bg-white text-slate-700"}"><i data-lucide="${index === 0 ? "file-output" : index === 1 ? "sheet" : "link"}" class="h-5 w-5"></i></span>
                  <h4 class="mt-4 text-sm font-bold text-slate-900">${item}</h4>
                  <p class="mt-2 text-sm text-slate-500">Hazır şablonlar ile saniyeler içinde rapor oluşturun.</p>
                </div>`,
            )
            .join("")}
        </div>
        <div class="mt-4 rounded-3xl border border-slate-200 bg-white p-4">
          <p class="text-xs font-semibold uppercase tracking-[0.28em] text-slate-400">Filtreler</p>
          <div class="mt-3 grid gap-3 md:grid-cols-2">
            <label class="surface-ring rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
              <span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Tarih Aralığı</span>
              <input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="Son 30 gün" />
            </label>
            <label class="surface-ring rounded-2xl border border-slate-200 bg-slate-50/70 px-4 py-3">
              <span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Kanal</span>
              <input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="Tüm satış kanalları" />
            </label>
          </div>
        </div>
      `,
      actions: [
        { label: "Vazgeç", variant: "secondary" },
        { label: "Excel Oluştur", variant: "secondary" },
        { label: "PDF Oluştur", variant: "primary" },
      ],
    },
    createCoupon: {
      eyebrow: "Pazarlama",
      title: "Yeni Kupon Akışı",
      description: "Kupon, segment ve teslim kanalı kurgusunu aynı modal içinde tanımlayın.",
      body: `
        <div class="grid gap-4 md:grid-cols-2">
          <label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3">
            <span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Kupon Kodu</span>
            <input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="SPRINGVIP" />
          </label>
          <label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3">
            <span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">İndirim Türü</span>
            <input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="Yüzde bazlı / %15" />
          </label>
          <label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3">
            <span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Segment</span>
            <input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="VIP + terk edilen sepet" />
          </label>
          <label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3">
            <span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Bitiş Tarihi</span>
            <input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="31 Mart 2026" />
          </label>
        </div>
        <div class="mt-4 rounded-3xl border border-amber-200 bg-amber-50/90 p-4 text-sm text-amber-900">
          Kupon kullanımı sırasında ücretsiz kargo eşiği ve maksimum kullanım limiti otomatik kontrol edilecek.
        </div>
      `,
      actions: [
        { label: "Taslak Kaydet", variant: "secondary" },
        { label: "Akışı Başlat", variant: "primary" },
      ],
    },
    quickStockUpdate: {
      eyebrow: "Stok Operasyonu",
      title: "Hızlı Stok Güncelle",
      description: "SKU veya barkod ile ürün bulun ve stok miktarını anında güncelleyin.",
      body: `
        <div class="space-y-4">
          <label class="surface-ring block rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3">
            <span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">SKU / Barkod</span>
            <input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" placeholder="Örn: SKU-48291 veya 8690123456789" />
          </label>
          <div class="grid gap-4 md:grid-cols-2">
            <label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3">
              <span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Mevcut Stok</span>
              <input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="48" />
            </label>
            <label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3">
              <span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Yeni Miktar</span>
              <input type="number" class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" placeholder="0" />
            </label>
          </div>
          <div class="rounded-[28px] border border-sky-200 bg-sky-50/90 px-5 py-4 text-sm text-sky-900">
            <p class="font-semibold">Güncelleme anında tüm satış kanallarına yansır.</p>
            <p class="mt-1 text-sky-700">Kritik eşik altına düşerse otomatik uyarı tetiklenir.</p>
          </div>
        </div>
      `,
      actions: [
        { label: "Vazgeç", variant: "secondary" },
        { label: "Stoku Güncelle", variant: "primary" },
      ],
    },
    inviteUser: {
      eyebrow: "Kullanıcı Yönetimi",
      title: "Yeni Admin Kullanıcısı",
      description: "Rol, yetki seti ve 2FA gereksinimiyle birlikte yeni ekip üyesi davet edin.",
      body: `
        <div class="grid gap-4 md:grid-cols-2">
          <label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3">
            <span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Ad Soyad</span>
            <input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="Yeni Ekip Üyesi" />
          </label>
          <label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3">
            <span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">E-posta</span>
            <input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="ekip@ka-commerce.com" />
          </label>
          <label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3">
            <span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Rol</span>
            <input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="Operasyon Yöneticisi" />
          </label>
          <label class="surface-ring rounded-3xl border border-slate-200 bg-slate-50/70 px-4 py-3">
            <span class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">2FA</span>
            <input class="mt-2 w-full border-0 bg-transparent p-0 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-0" value="Zorunlu" />
          </label>
        </div>
        <div class="mt-4 rounded-3xl border border-slate-200 bg-white p-4">
          <p class="text-sm font-semibold text-slate-900">Rol kapsamı</p>
          <p class="mt-2 text-sm text-slate-500">Siparişler, kargo operasyonu ve müşteri notları modüllerine tam erişim verilecek.</p>
        </div>
      `,
      actions: [
        { label: "İptal", variant: "secondary" },
        { label: "Daveti Gönder", variant: "primary" },
      ],
    },
    syncIntegration: {
      eyebrow: "Entegrasyon",
      title: "Senkronizasyonu Tetikle",
      description: "Pazar yeri, muhasebe ve analitik akışları için kontrollü yeniden senkronizasyon başlatın.",
      body: `
        <div class="space-y-4">
          <div class="rounded-3xl border border-slate-200 bg-slate-50/80 p-4">
            <p class="text-sm font-semibold text-slate-900">Çalıştırılacak işler</p>
            <div class="mt-3 flex flex-wrap gap-2">
              ${["Sipariş çek", "Stok gönder", "Fiyat güncelle", "Webhook doğrula"].map((item) => `<span class="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200">${item}</span>`).join("")}
            </div>
          </div>
          <div class="rounded-3xl border border-slate-200 bg-white p-4">
            <p class="text-xs font-semibold uppercase tracking-[0.26em] text-slate-400">Güvenlik</p>
            <p class="mt-2 text-sm text-slate-500">Bu işlem, son başarılı snapshot sonrasındaki delta verileri yeniden işleyerek veri kaybı riskini azaltır.</p>
          </div>
        </div>
      `,
      actions: [
        { label: "Yalnızca Test Et", variant: "secondary" },
        { label: "Senkron Başlat", variant: "primary" },
      ],
    },
  },
};
