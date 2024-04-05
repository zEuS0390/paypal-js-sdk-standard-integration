import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8889;
const app = express();

app.use("/static", express.static(path.join(__dirname, "static")));

// Set the MIME type for .js files
app.use(
  express.static(__dirname, {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "text/javascript");
      }
    },
  })
);

app.get("/", (req, res) => {
  const url = path.join(__dirname, "index.html");
  res.sendFile(url);
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Node server listening at http://localhost:${PORT}/`);
});
