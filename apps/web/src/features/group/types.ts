export interface Group {
  id: string;
  name: string;
  description: string;
  createdBy: string;
  createdAt: string;
}

export interface GroupMember {
  groupId: string;
  userId: string;
  role: "MEMBER" | "LEADER";
  joinedAt: string;
}

export interface GroupMessage {
  id: string;
  groupId: string;
  userId: string;
  content: string;
  createdAt: string;
}
