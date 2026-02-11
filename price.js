export default function handler(req, res) {

  const startDate = new Date("2024-01-01");
  const startPrice = 1.0;
  const targetYears = 6;
  const targetPrice = 70000;

  const now = new Date();
  const yearsPassed =
    (now - startDate) / (1000 * 60 * 60 * 24 * 365);

  const progress = Math.min(yearsPassed / targetYears, 1);

  const growthFactor =
    Math.pow(targetPrice / startPrice, progress);

  let basePrice = startPrice * growthFactor;

  const volatility = basePrice * 0.04;
  const noise = (Math.random() - 0.5) * volatility;

  const finalPrice = basePrice + noise;

  res.status(200).json({
    symbol: "CYBER",
    price_chf: Number(finalPrice.toFixed(3)),
    updated: now.toISOString()
  });
}
