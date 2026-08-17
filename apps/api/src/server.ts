import express from "express";

import diaryRouter from "./features/diary/diary.route.js";
import emergencyRouter from "./features/emergency/emergency.route.js";
import familyRouter from "./features/family/family.route.js";
import friendsRouter from "./features/friend/friend.route.js";
import groupsRouter from "./routes/groups.route.js";
import hobbyRouter from "./routes/hobby.route.js";
import meetingsRouter from "./routes/meetings.route.js";
import sobrietyRouter from "./features/sobriety/sobriety.route.js";
import sponsorRouter from "./features/sponsor/sponsor.route.js";
import userRouter from "./features/user/user.route.js";

const app = express();

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Server is working",
  });
});

app.use("/api/diary", diaryRouter);
app.use("/api/emergency", emergencyRouter);
app.use("/api/family", familyRouter);
app.use("/api/friend", friendsRouter);
app.use("/api/group", groupsRouter);
app.use("/api/hobby", hobbyRouter);
app.use("/api/meeting", meetingsRouter);
app.use("/api/sobriety", sobrietyRouter);
app.use("/api/sponsor", sponsorRouter);
app.use("/api/user", userRouter);

const PORT = process.env.PORT || 8008;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

export default app;
