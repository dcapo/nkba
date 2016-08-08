import * as chai from 'chai';
import * as constants from '../../src/Constants';
import Game from '../../src/models/Game';
import Play from '../../src/models/Play';
import NorthKoreanStats from '../../src/models/NorthKoreanStats';
import Score from '../../src/models/Score';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { dunkPlay, missedFreeThrowPlay, endOfPeriodPlay, buzzerBeaterPlay }
    from '../dummy/plays.js';

const expect = chai.expect;
chai.should();
chai.use(sinonChai);

describe("NorthKoreanStats", function() {

    beforeEach(function() {
        sinon.spy(NorthKoreanStats.prototype, "buildStats");
    });

    afterEach(function() {
        NorthKoreanStats.prototype.buildStats.restore();
    });

    describe("#constructor", function() {
        it("calls buildStats on instantiation", function() {
            let stats = new NorthKoreanStats(new Game([]));
            stats.buildStats.should.have.been.called;
        });
    });

    let homePlay = new Play({ scoringTeam: constants.teams.HOME, homeSummary: ' ' });
    let awayPlay = new Play({ scoringTeam: constants.teams.AWAY });
    let game = { plays: [homePlay, awayPlay] };

    describe("#buildStats", function() {
        it("scores dunks according to North Korean rules", function() {
            sinon.stub(Play.prototype, "isDunk").returns(true);

            let stats = new NorthKoreanStats(game);
            stats.score.should.deep.equal(new Score(3, 3));
            stats.dunks[constants.teams.HOME].should.equal(1);
            stats.dunks[constants.teams.AWAY].should.equal(1);

            Play.prototype.isDunk.restore();
        });

        it("scores missed free throws according to North Korean rules", function() {
            sinon.stub(Play.prototype, "isDunk").returns(false);
            sinon.stub(Play.prototype, "isMissedFreeThrow").returns(true);

            let stats = new NorthKoreanStats(game);
            stats.score.should.deep.equal(new Score(-1, -1));
            stats.missedFreeThrows[constants.teams.HOME].should.equal(1);
            stats.missedFreeThrows[constants.teams.AWAY].should.equal(1);
             
            Play.prototype.isDunk.restore();
            Play.prototype.isMissedFreeThrow.restore();
        });

        it("scores buzzer beaters according to North Korean rules", function() {
            sinon.stub(Play.prototype, "isDunk").returns(false);
            sinon.stub(Play.prototype, "isMissedFreeThrow").returns(false);
            sinon.stub(Play.prototype, "isBuzzerBeater").returns(true);

            let stats = new NorthKoreanStats(game);
            stats.score.should.deep.equal(new Score(8, 8));
            stats.buzzerBeaters[constants.teams.HOME].should.equal(1);
            stats.buzzerBeaters[constants.teams.AWAY].should.equal(1);

            Play.prototype.isDunk.restore();
            Play.prototype.isMissedFreeThrow.restore();
            Play.prototype.isBuzzerBeater.restore();
        });
        
        it("still scores regular baskets correctly", function() {
            let play = sinon.createStubInstance(Play);
            play.points = 3;
            play.scoringTeam = constants.teams.HOME;

            let stats = new NorthKoreanStats({ plays: [play] });
            stats.score.should.deep.equal(new Score(3, 0));
        });

        it("ends a game on a tie", function() {
            let endRegulation = new Play({ period: 4 });
            sinon.stub(Play.prototype, "isDunk").withArgs(homePlay).returns(true);
            sinon.stub(Play.prototype, "marksTheEndOfThePeriod").returns(true);
            sinon.stub(Score.prototype, "isTied").returns(true);

            let stats = new NorthKoreanStats({ plays: [endRegulation, homePlay] })
            stats.score.should.deep.equal(new Score(0, 0));

            Play.prototype.isDunk.restore();
            Play.prototype.marksTheEndOfThePeriod.restore();
            Score.prototype.isTied.restore();
        });
    });
});
