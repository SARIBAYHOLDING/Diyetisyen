// Mock Database for Dyt. Ceren Çetinkaya Kilo Takip Modülü

export const INITIAL_DIETITIANS = [
  {
    id: "dyt-1",
    name: "Dyt. Ceren Çetinkaya",
    title: "Klinik Beslenme & Kilo Yönetimi Uzmanı (Kurucu)",
    avatar: "/ceren_cetinkaya.jpg",
    experience: "9 Yıl",
    speciality: "Kilo Takibi & Yönetimi, Polikistik Over, Diyabet Beslenmesi, Metabolic Balance",
    clientCount: 154,
    rating: 5.0,
    bio: "Hacettepe Üniversitesi Beslenme ve Diyetetik mezunu. Projenin sahibi ve tek uzmanı olarak 2000'den fazla danışanına kişiselleştirilmiş kilo takip ve sürdürülebilir beslenme danışmanlığı verdi."
  }
];

export const INITIAL_CLIENTS = [
  {
    id: "c-101",
    name: "Ahsen Yılmaz",
    email: "client@demo.com",
    phone: "+90 532 111 2233",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
    assignedDietitianId: "dyt-1",
    assignedDietitianName: "Dyt. Ceren Çetinkaya",
    package: "3 Aylık VIP Online Diyet",
    startDate: "2026-05-10",
    endDate: "2026-08-10",
    startWeight: 78.5,
    currentWeight: 71.2,
    targetWeight: 63.0,
    height: 168,
    age: 29,
    gender: "Kadın",
    status: "Aktif",
    bodyFatPercent: 26.4,
    waterLevel: 58.2,
    waterIntakeGoal: 2500, // ml
    waterIntakeCurrent: 1750, // ml
    clinicalNotes: "Danışanda laktoz hassasiyeti mevcut. İnsülin direnci hafif düzeyde, akşam karbonhidratı sınırlandırıldı. Kan tahlili 15 gün sonra yenilenecek."
  },
  {
    id: "c-102",
    name: "Mert Demir",
    email: "mert.d@demo.com",
    phone: "+90 533 444 5566",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80",
    assignedDietitianId: "dyt-1",
    assignedDietitianName: "Dyt. Ceren Çetinkaya",
    package: "1 Aylık Sporcu Beslenmesi",
    startDate: "2026-06-01",
    endDate: "2026-07-01",
    startWeight: 84.0,
    currentWeight: 82.5,
    targetWeight: 80.0,
    height: 182,
    age: 34,
    gender: "Erkek",
    status: "Aktif",
    bodyFatPercent: 16.2,
    waterLevel: 62.0,
    waterIntakeGoal: 3200,
    waterIntakeCurrent: 2400,
    clinicalNotes: "Kas kütlesi artırımı hedefleniyor. Antrenman öncesi ve sonrası öğün zamanlamaları optimize edildi."
  },
  {
    id: "c-103",
    name: "Selin Öztürk",
    email: "selin.o@demo.com",
    phone: "+90 535 777 8899",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&auto=format&fit=crop&q=80",
    assignedDietitianId: "dyt-1",
    assignedDietitianName: "Dyt. Ceren Çetinkaya",
    package: "6 Aylık Bütüncül Paket",
    startDate: "2026-02-15",
    endDate: "2026-08-15",
    startWeight: 92.0,
    currentWeight: 79.8,
    targetWeight: 68.0,
    height: 170,
    age: 41,
    gender: "Kadın",
    status: "Aktif",
    bodyFatPercent: 29.1,
    waterLevel: 55.4,
    waterIntakeGoal: 2700,
    waterIntakeCurrent: 2100,
    clinicalNotes: "Haşimato tiroidi mevcut. Glütensiz beslenme protokolü uygulanıyor."
  },
  {
    id: "c-104",
    name: "Burak Eren",
    email: "burak.e@demo.com",
    phone: "+90 536 222 3344",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80",
    assignedDietitianId: "dyt-1",
    assignedDietitianName: "Dyt. Ceren Çetinkaya",
    package: "1 Aylık Standart Paket",
    startDate: "2026-05-01",
    endDate: "2026-06-01",
    startWeight: 96.0,
    currentWeight: 91.0,
    targetWeight: 82.0,
    height: 178,
    age: 38,
    gender: "Erkek",
    status: "Tamamlandı",
    bodyFatPercent: 24.0,
    waterLevel: 57.0,
    waterIntakeGoal: 3000,
    waterIntakeCurrent: 1500,
    clinicalNotes: "Masa başı iş nedeniyle sedanter yaşam. Gün içi yürüyüş hedefleri verildi."
  }
];

