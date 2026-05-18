import React from 'react';
    import Header from '../components/Header';
    import Hero from '../components/Hero';
    import Applications from '../components/Applications';
    import Products from '../components/Products';
    import Testimonials from '../components/Testimonials';
    import Pricing from '../components/Pricing';
    import Contact from '../components/Contact';
    import Footer from '../components/Footer';

    export default function Home() {
      return (
        <div className="min-h-screen">
          <Header />
          <main>
            <Hero />
            <Applications />
            <Products />
            <Testimonials />
            <Pricing />
            <Contact />
          </main>
          <Footer />
        </div>
      );
    }