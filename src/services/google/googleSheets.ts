import { google } from "googleapis";
import path from "path";
import { JWT } from "google-auth-library";

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(process.cwd(), "f1-setup-key-credentials.json"),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const client = (await auth.getClient()) as JWT;

export const sheets = google.sheets({ version: "v4", auth: client });

export const SPREADSHEET_ID = process.env.SPREADSHEET_ID as string;
