export type UserRole = "RECOVERING_USER" | "FAMILY_MEMBER" | "PROFESSIONAL";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
  phone?: string;
}

export interface Sobriety {
  id: string;
  userId: string;
  startDate: string;
  longestStreak: number;
  totalMeetings: number;
  createdAt: string;
  updatedAt: string;
}

export interface SobrietyStats {
  currentStreak: number;
  longestStreak: number;
  totalDaysSober: number;
  totalSobrietyPeriods: number;
  totalMeetings: number;
  startDate: string;
}

export interface SobrietyHistory {
  id: string;
  userId: string;
  startDate: string;
  endDate: string;
  durationDays: number;
  createdAt: string;
}

export interface SobrietySummary {
  id: string;
  startDate: string;
  currentStreak: number;
  longestStreak: number;
  totalDays: number;
}
