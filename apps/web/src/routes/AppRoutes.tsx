import { AppLayout } from "../layouts/AppLayout.tsx";

import { Routes, Route } from "react-router-dom";
import { DiaryPage } from "../features/diary/pages/DiaryPage.tsx";
import { HobbyPage } from "../features/hobby/pages/HobbyPage.tsx";
import { HobbyDetailPage } from "../features/hobby/pages/HobbyDetailPage.tsx";
import HomePage from "../features/home/pages/HomePage.tsx";
import { FriendPage } from "../features/friend/pages/FriendPage.tsx";

export const AppRoutes = () => {
  const userId = "user_001";
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage userId={userId} />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/hobby" element={<HobbyPage />} />
        <Route path="/hobby/:hobbyId" element={<HobbyDetailPage />} />
        <Route path="/friend" element={<FriendPage userId={userId} />} />
      </Route>
    </Routes>
  );
};
