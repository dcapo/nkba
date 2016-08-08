import * as chai from 'chai';
import Game from '../../src/models/Game';
import Play from '../../src/models/Play';
import * as constants from '../../src/Constants';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import { dunkPlay, missedFreeThrowPlay, endOfPeriodPlay, buzzerBeaterPlay }
from '../dummy/plays.js';

const expect = chai.expect;
chai.should();
chai.use(sinonChai);

describe('Game', function() {

    describe('#constructor', function() {
        it('initializes properly', function() {
            let game = new Game([ dunkPlay ]);
            game.plays.should.have.lengthOf(1);
        });
    });

    describe('#parsePlays', function() {

        beforeEach(function() {
            sinon.stub(Game.prototype, "parsePlay").returns(1);
            sinon.spy(Game.prototype, "parsePlays");
        });

        afterEach(function() {
            Game.prototype.parsePlay.restore();
            Game.prototype.parsePlays.restore();
        });

        it('returns an array of parsed Play instances', function() {
            let game = new Game([{}, {}, {}]);

            game.parsePlay.should.have.been.calledThrice;
            game.parsePlays.should.have.returned([1,1,1]);
        });

        it('changes the scoremargin from "TIE" to 0', function() {
            let game = new Game([{ scoremargin: "TIE" }]);
            game.parsePlay.should.have.been.calledWith({ scoremargin: 0 }, 0);
        });

        it('keeps tabs on the previous score margin', function() {
            let margin = 2;
            let game = new Game([{ scoremargin: margin }, {}]);
            game.parsePlay.secondCall.args[1].should.equal(margin);
        });

    });

    describe('#parsePlay', function() {
        let visitordescription = "Griffin  Alley Oop Dunk (2 PTS) (Paul 4 AST)";
        let pctimestring = "0:04"; 
        let play = Game.prototype.parsePlay({
            score: "2 - 6",
            scoremargin: 5,
            homedescription: null,
            visitordescription,
            period: 4,
            pctimestring
        }, 8);

        it("correctly computes a play's score", function() {
            play.points.should.equal(3);
        });

        it("assigns a scoring play to the right team", function() {
            play.scoringTeam.should.equal(constants.teams.AWAY);
        });

        it("parses all the necessary data from the NBA stats json", function() {
            play.homeSummary.should.be.empty;
            play.awaySummary.should.equal(visitordescription);
            play.period.should.equal(4);
            play.time.should.equal(pctimestring);
        });
    });

});
