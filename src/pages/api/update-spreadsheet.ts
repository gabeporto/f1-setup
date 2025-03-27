import type { NextApiRequest, NextApiResponse } from "next";
import { sheets, SPREADSHEET_ID } from "../../services/google/googleSheets";
import { fetchRaceResults } from "@/services/f1/fetchRaceResults";
import { transformRaceResultsData } from "@/services/transform/transformRaceResultsData";
import { ResultData } from "@/types/resultDataType";
import { transformDataToUpdateSheet } from "@/utils/spreadsheet/formatDataToSpreadsheet";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { year, raceNumber, sheetName } = req.body as { year: number; raceNumber: number; sheetName: string };

    const resultsData : (ResultData | null) = await fetchRaceResults(year, raceNumber); 
    const transformedData = await transformRaceResultsData(resultsData);
    const dataToUpdate = transformDataToUpdateSheet(sheetName, transformedData);

    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId: SPREADSHEET_ID,
      requestBody: {
        valueInputOption: "RAW",
        data: dataToUpdate,
      },
    });

    return res.status(200).json({ message: "Planilha atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar planilha:", error);
    return res.status(500).json({ error: "Erro ao atualizar planilha." });
  }
}
