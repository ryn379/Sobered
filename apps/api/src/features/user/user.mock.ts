export type UserRole = "RECOVERING_USER" | "FAMILY_MEMBER" | "PROFESSIONAL";

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export const users: User[] = [
  {
    id: "user_001",
    username: "alex_recovery",
    email: "alex@example.com",
    role: "RECOVERING_USER",
    createdAt: "2026-07-01T10:00:00.000Z",
  },
  {
    id: "user_002",
    username: "sam_recovery",
    email: "sam@example.com",
    role: "RECOVERING_USER",
    createdAt: "2026-07-05T14:30:00.000Z",
  },
  {
    id: "user_003",
    username: "jordan_support",
    email: "jordan@example.com",
    role: "FAMILY_MEMBER",
    createdAt: "2026-07-10T09:15:00.000Z",
  },
  {
    id: "user_004",
    username: "morgan_recovery",
    email: "morgan@example.com",
    role: "RECOVERING_USER",
    createdAt: "2026-07-12T16:20:00.000Z",
  },
  {
    id: "user_005",
    username: "lily_recovery",
    email: "lily@example.com",
    role: "RECOVERING_USER",
    createdAt: "2026-07-12T16:20:00.000Z",
  },
  {
    id: "user_006",
    username: "miranda_support",
    email: "miranda@example.com",
    role: "FAMILY_MEMBER",
    createdAt: "2026-07-12T16:20:00.000Z",
  },
];
