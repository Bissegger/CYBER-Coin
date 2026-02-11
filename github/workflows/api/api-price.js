import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data", "price.json");

const startDate = new Date("2024-01-01");
const targetYears = 6;
const targetPrice = 70000;

export default function handler(req, res) {
  const now = new Date();

  // Datei lesen
  let rawData = fs.readFileSync(filePath);
  let data = JSON.parse(rawData);

  let currentPrice = data.price;

  // Zeit seit Start
  const yearsPassed =
    (now - startDate) / (1000 * 60 * 60 * 24 * 365);

  const progress = Math.min(yearsPassed / targetYears, 1);

  const theoreticalPrice =
    1.0 * Math.pow(targetPrice, progress);

  // sanfte Annäherung (echter Markt-Style)
  const drift = (theoreticalPrice - currentPrice) * 0.01;
  const volatility = currentPrice * 0.02;
  const noise = (Math.random() - 0.5) * volatility;

  currentPrice = currentPrice + drift + noise;

  if (currentPrice < 0.1) currentPrice = 0.1;

  // speichern
  fs.writeFileSync(filePath, JSON.stringify({
    price: currentPrice,
    lastUpdate: now.toISOString()
  }));

  res.status(200).json({
    symbol: "CYBER",
    price_chf: Number(currentPrice.toFixed(3)),
    updated: now.toISOString()
  });
}
