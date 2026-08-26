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
    createdAt: "2026-07-14T11:10:00.000Z",
  },
  {
    id: "user_007",
    username: "chris_recovery",
    email: "chris@example.com",
    role: "RECOVERING_USER",
    createdAt: "2026-07-16T08:45:00.000Z",
  },
  {
    id: "user_008",
    username: "taylor_recovery",
    email: "taylor@example.com",
    role: "RECOVERING_USER",
    createdAt: "2026-07-18T13:25:00.000Z",
  },
  {
    id: "user_009",
    username: "casey_recovery",
    email: "casey@example.com",
    role: "RECOVERING_USER",
    createdAt: "2026-07-20T17:40:00.000Z",
  },
  {
    id: "user_010",
    username: "riley_support",
    email: "riley@example.com",
    role: "FAMILY_MEMBER",
    createdAt: "2026-07-22T10:30:00.000Z",
  },
  {
    id: "user_011",
    username: "jamie_recovery",
    email: "jamie@example.com",
    role: "RECOVERING_USER",
    createdAt: "2026-07-24T15:15:00.000Z",
  },
  {
    id: "user_012",
    username: "drew_recovery",
    email: "drew@example.com",
    role: "RECOVERING_USER",
    createdAt: "2026-07-26T12:00:00.000Z",
  },
];
