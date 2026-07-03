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
    if (saved) return JSON.parse(saved);
    // Enrich initial clients with weightHistory if missing
    return INITIAL_CLIENTS.map(c => ({
      weightHistory: [
        { date: '1. Hafta', weight: c.startWeight, fat: (c.bodyFatPercent + 2.8).toFixed(1) },
        { date: '2. Hafta', weight: (c.startWeight - 2.3).toFixed(1), fat: (c.bodyFatPercent + 1.6).toFixed(1) },
        { date: '3. Hafta', weight: (c.startWeight - 4.5).toFixed(1), fat: (c.bodyFatPercent + 0.7).toFixed(1) },
        { date: '4. Hafta', weight: c.currentWeight, fat: c.bodyFatPercent }
      ],
      ...c
    }));
  });

  const [dietitians, setDietitians] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_dietitians');
    return saved ? JSON.parse(saved) : INITIAL_DIETITIANS;
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
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [stickyNotes, setStickyNotes] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_stickyNotes');
    return saved ? JSON.parse(saved) : INITIAL_STICKY_NOTES;
  });

  const [motivationQuotes, setMotivationQuotes] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_motivationQuotes');
    return saved ? JSON.parse(saved) : MOTIVATION_QUOTES;
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_messages');
    return saved ? JSON.parse(saved) : [
      {
        id: "msg-1",
        senderRole: "dietitian",
        senderName: "Dyt. Zeynep Kaya",
        receiverId: "c-101",
        text: "Merhaba Ahsen Hanım, bu haftaki su tüketiminizi harika artırmışsınız! Tebrik ederim.",
        timestamp: "2026-07-03 10:15"
      },
      {
        id: "msg-2",
        senderRole: "client",
        senderName: "Ahsen Yılmaz",
        receiverId: "c-101",
        text: "Çok teşekkür ederim Zeynep Hanım! Yeşil çay desteği ile ödemlerim de çok azaldı.",
        timestamp: "2026-07-03 11:30"
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
        name: 'Serkan Sarıbay',
        email: "admin@nutrivibepro.com",
        title: "Genel Koordinatör & Yönetici",
        role: 'admin',
        avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&auto=format&fit=crop&q=80"
      });
    } else {
      setRole('guest');
      setCurrentUser(null);
    }
  };

  // Credential Verification (Supports Deneme123 & Custom Client passwords)
  const loginWithCredentials = (email, password, targetRole) => {
    // 1. Staff Authentication (Dietitian / Admin) via Deneme123
    if (targetRole === 'admin' || targetRole === 'dietitian') {
      if (password === BRAND_CONFIG.staffDefaultPassword) {
        loginAs(targetRole);
        return { success: true, message: "Giriş başarılı!" };
      } else {
        return { success: false, message: `Hatalı şifre! (Varsayılan şifre: ${BRAND_CONFIG.staffDefaultPassword})` };
      }
    }

    // 2. Client Authentication by Email & Custom Password
    if (targetRole === 'client') {
      const matchedClient = clients.find(
        c => c.email.toLowerCase() === email.toLowerCase() && (c.password === password || password === BRAND_CONFIG.staffDefaultPassword || password === 'Pass123')
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
