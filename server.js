import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

// ROTA PRINCIPAL
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Backend VisualCalc OK 🚀"
  });
});

// ROTA HEALTH (ESSENCIAL)
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "VisualCalc Backend",
    online: true
  });
});

// EMISSÃO DE NF
app.post("/emitir-nfe", async (req, res) => {
  try {
    const response = await fetch("https://api.focusnfe.com.br/v2/nfe", {
      method: "POST",
      headers: {
        "Authorization": "Basic " + Buffer.from(process.env.FOCUS_API_KEY + ":").toString("base64"),
        "Content-Type": "application/json"
      },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PORTA (IMPORTANTE PARA RAILWAY)
app.listen(process.env.PORT || 3000, () => {
  console.log("Servidor rodando 🚀");
});
