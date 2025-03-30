
import React from 'react';
import NavBar from '@/components/NavBar';
import HeroSection from '@/components/HeroSection';
import LoginSection from '@/components/LoginSection';
import QuoteSection from '@/components/QuoteSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-crypto-darker text-white overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <LoginSection />
      <QuoteSection />
      <Footer />
    </div>
  );
};

export default Index;
