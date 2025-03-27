import { google } from "googleapis";
import { JWT } from "google-auth-library";

const credentials = JSON.parse(process.env.GOOGLE_SHEETS_CREDENTIALS || '{}');

const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const client = (await auth.getClient()) as JWT;

export const sheets = google.sheets({ version: "v4", auth: client });

export const SPREADSHEET_ID = process.env.SPREADSHEET_ID as string;
