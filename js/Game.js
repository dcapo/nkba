import _ from 'lodash';
import Play from './Play';
import ScoreCalculator from './ScoreCalculator';
import * as constants from './Constants';

export default class {
    constructor(data) {
        this.plays = this.parsePlays(data);
    }

    parsePlays(data) {
        let plays = [],
            previousScoreMargin = 0;

        data.forEach(playData => {
            if (playData.scoremargin === 'TIE') playData.scoremargin = 0;
            plays.push(this.parsePlay(playData, previousScoreMargin));
            if (playData.scoremargin !== null) {
                previousScoreMargin = playData.scoremargin;
            }
        });

        return plays;
    }

    parsePlay(playData, previousScoreMargin) {
        let scoringTeam = null,
            points = 0;

        if (playData.score) {
            scoringTeam = playData.homedescription ? constants.teams.HOME : constants.teams.AWAY;
            points = Math.abs(playData.scoremargin - previousScoreMargin);
        }

        return new Play({
            homeSummary: playData.homedescription,
            awaySummary: playData.visitordescription,
            scoringTeam: scoringTeam,
            points: points,
            period: playData.period,
            time: playData.pctimestring
        });
    }

    computeNorthKoreanScore() {
        let calculator = new ScoreCalculator(this);
        return calculator.calculateNorthKoreanScore();
    }
}
