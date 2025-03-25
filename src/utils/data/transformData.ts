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

    const formattedQualyResult = qualyData.races.qualyResults.map((item: any) => ({
        position: item.gridPosition,
        driver: item.driver.driverId,
        team: item.team.teamId,
        time: item.q3 ?? item.q2 ?? item.q1,
    }));

    return {
        pole: formattedPoleResult,
        qualy: formattedQualyResult,
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

export const transformSprintQualyData = (sprintQualyData: any) => {
    const formattedSprintPoleResult = {
        driver: sprintQualyData.races.sprintQualyResults[0].driverId,
        team: sprintQualyData.races.sprintQualyResults[0].teamId,
        time: sprintQualyData.races.sprintQualyResults[0].sq3
    }

    const formattedSprintQualyResult = sprintQualyData.races.sprintQualyResults.map((item: any) => ({
        position: item.gridPosition,
        driver: item.driver.driverId,
        team: item.team.teamId,
        time: item.sq3 ?? item.sq2 ?? item.sq1,
    }));

    return {
        pole: formattedSprintPoleResult,
        qualy: formattedSprintQualyResult,
    };
};

export const transformFreePracticeData = (freePracticeData: any, practiceNumber: number) => {
    const practiceResultsKey = `fp${practiceNumber}Results`;

    const formattedFreePracticeResult = freePracticeData.races[practiceResultsKey]
        .map((item: any) => {
            const isTimeValid = item.time != null;
            
            return {
                driver: item.driver.driverId,
                team: item.team.teamId,
                time: item.time,
                isTimeValid,
            };
        })
        .sort((a: any, b: any) => {
            if (a.isTimeValid && !b.isTimeValid) {
                return -1; 
            }
            if (!a.isTimeValid && b.isTimeValid) {
                return 1; 
            }

            return 0;
        });

    const finalResults = formattedFreePracticeResult.map((item: any, index: number) => ({
        position: index + 1,
        driver: item.driver,
        team: item.team,
        time: item.time,
    }));

    return {
        practice: finalResults,
    };
};
