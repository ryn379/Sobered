import app from "./app.js";

const PORT = process.env.PORT || 8008;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
