import { ResultData } from "@/types/resultDataType";
import { transformFreePracticeData, transformQualyData, transformRaceData, transformSprintData, transformSprintQualyData } from "@/utils/data/transformData";
import { formatDataForSheets, formatQualyForSheets, formatRaceForSheets, formatSprintForSheets } from "@/utils/spreadsheet/formatDataToSpreadsheet";

export type TransformedData = {
    freePracticeOne: string[][];
    freePracticeTwo: string[][];
    freePracticeThree: string[][];
    sprintQualy: string[][];
    sprint: string[][];
    qualy: string[][];
    race: string[][];
    isSprintWeekend: boolean;
}

export const transformRaceResultsData = async (data: ResultData | null) => {
    const transformedData = {
        freePracticeOne: [] as string[][],
        freePracticeTwo: [] as string[][],
        freePracticeThree: [] as string[][],
        sprintQualy: [] as string[][],
        sprint: [] as string[][],
        qualy: [] as string[][],
        race: [] as string[][],
        isSprintWeekend: false
    }

    if(data?.isRaceWithSprint) {
        transformedData.isSprintWeekend = true;
    }

    if (data?.freePracticeOneData) {
        const transformedFreePracticeOneData = transformFreePracticeData(data.freePracticeOneData, 1);
        const spreadhSheetData = formatDataForSheets(transformedFreePracticeOneData);
        transformedData.freePracticeOne = spreadhSheetData;
    }

    if (data?.freePracticeTwoData) {
        const transformedTwoPracticeData = transformFreePracticeData(data.freePracticeTwoData, 2);
        const spreadhSheetData = formatDataForSheets(transformedTwoPracticeData);
        transformedData.freePracticeTwo = spreadhSheetData;
    }

    if (data?.freePracticeThreeData) {
        const transformedFreePracticeData = transformFreePracticeData(data.freePracticeThreeData, 3);
        const spreadhSheetData = formatDataForSheets(transformedFreePracticeData);
        transformedData.freePracticeThree = spreadhSheetData;
    }

    if (data?.sprintQualyData) {
        const transformedSprintQualyData = transformSprintQualyData(data.sprintQualyData);
        const spreadhSheetData = formatQualyForSheets(transformedSprintQualyData);
        transformedData.sprintQualy = spreadhSheetData;

        if (data.sprintData) {
            const transformedSprintData = transformSprintData(data.sprintQualyData, data.sprintData);
            const spreadhSheetData = formatSprintForSheets(transformedSprintData);
            transformedData.sprint = spreadhSheetData;
        }
    }

    if (data?.qualyData) {
        const transformedQualyData = transformQualyData(data.qualyData);
        const spreadhSheetData = formatQualyForSheets(transformedQualyData);
        transformedData.qualy = spreadhSheetData;
    }

    if (data?.raceData) {
        const transformedRaceData = transformRaceData(data.qualyData, data.raceData);
        const spreadhSheetData = formatRaceForSheets(transformedRaceData);
        transformedData.race = spreadhSheetData;
    }

    return transformedData;
};