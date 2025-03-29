type Driver = {
    name: string;
    surname: string;
    shortName: string;
};

type Team = {
    teamName: string;
};

type QualyResult = {
    driver: Driver;
    team: Team;
    q1?: string;
    q2?: string;
    q3?: string;
    gridPosition: number;
};

type RaceResult = {
    position: number;
    driver: Driver;
    team: Team;
    time: string;
};

type SprintQualyResult = {
    driver: Driver;
    team: Team;
    sq1?: string;
    sq2?: string;
    sq3?: string;
    gridPosition: number;
};

type SprintRaceResult = {
    position: number;
    driver: Driver;
    team: Team;
    time: string;
};

type PracticeResult = {
    driver: Driver;
    team: Team;
    time: string | null;
};

type DriverScore = {
    position: number;
    driver: Driver;
    team: Team;
    wins: number;
    points: number
};

type ConstructorScore = {
    position: number;
    wins: number;
    points: number
    team: Team;
};

type QualyData = {
    races: {
        qualyResults: QualyResult[];
    };
};

type RaceData = {
    races: {
        results: RaceResult[];
    };
};

type SprintQualyData = {
    races: {
        sprintQualyResults: SprintQualyResult[];
    };
};

type SprintData = {
    races: {
        sprintRaceResults: SprintRaceResult[];
    };
};

type FreePracticeData = {
    races: Record<string, PracticeResult[]>;
};

type DriverScoreData = {
    drivers_championship: DriverScore[];
};

type ConstructorScoreData = {
    constructors_championship: ConstructorScore[];
}

export const transformRaceData = (qualyData: QualyData, raceData: RaceData) => {
    const formattedPoleResult = {
        driver: qualyData.races.qualyResults[0].driver.name + " " + qualyData.races.qualyResults[0].driver.surname,
        driverAcronym: qualyData.races.qualyResults[0].driver.shortName,
        team: qualyData.races.qualyResults[0].team.teamName,
        time: qualyData.races.qualyResults[0].q3 ?? "-"
    }

    const formattedRaceResult = raceData.races.results.map((item) => ({
        position: item.position,
        driver: item.driver.name + " " + item.driver.surname,
        driverAcronym: item.driver.shortName,
        team: item.team.teamName,
        time: item.time,
    }));

    return {
        pole: formattedPoleResult,
        race: formattedRaceResult,
    };
};

export const transformQualyData = (qualyData: QualyData) => {
    const formattedPoleResult = {
        driver: qualyData.races.qualyResults[0].driver.name + " " + qualyData.races.qualyResults[0].driver.surname,
        driverAcronym: qualyData.races.qualyResults[0].driver.shortName,
        team: qualyData.races.qualyResults[0].team.teamName,
        time: qualyData.races.qualyResults[0].q3 ?? "-"
    }

    const formattedQualyResult = qualyData.races.qualyResults.map((item) => ({
        position: item.gridPosition,
        driver: item.driver.name + " " + item.driver.surname,
        driverAcronym: item.driver.shortName,
        team: item.team.teamName,
        time: item.q3 ?? item.q2 ?? item.q1 ?? "-",
    }));

    return {
        pole: formattedPoleResult,
        qualy: formattedQualyResult,
    };
};

export const transformSprintData = (sprintQualyData: SprintQualyData, sprintData: SprintData) => {
    const formattedSprintPoleResult = {
        driver: sprintQualyData.races.sprintQualyResults[0].driver.name + " " + sprintQualyData.races.sprintQualyResults[0].driver.surname,
        driverAcronym: sprintQualyData.races.sprintQualyResults[0].driver.shortName,
        team: sprintQualyData.races.sprintQualyResults[0].team.teamName,
        time: sprintQualyData.races.sprintQualyResults[0].sq3 ?? "-"
    }

    const formattedSprintResult = sprintData.races.sprintRaceResults.map((item) => ({
        position: item.position,
        driver: item.driver.name + " " + item.driver.surname,
        driverAcronym: item.driver.shortName,
        team: item.team.teamName,
        time: item.time ?? "-",
    }));

    return {
        pole: formattedSprintPoleResult,
        sprint: formattedSprintResult,
    };
};

export const transformSprintQualyData = (sprintQualyData: SprintQualyData) => {
    const formattedSprintPoleResult = {
        driver: sprintQualyData.races.sprintQualyResults[0].driver.name + " " + sprintQualyData.races.sprintQualyResults[0].driver.surname,
        driverAcronym: sprintQualyData.races.sprintQualyResults[0].driver.shortName,
        team: sprintQualyData.races.sprintQualyResults[0].team.teamName,
        time: sprintQualyData.races.sprintQualyResults[0].sq3 ?? "-"
    }

    const formattedSprintQualyResult = sprintQualyData.races.sprintQualyResults.map((item) => ({
        position: item.gridPosition,
        driver: item.driver.name + " " + item.driver.surname,
        driverAcronym: item.driver.shortName,
        team: item.team.teamName,
        time: item.sq3 ?? item.sq2 ?? item.sq1 ?? "-",
    }));

    return {
        pole: formattedSprintPoleResult,
        qualy: formattedSprintQualyResult,
    };
};

export const transformFreePracticeData = (freePracticeData: FreePracticeData, practiceNumber: number) => {
    const practiceResultsKey = `fp${practiceNumber}Results`;

    const formattedFreePracticeResult = freePracticeData.races[practiceResultsKey]
        .map((item) => {
            const isTimeValid = item.time != null;
            
            return {
                driver: item.driver.name + " " + item.driver.surname,
                driverAcronym: item.driver.shortName,
                team: item.team.teamName,
                time: item.time ?? "-",
                isTimeValid,
            };
        })
        .sort((a, b) => {
            if (a.isTimeValid && !b.isTimeValid) {
                return -1; 
            }
            if (!a.isTimeValid && b.isTimeValid) {
                return 1; 
            }

            return 0;
        });

    const finalResults = formattedFreePracticeResult.map((item, index) => ({
        position: index + 1,
        driver: item.driver,
        driverAcronym: item.driverAcronym,
        team: item.team,
        time: item.time,
    }));

    return {
        practice: finalResults,
    };
};

export const transformDriverScoreData = (driverScoreData: DriverScoreData) => {
    const formattedDriverScore = driverScoreData.drivers_championship.map((item) => ({
        position: item.position,
        driver: item.driver.name + " " + item.driver.surname,
        driverAcronym: item.driver.shortName,
        team: item.team.teamName,
        wins: item.wins,
        points: item.points,
    }));

    return {
        drivers: formattedDriverScore
    };
};

export const transformConstructorScoreData = (constructorScoreData: ConstructorScoreData) => {
    const formattedConstructorScore = constructorScoreData.constructors_championship.map((item) => ({
        position: item.position,
        points: item.points,
        wins: item.wins,
        team: item.team.teamName,
    }));

    return {
        constructors: formattedConstructorScore
    };
};