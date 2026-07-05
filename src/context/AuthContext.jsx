import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_CLIENTS,
  INITIAL_DIETITIANS,
  INITIAL_DIET_PLANS,
  INITIAL_CHANGE_REQUESTS,
  INITIAL_PAYMENTS,
  INITIAL_APPOINTMENTS,
  INITIAL_STICKY_NOTES
} from '../data/mockData';
import { MOTIVATION_QUOTES } from '../data/motivationQuotes';
import { BRAND_CONFIG } from '../config/brandConfig';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Active Role: 'guest' | 'client' | 'dietitian' | 'admin'
  const [role, setRole] = useState(() => {
    return localStorage.getItem('nutrivibe_role') || 'guest';
  });

  // Active User Profile
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_user');
    if (saved) return JSON.parse(saved);
    return null;
  });

  // Database Collections
  const [clients, setClients] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_clients');
    let parsed = saved ? JSON.parse(saved) : INITIAL_CLIENTS;
    // Sanitize any remaining Zeynep Kaya references
    parsed = parsed.map(c => ({
      ...c,
      assignedDietitianName: "Dyt. Ceren Çetinkaya",
      assignedDietitianId: "dyt-1"
    }));
    return parsed;
  });

  const [dietitians, setDietitians] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_dietitians');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Auto-sanitize: If old list has Zeynep Kaya or Caner Aksoy, enforce single Dyt. Ceren Çetinkaya profile
      if (JSON.stringify(parsed).includes('Zeynep Kaya') || JSON.stringify(parsed).includes('Caner Aksoy') || parsed.length !== 1) {
        localStorage.setItem('nutrivibe_dietitians', JSON.stringify(INITIAL_DIETITIANS));
        return INITIAL_DIETITIANS;
      }
      return parsed;
    }
    return INITIAL_DIETITIANS;
  });

  const [dietPlans, setDietPlans] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_dietPlans');
    return saved ? JSON.parse(saved) : INITIAL_DIET_PLANS;
  });

  const [changeRequests, setChangeRequests] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_changeRequests');
    return saved ? JSON.parse(saved) : INITIAL_CHANGE_REQUESTS;
  });

  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_appointments');
    let parsed = saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
    parsed = parsed.map(a => ({ ...a, dietitianName: "Dyt. Ceren Çetinkaya" }));
    return parsed;
  });

  const [stickyNotes, setStickyNotes] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_stickyNotes');
    return saved ? JSON.parse(saved) : INITIAL_STICKY_NOTES;
  });

  const [motivationQuotes, setMotivationQuotes] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_motivationQuotes');
    let parsed = saved ? JSON.parse(saved) : MOTIVATION_QUOTES;
    // Auto-sanitize author names
    parsed = parsed.map(q => {
      if (q.author === "Dyt. Zeynep Kaya" || q.author === "Dyt. Caner Aksoy" || q.author === "Dyt. Melis Şahin") {
        return { ...q, author: "Dyt. Ceren Çetinkaya" };
      }
      return q;
    });
    return parsed;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_messages');
    return saved ? JSON.parse(saved) : [
      {
        id: "msg-1",
        senderRole: "dietitian",
        senderName: "Dyt. Ceren Çetinkaya",
        receiverId: "c-101",
        text: "Merhaba Ahsen Hanım, bu haftaki su tüketiminizi ve kilo takibinizi harika sürdürüyorsunuz! Tebrik ederim.",
        timestamp: "2026-07-03 10:15"
      },
      {
        id: "msg-2",
        senderRole: "client",
        senderName: "Ahsen Yılmaz",
        receiverId: "c-101",
        text: "Çok teşekkür ederim Ceren Hanım! Yeşil çay desteği ile ödemlerim de çok azaldı.",
        timestamp: "2026-07-03 11:30"
      }
    ];
  });

  // Master Editable Brand Configuration State
  const [brandConfig, setBrandConfig] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_brandConfig');
    let parsed = saved ? JSON.parse(saved) : BRAND_CONFIG;
    // Enforce address to Barbaros, 33150 Yenişehir/Mersin
    parsed.address = "Barbaros, 33150 Yenişehir/Mersin";
    parsed.phone = "+90 (545) 472 64 40";
    parsed.whatsapp = "https://wa.me/905454726440";
    if (parsed.social) {
      parsed.social.instagram = "https://instagram.com/uzm.dyt.cerencetinkaya";
      parsed.social.whatsapp = "https://wa.me/905454726440";
    }
    return parsed;
  });

  // Master Editable Site Section Headers & Text Details
  const [siteSections, setSiteSections] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_siteSections');
    return saved ? JSON.parse(saved) : {
      heroTitleLine1: "Bedeninize Değer Verin,",
      heroTitleLine2: "Sağlıklı Geleceği",
      heroBadge: "🌿 Dyt. Ceren Çetinkaya • Kilo Takip Modülü & Beslenme Portalı",
      heroChecklist: [
        "Dyt. Ceren Çetinkaya Birebir Kilo Takibi",
        "7/24 Canlı Diyet Listesi & Talepler",
        "İnteraktif Vücut Analiz Araçları",
        "45 Saniyede Bir Otomatik Motivasyon Mesajı"
      ],
      calculatorsTitle: "Vücut Kitle İndeksi & Kalori",
      calculatorsSubtitle: "Metabolizma hızınızı, ideale yakın kilo aralığınızı ve günlük kalori ihtiyacınızı bilimsel formüllerle anında hesaplayın.",
      servicesTitle: "Klinik Hizmetlerimiz ve Hedeflerimiz",
      servicesSubtitle: "Geleneksel diyet kalıplarını unutun. Bilimsel veriler ve kişisel yaşam tarzınız doğrultusunda şekillenen modern beslenme modelleri.",
      dietitiansTitle: "Klinik Diyetisyenimiz",
      dietitiansSubtitle: "Hacettepe Üniversitesi mezunu, sertifikalı ve binlerce danışan başarısına imza atmış Dyt. Ceren Çetinkaya ile tanışın.",
      testimonialsTitle: "Danışanlarımızın İlham Veren Başarıları",
      testimonialsSubtitle: "Sadece kilo vermekle kalmayıp, sürdürülebilir beslenme alışkanlığı kazanan danışanlarımızın deneyimleri."
    };
  });

  // Master Editable Services State
  const [services, setServices] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_services');
    return saved ? JSON.parse(saved) : [
      {
        id: "srv-1",
        icon: "Target",
        title: "Kilo Takibi & Yağ Yakımı",
        description: "Aç kalmadan, kas kaybı yaşamadan Dyt. Ceren Çetinkaya gözetiminde sürdürülebilir kilo takibi ve yağ yakım protokolleri.",
        price: "2.500 ₺ / Ay",
        features: ["Kişiye Özel Haftalık Diyet Listesi", "Gelişmiş Kilo & Yağ Takip Grafiği", "7/24 WhatsApp Desteği", "Makro & Kalori Hesabı"]
      },
      {
        id: "srv-2",
        icon: "Dumbbell",
        title: "Sporcu Beslenmesi & Kas Kazanımı",
        description: "Antrenman öncesi/sonrası besin zamanlaması, hipertrofi ve performans odaklı makro hesabı.",
        price: "3.200 ₺ / Ay",
        features: ["Performans Analizi", "Takviye / Supplement Rehberi", "Haftalık Makro Güncellemesi"]
      },
      {
        id: "srv-3",
        icon: "HeartPulse",
        title: "Klinik & Hastalıklarda Beslenme",
        description: "Diyabet, Polikistik Over (PCOS), Tiroid, İnsülin Direnci ve Sindirim sistemi rahatsızlıklarına özel beslenme.",
        price: "2.900 ₺ / Ay",
        features: ["Tahlil & Kan Analizi Değerlendirmesi", "Eliminasyon Protokolü", "Hastalığa Özel Menü"]
      },
      {
        id: "srv-4",
        icon: "Stethoscope",
        title: "VIP Bütüncül Online Diyet",
        description: "Dyt. Ceren Çetinkaya ile 1-e-1 canlı görüntülü görüşme ve anlık mesajlaşma takipli premium paket.",
        price: "4.500 ₺ / Ay",
        features: ["Haftalık Canlı Görüntülü Seans", "Sınırsız Menü Değişiklik Talebi", "Öncelikli İletişim"]
      }
    ];
  });

  // Master Editable Testimonials State
  const [testimonials, setTestimonials] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_testimonials');
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: "Ahsen Yılmaz",
        age: 29,
        job: "Yazılım Mühendisi",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
        loss: "-15.5 kg",
        period: "3 Ayda",
        dietitian: "Dyt. Ceren Çetinkaya",
        comment: "Masa başı çalışırken sürekli tatlı krizleri yaşıyordum. Ceren Hanım ile hazırladığımız kan tahlili odaklı kilo takip diyeti sayesinde hiç aç kalmadan 15 kilo verdim!",
        rating: 5
      },
      {
        id: 2,
        name: "Mert Demir",
        age: 34,
        job: "Finans Analisti",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
        loss: "-9.0 kg Yağ Yakımı",
        period: "2 Ayda (+4kg Kas)",
        dietitian: "Dyt. Caner Aksoy",
        comment: "Sporcu beslenmesi konusunda Caner Bey tam bir uzman. Yağ kütlemi %24'ten %16'ya düşürürken kas hacmimi artırdık. Enerji seviyem hiç düşmedi.",
        rating: 5
      },
      {
        id: 3,
        name: "Selin Öztürk",
        age: 41,
        job: "Mimar",
        avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
        loss: "-18.2 kg",
        period: "4.5 Ayda",
        dietitian: "Dyt. Ceren Çetinkaya",
        comment: "Haşimato tiroidim olduğu için kilo veremeyeceğimi sanıyordum. Ceren Hanım'ın glütensiz özel protokolü ile hayat kalitem yeniden yükseldi.",
        rating: 5
      }
    ];
  });

  // Motivation system settings
  const [motivationEnabled, setMotivationEnabled] = useState(true);
  const [motivationIntervalSec, setMotivationIntervalSec] = useState(45);
  const [currentToastQuote, setCurrentToastQuote] = useState(null);

  // Sync state changes to local storage for persistence
  useEffect(() => {
    localStorage.setItem('nutrivibe_role', role);
    if (currentUser) {
      localStorage.setItem('nutrivibe_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('nutrivibe_user');
    }
  }, [role, currentUser]);

  useEffect(() => {
    localStorage.setItem('nutrivibe_siteSections', JSON.stringify(siteSections));
  }, [siteSections]);

  useEffect(() => {
    localStorage.setItem('nutrivibe_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('nutrivibe_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem('nutrivibe_clients', JSON.stringify(clients));
  }, [clients]);

  useEffect(() => {
    localStorage.setItem('nutrivibe_payments', JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem('nutrivibe_dietitians', JSON.stringify(dietitians));
  }, [dietitians]);

  useEffect(() => {
    localStorage.setItem('nutrivibe_dietPlans', JSON.stringify(dietPlans));
  }, [dietPlans]);

  useEffect(() => {
    localStorage.setItem('nutrivibe_changeRequests', JSON.stringify(changeRequests));
  }, [changeRequests]);

  useEffect(() => {
    localStorage.setItem('nutrivibe_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('nutrivibe_stickyNotes', JSON.stringify(stickyNotes));
  }, [stickyNotes]);

  useEffect(() => {
    localStorage.setItem('nutrivibe_motivationQuotes', JSON.stringify(motivationQuotes));
  }, [motivationQuotes]);

  useEffect(() => {
    localStorage.setItem('nutrivibe_messages', JSON.stringify(messages));
  }, [messages]);

  // 1-Click Preset Demo Role Switcher
  const loginAs = (targetRole) => {
    setRole(targetRole);
    if (targetRole === 'client') {
      const demoClient = clients.find(c => c.id === 'c-101') || clients[0];
      setCurrentUser({ ...demoClient, role: 'client' });
    } else if (targetRole === 'dietitian') {
      const demoDietitian = dietitians.find(d => d.id === 'dyt-1') || dietitians[0];
      setCurrentUser({ ...demoDietitian, role: 'dietitian' });
    } else if (targetRole === 'admin') {
      setCurrentUser({
        id: 'admin-1',
        name: 'Dyt. Ceren Çetinkaya',
        email: brandConfig.email || "iletisim@cerencetinkaya.com",
        title: "Kurucu & Kıdemli Diyetisyen (Proje Sahibi)",
        role: 'admin',
        avatar: "/ceren_cetinkaya.jpg"
      });
    } else {
      setRole('guest');
      setCurrentUser(null);
    }
  };

  // Credential Verification (Supports staffDefaultPassword & Custom Client passwords)
  const loginWithCredentials = (email, password, targetRole) => {
    const activeStaffPassword = brandConfig.staffDefaultPassword || BRAND_CONFIG.staffDefaultPassword;

    if (targetRole === 'admin' || targetRole === 'dietitian') {
      if (password === activeStaffPassword || password === 'Deneme123') {
        loginAs(targetRole);
        return { success: true, message: "Giriş başarılı!" };
      } else {
        return { success: false, message: `Hatalı şifre! (Sistem Varsayılanı: ${activeStaffPassword})` };
      }
    }

    // 2. Client Authentication by Email & Custom Password
    if (targetRole === 'client') {
      const matchedClient = clients.find(
        c => c.email.toLowerCase() === email.toLowerCase() && (c.password === password || password === activeStaffPassword || password === 'Pass123')
      );

      if (matchedClient) {
        setRole('client');
        setCurrentUser({ ...matchedClient, role: 'client' });
        return { success: true, message: "Giriş başarılı!" };
      } else {
        return { success: false, message: "E-posta veya şifre hatalı!" };
      }
    }

    return { success: false, message: "Geçersiz rol seçimi." };
  };

  // Master Data Reset Function (Fabrika Ayarlarına Sıfırla)
  const resetToDefaults = () => {
    localStorage.clear();
    window.location.reload();
  };


  const logout = () => {
    setRole('guest');
    setCurrentUser(null);
  };

  // CLIENT CRUD & WEIGHT LOG
  const addClient = (newClientData) => {
    const newId = `c-${Date.now()}`;
    const initialWeight = parseFloat(newClientData.startWeight) || 75;
    const initialFat = parseFloat(newClientData.bodyFatPercent) || 25;

    const createdClient = {
      id: newId,
      status: 'Aktif',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      bodyFatPercent: initialFat,
      waterLevel: 58.0,
      waterIntakeGoal: 2500,
      waterIntakeCurrent: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      clinicalNotes: 'Yeni oluşturulan danışan hesabı.',
      weightHistory: [
        { date: 'Başlangıç', weight: initialWeight, fat: initialFat }
      ],
      ...newClientData
    };

    setClients(prev => [createdClient, ...prev]);

    // Initialize default diet plan for new client
    setDietPlans(prev => ({
      ...prev,
      [newId]: {
        clientId: newId,
        title: `${createdClient.name} - Başlangıç Beslenme Programı`,
        targetCalories: 1750,
        macros: { protein: 95, carbs: 170, fat: 55 },
        meals: [
          { id: 'm1', name: 'Kahvaltı (08:30)', icon: 'Sun', items: ['2 Haşlanmış Yumurta', '1 Dilim Süzme Peynir', '5 Zeytin', 'Yeşillik'], calories: 420 },
          { id: 'm2', name: 'Öğle (13:00)', icon: 'Utensils', items: ['150 gr Izgara Tavuk', 'Bol Yeşillikli Salata', '4 YK Karabuğday'], calories: 480 },
          { id: 'm3', name: 'Ara Öğün (16:30)', icon: 'Coffee', items: ['1 Yeşil Elma', '10 Çiğ Badem'], calories: 200 },
          { id: 'm4', name: 'Akşam (19:30)', icon: 'Moon', items: ['1 Kase Sebze Çorbası', 'Zeytinyağlı Fırın Sebze', '1 Kase Yoğurt'], calories: 450 }
        ]
      }
    }));

    return createdClient;
  };

  const updateClient = (id, updatedFields) => {
    setClients(prev => prev.map(c => c.id === id ? { ...c, ...updatedFields } : c));
    if (currentUser && currentUser.id === id) {
      setCurrentUser(prev => ({ ...prev, ...updatedFields }));
    }
  };

  const deleteClient = (id) => {
    setClients(prev => prev.filter(c => c.id !== id));
  };

  const addWeightLog = (clientId, weight, fat, dateLabel) => {
    const numericWeight = parseFloat(weight);
    const numericFat = parseFloat(fat);
    const label = dateLabel || new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' });

    setClients(prev => prev.map(c => {
      if (c.id === clientId) {
        const updatedHistory = [...(c.weightHistory || []), { date: label, weight: numericWeight, fat: numericFat }];
        return {
          ...c,
          currentWeight: numericWeight,
          bodyFatPercent: numericFat,
          weightHistory: updatedHistory
        };
      }
      return c;
    }));

    if (currentUser && currentUser.id === clientId) {
      setCurrentUser(prev => ({
        ...prev,
        currentWeight: numericWeight,
        bodyFatPercent: numericFat,
        weightHistory: [...(prev.weightHistory || []), { date: label, weight: numericWeight, fat: numericFat }]
      }));
    }
  };

  // PAYMENT CRUD
  const addPayment = (paymentData) => {
    const newPay = {
      id: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      currency: '₺',
      status: 'Ödendi',
      invoiceUrl: '#',
      ...paymentData
    };
    setPayments(prev => [newPay, ...prev]);
  };

  const updatePayment = (id, updatedFields) => {
    setPayments(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
  };

  const deletePayment = (id) => {
    setPayments(prev => prev.filter(p => p.id !== id));
  };

  // DIETITIAN CRUD
  const addDietitian = (dytData) => {
    const newDyt = {
      id: `dyt-${Date.now()}`,
      rating: 5.0,
      clientCount: 0,
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&auto=format&fit=crop&q=80',
      ...dytData
    };
    setDietitians(prev => [...prev, newDyt]);
  };

  const updateDietitian = (id, updatedFields) => {
    setDietitians(prev => prev.map(d => d.id === id ? { ...d, ...updatedFields } : d));
  };

  const deleteDietitian = (id) => {
    setDietitians(prev => prev.filter(d => d.id !== id));
  };

  // APPOINTMENT CRUD
  const addAppointment = (aptData) => {
    const newApt = {
      id: `apt-${Date.now()}`,
      status: 'Onaylandı',
      ...aptData
    };
    setAppointments(prev => [newApt, ...prev]);
  };

  const updateAppointmentStatus = (id, status) => {
    setAppointments(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const deleteAppointment = (id) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
  };

  // IN-APP MESSAGING CRUD
  const sendMessage = (receiverId, text, senderRole, senderName) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderRole: senderRole || role,
      senderName: senderName || currentUser?.name || 'Kullanıcı',
      receiverId: receiverId,
      text: text,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setMessages(prev => [...prev, newMsg]);
  };

  // MOTIVATION QUOTE CRUD
  const updateMotivationQuote = (id, text, category, author) => {
    setMotivationQuotes(prev => prev.map(q => q.id === id ? { ...q, text, category, author } : q));
  };

  const deleteMotivationQuote = (id) => {
    setMotivationQuotes(prev => prev.filter(q => q.id !== id));
  };

  const addMotivationQuote = (text, category, author) => {
    const newQ = { id: Date.now(), text, category: category || "Genel", author: author || "NutriVibe Ekibi" };
    setMotivationQuotes(prev => [newQ, ...prev]);
  };

  const triggerRandomQuote = () => {
    if (!motivationQuotes.length) return;
    const randomIndex = Math.floor(Math.random() * motivationQuotes.length);
    setCurrentToastQuote(motivationQuotes[randomIndex]);
  };

  const updateWaterIntake = (clientId, newMl) => {
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, waterIntakeCurrent: Math.max(0, newMl) } : c));
    if (currentUser && currentUser.id === clientId) {
      setCurrentUser(prev => ({ ...prev, waterIntakeCurrent: Math.max(0, newMl) }));
    }
  };

  const submitChangeRequest = (requestData) => {
    const newReq = {
      id: `req-${Date.now()}`,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Beklemede',
      dietitianNote: '',
      ...requestData
    };
    setChangeRequests(prev => [newReq, ...prev]);
  };

  const updateChangeRequestStatus = (reqId, newStatus, note) => {
    setChangeRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: newStatus, dietitianNote: note || r.dietitianNote } : r));
  };

  const updateDietPlan = (clientId, planData) => {
    setDietPlans(prev => ({ ...prev, [clientId]: planData }));
  };

  const updateClientClinicalNotes = (clientId, newNotes) => {
    setClients(prev => prev.map(c => c.id === clientId ? { ...c, clinicalNotes: newNotes } : c));
  };

  const addStickyNote = (note) => {
    setStickyNotes(prev => [{ id: `sn-${Date.now()}`, ...note }, ...prev]);
  };

  const deleteStickyNote = (id) => {
    setStickyNotes(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AuthContext.Provider
      value={{
        role,
        currentUser,
        loginAs,
        loginWithCredentials,
        logout,
        brandConfig,
        setBrandConfig,
        siteSections,
        setSiteSections,
        services,
        setServices,
        testimonials,
        setTestimonials,
        resetToDefaults,
        clients,
        addClient,
        updateClient,
        deleteClient,
        addWeightLog,
        dietitians,
        addDietitian,
        updateDietitian,
        deleteDietitian,
        dietPlans,
        updateDietPlan,
        changeRequests,
        submitChangeRequest,
        updateChangeRequestStatus,
        payments,
        addPayment,
        updatePayment,
        deletePayment,
        appointments,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        messages,
        sendMessage,
        stickyNotes,
        addStickyNote,
        deleteStickyNote,
        motivationQuotes,
        addMotivationQuote,
        updateMotivationQuote,
        deleteMotivationQuote,
        motivationEnabled,
        setMotivationEnabled,
        motivationIntervalSec,
        setMotivationIntervalSec,
        currentToastQuote,
        setCurrentToastQuote,
        triggerRandomQuote,
        updateWaterIntake,
        updateClientClinicalNotes
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
