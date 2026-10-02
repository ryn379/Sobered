import { AppLayout } from "../layouts/AppLayout.tsx";

import { Routes, Route } from "react-router-dom";
import { DiaryPage } from "../features/diary/pages/DiaryPage.tsx";
import { HobbyPage } from "../features/hobby/pages/HobbyPage.tsx";
import { HobbyDetailPage } from "../features/hobby/pages/HobbyDetailPage.tsx";
import HomePage from "../features/home/pages/HomePage.tsx";
import { FriendPage } from "../features/friend/pages/FriendPage.tsx";
import { SponsorPage } from "../features/sponsor/pages/SponsorPage.tsx";
import { FamilyPage } from "../features/family/pages/FamilyPage.tsx";
import type { User } from "../features/home/types.ts";
import GroupPage from "../features/group/pages/GroupPage.tsx";
import GroupChatPage from "../features/group/pages/GroupChatPage.tsx";

export const AppRoutes = () => {
  const userId = "user_001";
  const role: User["role"] = "RECOVERING_USER";
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage userId={userId} />} />
        <Route path="/diary" element={<DiaryPage userId={userId} />} />
        <Route path="/hobby" element={<HobbyPage userId={userId} />} />
        <Route
          path="/hobby/:hobbyId"
          element={<HobbyDetailPage userId={userId} />}
        />
        <Route path="/groups" element={<GroupPage userId={userId} />} />
        <Route
          path="/groups/chat/:groupId"
          element={<GroupChatPage userId={userId} />}
        />
        <Route path="/friend" element={<FriendPage userId={userId} />} />
        <Route path="/sponsor" element={<SponsorPage userId={userId} />} />
        <Route
          path="/family"
          element={<FamilyPage userId={userId} role={role} />}
        />
      </Route>
    </Routes>
  );
};
