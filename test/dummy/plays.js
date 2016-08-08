import * as constants from "../../src/Constants";

export const dunkPlay = {
    homeSummary: "Griffin  Alley Oop Dunk (2 PTS) (Paul 4 AST)",
    awaySummary: '',
    scoringTeam: constants.teams.HOME,
    points: 2,
    period: 3,
    time: "05:23"
};

export const missedFreeThrowPlay = {
    homeSummary: "MISS Jordan Free Throw 1 of 2",
    awaySummary: null,
    scoringTeam: constants.teams.HOME,
    points: 0,
    period: 2,
    time: "11:55"
};

export const endOfPeriodPlay = {
    homeSummary: null,
    awaySummary: null,
    scoringTeam: null,
    points: 0,
    period: 3,
    time: "0:00"
};

export const buzzerBeaterPlay = {
    "homeSummary": null,
    "awaySummary": "Rivers 21' Step Back Jump Shot (4 PTS)",
    "scoringTeam": constants.teams.AWAY,
    "points": 2,
    "period": 4,
    "time": "00:02"
};
