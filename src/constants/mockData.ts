export const mockUser = {
  name: 'Sameer',
  email: 'sameer.demo@email.com',
  city: 'Dubai',
  country: 'UAE',
  role: 'Husband' as const,
  spouse: 'Sherin',
};

export const mockSpouse = {
  name: 'Sherin',
  city: 'Kerala',
  country: 'India',
  role: 'Wife' as const,
};

export const mockPrayerTimes = {
  Fajr: '04:18 AM',
  Dhuhr: '12:24 PM',
  Asr: '03:47 PM',
  Maghrib: '07:12 PM',
  Isha: '08:35 PM',
};

export const mockPrayerProgress = {
  Fajr: true,
  Dhuhr: true,
  Asr: false,
  Maghrib: false,
  Isha: false,
};

export const mockQuranProgress = {
  currentSurah: 'Al-Baqarah',
  lastAyah: 45,
  dailyGoal: 20,
  completedToday: 12,
};

export const mockSurahs = [
  { id: 1, name: 'Al-Fatihah', englishName: 'The Opening', verses: 7, revealed: 'Meccan' },
  { id: 2, name: 'Al-Baqarah', englishName: 'The Cow', verses: 286, revealed: 'Medinan' },
  { id: 3, name: 'Aal-Imran', englishName: 'Family of Imran', verses: 200, revealed: 'Medinan' },
  { id: 4, name: 'An-Nisa', englishName: 'The Women', verses: 176, revealed: 'Medinan' },
  { id: 5, name: "Al-Ma'idah", englishName: 'The Table Spread', verses: 120, revealed: 'Medinan' },
  { id: 6, name: "Al-An'am", englishName: 'The Cattle', verses: 165, revealed: 'Meccan' },
  { id: 7, name: "Al-A'raf", englishName: 'The Heights', verses: 206, revealed: 'Meccan' },
];

export const mockAyahs = [
  { id: 1, surah: 'Al-Baqarah', ayah: 1, arabic: 'الٓمٓ', english: 'Alif, Lam, Meem.' },
  { id: 2, surah: 'Al-Baqarah', ayah: 2, arabic: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ', english: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah.' },
  { id: 3, surah: 'Al-Baqarah', ayah: 3, arabic: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ', english: 'Who believe in the unseen, establish prayer, and spend out of what We have provided for them.' },
  { id: 4, surah: 'Al-Baqarah', ayah: 4, arabic: 'وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ', english: 'And who believe in what has been revealed to you, and what was revealed before you, and of the Hereafter they are certain.' },
  { id: 5, surah: 'Al-Baqarah', ayah: 5, arabic: 'أُولَٰئِكَ عَلَىٰ هُدًى مِّن رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ', english: 'Those are upon guidance from their Lord, and it is those who are the successful.' },
];

export const mockDhikrTypes = [
  { id: 'subhanallah', label: 'SubhanAllah', arabic: 'سُبْحَانَ ٱللَّٰهِ', goal: 33 },
  { id: 'alhamdulillah', label: 'Alhamdulillah', arabic: 'ٱلْحَمْدُ لِلَّٰهِ', goal: 33 },
  { id: 'allahuakbar', label: 'Allahu Akbar', arabic: 'ٱللَّٰهُ أَكْبَرُ', goal: 34 },
  { id: 'astaghfirullah', label: 'Astaghfirullah', arabic: 'أَسْتَغْفِرُ ٱللَّٰهِ', goal: 100 },
  { id: 'salawat', label: 'Salawat', arabic: 'ٱللَّٰهُمَّ صَلِّ عَلَىٰ مُحَمَّدٍ', goal: 100 },
];

export const mockDhikrCounts: Record<string, number> = {
  subhanallah: 33,
  alhamdulillah: 33,
  allahuakbar: 34,
  astaghfirullah: 100,
  salawat: 0,
};

export const mockDuas = [
  { id: '1', title: 'Bless our marriage', content: 'O Allah, bless our marriage and unite us in goodness.', category: 'Marriage', answered: false, isShared: true },
  { id: '2', title: 'Increase our rizq', content: 'O Allah, grant us abundant halal provision.', category: 'Rizq', answered: false, isShared: true },
  { id: '3', title: 'Protect our families', content: 'O Allah, protect our families from all harm.', category: 'Family', answered: true, isShared: false },
  { id: '4', title: 'Grant us beneficial knowledge', content: 'O Allah, increase us in knowledge that benefits.', category: 'Forgiveness', answered: false, isShared: true },
];

export const mockTahajjud = {
  weeklyCompleted: 3,
  weeklyGoal: 5,
  todayCompleted: false,
};

export const mockFasting = {
  monday: true,
  thursday: false,
  whiteDays: false,
};

export const mockSpouseProgress = {
  salah: { completed: 4, total: 5 },
  quran: { ayahsToday: 18 },
  dhikr: { percentage: 70 },
  tahajjud: true,
  locationSharing: true,
};

export const mockChecklistItems = [
  { id: '1', label: 'Passport' },
  { id: '2', label: 'Visa' },
  { id: '3', label: 'Ihram' },
  { id: '4', label: 'Travel tickets' },
  { id: '5', label: 'Hotel booking' },
  { id: '6', label: 'Vaccination' },
  { id: '7', label: 'Dua book' },
  { id: '8', label: 'Comfortable footwear' },
];

export const mockHijriDate = '15 Muharram 1446';
export const mockGregorianDate = 'Sunday, 21 July 2024';
export const mockLocation = 'Dubai, UAE';
export const mockQiblaDirection = '258°';
