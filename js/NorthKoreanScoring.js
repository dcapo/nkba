import _ from 'lodash';
import Score from './Score';

export default class {

    constructor(playByPlay) {
        this.playByPlay = playByPlay;
        this.score = this.previousScore = new Score(0, 0);
    }

    scorePlay(play) {
        if (play.score) {
            let playScore = Score.fromString(play.score);
            if (play.homedescription) {
                this.score.scoreHome(playScore.home - this.previousScore.home);
            } else {
                this.score.scoreAway(playScore.away - this.previousScore.away);
            }
            this.previousScore = playScore;
        }
    }

    calculate() {
        console.log(this.playByPlay);
        _.each(this.playByPlay, play => this.scorePlay(play));
        return this.score;
    }

}
