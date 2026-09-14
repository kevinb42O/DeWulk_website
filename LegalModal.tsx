import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, FileText, CheckCircle2, AlertCircle, Scale, Phone, Mail, MapPin } from 'lucide-react';

export type LegalTab = 'privacy' | 'voorwaarden';

interface LegalModalProps {
  isOpen: boolean;
  activeTab: LegalTab;
  onTabChange: (tab: LegalTab) => void;
  onClose: () => void;
}

const luxuryEase = [0.16, 1, 0.3, 1] as const;

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  activeTab,
  onTabChange,
  onClose
}) => {
  // Lock body scroll when open and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="legal-modal-title"
          className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop with frosted glass effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: luxuryEase }}
            onClick={onClose}
            className="fixed inset-0 bg-[#081018]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.4, ease: luxuryEase }}
            className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#0C1C2C] text-[#FBF9F5] rounded-2xl border border-white/15 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden z-10 my-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-[#081018]/60 backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-full bg-[#C87A5E]/20 border border-[#C87A5E]/40 flex items-center justify-center text-[#C5A059]">
                  {activeTab === 'privacy' ? <ShieldCheck className="w-5 h-5" /> : <Scale className="w-5 h-5" />}
                </div>
                <div>
                  <h2 id="legal-modal-title" className="text-base sm:text-lg font-bold tracking-wide uppercase font-serif-title text-white">
                    {activeTab === 'privacy' ? 'Privacybeleid (AVG / GDPR)' : 'Algemene Voorwaarden & Disclaimer'}
                  </h2>
                  <p className="text-[11px] text-white/50 tracking-wider">
                    De Wulk BV • Vishandel Olivier & Kelly • Blankenberge
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-[#C87A5E]"
                aria-label="Sluit venster"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tab Navigation Pill Selector */}
            <div className="px-6 pt-4 pb-2 bg-[#0C1C2C] border-b border-white/5 flex gap-2">
              <button
                type="button"
                onClick={() => onTabChange('privacy')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === 'privacy'
                    ? 'bg-[#C87A5E] text-white shadow-md'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Privacybeleid</span>
              </button>

              <button
                type="button"
                onClick={() => onTabChange('voorwaarden')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 ${
                  activeTab === 'voorwaarden'
                    ? 'bg-[#C87A5E] text-white shadow-md'
                    : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Voorwaarden & Disclaimer</span>
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6 text-sm text-white/80 leading-relaxed font-light custom-scrollbar">
              {activeTab === 'privacy' ? (
                // --- PRIVACY POLICY CONTENT ---
                <div className="space-y-6">
                  {/* Summary badge */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start space-x-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-white/75 leading-relaxed">
                      Bij <strong>De Wulk BV</strong> hechten wij de grootste waarde aan uw privacy. Wij verkopen geen gegevens, gebruiken geen trackingcookies voor advertenties en verwerken enkel strikt noodzakelijke gegevens voor bestellingen en telefonisch contact.
                    </p>
                  </div>

                  <section className="space-y-2">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-[#C5A059]">
                      1. Wie is verantwoordelijk voor uw gegevens?
                    </h3>
                    <p>
                      Deze privacyverklaring is van toepassing op de verwerking van persoonsgegevens door:
                    </p>
                    <div className="p-3.5 rounded-lg bg-black/20 border border-white/5 text-xs space-y-1 text-white/90">
                      <p><strong>De Wulk BV</strong> (Vishandel Olivier & Kelly)</p>
                      <p>Consciencestraat 1, 8370 Blankenberge, België</p>
                      <p>Ondernemingsnummer & BTW: <strong>BE 0473.055.043</strong></p>
                      <p>E-mail: <a href="mailto:info@vishandelolivierenkelly.be" className="text-[#C5A059] hover:underline">info@vishandelolivierenkelly.be</a></p>
                      <p>Telefoon: 0485 75 56 67 / 0497 83 77 18</p>
                    </div>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-[#C5A059]">
                      2. Welke persoonsgegevens verwerken wij en waarom?
                    </h3>
                    <p>Wij verwerken uitsluitend gegevens die u zelf aan ons verstrekt of die technisch noodzakelijk zijn voor het functioneren van de website:</p>
                    <ul className="space-y-2 list-disc list-inside text-xs sm:text-sm pl-1">
                      <li>
                        <strong>Bestellingen & Contact (via telefoon of e-mail):</strong> Wanneer u ons belt of mailt om een bestelling (zoals een zeevruchtenschotel of vis) door te geven of een vraag te stellen, noteren wij uw naam, telefoonnummer en bestelvoorkeuren om uw bestelling zorgvuldig voor te bereiden en contact op te nemen bij eventuele vragen.
                      </li>
                      <li>
                        <strong>Serverlogs & Beveiliging:</strong> Bij een bezoek aan onze website kunnen technische logbestanden (zoals uw geanonimiseerd IP-adres, datum, tijdstip en browsertype) tijdelijk worden bewaard door onze hostingprovider om de veiligheid en stabiliteit van de server te garanderen.
                      </li>
                      <li>
                        <strong>Anonieme Website-statistieken (Vercel Analytics):</strong> Wij maken gebruik van Vercel Analytics om geaggregeerde statistieken te verzamelen (zoals het aantal paginabezoeken). Deze statistieken zijn volledig geanonimiseerd en bevatten geen herleidbare persoonsgegevens.
                      </li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-[#C5A059]">
                      3. Cookies & Tracking
                    </h3>
                    <p>
                      Onze website maakt <strong>geen</strong> gebruik van tracking cookies, advertentienetwerken (zoals Facebook Pixels of Google Ads) of profileringsmechanismen. Er worden enkel technisch noodzakelijke sessiegegevens gebruikt. Daarom tonen wij geen storende cookiebanner.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-[#C5A059]">
                      4. Delen van gegevens met derden
                    </h3>
                    <p>
                      Wij verkopen, verhuren of delen uw persoonsgegevens onder geen enkel beding met derden voor commerciële doeleinden. Gegevens worden uitsluitend verwerkt door betrouwbare IT- en hostingpartners die voldoen aan de strikte Europese privacywetgeving (AVG).
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-[#C5A059]">
                      5. Bewaartermijn
                    </h3>
                    <p>
                      Gegevens met betrekking tot bestellingen worden niet langer bewaard dan noodzakelijk voor de afhandeling van de bestelling, tenzij een wettelijke administratieve of fiscale bewaarplicht van toepassing is.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-[#C5A059]">
                      6. Uw rechten volgens de AVG (GDPR)
                    </h3>
                    <p>U beschikt te allen tijde over de volgende wettelijke rechten:</p>
                    <div className="grid sm:grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded bg-white/[0.02] border border-white/5">
                        <span className="font-semibold text-white">Recht op inzage & rectificatie:</span> U mag te allen tijde opvragen welke gegevens wij van u hebben en eventuele fouten laten corrigeren.
                      </div>
                      <div className="p-2.5 rounded bg-white/[0.02] border border-white/5">
                        <span className="font-semibold text-white">Recht op gegevenswissing:</span> U kunt verzoeken om verwijdering van uw persoonsgegevens.
                      </div>
                      <div className="p-2.5 rounded bg-white/[0.02] border border-white/5">
                        <span className="font-semibold text-white">Recht van bezwaar:</span> U kunt te allen tijde bezwaar maken tegen de verwerking van uw gegevens.
                      </div>
                      <div className="p-2.5 rounded bg-white/[0.02] border border-white/5">
                        <span className="font-semibold text-white">Recht op klacht indienen:</span> Bij de Belgische Gegevensbeschermingsautoriteit (GBA).
                      </div>
                    </div>
                    <p className="pt-2 text-xs text-white/60">
                      Wilt u gebruikmaken van uw rechten? Neem contact op via <a href="mailto:info@vishandelolivierenkelly.be" className="text-[#C5A059] underline">info@vishandelolivierenkelly.be</a>.
                    </p>
                  </section>
                </div>
              ) : (
                // --- TERMS & CONDITIONS & DISCLAIMER CONTENT ---
                <div className="space-y-6">
                  {/* Summary badge */}
                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-start space-x-3">
                    <AlertCircle className="w-5 h-5 text-[#C5A059] flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-white/75 leading-relaxed">
                      Verse vis en zeevruchten zijn natuurproducten. Prijzen op de website zijn richttarieven en zijn onderhevig aan dagelijkse veilingaanvoer. Bestellingen van schotels gebeuren telefonisch of in de winkel.
                    </p>
                  </div>

                  <section className="space-y-2">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-[#C5A059]">
                      1. Toepasselijkheid & Identiteit
                    </h3>
                    <p>
                      Deze algemene voorwaarden en disclaimer zijn van toepassing op alle bezoeken aan de website en alle bestellingen geplaatst bij <strong>De Wulk BV</strong>, gevestigd aan de Consciencestraat 1, 8370 Blankenberge (BTW BE 0473.055.043).
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-[#C5A059]">
                      2. Dagprijzen & Assortiment (Verse Natuurproducten)
                    </h3>
                    <p>
                      De vis en schaaldieren die wij aanbieden zijn verse natuurproducten. Het actuele aanbod is sterk afhankelijk van de weersomstandigheden op zee, het seizoen en de dagelijkse veilingaanvoer in Zeebrugge en omstreken.
                    </p>
                    <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm pl-1">
                      <li>Prijzen en menu-items op deze website zijn indicatieve richtprijzen.</li>
                      <li>De effectieve afrekenprijs wordt bepaald door de geldende dagprijs op het moment van aankoop of bereiding.</li>
                      <li>Wij behouden ons het recht voor om het assortiment of de recepturen aan te passen naargelang de marktaanvoer.</li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-[#C5A059]">
                      3. Bestellingen & Afhaling
                    </h3>
                    <p>
                      Bestellingen voor bereide gerechten, zeevruchtenschotels, kreeft of visschotels worden telefonisch (<strong>0485 75 56 67</strong> / <strong>0497 83 77 18</strong>) of rechtstreeks in de winkel aangenomen.
                    </p>
                    <ul className="space-y-1.5 list-disc list-inside text-xs sm:text-sm pl-1">
                      <li>Gelieve bestellingen voor weekends en feestdagen minimaal 24 tot 48 uur op voorhand door te geven.</li>
                      <li>Bestellingen dienen te worden afgehaald op het afgesproken tijdstip in onze winkel (Consciencestraat 1, Blankenberge).</li>
                      <li>Eventuele wijzigingen of annuleringen dienen zo spoedig mogelijk telefonisch te worden gemeld.</li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-[#C5A059]">
                      4. Waarborg op Schotels & Schalen
                    </h3>
                    <p>
                      Voor het gebruik van luxe presenteerschotels, plateaus of isothermische verpakkingen kan een waarborgsom worden gevraagd. Deze waarborg wordt direct en volledig terugbetaald wanneer de materialen in propere en onbeschadigde staat binnen de afgesproken termijn worden ingeleverd.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-[#C5A059]">
                      5. Voedselveiligheid & Koelketen
                    </h3>
                    <p>
                      Wij hanteren strikte HACCP- en hygiënenormen. Na afhaling in de winkel is de klant zelf verantwoordelijk voor het respecteren van de ononderbroken koelketen (bewaring tussen 0°C en 4°C). Gelet op de bederfelijke aard van verse levensmiddelen is een herroepingsrecht na afhaling uitgesloten conform art. VI.53, 4° van het Belgisch Wetboek van Economisch Recht.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-[#C5A059]">
                      6. Intellectuele Eigendom
                    </h3>
                    <p>
                      Alle teksten, handelsnamen, logo&apos;s, sfeerfoto&apos;s en vormgeving op deze website zijn beschermd door het auteursrecht en intellectuele eigendomsrechten van De Wulk BV. Het kopiëren, reproduceren of verspreiden zonder voorafgaande schriftelijke toestemming is uitdrukkelijk verboden.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h3 className="text-white font-semibold text-sm uppercase tracking-wider text-[#C5A059]">
                      7. Toepasselijk Recht & Bevoegde Rechtbank
                    </h3>
                    <p>
                      Op alle rechtsbetrekkingen tussen De Wulk BV en de bezoeker/klant is uitsluitend het Belgisch recht van toepassing. Eventuele geschillen worden voorgelegd aan de bevoegde rechtbanken van het gerechtelijk arrondissement West-Vlaanderen (afdeling Brugge).
                    </p>
                  </section>
                </div>
              )}
            </div>

            {/* Footer with Contact Snippet & Close Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-4 border-t border-white/10 bg-[#081018]/80 text-xs">
              <div className="flex items-center text-white/60 space-x-2">
                <MapPin className="w-3.5 h-3.5 text-[#C87A5E]" />
                <span>Consciencestraat 1, 8370 Blankenberge</span>
              </div>

              <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-2 rounded-full bg-[#C87A5E] hover:bg-[#B76A4E] text-white font-semibold tracking-wider uppercase transition-colors text-xs shadow-md"
                >
                  Sluiten
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
