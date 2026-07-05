import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import AuthModal from './components/common/AuthModal';
import AdminLoginModal from './components/admin/AdminLoginModal';
import MotivationToast from './components/common/MotivationToast';
import FloatingWidgets from './components/common/FloatingWidgets';

// Guest Components
import HeroSection from './components/guest/HeroSection';
import CalculatorsSection from './components/guest/CalculatorsSection';
import ServicesSection from './components/guest/ServicesSection';
import QuizBanner from './components/guest/QuizBanner';
import DietitiansSection from './components/guest/DietitiansSection';
import TestimonialsSection from './components/guest/TestimonialsSection';
import DietQuizModal from './components/guest/DietQuizModal';

// Role Dashboards
import ClientDashboard from './components/client/ClientDashboard';
import DietitianDashboard from './components/dietitian/DietitianDashboard';
import AdminDashboard from './components/admin/AdminDashboard';

function AppContent() {
  const { role } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Top Navigation Header */}
      <Navbar
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {role === 'guest' && (
          <>
            <HeroSection
              onOpenAuth={() => setIsAuthOpen(true)}
              onOpenQuiz={() => setIsQuizOpen(true)}
            />
            <CalculatorsSection />
            <ServicesSection />
            <QuizBanner onOpenQuiz={() => setIsQuizOpen(true)} />
            <DietitiansSection onOpenAuth={() => setIsAuthOpen(true)} />
            <TestimonialsSection />
          </>
        )}

        {role === 'client' && <ClientDashboard />}
        {role === 'dietitian' && <DietitianDashboard />}
        {role === 'admin' && <AdminDashboard />}
      </main>

      {/* Footer */}
      <Footer onOpenAdminLogin={() => setIsAdminLoginOpen(true)} />

      {/* Auth Modal & Quiz Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
      />

      <DietQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Floating Scroll To Top & Quick Action Widgets */}
      <FloatingWidgets
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* 45s Automatic Motivation Notification Toast */}
      <MotivationToast />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
