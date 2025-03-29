;import { ScoreData } from "@/types/scoreDataType";
import { transformConstructorScoreData, transformDriverScoreData } from "@/utils/data/transformData";
import { formatConstructorScoreDataForSheets, formatDriverScoreDataForSheets } from "@/utils/spreadsheet/formatDataToSpreadsheet";

export type TransformedData = {
    drivers: string[][];
    constructors: string[][];
}
export const transformScoreData = async (data: ScoreData | null) => {

    const transformedData = {
        drivers: [] as string[][],
        constructors: [] as string[][],
    }

    if(data?.drivers) {
        const transformedDriversScore = transformDriverScoreData(data.drivers);
        const spreadSheetData = formatDriverScoreDataForSheets(transformedDriversScore);
        transformedData.drivers = spreadSheetData;
    }

    if(data?.constructors) {
        const transformedConstructorsScore = transformConstructorScoreData(data.constructors);
        const spreadSheetData = formatConstructorScoreDataForSheets(transformedConstructorsScore);
        transformedData.constructors = spreadSheetData;
    }

    return transformedData;
};

