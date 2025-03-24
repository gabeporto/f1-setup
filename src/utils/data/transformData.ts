export const transformRaceData = (qualyData: any, raceData: any) => {
    const formattedPoleResult = {
        driver: qualyData.races.qualyResults[0].driverId,
        team: qualyData.races.qualyResults[0].teamId,
        time: qualyData.races.qualyResults[0].q3
    }

    const formattedRaceResult = raceData.races.results.map((item: any) => ({
        position: item.position,
        driver: item.driver.driverId,
        team: item.team.teamId,
        time: item.time,
    }));

    return {
        pole: formattedPoleResult,
        race: formattedRaceResult,
    };
};

export const transformQualyData = (qualyData: any) => {
    const formattedPoleResult = {
        driver: qualyData.races.qualyResults[0].driverId,
        team: qualyData.races.qualyResults[0].teamId,
        time: qualyData.races.qualyResults[0].q3
    }

    const formattedRaceResult = qualyData.races.qualyResults.map((item: any) => ({
        position: item.gridPosition,
        driver: item.driver.driverId,
        team: item.team.teamId,
        time: item.q3 ?? item.q2 ?? item.q1,
    }));

    return {
        pole: formattedPoleResult,
        qualy: formattedRaceResult,
    };
};

export const transformSprintData = (sprintQualyData: any, sprintData: any) => {
    const formattedSprintPoleResult = {
        driver: sprintQualyData.races.sprintQualyResults[0].driverId,
        team: sprintQualyData.races.sprintQualyResults[0].teamId,
        time: sprintQualyData.races.sprintQualyResults[0].sq3
    }

    const formattedSprintResult = sprintData.races.sprintRaceResults.map((item: any) => ({
        position: item.position,
        driver: item.driver.driverId,
        team: item.team.teamId,
        time: item.time,
    }));

    return {
        pole: formattedSprintPoleResult,
        sprint: formattedSprintResult,
    };
};
