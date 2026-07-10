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
