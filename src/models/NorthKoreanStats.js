import _ from 'lodash';
import Score from './Score';
import * as constants from '../Constants';

export default class {

    constructor(game) {
        this.score = new Score(0,0);
        this.dunks = {};
        this.dunks[constants.teams.HOME] = 0;
        this.dunks[constants.teams.AWAY] = 0;

        this.missedFreeThrows = {};
        this.missedFreeThrows[constants.teams.HOME] = 0;
        this.missedFreeThrows[constants.teams.AWAY] = 0;

        this.buzzerBeaters = {};
        this.buzzerBeaters[constants.teams.HOME] = 0;
        this.buzzerBeaters[constants.teams.AWAY] = 0;

        this.buildStats(game);
    }

    buildStats(game) {
        game.plays.some(play => {
            if (play.isDunk()) {
                this.dunks[play.scoringTeam]++;
                this.score.tally(play.scoringTeam, 3);
            } else if (play.isMissedFreeThrow()) {
                let penalizedTeam = play.homeSummary ?
                                    constants.teams.HOME : constants.teams.AWAY;
                this.missedFreeThrows[penalizedTeam]++;
                this.score.tally(penalizedTeam, -1);
            } else if (play.isBuzzerBeater()) {
                this.buzzerBeaters[play.scoringTeam]++;
                this.score.tally(play.scoringTeam, 8);
            } else if (play.points) {
                this.score.tally(play.scoringTeam, play.points);
            }

            return play.period >= 4 &&
                this.score.isTied() &&
                play.marksTheEndOfThePeriod();
        });
    }
}
