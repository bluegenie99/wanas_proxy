const functions = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const axios = require("axios");

exports.geminiProxy = onRequest(async (req, res) => {
  const apiKey = "AIzaSyAYx67sEk3E5R_EjBtmp6iYBv2muf0e7cs"; // تأكد أنه صحيح
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;

  try {
    const response = await axios.post(url, req.body, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    res.status(200).send(response.data);
  } catch (error) {
    console.error("❌ Error from Gemini API:", error.response?.data || error.message);
    res.status(500).send({
      error: true,
      message: error.response?.data || error.message
    });
  }
});
