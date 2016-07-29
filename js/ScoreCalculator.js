import _ from 'lodash';
import Score from './Score';
import * as constants from './Constants';

export default class {

    constructor(game) {
        this.game = game;
    }

    calculateNorthKoreanScore() {
        let score = new Score(0, 0);

        this.game.plays.forEach(play => {
            if (play.isDunk()) {
                score.tally(play.scoringTeam, 3);
            } else if (play.isMissedFreeThrow()) {
                let penalizedTeam = play.homeSummary ?
                                    constants.teams.HOME : constants.teams.AWAY;
                score.tally(penalizedTeam, -1);
            } else if (play.points) {
                score.tally(play.scoringTeam, play.points);
            }

            if (play.period >= 4 && score.isTied() && play.marksTheEndOfThePeriod()) {
                return score;
            }
        });

        return score;
    }

}
