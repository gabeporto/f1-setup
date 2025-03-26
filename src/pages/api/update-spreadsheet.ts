import type { NextApiRequest, NextApiResponse } from "next";
import { sheets, SPREADSHEET_ID } from "../../services/google/googleSheets";
import { fetchFreePracticeData } from "@/services/f1/practice/fetchFreePracticeData";
import { transformFreePracticeData } from "@/utils/data/transformData";

type PracticeEntry = {
  position: number;
  driver: string;
  driverAcronym: string;
  team: string;
  time: string;
};

type PracticeData = {
  practice: PracticeEntry[];
};

const formatPracticeDataForSheets = (data: PracticeData) => {
  return data.practice.map(({ driver, team, time }) => [driver, team, time]);
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  try {
    const { range, year, raceNumber, freePracticeNumber } = req.body as { range: string; year: number; raceNumber: number; freePracticeNumber: number };

    const freePracticeData = await fetchFreePracticeData(Number(year), Number(raceNumber), Number(freePracticeNumber)); 
    const transformedData = transformFreePracticeData(freePracticeData, Number(freePracticeNumber));
    const spreadhSheetData = formatPracticeDataForSheets(transformedData as PracticeData);
    
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: range,
      valueInputOption: "RAW",
      requestBody: {
        values: spreadhSheetData,
      },
    });

    return res.status(200).json({ message: "Planilha atualizada com sucesso!" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
