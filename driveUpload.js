import { google } from "googleapis";
import fs from "fs";

/* ===== AUTH ===== */
const auth = new google.auth.GoogleAuth({
  keyFile: "service-account.json", // yahi file use hogi
  scopes: ["https://www.googleapis.com/auth/drive"],
});

const drive = google.drive({ version: "v3", auth });

/* ===== UPLOAD FUNCTION ===== */
export async function uploadToDrive(filePath, fileName, folderId) {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media: {
        mimeType: "application/octet-stream",
        body: fs.createReadStream(filePath),
      },
    });

    console.log("File uploaded:", response.data.id);
  } catch (error) {
    console.error("Upload error:", error.message);
  }
}