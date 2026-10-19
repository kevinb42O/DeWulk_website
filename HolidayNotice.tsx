import React from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { HOLIDAY } from './seasonalClosure';

export const HolidayNotice: React.FC<{ whatsappOnly: boolean }> = ({ whatsappOnly }) => (
  <section className="holiday-notice" aria-labelledby="holiday-title">
    <div className="holiday-notice-inner">
      <div className="holiday-notice-dates">
        <p className="holiday-notice-eyebrow">Jaarlijks verlof · 2026</p>
        <h2 id="holiday-title"><span className="holiday-notice-label">Gesloten van </span><time dateTime={HOLIDAY.start}>11 november</time> – <time dateTime="2026-12-17">17 december</time></h2>
        <p className="holiday-notice-reopen">We zijn er weer op <strong>vrijdag <time dateTime={HOLIDAY.reopen}>18 december</time></strong>.</p>
      </div>
      <div className="holiday-notice-orders">
        <h3>Bestellen voor de feestdagen?</h3>
        <p>Ook tijdens ons verlof kan je bestellen via WhatsApp of telefoon.</p>
        <p className="holiday-notice-exception"><strong>28 november t/m 8 december:</strong> enkel via WhatsApp.</p>
        <div className="holiday-notice-actions">
          <a href={HOLIDAY.whatsapp} className="holiday-notice-button holiday-notice-button-primary"><MessageCircle size={18} aria-hidden="true" /> WhatsApp</a>
          {!whatsappOnly && <a href={HOLIDAY.phone} className="holiday-notice-button holiday-notice-button-secondary"><Phone size={16} aria-hidden="true" /> 0485 75 56 67</a>}
        </div>
      </div>
    </div>
  </section>
);
