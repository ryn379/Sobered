import { Routes, Route } from "react-router-dom";
import { DiaryPage } from "../features/diary/pages/DiaryPage.tsx";
import { HobbyPage } from "../features/hobby/pages/HobbyPage.tsx";
import { HobbyDetailPage } from "../features/hobby/pages/HobbyDetailPage.tsx";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/diary" element={<DiaryPage />} />
      <Route path="/hobby" element={<HobbyPage />} />
      <Route path="/hobby/:hobbyId" element={<HobbyDetailPage />} />
    </Routes>
  );
};
