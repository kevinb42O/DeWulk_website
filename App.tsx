import React, { useState, useEffect, useRef } from 'react';
import { 
  Fish, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Menu as MenuIcon, 
  ChevronRight, 
  ChevronLeft,
  ChefHat, 
  Star, 
  Quote, 
  X
} from 'lucide-react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useSpring, 
  useTransform,
  Variants
} from 'framer-motion';
import { Analytics } from '@vercel/analytics/react';
import { Offering, OpeningHour, GalleryItem, MenuCategory, MenuData, OpeningHourData, FavoriteItem } from './types';
import { LegalModal, LegalTab } from './LegalModal';

const ultiemLogo = '/final_LOGOSMALL.webp';
const heroImg = '/viswinkelV3_FINAL.webp';
import interiorImg from './winkel_binnen.webp';
import harbourImg from './havenfeesten_sfeerbeeld.webp';
import saladsImg from './salades_versbereid.webp';
import shrimpTrayImg from './garnaalschotel.webp';
import shrimpTray2Img from './garnaalschotel2.webp';

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

// Physics-based luxury easing curve
const luxuryEase = [0.16, 1, 0.3, 1] as const;

// Animation variants
const fadeInUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.75, ease: luxuryEase } 
  }
};

const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemStaggerVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.45, ease: luxuryEase } 
  }
};

