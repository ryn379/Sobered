export interface Family {
  id: string;
  recoveringUserId: string;
  familyUserId: string;
  status: "PENDING" | "CONNECTED";
  createdAt: string;
}

import type { SobrietyStats, User } from "../home/types";

export interface FamilyMemberCardProps {
  user: User;
}

export interface RecovererCardProps {
  user: User;
  selected: boolean;
  onClick: (user: User) => void;
}

export interface FamilyMembersProps {
  family: User[];
}

export interface RecovererListProps {
  recoverers: User[];
  selectedRecoverer: User | null;
  onRecovererClick: (user: User) => void;
}

export interface SobrietyStatsCardProps {
  recoverer: User;
  stats: SobrietyStats;
}

export interface FamilyEmptyStateProps {
  role: User["role"];
}
