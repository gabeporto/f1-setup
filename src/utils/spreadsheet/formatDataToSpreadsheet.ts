import { TransformedData } from "@/services/transform/transformRaceResultsData";
import { RACE_WITH_SPRINT_RANGE, RACE_WITHOUT_SPRINT_RANGE } from "./racesRange";
import { DRIVERS, TEAMS } from "./formulaOneNomenclatures";

type DriverPositionEntry = {
    position: number;
    driver: string;
    driverAcronym: string;
    team: string;
    time: string;
};

type PoleEntry = {
    driver: string;
    driverAcronym: string;
    team: string;
    time: string;
};

type PracticeData = {
    practice: DriverPositionEntry[];
};

type QualyData = {
    pole: PoleEntry;
    qualy: DriverPositionEntry[];
};

type SprintData = {
    pole: PoleEntry;
    sprint: DriverPositionEntry[];
};

type RaceData = {
    pole: PoleEntry;
    race: DriverPositionEntry[];
};

export function formatDataForSheets(data: PracticeData) {
    return data.practice.map(({ driver, team, time }) => [ 
        DRIVERS[driver] || driver, 
        TEAMS[team] || team, 
        time
    ]);
}

export function formatQualyForSheets(data: QualyData) {
    return data.qualy.map(({ driver, team, time }) => [
        DRIVERS[driver] || driver, 
        TEAMS[team] || team, 
        time
    ]);
}

export function formatSprintForSheets(data: SprintData) {
    return data.sprint.map(({ driver, team, time }) => [
        DRIVERS[driver] || driver, 
        TEAMS[team] || team, 
        time
    ]);
}

export function formatRaceForSheets(data: RaceData) {
    return data.race.map(({ driver, team, time }) => [
        DRIVERS[driver] || driver, 
        TEAMS[team] || team, 
        time
    ]);
}

export const transformDataToUpdateSheet = (sheetName: string, transformedData: TransformedData) => {
    const dataToUpdate = [];

    if (transformedData.freePracticeOne) {
        dataToUpdate.push({ range: sheetName + RACE_WITHOUT_SPRINT_RANGE.fp1, values: transformedData.freePracticeOne });
    }

    if (transformedData.isSprintWeekend) {
        if (transformedData.sprintQualy) {
            dataToUpdate.push({ range: sheetName + RACE_WITH_SPRINT_RANGE.sprintQualy, values: transformedData.sprintQualy });
        }
        if (transformedData.sprint) {
            dataToUpdate.push({ range: sheetName + RACE_WITH_SPRINT_RANGE.sprint, values: transformedData.sprint });
        }
    } else {
        if (transformedData.freePracticeTwo) {
            dataToUpdate.push({ range: sheetName + RACE_WITHOUT_SPRINT_RANGE.fp2, values: transformedData.freePracticeTwo });
        }
        if (transformedData.freePracticeThree) {
            dataToUpdate.push({ range: sheetName + RACE_WITHOUT_SPRINT_RANGE.fp3, values: transformedData.freePracticeThree });
        }
    }

    if (transformedData.qualy) {
        dataToUpdate.push({ range: sheetName + RACE_WITHOUT_SPRINT_RANGE.qualy, values: transformedData.qualy });
    }
    if (transformedData.race) {
        dataToUpdate.push({ range: sheetName + RACE_WITHOUT_SPRINT_RANGE.race, values: transformedData.race });
    }

    return dataToUpdate;
}