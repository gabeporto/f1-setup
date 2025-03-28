import { ResultData } from "@/types/resultDataType";
import { transformFreePracticeData, transformQualyData, transformRaceData, transformSprintData, transformSprintQualyData } from "@/utils/data/transformData";
import { formatDataForSheets, formatPartialRaceForSheets, formatQualyForSheets, formatRaceForSheets, formatSprintForSheets } from "@/utils/spreadsheet/formatDataToSpreadsheet";

export type TransformedData = {
    freePracticeOne: string[][];
    freePracticeTwo: string[][];
    freePracticeThree: string[][];
    sprintQualy: string[][];
    sprint: string[][];
    qualy: string[][];
    race: string[][];
    partialRace: string[][];
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
        partialRace: [] as string[][],
        isSprintWeekend: false
    }

    if(data?.isRaceWithSprint) {
        transformedData.isSprintWeekend = true;
    }

    if (data?.freePracticeOneData) {
        const transformedFreePracticeOneData = transformFreePracticeData(data.freePracticeOneData, 1);
        const spreadSheetData = formatDataForSheets(transformedFreePracticeOneData);
        transformedData.freePracticeOne = spreadSheetData;
    }

    if (data?.freePracticeTwoData) {
        const transformedTwoPracticeData = transformFreePracticeData(data.freePracticeTwoData, 2);
        const spreadSheetData = formatDataForSheets(transformedTwoPracticeData);
        transformedData.freePracticeTwo = spreadSheetData;
    }

    if (data?.freePracticeThreeData) {
        const transformedFreePracticeData = transformFreePracticeData(data.freePracticeThreeData, 3);
        const spreadSheetData = formatDataForSheets(transformedFreePracticeData);
        transformedData.freePracticeThree = spreadSheetData;
    }

    if (data?.sprintQualyData) {
        const transformedSprintQualyData = transformSprintQualyData(data.sprintQualyData);
        const spreadSheetData = formatQualyForSheets(transformedSprintQualyData);
        transformedData.sprintQualy = spreadSheetData;

        if (data.sprintData) {
            const transformedSprintData = transformSprintData(data.sprintQualyData, data.sprintData);
            const spreadSheetData = formatSprintForSheets(transformedSprintData);
            transformedData.sprint = spreadSheetData;
        }
    }

    if (data?.qualyData) {
        const transformedQualyData = transformQualyData(data.qualyData);
        const spreadSheetData = formatQualyForSheets(transformedQualyData);
        transformedData.qualy = spreadSheetData;
    }

    if (data?.raceData) {
        const transformedRaceData = transformRaceData(data.qualyData, data.raceData);
        const spreadSheetData = formatRaceForSheets(transformedRaceData);
        transformedData.race = spreadSheetData;
    }

    if (data?.raceData) {
        const transformedRaceData = transformRaceData(data.qualyData, data.raceData);
        const spreadSheetData = formatPartialRaceForSheets(transformedRaceData);
        transformedData.partialRace = spreadSheetData;
    }

    return transformedData;
};