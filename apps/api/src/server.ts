import express from "express";

const app = express();

app.use(express.json());

app.get("/api/v1/health", (_req, res) => {
  res.json({
    success: true,
    message: "Server is working",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});

export default app;
