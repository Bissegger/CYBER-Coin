// Simulierter Server
const payments = {}; // temporär, in echter Version DB nötig

export default function handler(req, res) {
  const { id } = req.query;

  if (!id) return res.status(400).json({ error: "Keine ID" });

  // Hier würdest du echte TWINT-Webhook-Daten prüfen
  // Simuliert: wir setzen ID als bezahlt, wenn noch nicht freigegeben
  if (!payments[id]) {
    payments[id] = { coins: 0, paid: true }; // in echt: Coins aus TWINT-Bestellung
    return res.status(200).json({ success: true, coins: 10 });
  } else if (payments[id].paid) {
    return res.status(200).json({ success: true, coins: payments[id].coins });
  } else {
    return res.status(402).json({ success: false, message: "Noch nicht bezahlt" });
  }
}
