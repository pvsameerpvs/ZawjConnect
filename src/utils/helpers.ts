export const formatNumber = (num: number): string => {
  return num.toLocaleString();
};

export const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  });
};

export const calculateZakat = (
  cash: number,
  gold: number,
  silver: number,
  businessAssets: number,
  liabilities: number
): { netAssets: number; zakatDue: number } => {
  const netAssets = cash + gold + silver + businessAssets - liabilities;
  const zakatDue = netAssets > 0 ? netAssets * 0.025 : 0;
  return { netAssets, zakatDue };
};

export const generateInviteCode = (): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'ZAWJ-';
  for (let i = 0; i < 4; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
};

export const getNextPrayer = (
  prayers: { name: string; time: string; completed: boolean }[]
): string => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTotal = currentHour * 60 + currentMinute;

  for (const prayer of prayers) {
    const [time, period] = prayer.time.split(' ');
    const [h, m] = time.split(':').map(Number);
    let hour = h;
    if (period === 'PM' && h !== 12) hour += 12;
    if (period === 'AM' && h === 12) hour = 0;
    const prayerTotal = hour * 60 + m;
    if (prayerTotal > currentTotal) {
      return prayer.name;
    }
  }
  return 'Fajr';
};

export const getRandomAyah = () => {
  const ayahs = [
    { arabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا', english: 'Indeed, with hardship comes ease.' },
    { arabic: 'رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ', english: 'Our Lord, grant us from among our spouses and offspring comfort to our eyes.' },
    { arabic: 'وَتَوَاصَوْا بِالْحَقِّ وَتَوَاصَوْا بِالصَّبْرِ', english: 'And enjoin upon one another truth and patience.' },
  ];
  return ayahs[Math.floor(Math.random() * ayahs.length)];
};