// --- Navbar Component ---
const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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
      setIsOpen(false);
    }
  };

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: luxuryEase }}
      className={`fixed w-full z-50 transition-all duration-500 ease-out ${
        scrolled 
          ? 'bg-[#081018]/92 backdrop-blur-xl py-3 border-b border-white/10 shadow-2xl' 
          : 'bg-gradient-to-b from-[#081018]/85 via-[#081018]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Brand Lockup */}
        <a 
          href="#" 
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="flex items-center space-x-3 group"
        >
          <motion.img 
            whileHover={{ scale: 1.06, rotate: -2 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            src={ultiemLogo} 
            alt="De Wulk Viswinkel Blankenberge Logo - Olivier en Kelly" 
            className="h-11 md:h-13 w-auto object-contain" 
          />
          <div className="flex flex-col leading-tight">
            <span className="font-serif-title text-xl md:text-2xl font-bold tracking-tight text-white uppercase leading-none">
              DE WULK
            </span>
            <span className="text-[10px] md:text-[11px] font-semibold tracking-[0.25em] text-[#C5A059] uppercase mt-0.5">
              VISHANDEL
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => scrollToSection(link.id)}
              className="text-white/85 text-xs font-bold tracking-[0.2em] uppercase hover:text-[#C5A059] transition-colors duration-300 relative group py-1"
            >
              {link.name}
              <motion.span 
                className="absolute bottom-0 left-1/2 w-0 h-[1.5px] bg-[#C5A059] transition-all duration-300 -translate-x-1/2 group-hover:w-full" 
              />
            </button>
          ))}
        </div>

        {/* Call button */}
        <div className="hidden md:flex items-center space-x-4">
          <motion.a 
            whileHover={{ scale: 1.04, boxShadow: "0 8px 20px -4px rgba(200,122,94,0.3)" }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            href="tel:+32485755667" 
            className="flex items-center space-x-2 bg-white/10 hover:bg-[#C87A5E] text-white px-5 py-2.5 rounded-full border border-white/20 hover:border-[#C87A5E] text-xs font-bold tracking-wider uppercase transition-colors duration-300 shadow-sm"
          >
            <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
            <span>0485 75 56 67</span>
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <motion.button 
          whileTap={{ scale: 0.9 }}
          className="lg:hidden p-2 text-white hover:text-[#C5A059] transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Menu"
        >
          {isOpen ? <X size={26} /> : <MenuIcon size={26} />}
        </motion.button>
      </div>

      {/* Mobile Drawer with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: luxuryEase }}
            className="lg:hidden fixed inset-x-0 top-full bg-[#081018]/98 backdrop-blur-2xl border-b border-white/10 shadow-2xl p-8 flex flex-col space-y-5 overflow-hidden"
          >
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainerVariants}
              className="flex flex-col space-y-3"
            >
              {navLinks.map((link) => (
                <motion.button 
                  variants={itemStaggerVariants}
                  key={link.name} 
                  onClick={() => scrollToSection(link.id)} 
                  className="text-left text-white/90 text-sm font-bold tracking-widest uppercase hover:text-[#C5A059] transition-colors py-2 border-b border-white/5"
                >
                  {link.name}
                </motion.button>
              ))}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="pt-2 flex flex-col space-y-3"
            >
              <a 
                href="tel:+32485755667"
                className="flex items-center justify-center space-x-2 bg-[#C87A5E] text-white py-3 rounded-full text-xs font-bold tracking-widest uppercase shadow-lg"
              >
                <Phone className="w-4 h-4" />
                <span>Bel om te bestellen: 0485 75 56 67</span>
              </a>
              <p className="text-center text-white/40 text-[11px] tracking-wider">
                Consciencestraat 1, 8370 Blankenberge
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// --- Hero Component with Parallax Depth ---
const Hero: React.FC = () => {
  const [shopStatus, setShopStatus] = useState({ text: '', dotColor: '', dotShadow: '' });
  const heroRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.75], [0, 40]);

  useEffect(() => {
    const checkShopStatus = () => {
      const now = new Date();
      const currentDay = now.getDay();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      const currentTime = currentHour + currentMinute / 60;

      const closedDays = new Set([3, 4]);

      const openTime = 9;
      const closeTimes: Record<number, number> = {
        0: 18,    // Zondag
        1: 18,    // Maandag
        2: 17.5,  // Dinsdag (17:30)
        5: 18,    // Vrijdag
        6: 18,    // Zaterdag
      };

      const dayNames = ['zondag', 'maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag'];
      const findNextOpenDay = (fromDay: number, afterHours: boolean): string => {
        if (!afterHours && !closedDays.has(fromDay)) return 'vandaag';
        for (let i = 1; i <= 7; i++) {
          const nextDay = (fromDay + i) % 7;
          if (!closedDays.has(nextDay)) {
            if (i === 1) return 'morgen';
            return dayNames[nextDay];
          }
        }
        return 'binnenkort';
      };

      if (closedDays.has(currentDay)) {
        const nextDay = findNextOpenDay(currentDay, true);
        setShopStatus({
          text: `Nu gesloten · open ${nextDay} om 09:00`,
          dotColor: 'bg-[#C5A059]',
          dotShadow: 'shadow-[#C5A059]/40',
        });
        return;
      }

      const closeTime = closeTimes[currentDay] ?? 18;
      const closeTimeDisplay = closeTime === 17.5 ? '17:30' : `${closeTime}:00`;

      if (currentTime >= openTime && currentTime < closeTime) {
        setShopStatus({
          text: `Nu open · tot ${closeTimeDisplay}`,
          dotColor: 'bg-emerald-400',
          dotShadow: 'shadow-emerald-400/50',
        });
      } else {
        const afterHours = currentTime >= closeTime;
        const nextDay = findNextOpenDay(currentDay, afterHours);
        setShopStatus({
          text: `Nu gesloten · open ${nextDay} om 09:00`,
          dotColor: 'bg-[#C5A059]',
          dotShadow: 'shadow-[#C5A059]/40',
        });
      }
    };

    checkShopStatus();
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
    <section 
      ref={heroRef}
      className="relative min-h-[640px] md:min-h-screen flex items-end overflow-hidden bg-[#081018]" 
      role="banner" 
      aria-label="De Wulk Viswinkel Blankenberge - Verse vis en zeevruchten"
    >
      {/* Background Image with Parallax Movement - Bright & Crisp Shopfront */}
      <motion.div 
        initial={{ scale: 1.08, opacity: 0.85 }}
        animate={{ scale: 1.03, opacity: 1 }}
        transition={{ duration: 1.6, ease: luxuryEase }}
        className="absolute inset-0 -top-[10%] -bottom-[10%] z-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url(${IMAGE_CONFIG.heroBackground})`,
          filter: 'brightness(1) contrast(1.03) saturate(1.02)',
          y: backgroundY
        }}
      >
        {/* Subtle top edge vignette to guarantee nav contrast without dimming the storefront */}
        <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/45 via-black/15 to-transparent pointer-events-none" />
        {/* Subtle bottom edge transition */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#081018]/40 to-transparent pointer-events-none" />
      </motion.div>
      
      {/* Hero Content with Scroll Fade */}
      <motion.div 
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-20 md:pb-28 pt-32"
      >
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          
          {/* Left: Main text content inside an organic luxury backdrop blob */}
          <div className="relative md:max-w-2xl">
            {/* Ambient diffuse halo behind the blob to softly melt into the photo */}
            <div 
              className="absolute -inset-4 sm:-inset-6 -z-20 rounded-[44px_24px_50px_30px] bg-[#081018]/50 blur-2xl pointer-events-none" 
              aria-hidden="true"
            />
            
            {/* Organic Frosted Glass Blob Container */}
            <div className="relative z-10 p-6 sm:p-8 md:p-10 rounded-[32px_18px_40px_24px] sm:rounded-[38px_22px_46px_28px] bg-[#081018]/75 md:bg-[#081018]/70 backdrop-blur-xl border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)]">
              {/* Live Status Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: luxuryEase }}
                className="inline-flex items-center gap-2.5 bg-white/10 backdrop-blur-md rounded-full px-4 py-1.5 mb-5 border border-white/15 shadow-sm"
              >
                <motion.span 
                  animate={{ scale: [1, 1.35, 1], opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  className={`w-2.5 h-2.5 rounded-full ${shopStatus.dotColor}`}
                />
                <span className="text-xs font-semibold tracking-wide text-white/90">
                  {shopStatus.text}
                </span>
              </motion.div>
              
              {/* Title */}
              <motion.h1 
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.3, ease: luxuryEase }}
                className="font-serif-title text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-2 uppercase leading-[0.92] tracking-tight"
              >
                DE WULK
              </motion.h1>
              
              {/* Subtitle */}
              <motion.p 
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: luxuryEase }}
                className="text-[#C5A059] font-bold uppercase text-xs sm:text-sm md:text-base tracking-[0.25em] mb-5"
              >
                Bij Olivier & Kelly
              </motion.p>
              
              {/* Combined description + heritage */}
              <motion.p 
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: luxuryEase }}
                className="text-white/90 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed mb-7 font-light"
              >
                Dagverse vis, zeevruchten en zeevruchtenschotels — al meer dan <strong className="text-white font-semibold">100 jaar</strong> de beste viswinkel aan de haven van Blankenberge.
              </motion.p>
              
              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: luxuryEase }}
                className="flex flex-row flex-wrap gap-3"
              >
                <motion.a 
                  whileHover={{ scale: 1.04, boxShadow: "0 10px 24px -4px rgba(200,122,94,0.4)" }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  href="tel:+32485755667" 
                  className="bg-[#C87A5E] hover:bg-[#B76A4E] text-white px-5 sm:px-6 py-3 sm:py-3.5 min-h-[44px] sm:min-h-[48px] font-bold text-xs uppercase tracking-widest rounded-full transition-colors shadow-lg inline-flex items-center gap-2" 
                  aria-label="Bel +32485755667 om te bestellen"
                >
                  <Phone className="w-4 h-4" />
                  Bel om te bestellen
                </motion.a>
                <motion.button 
                  whileHover={{ scale: 1.04, backgroundColor: "rgba(255,255,255,0.22)" }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => scrollToSection('prijslijst')}
                  className="bg-white/15 hover:bg-white/20 border border-white/30 text-white px-5 sm:px-6 py-3 sm:py-3.5 min-h-[44px] sm:min-h-[48px] font-bold text-xs uppercase tracking-widest rounded-full backdrop-blur-sm transition-colors inline-flex items-center"
                >
                  Prijslijst
                </motion.button>
              </motion.div>
            </div>
          </div>
          
          {/* Right: Address card in matching glass pill */}
          <motion.div 
            initial={{ opacity: 0, x: 22 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: luxuryEase }}
            className="md:text-right flex flex-col items-start md:items-end gap-2 text-white/90 text-xs sm:text-sm p-4 sm:p-5 rounded-2xl bg-[#081018]/70 md:bg-[#081018]/65 backdrop-blur-xl border border-white/15 shadow-xl"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#C5A059] flex-shrink-0" />
              <span className="font-medium">Consciencestraat 1, 8370 Blankenberge</span>
            </div>
            <a 
              href="https://maps.google.com/?q=Consciencestraat+1+8370+Blankenberge" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#C5A059] hover:text-white text-xs font-semibold transition-colors underline underline-offset-4 ml-6 md:ml-0 inline-flex items-center gap-1"
              aria-label="Open route naar Consciencestraat 1, Blankenberge"
            >
              Bekijk route &rarr;
            </a>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

// --- About Us Component with Parallax Image & Stagger ---
const AboutUs: React.FC = () => {
  const aboutRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"]
  });

  const imageParallaxY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section 
      ref={aboutRef}
      id="over-ons" 
      className="py-24 md:py-32 bg-[#FBF9F5] text-[#141E28] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Column - Text Content */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={staggerContainerVariants}
            className="lg:w-1/2 space-y-6"
          >
            <motion.div 
              variants={fadeInUpVariants}
              className="inline-flex items-center space-x-2 text-[#C87A5E] font-bold tracking-[0.25em] uppercase text-xs"
            >
              <span>Uw Vishandel aan de Haven van Blankenberge</span>
            </motion.div>
            
            <motion.h2 
              variants={fadeInUpVariants}
              className="font-serif-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#0C1C2C] leading-tight"
            >
              De Beste Viswinkel van Blankenberge
            </motion.h2>
            
            <motion.p 
              variants={fadeInUpVariants}
              className="text-base sm:text-lg text-slate-600 font-light leading-relaxed"
            >
              Huisbereide visgerechten, kibbeling en zeevruchtenschotels — klaar om mee te nemen. Ook voor klanten uit De Haan, Wenduine en Zeebrugge.
            </motion.p>
            
            {/* Quote Block with hover elevation */}
            <motion.div 
              variants={fadeInUpVariants}
              whileHover={{ y: -4, boxShadow: "0 12px 28px -8px rgba(12,28,44,0.08)" }}
              transition={{ duration: 0.3 }}
              className="relative bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-[#0C1C2C]/5"
            >
              <Quote className="absolute top-4 left-4 text-[#C87A5E]/15 w-16 h-16 pointer-events-none" />
              <p className="relative z-10 text-base md:text-lg text-[#0C1C2C] leading-relaxed font-normal">
                "Wij zijn Olivier en Kelly. De Wulk is al meer dan <span className="font-bold text-[#C87A5E]">100 jaar</span> een vaste waarde in Blankenberge — de beste viswinkel aan de haven. Van visschelpen, coquilles en garnaalkroketten tot kibbeling en rijk gevulde zeevruchtenschotels: altijd met focus op smaak, kwaliteit en vlotte service. Ook klanten uit De Haan en Wenduine vinden makkelijk de weg naar onze vishandel."
              </p>
            </motion.div>
            
            {/* Two Column Feature Grid with Icons */}
            <motion.div 
              variants={fadeInUpVariants}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2"
            >
              <motion.div 
                whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.95)" }}
                transition={{ duration: 0.25 }}
                className="space-y-2 p-4 rounded-xl bg-white/60 border border-[#0C1C2C]/5 shadow-sm"
              >
                <div className="flex items-center space-x-2.5">
                  <ChefHat className="w-5 h-5 text-[#C87A5E]" />
                  <h4 className="font-bold uppercase tracking-wider text-[#0C1C2C] text-xs">Huisbereide Keuken</h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  Warme en koude bereidingen, soepen en gerechten uit eigen keuken — klaar om mee te nemen en thuis van te genieten.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -3, backgroundColor: "rgba(255,255,255,0.95)" }}
                transition={{ duration: 0.25 }}
                className="space-y-2 p-4 rounded-xl bg-white/60 border border-[#0C1C2C]/5 shadow-sm"
              >
                <div className="flex items-center space-x-2.5">
                  <Fish className="w-5 h-5 text-[#C87A5E]" />
                  <h4 className="font-bold uppercase tracking-wider text-[#0C1C2C] text-xs">Zeevruchten & Schotels</h4>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed font-light">
                  Zeevruchten en zeevruchtenschotels met een mooie presentatie, ideaal voor elke gelegenheid — van doordeweeks tot etentjes met gasten.
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Right Column - Image with Parallax */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.9, ease: luxuryEase }}
            className="lg:w-1/2 relative w-full overflow-hidden rounded-3xl shadow-xl border-4 border-white aspect-[4/5] group"
          >
            <motion.img 
              style={{ y: imageParallaxY }}
              src={IMAGE_CONFIG.aboutSection} 
              alt="De Wulk Viswinkel Blankenberge winkelinterieur - Dagverse vis en zeevruchten uit de Noordzee" 
              className="w-full h-[115%] -mt-[7.5%] object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
};

