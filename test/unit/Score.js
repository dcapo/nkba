import chai from 'chai';
import Score from '../../src/models/Score';
import * as constants from '../../src/Constants.js';

const expect = chai.expect;
chai.should();

describe('Score', function() {
    describe('#fromString', function() {
        it('creates a Score from a string', function() {
            Score.fromString('5 - 15').should.deep.equal(new Score(15, 5));
        });
    });

    describe('#margin', function() {
        it('computes score margins', function() {
            let score = new Score(0, 0);
            score.margin().should.equal(0);

            score = new Score(5, 15);
            score.margin().should.equal(-10);

            score = new Score(6, 3);
            score.margin().should.equal(3);
        });
    });

    describe('#isTied', function() {
        it('recognizes when a score is tied', function() {
            let score = new Score(0, 0);
            score.isTied().should.be.true;

            score = new Score(1, 0);
            score.isTied().should.be.false;
        });
    });

    describe('#tally', function() {
        it("tallies points for a score", function() {
            let score = new Score(0, 0);
            score.tally(constants.teams.HOME, 77);
            score.should.deep.equal(new Score(77, 0));
        });
    });

    describe("#winningTeam", function() {
        it("determines which team is winning", function() {
            let score = new Score(15, 0);
            score.winningTeam().should.equal(constants.teams.HOME);

            score = new Score(0, 15);
            score.winningTeam().should.equal(constants.teams.AWAY);

            score = new Score(1,1);
            expect(score.winningTeam()).to.be.undefined;
        });

        it("determines which team is losing", function() {
            let score = new Score(15, 0);
            score.losingTeam().should.equal(constants.teams.AWAY);

            score = new Score(0, 15);
            score.losingTeam().should.equal(constants.teams.HOME);

            score = new Score(2,2);
            expect(score.losingTeam()).to.be.undefined;
        });
    });
});
