import React from 'react';
import Navbar from '../components/Navbar';
import Ads from '../components/Ads';
import FeaturedBooks from '../components/FeaturedBooks';
import Footer from '../components/Footer';

function AppLayout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Ads />
        <FeaturedBooks />
      </main>
      <Footer />
    </div>
  );
}

export default AppLayout;