// --- PriceList Component with Animated Sliding Pill & Item Stagger ---
type PriceListProps = {
  menuData: MenuCategory[];
};

const PriceList: React.FC<PriceListProps> = ({ menuData }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Alle');

  const categories = ['Alle', ...Array.from(new Set(menuData.map(c => c.title.trim())))];

  const filteredCategories = selectedCategory === 'Alle' 
    ? menuData 
    : menuData.filter(c => c.title.trim() === selectedCategory);

  return (
    <section id="prijslijst" className="py-24 md:py-32 bg-[#F4EFEB] text-[#141E28]" role="main" aria-label="Prijslijst verse vis en zeevruchten">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: luxuryEase }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <h2 className="font-serif-title text-4xl sm:text-5xl font-bold text-[#0C1C2C] mb-4">
            Onze Prijslijst
          </h2>
          <p className="text-slate-600 italic mb-6 font-light text-base leading-relaxed">
            "Gelieve op voorhand te bestellen aub. Om teleurstellingen te voorkomen noteren we graag uw bestelling (2 dagen voor de feestdagen)."
          </p>
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center space-x-2 bg-white px-6 py-3.5 rounded-full shadow-sm border border-[#0C1C2C]/5"
          >
            <Star className="w-4 h-4 fill-[#C87A5E] stroke-[#C87A5E]" />
            <span className="font-bold text-xs sm:text-sm tracking-wider uppercase text-[#0C1C2C]">
              Gespecialiseerd in buffetten en zeevruchtenschotels
            </span>
            <Star className="w-4 h-4 fill-[#C87A5E] stroke-[#C87A5E]" />
          </motion.div>
        </motion.div>

        {/* Category Tabs with Animated Sliding Pill */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto scrollbar-hide space-x-2 mb-12 pb-2">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-colors duration-300 ${
                  isSelected ? 'text-white' : 'text-slate-700 hover:text-[#0C1C2C]'
                }`}
              >
                {isSelected && (
                  <motion.div
                    layoutId="activeCategoryTab"
                    className="absolute inset-0 bg-[#0C1C2C] rounded-full -z-10 shadow-md"
                    transition={{ type: "spring", stiffness: 450, damping: 35 }}
                  />
                )}
                {!isSelected && (
                  <div className="absolute inset-0 bg-white rounded-full -z-20 border border-slate-200/70" />
                )}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Menu Cards Grid with AnimatePresence & Staggered Row Entries */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={selectedCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: luxuryEase }}
            className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto"
          >
            {filteredCategories.map((category, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: luxuryEase }}
                whileHover={{ y: -4, boxShadow: "0 12px 28px -6px rgba(12,28,44,0.08)" }}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-sm border border-[#0C1C2C]/5"
              >
                <h3 className="font-serif-title text-2xl font-bold text-[#0C1C2C] mb-6 flex items-center">
                  <span className="w-6 h-[2px] bg-[#C87A5E] mr-3"></span>
                  {category.title}
                </h3>
                <motion.ul 
                  variants={staggerContainerVariants}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {category.items.map((item, i) => (
                    <motion.li 
                      key={i} 
                      variants={itemStaggerVariants}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                      className="flex justify-between items-baseline group"
                    >
                      <span className="text-slate-700 font-medium group-hover:text-[#C87A5E] transition-colors text-sm sm:text-base">
                        {item.name}
                      </span>
                      <div className="flex-1 border-b border-dotted border-slate-300 mx-3"></div>
                      <span className="font-bold text-[#0C1C2C] whitespace-nowrap text-sm sm:text-base">
                        {item.price}{item.unit && <span className="text-xs font-normal text-slate-400 ml-1">{item.unit}</span>}
                      </span>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Callout Banner at bottom of PriceList */}
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: luxuryEase }}
          className="mt-16 bg-[#0C1C2C] rounded-3xl p-8 sm:p-14 text-center text-white relative overflow-hidden shadow-2xl max-w-5xl mx-auto"
        >
          <h3 className="font-serif-title text-3xl sm:text-4xl font-bold mb-4 relative z-10 tracking-tight">
            Feestelijk feesten begint hier!
          </h3>
          <p className="text-base sm:text-lg text-white/80 mb-8 max-w-2xl mx-auto relative z-10 font-light">
            Vraag naar onze zeevruchtenschotels en visplateaus op maat voor al uw gelegenheden.
          </p>
          <motion.a
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(200,122,94,0.5)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            href="tel:+32485755667"
            className="inline-flex items-center gap-3 bg-[#C87A5E] hover:bg-[#B76A4E] text-white px-8 sm:px-10 py-4 rounded-full font-bold text-xs uppercase tracking-widest transition-colors relative z-10 shadow-xl"
          >
            <Phone className="w-4 h-4" />
            Bel ons voor info & bestellingen
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
};

// --- Favorites Component with Star Animation ---
type FavoritesProps = {
  favorites: { id: number; name: string; price: string }[];
};

const Favorites: React.FC<FavoritesProps> = ({ favorites }) => {
  if (!favorites || favorites.length === 0) return null;
  
  return (
    <section className="py-16 bg-[#FBF9F5]">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: luxuryEase }}
          whileHover={{ y: -3, boxShadow: "0 10px 24px -6px rgba(200,122,94,0.12)" }}
          className="bg-white rounded-3xl border border-[#C87A5E]/25 shadow-sm p-8 sm:p-10"
        >
          <div className="flex items-center space-x-3 mb-6">
            <motion.div 
              whileHover={{ rotate: 180, scale: 1.15 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="p-3 bg-[#F4EFEB] text-[#C87A5E] rounded-xl cursor-pointer"
            >
              <Star className="w-6 h-6 fill-[#C87A5E]" />
            </motion.div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#C87A5E]">Nieuwigheden & tips</p>
              <h4 className="font-serif-title text-2xl sm:text-3xl font-bold text-[#0C1C2C]">Favorieten van 't huis</h4>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 text-slate-700">
            {favorites.map((favorite) => (
              <motion.div 
                key={favorite.id} 
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                className="flex justify-between border-b border-dashed border-slate-200 pb-2.5"
              >
                <span className="font-medium text-sm sm:text-base">{favorite.name}</span>
                <span className="font-bold text-[#0C1C2C]">{favorite.price}</span>
              </motion.div>
            ))}
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-6 font-light">
            Bel ons gerust voor feestschotels op maat of dagprijzen voor oesters, kreeft en andere lekkers.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

// --- MapCard Component ---
const MapCard: React.FC = () => {
  return (
    <section className="bg-[#FBF9F5] py-12">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: luxuryEase }}
          whileHover={{ boxShadow: "0 14px 32px -8px rgba(12,28,44,0.12)" }}
          className="bg-white border border-[#0C1C2C]/10 shadow-md rounded-3xl overflow-hidden"
        >
          <div className="grid md:grid-cols-3">
            <div className="p-8 md:col-span-1 flex flex-col justify-center space-y-3 bg-[#F4EFEB]/50">
              <p className="text-xs uppercase tracking-[0.25em] text-[#C87A5E] font-bold">Hier vind je ons</p>
              <h3 className="font-serif-title text-2xl font-bold text-[#0C1C2C] leading-tight">
                Consciencestraat 1, Blankenberge
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm font-light">
                Druk op de kaart om te openen in Google Maps.
              </p>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="https://maps.google.com/?q=Consciencestraat+1+Blankenberge"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center w-fit bg-[#C87A5E] hover:bg-[#B76A4E] text-white px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-colors"
              >
                Open in Maps
              </motion.a>
            </div>
            <div className="md:col-span-2 h-72 md:h-80 relative">
              <iframe
                title="Locatie De Wulk"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2513.70796878588!2d3.12655!3d51.31079!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c352c10b6e7d95%3A0x8b2b6c7b8cbbcec0!2sConsciencestraat%201%2C%208370%20Blankenberge!5e0!3m2!1snl!2sbe!4v1700000000000"
                loading="lazy"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Gallery Component with Smooth Drag & Swipe ---
const Gallery: React.FC = () => {
  const slides = IMAGE_CONFIG.gallery;
  const [carouselX, setCarouselX] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateConstraints = () => {
      if (containerRef.current) {
        const scrollW = containerRef.current.scrollWidth;
        const offsetW = containerRef.current.offsetWidth;
        setMaxScroll(Math.max(0, scrollW - offsetW));
      }
    };
    updateConstraints();
    window.addEventListener('resize', updateConstraints);
    return () => window.removeEventListener('resize', updateConstraints);
  }, [slides]);

  const slideLeft = () => {
    setCarouselX(prev => Math.min(0, prev + 340));
  };

  const slideRight = () => {
    setCarouselX(prev => Math.max(-maxScroll, prev - 340));
  };

  return (
    <section id="galerij" className="py-24 md:py-32 bg-[#FBF9F5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: luxuryEase }}
          >
            <h2 className="font-serif-title text-3xl sm:text-4xl md:text-5xl font-bold text-[#0C1C2C] mb-2">
              Sfeerbeelden
            </h2>
            <p className="text-slate-600 font-light text-sm sm:text-base">
              Dagverse aanvoer, huisbereide schotels en de gezellige winkel in Blankenberge.
            </p>
          </motion.div>
          
          <div className="flex items-center space-x-2">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={slideLeft}
              disabled={carouselX >= 0}
              className="p-3 rounded-full bg-white border border-[#0C1C2C]/10 text-[#0C1C2C] hover:bg-[#0C1C2C] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#0C1C2C] transition-colors shadow-sm"
              aria-label="Vorige foto"
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={slideRight}
              disabled={carouselX <= -maxScroll}
              className="p-3 rounded-full bg-white border border-[#0C1C2C]/10 text-[#0C1C2C] hover:bg-[#0C1C2C] hover:text-white disabled:opacity-40 disabled:hover:bg-white disabled:hover:text-[#0C1C2C] transition-colors shadow-sm"
              aria-label="Volgende foto"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          </div>
        </div>

        {/* Carousel Container with Framer Motion Drag */}
        <div className="relative overflow-hidden cursor-grab active:cursor-grabbing" ref={containerRef}>
          <motion.div 
            drag="x"
            dragConstraints={{ right: 0, left: -maxScroll }}
            dragElastic={0.08}
            dragTransition={{ power: 0.2, timeConstant: 250 }}
            animate={{ x: carouselX }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex space-x-6 pb-4"
          >
            {slides.map((img, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="flex-shrink-0 w-[80vw] sm:w-[50vw] lg:w-[31vw] aspect-[4/5] rounded-3xl overflow-hidden relative shadow-md group border border-[#0C1C2C]/5 select-none"
              >
                <img 
                  src={img.url} 
                  alt={img.alt}
                  draggable={false}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0C1C2C]/85 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-white font-medium text-sm sm:text-base leading-snug">
                    {img.alt}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// --- Opening Hours Component ---
const OpeningHours: React.FC<{ schedule: OpeningHourData[] }> = ({ schedule }) => {
  const displaySchedule: OpeningHour[] = schedule.map(item => ({
    day: item.dag,
    hours: item.uren
  }));

  const now = new Date();
  const currentDayIndex = now.getDay();
  const dayNameMapping: Record<number, string> = {
    0: 'Zondag',
    1: 'Maandag',
    2: 'Dinsdag',
    3: 'Woensdag',
    4: 'Donderdag',
    5: 'Vrijdag',
    6: 'Zaterdag'
  };
  const todayName = dayNameMapping[currentDayIndex];

  return (
    <section id="uren" className="py-20 md:py-28 bg-[#F4EFEB]">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <motion.div 
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: luxuryEase }}
          className="bg-[#0C1C2C] rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden"
        >
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.8, ease: luxuryEase }}
                  className="p-3 bg-[#C87A5E] rounded-xl text-white cursor-pointer"
                >
                  <Clock className="w-6 h-6" />
                </motion.div>
                <h2 className="font-serif-title text-3xl sm:text-4xl font-bold">Openingsuren</h2>
              </div>
              <p className="text-base sm:text-lg text-white/80 mb-6 font-light leading-relaxed">
                U vindt ons in de <span className="text-[#C5A059] font-bold">Consciencestraat 1</span>. Kom langs voor de beste vis van de kust!
              </p>
              <div className="p-5 bg-white/5 border border-white/10 rounded-2xl">
                <p className="text-xs uppercase tracking-widest font-bold text-[#C5A059] mb-1">Afwijkende uren</p>
                <p className="text-sm text-white/70 italic font-light">Check onze social media of bel ons voor info tijdens de feestdagen.</p>
              </div>
            </div>

            <div className="bg-white/5 p-6 sm:p-8 rounded-2xl border border-white/10 backdrop-blur-sm">
              <motion.ul 
                variants={staggerContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-3.5"
              >
                {displaySchedule.map((item) => {
                  const isToday = item.day.toLowerCase() === todayName.toLowerCase();
                  const isClosed = item.hours === 'Gesloten';

                  return (
                    <motion.li 
                      key={item.day} 
                      variants={itemStaggerVariants}
                      className={`flex justify-between items-center border-b border-white/10 pb-2.5 last:border-b-0 ${isToday ? 'bg-white/10 -mx-2 px-2 rounded-lg' : ''}`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className={`text-sm sm:text-base ${isToday ? 'font-bold text-[#C5A059]' : isClosed ? 'text-[#C87A5E]' : 'text-white'}`}>
                          {item.day}
                        </span>
                        {isToday && (
                          <motion.span 
                            animate={{ scale: [1, 1.08, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-[#C5A059] text-[#081018]"
                          >
                            Vandaag
                          </motion.span>
                        )}
                      </div>
                      <span className={`text-sm sm:text-base ${isClosed ? 'text-[#C87A5E] italic' : 'text-white/85'}`}>
                        {item.hours}
                      </span>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Contact Component with Magnetic Hover Cards ---
const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 md:py-32 bg-[#FBF9F5] text-[#141E28]">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: luxuryEase }}
        >
          <h2 className="font-serif-title text-4xl sm:text-5xl font-bold text-[#0C1C2C] mb-4">
            Contacteer De Wulk
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mb-12 font-light leading-relaxed">
            Bij <span className="font-bold text-[#0C1C2C]">Olivier & Kelly</span> staat de klant centraal. Heeft u een bestelling of een vraag? Wij staan u graag te woord.
          </p>
        </motion.div>
        
        <motion.div 
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {/* Adres */}
          <motion.div 
            variants={itemStaggerVariants}
            whileHover={{ y: -4, boxShadow: "0 12px 28px -6px rgba(12,28,44,0.08)" }}
            transition={{ duration: 0.25 }}
            className="flex items-start space-x-5 p-6 rounded-2xl bg-white border border-[#0C1C2C]/5 shadow-sm"
          >
            <div className="bg-[#F4EFEB] text-[#C87A5E] p-3.5 rounded-full">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#0C1C2C] mb-0.5 uppercase tracking-wide">Adres</h4>
              <p className="text-slate-600">Consciencestraat 1, 8370 Blankenberge</p>
            </div>
          </motion.div>

          {/* Telefoon */}
          <motion.div 
            variants={itemStaggerVariants}
            whileHover={{ y: -4, boxShadow: "0 12px 28px -6px rgba(12,28,44,0.08)" }}
            transition={{ duration: 0.25 }}
            className="flex items-start space-x-5 p-6 rounded-2xl bg-white border border-[#0C1C2C]/5 shadow-sm"
          >
            <div className="bg-[#F4EFEB] text-[#C87A5E] p-3.5 rounded-full">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#0C1C2C] mb-1 uppercase tracking-wide">Telefoon</h4>
              <div className="space-y-1">
                <p className="text-slate-800 font-bold text-xl hover:text-[#C87A5E] transition-colors">
                  <a href="tel:+32485755667">0485 75 56 67</a>
                </p>
                <p className="text-slate-800 font-bold text-xl hover:text-[#C87A5E] transition-colors">
                  <a href="tel:+32497837718">0497 83 77 18</a>
                </p>
              </div>
            </div>
          </motion.div>

          {/* E-mail */}
          <motion.div 
            variants={itemStaggerVariants}
            whileHover={{ y: -4, boxShadow: "0 12px 28px -6px rgba(12,28,44,0.08)" }}
            transition={{ duration: 0.25 }}
            className="flex items-start space-x-5 p-6 rounded-2xl bg-white border border-[#0C1C2C]/5 shadow-sm"
          >
            <div className="bg-[#F4EFEB] text-[#C87A5E] p-3.5 rounded-full">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-[#0C1C2C] mb-0.5 uppercase tracking-wide">E-mail</h4>
              <p className="text-slate-700 hover:text-[#C87A5E] transition-colors text-base break-all">
                <a href="mailto:info@vishandelolivierenkelly.be">info@vishandelolivierenkelly.be</a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// --- Footer Component ---
interface FooterProps {
  onOpenLegal: (tab: LegalTab) => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
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
    <footer className="bg-[#081018] text-white pt-20 pb-8 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 mb-10 border-b border-white/10">
          
          {/* Brand Column */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <img src={ultiemLogo} alt="De Wulk Viswinkel Blankenberge Logo - Olivier & Kelly" className="w-12 h-12 object-contain" />
              <div className="flex flex-col">
                <span className="font-serif-title text-2xl font-bold tracking-tight text-white uppercase">DE WULK</span>
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase">BIJ OLIVIER & KELLY</span>
              </div>
            </div>
            <p className="text-white/60 text-xs sm:text-sm leading-relaxed mb-6 font-light">
              Uw vertrouwde viswinkel aan de haven van Blankenberge voor dagverse vis, zeevruchten, kibbeling en garnalen uit de Noordzee. De beste vishandel aan de Belgische kust — ook voor De Haan, Wenduine en Zeebrugge.
            </p>
            <div className="flex items-center space-x-3">
              <motion.a 
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.facebook.com/people/De-Wulk-Vishandel-Olivier-Kelly/100054396603835/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 bg-white/10 text-white hover:bg-[#C87A5E] rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                href="https://www.instagram.com/vishandel_dewulk/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 bg-white/10 text-white hover:bg-[#C87A5E] rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </motion.a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#C5A059] mb-5">Snelle Links</h3>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="text-white/70 hover:text-[#C5A059] transition-colors text-sm flex items-center group cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5 mr-1 group-hover:translate-x-1.5 transition-transform text-[#C5A059]" />
                    {link.name}
                  </button>
                </li>
              ))}
              <li className="pt-2 border-t border-white/10 flex flex-col space-y-2">
                <button
                  type="button"
                  onClick={() => onOpenLegal('privacy')}
                  className="text-white/60 hover:text-[#C5A059] transition-colors text-xs flex items-center group cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
                  Privacybeleid (AVG)
                </button>
                <button
                  type="button"
                  onClick={() => onOpenLegal('voorwaarden')}
                  className="text-white/60 hover:text-[#C5A059] transition-colors text-xs flex items-center group cursor-pointer text-left"
                >
                  <ChevronRight className="w-3 h-3 mr-1 group-hover:translate-x-1 transition-transform text-[#C5A059]" />
                  Voorwaarden & Disclaimer
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#C5A059] mb-5">Contact</h3>
            <ul className="space-y-3 text-white/70 text-sm font-light">
              <li className="flex items-start">
                <MapPin className="w-4 h-4 mr-2.5 mt-0.5 text-[#C87A5E] flex-shrink-0" />
                <span>
                  Consciencestraat 1<br />
                  8370 Blankenberge, België
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="w-4 h-4 mr-2.5 text-[#C87A5E] flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+32485755667" className="hover:text-white transition-colors">0485 75 56 67</a>
                  <a href="tel:+32497837718" className="hover:text-white transition-colors">0497 83 77 18</a>
                </div>
              </li>
              <li className="flex items-center">
                <Mail className="w-4 h-4 mr-2.5 text-[#C87A5E] flex-shrink-0" />
                <a href="mailto:info@vishandelolivierenkelly.be" className="hover:text-white transition-colors break-all">
                  info@vishandelolivierenkelly.be
                </a>
              </li>
            </ul>
          </div>

          {/* Bedrijfsinfo */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#C5A059] mb-5">Bedrijfsinfo</h3>
            <div className="text-white/70 text-sm space-y-2 font-light">
              <p className="font-semibold text-white">De Wulk BV</p>
              <p className="text-xs">Vishandel Olivier & Kelly</p>
              <div className="pt-2 space-y-1 text-xs border-t border-white/10">
                <p>
                  <span className="text-[#C5A059]">Ondernemingsnr:</span><br />
                  0473.055.043
                </p>
                <p>
                  <span className="text-[#C5A059]">BTW:</span><br />
                  BE 0473.055.043
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/50 pt-2">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-3 gap-y-1.5 text-center md:text-left">
            <p>© {new Date().getFullYear()} De Wulk BV. Alle rechten voorbehouden.</p>
            <span className="hidden sm:inline text-white/20">|</span>
            <button
              type="button"
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-[#C5A059] transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Privacybeleid
            </button>
            <span className="text-white/20">|</span>
            <button
              type="button"
              onClick={() => onOpenLegal('voorwaarden')}
              className="hover:text-[#C5A059] transition-colors underline-offset-4 hover:underline cursor-pointer"
            >
              Algemene Voorwaarden & Disclaimer
            </button>
            <span className="hidden lg:inline text-white/20">|</span>
            <a 
              href="https://www.webaanzee.be" 
              target="_blank" 
              rel="noopener noreferrer"
              title="Website laten maken aan de kust"
              className="text-white/50 hover:text-white transition-colors"
            >
              Website door <strong className="text-white">Web<span className="text-[#C5A059]">aan</span>Zee.be</strong>
            </a>
          </div>

          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center space-x-1 hover:text-[#C5A059] transition-colors cursor-pointer flex-shrink-0"
          >
            <span>Terug naar boven</span>
            <ChevronRight className="w-3.5 h-3.5 -rotate-90" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

// --- Main Application Component with Page Scroll Progress & Floating CTA ---
interface AppProps {
  initialLegalTab?: LegalTab;
}

const App: React.FC<AppProps> = ({ initialLegalTab }) => {
  const [menuData, setMenuData] = useState<MenuData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFloatingTop, setShowFloatingTop] = useState(false);
  const [legalModalOpen, setLegalModalOpen] = useState(!!initialLegalTab);
  const [legalTab, setLegalTab] = useState<LegalTab>(initialLegalTab || 'privacy');

  const { scrollYProgress, scrollY } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const unsub = scrollY.on('change', (latest) => {
      setShowFloatingTop(latest > 500);
    });
    return () => unsub();
  }, [scrollY]);

  // Listen to url hash changes for #privacy and #voorwaarden
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('privacy')) {
        setLegalTab('privacy');
        setLegalModalOpen(true);
      } else if (hash.includes('voorwaarden') || hash.includes('disclaimer')) {
        setLegalTab('voorwaarden');
        setLegalModalOpen(true);
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setMenuData(data);
      } catch (error) {
        console.error('Error loading menu data:', error);
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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading || !menuData) {
    return (
      <div className="min-h-screen bg-[#081018] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-[#C5A059] border-t-transparent mx-auto"></div>
          <p className="text-white font-bold text-sm tracking-widest uppercase font-serif-title">
            DE WULK
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#141E28] selection:bg-[#C87A5E] selection:text-white relative">
      {/* Luxury Scroll Progress Bar at the Top */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#C5A059] via-[#C87A5E] to-[#C5A059] origin-left z-[100] pointer-events-none"
      />

      <Navbar />
      <Hero />
      <MapCard />
      <AboutUs />
      <PriceList menuData={menuData.menu} />
      <Favorites favorites={menuData.favorieten || []} />
      <Gallery />
      <OpeningHours schedule={menuData.openingsuren} />
      <Contact />
      <Footer onOpenLegal={(tab) => { setLegalTab(tab); setLegalModalOpen(true); }} />
      <Analytics />

      <LegalModal
        isOpen={legalModalOpen}
        activeTab={legalTab}
        onTabChange={setLegalTab}
        onClose={() => {
          setLegalModalOpen(false);
          const hash = window.location.hash.toLowerCase();
          if (hash.includes('privacy') || hash.includes('voorwaarden') || hash.includes('disclaimer')) {
            window.history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }}
      />

      {/* Floating Back to Top Button */}
      <AnimatePresence>
        {showFloatingTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.12, y: -3, boxShadow: "0 10px 25px -4px rgba(200,122,94,0.4)" }}
            whileTap={{ scale: 0.92 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-[#0C1C2C]/90 text-white border border-white/20 shadow-2xl backdrop-blur-md hover:bg-[#C87A5E] transition-colors"
            aria-label="Terug naar boven"
          >
            <ChevronRight className="w-4 h-4 -rotate-90 text-[#C5A059]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
