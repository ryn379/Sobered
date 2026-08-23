import { Routes, Route } from "react-router-dom";
import { DiaryPage } from "../features/diary/pages/DiaryPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/diary" element={<DiaryPage />} />
    </Routes>
  );
};