export const INITIAL_DIET_PLANS = {
  "c-101": {
    clientId: "c-101",
    title: "Akdeniz Tipi Yağ Yakım Programı (Hafta 4)",
    targetCalories: 1650,
    macros: { protein: 95, carbs: 160, fat: 55 },
    meals: [
      {
        id: "m1",
        name: "Kahvaltı (08:30)",
        icon: "Sun",
        items: [
          "2 adet haşlanmış organik yumurta (Pul biber ve zeytinyağı ile)",
          "60 gr lor peyniri veya 1 dilim süzme peynir",
          "5 adet tuzsuz yeşil zeytin",
          "Bol maydanoz, roka, salatalık ve kapya biber",
          "1 dilim karabuğday veya siyez ekmeği"
        ],
        calories: 420
      },
      {
        id: "m2",
        name: "Öğle Yemeği (13:00)",
        icon: "Utensils",
        items: [
          "150 gr ızgara tavuk göğsü veya hindi bonfile",
          "Bol yeşillikli zeytinyağlı limonlu mevsım salatası",
          "4 yemek kaşığı haşlanmış kinoa veya karabuğday",
          "1 kase ev yapımı laktozsuz yoğurt"
        ],
        calories: 490
      },
      {
        id: "m3",
        name: "Ara Öğün (16:30)",
        icon: "Coffee",
        items: [
          "1 porsiyon yeşil elma veya 10 adet taze yaban mersini",
          "10 adet çiğ badem veya 2 tam ceviz içi",
          "1 fincan tarçınlı yeşil çay veya sade filtre kahve"
        ],
        calories: 210
      },
      {
        id: "m4",
        name: "Akşam Yemeği (19:30)",
        icon: "Moon",
        items: [
          "1 kase süzme mercimek veya sebze çorbası",
          "200 gr zeytinyağlı fırın somon veya çipura",
          "Buharda pişmiş brokolı ve kuşkonmaz"
        ],
        calories: 530
      }
    ]
  }
};

export const INITIAL_CHANGE_REQUESTS = [
  {
    id: "req-1",
    clientId: "c-101",
    clientName: "Ahsen Yılmaz",
    date: "2026-07-01 14:20",
    mealName: "Ara Öğün (16:30)",
    currentContent: "Yeşil elma + Çiğ Badem",
    requestedChange: "İş yerinde meyve taşımakta zorlanıyorum, yerine 2 adet ceviziçi ve laktozsuz sütlü kahve ekleyebilir miyiz?",
    reason: "İş Sebebiyle Değişiklik",
    status: "Onaylandı",
    dietitianNote: "Değişiklik uygundur, besin değerleri eşdeğerdir. Afiyet olsun!"
  },
  {
    id: "req-2",
    clientId: "c-101",
    clientName: "Ahsen Yılmaz",
    date: "2026-07-02 18:45",
    mealName: "Akşam Yemeği (19:30)",
    currentContent: "Fırın Somon",
    requestedChange: "Bu akşam dışarıda yemek yiyeceğim. Izgara köfte seçeneği ile değiştirebilir miyiz?",
    reason: "Sosyal Etkinlik",
    status: "Beklemede",
    dietitianNote: ""
  }
];

export const INITIAL_PAYMENTS = [
  {
    id: "PAY-9041",
    clientId: "c-101",
    clientName: "Ahsen Yılmaz",
    packageName: "3 Aylık VIP Online Diyet",
    amount: 4500,
    currency: "₺",
    date: "2026-05-10",
    method: "Kredi Kartı / İyziCo",
    status: "Ödendi",
    invoiceUrl: "#"
  },
  {
    id: "PAY-9042",
    clientId: "c-102",
    clientName: "Mert Demir",
    packageName: "1 Aylık Sporcu Beslenmesi",
    amount: 2200,
    currency: "₺",
    date: "2026-06-01",
    method: "Havale / EFT",
    status: "Ödendi",
    invoiceUrl: "#"
  },
  {
    id: "PAY-9043",
    clientId: "c-103",
    clientName: "Selin Öztürk",
    packageName: "6 Aylık Bütüncül Paket",
    amount: 8500,
    currency: "₺",
    date: "2026-02-15",
    method: "Kredi Kartı (Taksitli)",
    status: "Ödendi",
    invoiceUrl: "#"
  },
  {
    id: "PAY-9044",
    clientId: "c-101",
    clientName: "Ahsen Yılmaz",
    packageName: "VIP Ek Ölçüm & Tahlil Analizi",
    amount: 750,
    currency: "₺",
    date: "2026-07-01",
    method: "Online Bağlantı",
    status: "Bekliyor",
    invoiceUrl: "#"
  }
];

export const INITIAL_APPOINTMENTS = [
  {
    id: "apt-1",
    clientId: "c-101",
    clientName: "Ahsen Yılmaz",
    dietitianId: "dyt-1",
    dietitianName: "Dyt. Ceren Çetinkaya",
    date: "2026-07-04",
    time: "11:00",
    type: "Görüntülü Online Görüşme",
    status: "Onaylandı"
  },
  {
    id: "apt-2",
    clientId: "c-102",
    clientName: "Mert Demir",
    dietitianId: "dyt-2",
    dietitianName: "Dyt. Caner Aksoy",
    date: "2026-07-04",
    time: "14:30",
    type: "Klinik Yüz Yüze Görüşme",
    status: "Onaylandı"
  },
  {
    id: "apt-3",
    clientId: "c-103",
    clientName: "Selin Öztürk",
    dietitianId: "dyt-1",
    dietitianName: "Dyt. Ceren Çetinkaya",
    date: "2026-07-05",
    time: "16:00",
    type: "Görüntülü Online Görüşme",
    status: "Bekliyor"
  }
];

export const INITIAL_STICKY_NOTES = [
  { id: "sn-1", title: "Ahsen Yılmaz Tahlil Kontrolü", text: "Cuma günü kan tahlili sonuçları gelecek, insülin direnci değerine göre akşam karbonhidratı güncellenecek.", color: "amber" },
  { id: "sn-2", title: "Yeni Seminer Notları", text: "Mikrobiyota ve bağırsak beyin aksı konulu webinar 8 Temmuz saat 20:00'de.", color: "emerald" },
  { id: "sn-3", title: "Mert Demir Protein İhtiyacı", text: "BCAA ve Glutamin eklemesi için sonraki ölçüm bekleniyor.", color: "indigo" }
];
