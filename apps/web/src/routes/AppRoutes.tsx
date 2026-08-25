import { Routes, Route } from "react-router-dom";
import { DiaryPage } from "../features/diary/pages/DiaryPage.tsx";
import { HobbyPage } from "../features/hobby/pages/HobbyPage.tsx";
import { HobbyDetailPage } from "../features/hobby/pages/HobbyDetailPage.tsx";
import HomePage from "../features/home/pages/HomePage.tsx";
import { AppLayout } from "../layouts/AppLayout.tsx";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/home" element={<HomePage userId="user_001" />} />
        <Route path="/diary" element={<DiaryPage />} />
        <Route path="/hobby" element={<HobbyPage />} />
        <Route path="/hobby/:hobbyId" element={<HobbyDetailPage />} />
      </Route>
    </Routes>
  );
};
