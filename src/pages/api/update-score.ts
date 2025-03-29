import { fetchDriverConstructorScore } from "@/services/f1/fetchDriverConstructorScore";
import { sheets, SPREADSHEET_ID } from "@/services/google/googleSheets";
import { transformScoreData } from "@/services/transform/transformScoreData";
import { transformScoreDataToUpdateSheet } from "@/utils/spreadsheet/formatDataToSpreadsheet";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido" });
    }

    try {
        const { year, sheetName } = req.body as { year: number, sheetName: string }; 
 
        const fetchDriverConstructorData = await fetchDriverConstructorScore(year);
        const transformedData = await transformScoreData(fetchDriverConstructorData);
        const dataToUpdate = transformScoreDataToUpdateSheet(sheetName, transformedData);

        if (dataToUpdate && dataToUpdate.length) {
            await sheets.spreadsheets.values.batchUpdate({
            spreadsheetId: SPREADSHEET_ID,
            requestBody: {
                valueInputOption: "RAW",
                data: dataToUpdate,
            },
            });
    
            return res.status(200).json({ message: "Planilha atualizada com sucesso!" });
        }
    
        return res.status(200).json({ message: "Nenhum dado disponível para atualização!" });

    } catch (error) {
        console.error("Erro ao atualizar planilha:", error);
        return res.status(500).json({ error: "Erro ao atualizar planilha." });
    }
}