import * as chai from 'chai';
import Play from '../../src/models/Play';
import * as constants from '../../src/Constants.js';
import _ from 'lodash';
import { dunkPlay, missedFreeThrowPlay, endOfPeriodPlay, buzzerBeaterPlay }
    from '../dummy/plays.js';

const expect = chai.expect;
chai.should();

describe('Play', function() {

    describe('#constructor', function() {
        it('initializes properly', function() {
            let play = new Play(dunkPlay);
            _.forOwn(dunkPlay, (value, key) => {
                expect(play[key]).to.equal(value);
            });
        });
    });

    describe('#isDunk', function() {
        it('recognizes when a play is a dunk', function() {
            let play = new Play(dunkPlay);
            play.isDunk().should.be.true;

            play.homeSummary = 'MISS  Griffin Dunk';
            play.points = 0;
            play.isDunk().should.be.false;
        });
    });

    describe('#isMissedFreeThrow', function() {
        it('recognizes when a play is a missed free throw', function() {
            let play = new Play(missedFreeThrowPlay);
            play.isMissedFreeThrow().should.be.true;

            play.homeSummary = 'Jordan Free Throw 1 of 2 (6 PTS)';
            play.points = 1;
            play.isMissedFreeThrow().should.be.false;
        });
    })

    describe('#marksTheEndOfThePeriod', function() {
        it('recognizes when a play marks the end of a period', function() {
            let play = new Play(endOfPeriodPlay);
            play.marksTheEndOfThePeriod().should.be.true;

            play.time = "0:01";
            play.marksTheEndOfThePeriod().should.be.false;

            play.time = "";
            play.marksTheEndOfThePeriod().should.be.false;
        });
    });

    describe('#isBuzzerBeater', function() {
        it('recognizes when a play is a buzzer beater', function() {
            let play = new Play(buzzerBeaterPlay);
            play.isBuzzerBeater().should.be.true;

            play.period = 3;
            play.isBuzzerBeater().should.be.false;

            play.period = 4;
            play.time = "0:03";
            play.isBuzzerBeater().should.be.false;
        });
    });

});
