import React, { useState, useEffect } from 'react';
import { 
  Fish, 
  Utensils, 
  Waves, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Menu as MenuIcon, 
  ChevronRight,
  Shrimp,
  ChefHat,
  Star,
  Quote,
  X
} from 'lucide-react';
import { Offering, OpeningHour, GalleryItem, MenuCategory, MenuData, OpeningHourData, FavoriteItem } from './types';
const ultiemLogo = '/final_LOGOSMALL.webp';
const heroImg = '/viswinkelV3_FINAL.webp';
import interiorImg from './winkel_binnen.webp';
import harbourImg from './havenfeesten_sfeerbeeld.webp';
import saladsImg from './salades_versbereid.webp';
import shrimpTrayImg from './garnaalschotel.webp';
import shrimpTray2Img from './garnaalschotel2.webp';

/**
 * HOE JE EIGEN FOTO'S TOEVOEGT:
 * 1. Upload je foto's naar de map waar dit bestand staat.
 * 2. Vervang de linkjes hieronder door de bestandsnaam (bijv. "foto1.jpg") 
 *    OF gebruik een directe link van het internet.
 */
const IMAGE_CONFIG = {
  heroBackground: heroImg,
  aboutSection: interiorImg,
  gallery: [
    { url: harbourImg, alt: "Havenfeesten sfeerbeeld Blankenberge - De Wulk Viswinkel" },
    { url: saladsImg, alt: "Versbereide visschotels en salades - De Wulk Blankenberge" },
    { url: interiorImg, alt: "Interieur vishandel De Wulk Consciencestraat Blankenberge" },
    { url: shrimpTrayImg, alt: "Verse garnaalschotel bestellen bij De Wulk Blankenberge" },
    { url: shrimpTray2Img, alt: "Garnaalschotel zeevruchtenschotel De Wulk viswinkel Blankenberge" }
  ]
};

