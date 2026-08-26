import type { User } from "../home/types";

export interface UserProps {
  userId: string;
}

export interface FriendCardProps {
  friend: User;
  onRemove: (friendId: string) => void;
}

export type FriendTab = "friends" | "suggestions" | "requests";

export interface FriendHeaderProps {
  active: FriendTab;
  onTabChange: (tab: FriendTab) => void;
  requestCount: number;
}

export interface FriendRequestsProps {
  requests: User[];

  onAccept: (requesterId: string) => void;
  handleAccept: (requesterId: string) => void;
  onDecline: (requesterId: string) => void;
}

export interface FriendRequestCardProps {
  requester: User;

  onAccept: (requesterId: string) => void;
  handleAccept: (requesterId: string) => void;
  onDecline: (requesterId: string) => void;
}

export interface FriendListProps {
  friends: User[];
  onRemove: (friendId: string) => void;
}

export interface FriendSuggestionCardProps {
  user: User;
  addFriend: (userId: string) => void;
}

export interface FriendSuggestionsProps {
  users: User[];
  addFriend: (userId: string) => void;
}

export interface Friend {
  id: string;
  userId: string;
  friendId: string;
  status: "ACCEPTED" | "REVOKED";
  createdAt: string;
}

export interface FriendRequest {
  id: string;
  requesterId: string;
  recipientId: string;
  status: "PENDING" | "ACCEPTED" | "DECLINED";
  createdAt: string;
  updatedAt: string;
}
