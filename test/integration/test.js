const nba = require('nba');
const should = require('chai').should();

const game = {gameId: "0021401082"};
const dubs = { teamId: "1610612744" };

describe('Api Health Check', function() {
    
    const fetchResource = function(endpoint, params) {
        return function(done) {
            nba.stats[endpoint](params, function (error, data) {
                if (error) return done(error);
                if (endpoint === 'boxScoreSummary') console.log(data);
                data.should.have.length;
                done();
            });
        };
    };

    it('fetches the play by play of a game', fetchResource('playByPlay', game));
    it('fetches team stats', fetchResource('teamStats', {}));
    it("fetches a team's schedule", fetchResource('teamGameLog', dubs));
    it("fetches a game's box score", fetchResource('boxScoreSummary', game));
});
