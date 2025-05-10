import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 8080;
app.use(bodyParser.json());

app.get("/test", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
