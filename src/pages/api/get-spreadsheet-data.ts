import type { NextApiRequest, NextApiResponse } from "next";
import { sheets, SPREADSHEET_ID } from "../../services/google/googleSheets";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: "A1:D8",
    });

    return res.status(200).json({ data: response.data.values });
  } catch (error) {
    console.error("Erro ao obter planilha:", error);
    return res.status(500).json({ error: "Erro ao obter planilha." });
  }
}
