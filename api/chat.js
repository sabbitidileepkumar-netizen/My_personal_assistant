module.exports = async (req, res) => {
  const q = req.query.q || "hi";
  const r = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Reply in 1-2 short simple sentences. " + q }] }],
      }),
    }
  );
  const d = await r.json();
  res.status(200).json({
    reply: d.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, no answer",
  });
};
