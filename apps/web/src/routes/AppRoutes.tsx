import { AppLayout } from "../layouts/AppLayout.tsx";

import { Routes, Route } from "react-router-dom";
import { DiaryPage } from "../features/diary/pages/DiaryPage.tsx";
import { HobbyPage } from "../features/hobby/pages/HobbyPage.tsx";
import { HobbyDetailPage } from "../features/hobby/pages/HobbyDetailPage.tsx";
import HomePage from "../features/home/pages/HomePage.tsx";
import { FriendPage } from "../features/friend/pages/FriendPage.tsx";
import { SponsorPage } from "../features/sponsor/pages/SponsorPage.tsx";

export const AppRoutes = () => {
  const userId = "user_001";
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
        <Route path="/friend" element={<FriendPage userId={userId} />} />
        <Route path="/sponsor" element={<SponsorPage userId={userId} />} />
      </Route>
    </Routes>
  );
};
