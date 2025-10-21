// functions/index.js  —— CommonJS 版本，兼容 firebase-functions v4
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({origin: true});

admin.initializeApp();

/** HTTP：complete the num of books （GET）*/
exports.countBooks = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const snap = await admin.firestore().collection('books').get();
      res.json({count: snap.size});
    } catch (e) {
      res.status(500).json({error: e && e.message ? e.message : String(e)});
    }
  });
});

/** trigger：new added books will change name to Uppercase */
exports.capitaliseBookName = functions.firestore
    .document("books/{docId}")
    .onCreate(async (snap) => {
      const data = snap.data() || {};
      const name = typeof data.name === "string" ? data.name : "";
      const upper = name.toUpperCase();
      if (upper && upper !== name) {
        await snap.ref.update({name: upper});
      }
    });
