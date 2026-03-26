import React from 'react';
import { Phone, MapPin, Clock, Fish, Waves, Star } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import './App.css';

function App() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const callPhone = () => {
    window.open('tel:+32485755667', '_self');
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <Waves className="logo-icon" />
            <span>De Wulk</span>
          </div>
          <nav className="nav">
            <button onClick={() => scrollToSection('home')} className="nav-link">Home</button>
            <button onClick={() => scrollToSection('about')} className="nav-link">Over Ons</button>
            <button onClick={() => scrollToSection('products')} className="nav-link">Producten</button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">Contact</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <h1>Verse Vis uit Blankenberge</h1>
          <p className="hero-subtitle">Huisbereid, overheerlijk & gemakkelijk!</p>
          <button onClick={callPhone} className="cta-button">
            <Phone className="button-icon" />
            Bel ons voor info & bestellingen
          </button>
        </div>
        <div className="hero-image">
          <Fish size={200} className="fish-icon" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2>Over De Wulk</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
                Welkom bij De Wulk, uw vertrouwde vishandel in het hart van Blankenberge! 
                Al generaties lang brengen wij de allerverse vis rechtstreeks van de Noordzee naar uw bord.
              </p>
              <p>
                Onze passie voor kwaliteit en traditie begint elke ochtend vroeg, wanneer onze vissers 
                uitvaren om de beste vangst van de dag binnen te halen. Van plaice tot paling, 
                van garnalen tot kabeljauw - bij ons vindt u altijd de verste vis uit onze eigen wateren.
              </p>
              <p>
                Wat ons onderscheidt is niet alleen onze verse vis, maar ook onze huisbereide specialiteiten. 
                Onze ervaren koks bereiden dagelijks heerlijke visschotels, soepen en salades die u 
                nergens anders zult vinden. Alles wordt gemaakt met liefde en volgens traditionele recepten 
                die van generatie op generatie zijn doorgegeven.
              </p>
              <div className="features">
                <div className="feature">
                  <Star className="feature-icon" />
                  <span>Dagverse vis uit de Noordzee</span>
                </div>
                <div className="feature">
                  <Star className="feature-icon" />
                  <span>Huisbereide specialiteiten</span>
                </div>
                <div className="feature">
                  <Star className="feature-icon" />
                  <span>Familiebedrijf met traditie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products">
        <div className="container">
          <h2>Onze Specialiteiten</h2>
          <div className="product-grid">
            <div className="product-card">
              <h3>Verse Vis</h3>
              <p>Dagelijks verse vis rechtstreeks van onze lokale vissers</p>
            </div>
            <div className="product-card">
              <h3>Huisbereide Schotels</h3>
              <p>Traditionele visgerechten bereid met zorg en liefde</p>
            </div>
            <div className="product-card">
              <h3>Garnalen & Schaaldieren</h3>
              <p>Verse garnalen en andere schaaldieren uit de Noordzee</p>
            </div>
            <div className="product-card">
              <h3>Vissoepen</h3>
              <p>Huisgemaakte soepen vol smaak en traditie</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2>Contact & Bestellingen</h2>
          <div className="contact-content">
            <div className="contact-info">
              <div className="contact-item">
                <Phone className="contact-icon" />
                <div>
                  <h4>Telefoon</h4>
                  <p>+32 485 75 56 67</p>
                </div>
              </div>
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <div>
                  <h4>Adres</h4>
                  <p>Consciencestraat 1<br />8370 Blankenberge, België</p>
                </div>
              </div>
              <div className="contact-item">
                <Clock className="contact-icon" />
                <div>
                  <h4>Openingsuren</h4>
                  <p>Ma-Za: 8:00 - 18:00<br />Zo: 9:00 - 15:00</p>
                </div>
              </div>
            </div>
            <div className="contact-cta">
              <h3>Wilt u bestellen?</h3>
              <p>Bel ons voor de verste vis en huisbereide specialiteiten!</p>
              <button onClick={callPhone} className="cta-button">
                <Phone className="button-icon" />
                Bel Nu: +32 485 75 56 67
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>De Wulk BV (Vishandel Olivier & Kelly)</h4>
              <p>Consciencestraat 1, 8370 Blankenberge, België</p>
              <p>T: +32 485 75 56 67 · E: info@vishandelolivierenkelly.be</p>
              <p>Ondernemingsnummer: 0473.055.043 · BTW: BE 0473.055.043</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 De Wulk. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}

export default App;