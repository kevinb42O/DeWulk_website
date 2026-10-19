// One-off annual leave, in the shop's local time (Europe/Brussels).
export const HOLIDAY = {
  start: '2026-11-11',
  reopen: '2026-12-18',
  whatsappStart: '2026-11-28',
  whatsappEnd: '2026-12-09',
  phone: 'tel:+32485755667',
  whatsapp: 'https://wa.me/32485755667',
};

export const getHolidayState = (now = new Date()) => {
  const localDate = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Brussels', year: 'numeric', month: '2-digit', day: '2-digit',
  }).format(now);

  return {
    visible: localDate < HOLIDAY.reopen,
    closed: localDate >= HOLIDAY.start && localDate < HOLIDAY.reopen,
    whatsappOnly: localDate >= HOLIDAY.whatsappStart && localDate < HOLIDAY.whatsappEnd,
  };
};
