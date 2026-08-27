import type { User } from "../home/types";

export type SponsorStatus = "PENDING" | "ACCEPTED" | "DECLINED" | "ENDED";

export interface Sponsor {
  id: string;
  sponsorId: string;
  menteeId: string;
  createdAt: string;
}

export interface SponsorRequest {
  id: string;
  requesterId: string;
  recipientId: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt: string;
}

export type SponsorTab = "Sponsor" | "Requests" | "Mentees" | "Suggestions";
export interface SponsorHeaderProps {
  active: SponsorTab;
  onChange: (tab: SponsorTab) => void;
  requestCount: number;
}

export interface SponsorRequestProps {
  requests: User[];
  onAccept: (requesterId: string) => void;
  onDecline: (requesterId: string) => void;
}
export interface SponsorRequestCardProps {
  requester: User;
  onAccept: (requesterId: string) => void;
  onDecline: (requesterId: string) => void;
}

export interface SponsorMenteesProps {
  mentees: User[];
}
export interface SponsorMenteeCardProps {
  mentee: User;
}

export interface SponsorSuggestionsProps {
  suggestions: User[];
  sendRequest: (recipientId: string) => void;
}
export interface SponsorSuggestionCardProps {
  user: User;
  onSendRequest: (recipientId: string) => void;
}