// --- Data based on provided flyer image ---
// Menu data is now loaded from API

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'OVER ONS', id: 'over-ons' },
    { name: 'PRIJSLIJST', id: 'prijslijst' },
    { name: 'UREN', id: 'uren' },
    { name: 'CONTACT', id: 'contact' },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false); // Close mobile menu
    }
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${scrolled ? 'bg-marine-90 backdrop-blur-md shadow-2xl py-3' : 'bg-marine-50 backdrop-blur-sm py-4'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2 md:space-x-3">
          <img src={ultiemLogo} alt="De Wulk Viswinkel Blankenberge Logo - Olivier en Kelly" className="h-12 md:h-14 w-auto object-contain flex-shrink-0" />
          <div className="flex flex-col leading-tight">
            <span className="font-barlow text-lg md:text-2xl font-bold tracking-tight leading-none text-white uppercase">DE WULK</span>
            <span className="text-[9px] md:text-[10px] font-semibold tracking-[0.2em] md:tracking-[0.25em] mt-0.5 text-salmon uppercase">VISHANDEL</span>
          </div>
        </div>

        <div className="hidden md:flex space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => scrollToSection(link.id)}
              className="text-white text-xs font-bold tracking-wider uppercase hover:text-salmon transition-all duration-300 relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-salmon transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </div>

        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="text-white" size={24} /> : <MenuIcon className="text-white" size={24} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-marine backdrop-blur-none absolute top-full left-0 w-full shadow-2xl p-6 flex flex-col space-y-4 border-t-2 border-salmon">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => scrollToSection(link.id)} 
              className="text-white text-sm font-bold tracking-wider uppercase hover:text-salmon text-left transition-colors"
            >
              {link.name}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  const [shopStatus, setShopStatus] = useState({ text: '', dotColor: '', dotShadow: '' });

  useEffect(() => {
    const checkShopStatus = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = currentHour + currentMinute / 60;

      // Closed days: Wednesday (3) and Thursday (4)
      const closedDays = new Set([3, 4]);

      // Opening hours per day (0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat)
      const openTime = 9;
      const closeTimes: Record<number, number> = {
        0: 18,    // Zondag
        1: 18,    // Maandag
        2: 17.5,  // Dinsdag (17:30)
        5: 18,    // Vrijdag
        6: 18,    // Zaterdag
      };

      // Helper: find next open day name
      const dayNames = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
      const findNextOpenDay = (fromDay: number, afterHours: boolean): string => {
        // If current day and not after hours, it's today
        if (!afterHours && !closedDays.has(fromDay)) return 'vandaag';
        // Look forward
        for (let i = 1; i <= 7; i++) {
          const nextDay = (fromDay + i) % 7;
          if (!closedDays.has(nextDay)) {
            if (i === 1) return 'morgen';
            return dayNames[nextDay];
          }
        }
        return 'morgen';
      };

      if (closedDays.has(currentDay)) {
        // Closed day (Wednesday or Thursday)
        const nextDay = findNextOpenDay(currentDay, true);
        setShopStatus({
          text: `Gesloten • Open ${nextDay} ${openTime}:00`,
          dotColor: 'bg-red-500',
          dotShadow: 'shadow-lg shadow-red-500/50'
        });
      } else {
        const closeTime = closeTimes[currentDay] ?? 18;
        const closeTimeDisplay = closeTime === 17.5 ? '17:30' : `${closeTime}:00`;

        if (currentTime >= openTime && currentTime < closeTime) {
          // Currently open
          if (currentTime >= closeTime - 1) {
            setShopStatus({
              text: `Sluit binnenkort (${closeTimeDisplay})`,
              dotColor: 'bg-amber-500',
              dotShadow: 'shadow-lg shadow-amber-500/50'
            });
          } else {
            setShopStatus({
              text: `Nu open • Sluit om ${closeTimeDisplay}`,
              dotColor: 'bg-emerald-500',
              dotShadow: 'shadow-lg shadow-emerald-500/50'
            });
          }
        } else {
          // Closed (before opening or after closing)
          const afterHours = currentTime >= closeTime;
          const nextDay = findNextOpenDay(currentDay, afterHours);
          setShopStatus({
            text: `Gesloten • Open ${nextDay} ${openTime}:00`,
            dotColor: 'bg-red-500',
            dotShadow: 'shadow-lg shadow-red-500/50'
          });
        }
      }
    };

    checkShopStatus();
    // Update every minute
    const interval = setInterval(checkShopStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative min-h-[600px] md:min-h-screen flex items-center justify-center overflow-hidden" role="banner" aria-label="De Wulk Viswinkel Blankenberge - Verse vis en zeevruchten">
      {/* Background Image Layer with Parallax Effect */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed brightness-75"
        style={{ 
          backgroundImage: `url(${IMAGE_CONFIG.heroBackground})`,
          filter: 'blur(4px)',
          transform: 'scale(1.05)',
          willChange: 'transform'
        }}
      >
        {/* Deep Midnight Blue Maritime Overlay */}
        <div className="absolute inset-0 overlay-maritime"></div>
      </div>
      
      {/* Hero Content - Maritime Heritage */}
      <div className="relative z-10 w-full px-6 pt-20">
        <div className="max-w-5xl mx-auto text-center px-4 py-8">
          {/* Main Headline - Port Authority Industrial Logo */}
          <h1 
            className="font-oswald text-7xl sm:text-8xl md:text-9xl lg:text-[13rem] font-bold text-white mb-2 uppercase leading-[0.8] tracking-tighter whitespace-nowrap drop-shadow-lg"
            style={{ 
              textShadow: '0 12px 35px rgba(0, 0, 0, 0.95), 0 6px 18px rgba(15, 23, 42, 0.9)'
            }}
          >
            DE WULK
          </h1>
          
          {/* Sub-headline - Wide Spaced Contrast Label */}
          <p 
            className="text-xs sm:text-sm text-white/95 font-bold uppercase mb-10 drop-shadow-lg"
            style={{ 
              letterSpacing: '0.3em',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.9)' 
            }}
          >
            Bij Olivier & Kelly
          </p>
          
          {/* Description - Constrained Width */}
          <p 
            className="text-lg sm:text-xl md:text-2xl text-white font-medium max-w-2xl mx-auto leading-relaxed mb-6 drop-shadow-lg"
            style={{ textShadow: '0 3px 12px rgba(0, 0, 0, 0.9)' }}
          >
            Dagverse vis, zeevruchten, kibbeling en zeevruchtenschotels — klaar om mee te nemen.
          </p>
          
          {/* 100 Jaar Heritage Text - Clean & Simple */}
          <p className="text-white/80 italic text-sm mt-4 mb-6">
            Al meer dan <span className="font-bold not-italic">100 jaar</span> de beste viswinkel aan de haven van Blankenberge
          </p>
          
          {/* Live LED Status Badge */}
          <div className="inline-flex items-center gap-3 bg-white backdrop-blur-md border border-gray-200 rounded-full px-4 py-1.5 mb-8 shadow-lg">
            <span className={`w-2.5 h-2.5 rounded-full ${shopStatus.dotColor} ${shopStatus.dotShadow} animate-pulse`}></span>
            <span className="text-xs font-medium tracking-wide text-marine">
              {shopStatus.text}
            </span>
          </div>
          
          {/* Luxury Side-by-Side Buttons */}
          <div className="flex flex-row gap-3 w-full max-w-md mx-auto mb-10">
            <a 
              href="tel:+32485755667" 
              className="flex-1 bg-white text-black px-4 py-3 min-h-[48px] font-bold text-xs uppercase tracking-widest rounded-md hover:bg-gray-200 transition-all duration-300 shadow-lg inline-flex items-center justify-center gap-2" 
              aria-label="Call +32485755667 to place an order"
            >
              <Phone className="w-4 h-4" />
              BEL OM TE BESTELLEN
            </a>
            <button 
              onClick={() => scrollToSection('prijslijst')}
              className="flex-1 bg-transparent border-2 border-salmon text-salmon px-4 py-3 min-h-[48px] font-bold text-xs uppercase tracking-widest rounded-md hover:bg-salmon hover:text-marine transition-all duration-300 shadow-lg inline-flex items-center justify-center"
            >
              PRIJSLIJST
            </button>
          </div>
          
          {/* Location - Subtle Footer */}
          <div className="flex flex-col items-center gap-2 text-gray-300 font-light text-sm mt-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>Consciencestraat 1, 8370 Blankenberge</span>
            </div>
            <a 
              href="https://maps.google.com/?q=Consciencestraat+1+8370+Blankenberge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs underline hover:text-white transition-colors"
              aria-label="Open directions to Consciencestraat 1, 8370 Blankenberge in new tab"
            >
              Bekijk route
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const AboutUs = () => {
  return (
    <section id="over-ons" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column - Text Content */}
          <div className="lg:w-1/2">
            {/* Small Label - Editorial Style */}
            <div className="inline-flex items-center space-x-2 text-gray-500 font-bold tracking-widest uppercase mb-6 text-xs">
              <span>Uw Vishandel aan de Haven van Blankenberge</span>
            </div>
            
            {/* Main Headline - Luxury & Passionate */}
            <h2 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-bold text-marine mb-3 leading-tight">
              De Beste Viswinkel van Blankenberge
            </h2>
            
            {/* Subline - Calm & Descriptive */}
            <p className="text-lg text-slate-600 mb-8 font-['Montserrat',sans-serif]">
              Huisbereide visgerechten, kibbeling en zeevruchtenschotels — klaar om mee te nemen. Ook voor klanten uit De Haan, Wenduine en Zeebrugge.
            </p>
            
            {/* Quote Block - Luxury Salmon Theme */}
            <div className="relative bg-[#FFF5F2] p-10 rounded-2xl mb-10 shadow-sm border border-[#FFE4D6] lg:-mr-12 lg:pr-16">
              {/* Large Watermark Quote Icon Behind Text */}
              <Quote className="absolute top-4 left-4 text-[#FF7F50]/10 w-20 h-20 opacity-30 -z-0" />
              
              {/* Quote Text */}
              <p className="relative z-10 text-lg md:text-xl text-marine leading-relaxed font-['Montserrat',sans-serif]">
                "Wij zijn Olivier en Kelly. De Wulk is al meer dan <span className="font-bold text-[#FF7F50] not-italic">100 jaar</span> een vaste waarde in Blankenberge — de beste viswinkel aan de haven. Van visschelpen, coquilles en garnaalkroketten tot kibbeling en rijk gevulde zeevruchtenschotels: altijd met focus op smaak, kwaliteit en vlotte service. Ook klanten uit De Haan en Wenduine vinden makkelijk de weg naar onze vishandel."
              </p>
            </div>
            
            {/* Two Column Feature Grid with Icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <ChefHat className="w-5 h-5 text-marine" />
                  <h4 className="font-bold uppercase tracking-wide text-marine text-sm">Huisbereide Keuken</h4>
                </div>
                <p className="text-slate-600 leading-relaxed font-['Montserrat',sans-serif]">Warme en koude bereidingen, soepen en gerechten uit eigen keuken — klaar om mee te nemen en thuis van te genieten.</p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Fish className="w-5 h-5 text-marine" />
                  <h4 className="font-bold uppercase tracking-wide text-marine text-sm">Zeevruchten & Schotels</h4>
                </div>
                <p className="text-slate-600 leading-relaxed font-['Montserrat',sans-serif]">Zeevruchten en zeevruchtenschotels met een mooie presentatie, ideaal voor elke gelegenheid — van doordeweeks tot etentjes met gasten.</p>
              </div>
            </div>
          </div>
          
          {/* Right Column - Image */}
          <div className="lg:w-1/2 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl shadow-slate-200 border border-gray-100">
              <img 
                src={IMAGE_CONFIG.aboutSection} 
                alt="De Wulk Viswinkel Blankenberge winkelinterieur - Dagverse vis en zeevruchten uit de Noordzee" 
                className="w-full h-[600px] object-cover hover:scale-105 transition-transform duration-1000"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

type PriceListProps = {
  menuData: MenuCategory[];
};

const PriceList: React.FC<PriceListProps> = ({ menuData }) => {
  return (
    <section id="prijslijst" className="py-24 accent-beige" role="main" aria-label="Prijslijst verse vis en zeevruchten">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-marine mb-4">Onze Prijslijst</h2>
          <p className="text-gray-600 max-w-2xl mx-auto italic mb-4">
            "Gelieve op voorhand te bestellen aub. Om teleurstellingen te voorkomen noteren we graag uw bestelling (2 dagen voor de feestdagen)."
          </p>
          <div className="inline-flex flex-col items-center bg-white p-6 rounded-3xl shadow-lg border border-marine/10">
            <div className="flex items-center space-x-2 text-marine font-black text-xl md:text-2xl">
              <Star className="w-5 h-5 fill-salmon stroke-salmon" />
              <span>Gespecialiseerd in buffetten en zeevruchtenschotels</span>
              <Star className="w-5 h-5 fill-salmon stroke-salmon" />
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-12 max-w-6xl mx-auto">
          {menuData.map((category, idx) => (
            <div key={idx} className="bg-white p-6 md:p-8 lg:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-sm hover:shadow-md transition-all border border-marine/5">
              <h3 className="text-2xl font-bold text-marine mb-8 flex items-center">
                <span className="w-8 h-[2px] bg-salmon mr-4"></span>
                {category.title}
              </h3>
              <ul className="space-y-4">
                {category.items.map((item, i) => (
                  <li key={i} className="flex justify-between items-baseline group">
                    <span className="text-gray-700 font-medium group-hover:text-marine transition-colors">{item.name}</span>
                    <div className="flex-1 border-b border-dotted border-gray-300 mx-2"></div>
                    <span className="font-bold text-marine whitespace-nowrap">
                      {item.price}{item.unit && <span className="text-xs font-normal text-gray-400">{item.unit}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 bg-marine rounded-[3rem] p-8 md:p-16 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
             <Waves className="w-full h-full scale-150" />
          </div>
          <h3 className="text-4xl font-bold mb-6 relative z-10 italic tracking-tight">Feestelijk feesten begint hier!</h3>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto relative z-10">
            Vraag naar onze zeevruchtenschotels en visplateaus op maat voor al uw gelegenheden.
          </p>
          <a
            href="tel:+32485755667"
            className="inline-flex items-center gap-3 bg-salmon text-marine px-12 py-5 rounded-full font-black text-lg hover:bg-white transition-all relative z-10 shadow-xl transform hover:scale-105"
          >
            <Phone className="w-6 h-6" />
            Bel ons voor info & bestellingen
          </a>
        </div>
      </div>
    </section>
  );
};

type FavoritesProps = {
  favorites: { id: number; name: string; price: string }[];
};

const Favorites: React.FC<FavoritesProps> = ({ favorites }) => {
  if (!favorites || favorites.length === 0) return null;
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="mt-10 bg-white rounded-[2rem] border border-salmon/30 shadow-sm p-8 max-w-5xl mx-auto">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-salmon/30 rounded-xl">
              <Star className="w-6 h-6 text-marine" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-salmon">Nieuwigheden & tips</p>
              <h4 className="text-2xl font-bold text-marine">Favorieten van 't huis</h4>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-gray-700">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="flex justify-between border-b border-dashed border-gray-200 pb-2">
                <span>{favorite.name}</span>
                <span className="font-semibold text-marine">{favorite.price}</span>
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-3">Bel ons gerust voor feestschotels op maat of dagprijzen voor oesters, kreeft en andere lekkers.</p>
        </div>
      </div>
    </section>
  );
};

const MapCard = () => {
  return (
    <section className="bg-white py-10">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="bg-white border border-gray-200 shadow-lg rounded-[1.75rem] overflow-hidden">
          <div className="grid md:grid-cols-3">
            <div className="p-6 md:p-8 md:col-span-1 flex flex-col justify-center space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-salmon font-bold">Hier vind je ons</p>
              <h3 className="text-2xl font-bold text-marine leading-tight">Consciencestraat 1, Blankenberge</h3>
              <p className="text-gray-600 text-sm">Druk op de kaart om te openen in Google Maps.</p>
              <a
                href="https://maps.google.com/?q=Consciencestraat+1+Blankenberge"
                className="inline-flex items-center w-fit bg-salmon text-marine px-4 py-2 rounded-full font-semibold text-sm shadow-lg hover:bg-white hover:text-marine transition-colors"
              >
                Open in Maps
              </a>
            </div>
            <div className="md:col-span-2 h-80 md:h-96 relative">
              <iframe
                title="Locatie De Wulk"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2513.70796878588!2d3.12655!3d51.31079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c352c10b6e7d95%3A0x8b2b6c7b8cbbcec0!2sConsciencestraat%201%2C%208370%20Blankenberge!5e0!3m2!1snl!2sbe!4v1700000000000"
                loading="lazy"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

type OrderModalProps = {
  open: boolean;
  onClose: () => void;
  menuData: MenuCategory[];
};

const OrderModal: React.FC<OrderModalProps> = ({ open, onClose, menuData }) => {
  const [selected, setSelected] = useState<Record<string, { checked: boolean; qty: number }>>({});
  const [contact, setContact] = useState<'call' | 'sms' | 'email'>('call');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) {
      setSubmitted(false);
    }
  }, [open]);

  const toggleItem = (key: string) => {
    setSelected((prev) => {
      const current = prev[key] || { checked: false, qty: 1 };
      return { ...prev, [key]: { ...current, checked: !current.checked } };
    });
  };

  const setQty = (key: string, qty: number) => {
    setSelected((prev) => {
      const current = prev[key] || { checked: true, qty: 1 };
      return { ...prev, [key]: { ...current, checked: true, qty } };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onClose();
      setSubmitted(false);
    }, 2200);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <img src={ultiemLogo} alt="De Wulk Viswinkel Blankenberge Logo" className="h-10 w-auto object-contain" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-salmon font-bold">Bestellen</p>
              <h3 className="text-xl font-bold text-marine">Stel je bestelling samen</h3>
            </div>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-marine">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="max-h-[75vh] md:max-h-[80vh] overflow-y-auto">
          <div className="grid md:grid-cols-3 gap-0">
            <div className="md:col-span-2 p-6 space-y-6">
              {menuData.map((cat, idx) => (
                <div key={idx} className="border border-gray-100 rounded-2xl p-4">
                  <h4 className="text-lg font-bold text-marine mb-3">{cat.title}</h4>
                  <div className="space-y-3">
                    {cat.items.map((item, i) => {
                      const key = `${cat.title}-${item.name}`;
                      const entry = selected[key] || { checked: false, qty: 1 };
                      return (
                        <div key={i} className="flex items-center justify-between gap-3">
                          <label className="flex items-center gap-3 flex-1 cursor-pointer">
                            <input
                              type="checkbox"
                              className="h-4 w-4 text-marine"
                              checked={entry.checked}
                              onChange={() => toggleItem(key)}
                            />
                            <span className="text-gray-700">{item.name} <span className="text-gray-400 text-sm">({item.price}{item.unit ?? ''})</span></span>
                          </label>
                          <select
                            value={entry.qty}
                            onChange={(e) => setQty(key, Number(e.target.value))}
                            className="border border-gray-200 rounded-xl px-3 py-1 text-sm text-marine"
                          >
                            {[1,2,3,4,5,6].map((q) => (
                              <option key={q} value={q}>{q}x</option>
                            ))}
                          </select>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="md:border-l border-gray-100 p-6 space-y-4 bg-gray-50">
              <div>
                <label className="block text-xs font-bold text-salmon uppercase tracking-[0.2em] mb-2">GSM Nummer</label>
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-salmon"
                  placeholder="04xx xx xx xx"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-salmon uppercase tracking-[0.2em] mb-2">E-mail</label>
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:ring-2 focus:ring-salmon"
                  placeholder="info@jij.be"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-salmon uppercase tracking-[0.2em] mb-2">Contactvoorkeur</p>
                <div className="space-y-2 text-sm text-gray-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="contactpref" checked={contact === 'call'} onChange={() => setContact('call')} />
                    Bel mij
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="contactpref" checked={contact === 'sms'} onChange={() => setContact('sms')} />
                    Stuur een sms/bericht
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="contactpref" checked={contact === 'email'} onChange={() => setContact('email')} />
                    Mail is prima
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-marine text-white py-4 rounded-xl font-bold text-lg hover:bg-salmon hover:text-marine transition-colors shadow-lg"
              >
                Verzenden
              </button>

              {submitted && (
                <div className="mt-3 text-sm text-marine bg-salmon/20 border border-salmon/40 rounded-xl p-3">
                  Bedankt voor uw bestelling, we hebben dit goed ontvangen. We contacteren u zo snel mogelijk via mail of geven u een belletje.
                </div>
              )}

              <p className="text-xs text-gray-500 mt-2">
                Bestellingen worden doorgestuurd naar dewulk@info.be (test).
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

const Gallery = () => {
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const slides = IMAGE_CONFIG.gallery;
  const scrollTimeoutRef = React.useRef<number | null>(null);

  const scrollToIndex = (next: number) => {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.firstElementChild as HTMLElement | null;
    const cardWidth = card ? card.clientWidth + 16 : container.clientWidth; // 16 = gap
    container.scrollTo({ left: cardWidth * next, behavior: 'smooth' });
    setActive(next);
  };

  const handleScroll = () => {
    if (scrollTimeoutRef.current !== null) return;
    scrollTimeoutRef.current = window.requestAnimationFrame(() => {
      const container = scrollRef.current;
      if (!container) {
        scrollTimeoutRef.current = null;
        return;
      }
      const card = container.firstElementChild as HTMLElement | null;
      if (!card) {
        scrollTimeoutRef.current = null;
        return;
      }
      const cardWidth = card.clientWidth + 16; // 16 = gap
      const scrollLeft = container.scrollLeft;
      const newActive = Math.round(scrollLeft / cardWidth);
      if (newActive !== active && newActive >= 0 && newActive < slides.length) {
        setActive(newActive);
      }
      scrollTimeoutRef.current = null;
    });
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const id = setInterval(() => {
      const next = (active + 1) % slides.length;
      scrollToIndex(next);
    }, 4500);
    return () => clearInterval(id);
  }, [active, slides.length]);

  const handlePrev = () => {
    const next = active === 0 ? slides.length - 1 : active - 1;
    scrollToIndex(next);
  };

  const handleNext = () => {
    const next = (active + 1) % slides.length;
    scrollToIndex(next);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-marine mb-3">Sfeerbeelden</h2>
          <p className="text-gray-600">Dagverse aanvoer, huisbereide schotels en de gezellige winkel in Blankenberge.</p>
        </div>
        <div className="relative">
          <div className="overflow-x-auto touch-action-pan-x scrollbar-hide" ref={scrollRef} onScroll={handleScroll} style={{ touchAction: 'pan-x pan-y' }}>
            <div className="flex space-x-4 snap-x snap-mandatory">
              {slides.map((img, idx) => (
                <div
                  key={idx}
                  className="snap-start min-w-[78%] md:min-w-[48%] lg:min-w-[24%] relative overflow-hidden rounded-[2rem] aspect-[4/5] shadow-lg border border-gray-100 group"
                >
                  <img
                    src={img.url}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-marine/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                    <span className="text-white font-bold text-lg">{img.alt}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            aria-label="Vorige foto"
            onClick={handlePrev}
            className="hidden md:flex items-center justify-center absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 hover:-translate-y-1/2 hover:scale-105 transition-transform"
          >
            <ChevronRight className="w-5 h-5 text-marine rotate-180" />
          </button>
          <button
            aria-label="Volgende foto"
            onClick={handleNext}
            className="hidden md:flex items-center justify-center absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-lg border border-gray-100 hover:-translate-y-1/2 hover:scale-105 transition-transform"
          >
            <ChevronRight className="w-5 h-5 text-marine" />
          </button>
        </div>
        <div className="md:hidden text-center mt-4 text-gray-400 text-sm animate-pulse flex items-center justify-center gap-2" aria-label="Swipe horizontaal voor meer foto's">
          <ChevronRight className="w-4 h-4 rotate-180" aria-hidden="true" />
          <span>Swipe voor meer foto's</span>
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
};

const OpeningHours: React.FC<{ schedule: OpeningHourData[] }> = ({ schedule }) => {
  // Convert OpeningHourData to OpeningHour format for display
  const displaySchedule: OpeningHour[] = schedule.map(item => ({
    day: item.dag,
    hours: item.uren
  }));

  return (
    <section id="uren" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <div className="bg-marine rounded-3xl md:rounded-[3rem] p-6 md:p-10 lg:p-16 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 hidden md:block">
            <Clock className="w-80 h-80 -translate-y-20 translate-x-20" />
          </div>
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-8 md:gap-16 items-start lg:items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6 md:mb-8">
                <div className="p-2.5 md:p-3 bg-salmon rounded-xl md:rounded-2xl flex-shrink-0">
                  <Clock className="w-6 h-6 md:w-8 md:h-8 text-marine" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold leading-tight">Openingsuren</h2>
              </div>
              <p className="text-base md:text-xl text-blue-100 mb-6 md:mb-8 leading-relaxed">
                U vindt ons in de <span className="text-salmon font-bold">Consciencestraat 1</span>. Kom langs voor de beste vis van de kust!
              </p>
              <div className="p-4 md:p-6 bg-white/5 border border-white/10 rounded-xl md:rounded-2xl">
                <p className="text-xs md:text-sm uppercase tracking-widest font-bold text-salmon mb-2">Afwijkende uren</p>
                <p className="text-sm md:text-base text-blue-50 font-medium italic">Check onze social media of bel ons voor info tijdens de feestdagen.</p>
              </div>
            </div>
            <div className="bg-white/5 p-4 md:p-8 rounded-2xl md:rounded-[2rem] backdrop-blur-sm border border-white/10">
              <ul className="space-y-3 md:space-y-4">
                {displaySchedule.map((item) => (
                  <li key={item.day} className="flex justify-between items-center border-b border-white/10 pb-2.5 md:pb-3 last:border-b-0">
                    <span className={`font-bold text-sm md:text-base ${item.hours === 'Gesloten' ? 'text-salmon' : 'text-white'}`}>{item.day}</span>
                    <span className={`font-medium text-sm md:text-base ${item.hours === 'Gesloten' ? 'text-salmon italic' : 'text-blue-100'}`}>{item.hours}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-marine mb-8 leading-[1.1]">Contacteer De&nbsp;Wulk</h2>
          <p className="text-xl text-gray-600 mb-12">
            Bij <span className="font-bold text-marine">Olivier & Kelly</span> staat de klant centraal. Heeft u een bestelling of een vraag? Wij staan u graag te woord.
          </p>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="bg-salmon text-marine p-4 rounded-full shadow-md">
                <MapPin className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-marine mb-0.5">Adres</h4>
                <p className="text-gray-600">Consciencestraat 1, 8370 Blankenberge</p>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="bg-salmon text-marine p-4 rounded-full shadow-md">
                <Phone className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-marine mb-0.5">Telefoon</h4>
                <div className="space-y-2">
                  <p className="text-gray-600 font-bold text-2xl hover:text-salmon transition-colors">
                    <a href="tel:+32485755667">0485 75 56 67</a>
                  </p>
                  <p className="text-gray-600 font-bold text-2xl hover:text-salmon transition-colors">
                    <a href="tel:+32497837718">0497 83 77 18</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start space-x-6">
              <div className="bg-salmon text-marine p-4 rounded-full shadow-md">
                <Mail className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-marine mb-0.5">E-mail</h4>
                <p className="text-gray-600 hover:text-salmon transition-colors text-lg">
                  <a href="mailto:info@vishandelolivierenkelly.be">info@vishandelolivierenkelly.be</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerLinks = [
    { name: 'Over Ons', id: 'over-ons' },
    { name: 'Prijslijst', id: 'prijslijst' },
    { name: 'Openingsuren', id: 'uren' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="bg-marine text-white pt-24 pb-6 overflow-hidden relative">
      {/* Decorative wave background element */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <Waves className="absolute top-10 right-10 w-64 h-64 rotate-12" />
        <Fish className="absolute bottom-20 left-10 w-48 h-48 -rotate-12" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Main footer content - 4 column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 mb-12 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <img src={ultiemLogo} alt="De Wulk Viswinkel Blankenberge Logo - Olivier & Kelly" className="w-12 h-12 object-contain" />
              <div className="flex flex-col">
                <span className="text-2xl font-bold tracking-tighter">DE WULK</span>
                <span className="text-[9px] font-bold tracking-[0.3em] text-salmon">BIJ OLIVIER & KELLY</span>
              </div>
            </div>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              Uw vertrouwde viswinkel aan de haven van Blankenberge voor dagverse vis, zeevruchten, kibbeling en garnalen uit de Noordzee. De beste vishandel aan de Belgische kust — ook voor De Haan, Wenduine en Zeebrugge.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="https://www.facebook.com/people/De-Wulk-Vishandel-Olivier-Kelly/100054396603835/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-salmon text-marine rounded-full hover:bg-white hover:text-marine transition-all duration-300 transform hover:scale-110"
                aria-label="Bezoek onze Facebook pagina"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/vishandel_dewulk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-salmon text-marine rounded-full hover:bg-white hover:text-marine transition-all duration-300 transform hover:scale-110"
                aria-label="Volg ons op Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 text-white">Snelle Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-blue-100 hover:text-salmon transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform" />
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 text-white">Contact</h3>
            <ul className="space-y-4 text-blue-100 text-sm">
              <li className="flex items-start">
                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-salmon flex-shrink-0" />
                <span>
                  Consciencestraat 1<br />
                  8370 Blankenberge, België
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-salmon flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+32485755667" className="hover:text-salmon transition-colors">
                    0485 75 56 67
                  </a>
                  <a href="tel:+32497837718" className="hover:text-salmon transition-colors">
                    0497 83 77 18
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-salmon flex-shrink-0" />
                <a href="mailto:info@vishandelolivierenkelly.be" className="hover:text-salmon transition-colors break-all">
                  info@vishandelolivierenkelly.be
                </a>
              </li>
            </ul>
          </div>

          {/* Business Info Column */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-bold mb-6 text-white">Bedrijfsinfo</h3>
            <div className="text-blue-100 text-sm space-y-3">
              <p className="font-semibold text-white">De Wulk BV</p>
              <p className="text-xs leading-relaxed">
                Vishandel Olivier & Kelly
              </p>
              <div className="pt-3 space-y-2 border-t border-white/10">
                <p className="text-xs">
                  <span className="text-salmon font-semibold">Ondernemingsnr:</span><br />
                  0473.055.043
                </p>
                <p className="text-xs">
                  <span className="text-salmon font-semibold">BTW:</span><br />
                  BE 0473.055.043
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar - Copyright and Back to Top */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 text-center sm:text-left">
            <p className="text-xs text-blue-300">
              © {new Date().getFullYear()} De Wulk BV. Alle rechten voorbehouden.
            </p>
            <span className="hidden sm:inline text-blue-300/50 mx-3">|</span>
            <a 
              href="https://www.webaanzee.be" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Website laten maken aan de kust"
              className="text-xs text-blue-300 hover:text-salmon transition-colors duration-300"
            >
              Website door <strong className="text-white">Web<span className="text-amber-400">aan</span>Zee.be</strong>
            </a>
          </div>
          <button
            onClick={scrollToTop}
            className="text-sm text-blue-100 hover:text-salmon transition-all duration-300 flex items-center gap-2 group"
            aria-label="Terug naar boven"
          >
            <span>Terug naar boven</span>
            <ChevronRight className="w-4 h-4 -rotate-90 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error('Error loading menu data:', error);
        // Fallback to empty data if fetch fails
        setMenuData({
          menu: [],
          openingsuren: [],
          favorieten: []
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  if (loading || !menuData) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-marine mx-auto mb-4"></div>
          <p className="text-marine font-bold">Laden...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <MapCard />
      <AboutUs />
      <PriceList menuData={menuData.menu} />
      <Favorites favorites={menuData.favorieten || []} />
      <Gallery />
      <OpeningHours schedule={menuData.openingsuren} />
      <Contact />
      <Footer />
      
      <style>{`
        @keyframes slow-zoom {
          0% { transform: scale(1.05); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1.05); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s ease-in-out infinite;
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        
        /* Safe area insets for notched devices */
        .pt-safe {
          padding-top: max(1.25rem, env(safe-area-inset-top));
        }
        .pb-safe {
          padding-bottom: max(0.75rem, env(safe-area-inset-bottom));
        }
        
        /* Landscape orientation support for small devices */
        @media (max-height: 500px) and (orientation: landscape) {
          .hero-title {
            font-size: clamp(2rem, 8vw, 3.5rem) !important;
            line-height: 1.1 !important;
          }
          .hero-subtitle {
            font-size: clamp(1rem, 4vw, 1.5rem) !important;
          }
          .hero-description {
            font-size: clamp(1.2rem, 5vw, 1.8rem) !important;
          }
        }
        
        /* Touch device optimization */
        @media (hover: none) and (pointer: coarse) {
          button, a {
            -webkit-tap-highlight-color: rgba(243, 198, 184, 0.3);
          }
        }
        
        /* Prevent text size adjustment on orientation change */
        html {
          -webkit-text-size-adjust: 100%;
          -moz-text-size-adjust: 100%;
          -ms-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }
        
        /* Smooth scrolling for all devices */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default App;
