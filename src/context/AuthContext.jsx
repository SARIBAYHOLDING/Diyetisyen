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
    return saved ? JSON.parse(saved) : INITIAL_CLIENTS;
  });

  const [dietitians, setDietitians] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_dietitians');
    return saved ? JSON.parse(saved) : INITIAL_DIETITIANS;
  });

  const [dietPlans, setDietPlans] = useState(INITIAL_DIET_PLANS);
  const [changeRequests, setChangeRequests] = useState(INITIAL_CHANGE_REQUESTS);

  const [payments, setPayments] = useState(() => {
    const saved = localStorage.getItem('nutrivibe_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [appointments, setAppointments] = useState(INITIAL_APPOINTMENTS);
  const [stickyNotes, setStickyNotes] = useState(INITIAL_STICKY_NOTES);
  const [motivationQuotes, setMotivationQuotes] = useState(MOTIVATION_QUOTES);

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

  // CLIENT CRUD
  const addClient = (newClientData) => {
    const newId = `c-${Date.now()}`;
    const createdClient = {
      id: newId,
      status: 'Aktif',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
      bodyFatPercent: 25.0,
      waterLevel: 58.0,
      waterIntakeGoal: 2500,
      waterIntakeCurrent: 0,
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      clinicalNotes: 'Yeni oluşturulan danışan hesabı.',
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
  };

  const deleteClient = (id) => {
    setClients(prev => prev.filter(c => c.id !== id));
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
