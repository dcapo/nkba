import Vue from 'vue';
import nba from 'nba';
import Game from './Game';

nba.usePromises();
const game = {gameId: "0021401082"};

let vue = new Vue({
    el: '#app',
    data: {
        score: '',
        plays: []
    }
});

nba.stats.playByPlay(game).then((data) => {
    let game = new Game(data.playByPlay);
    vue.score = game.computeNorthKoreanScore();
    vue.plays = game.plays;
}, (error) => {
    vue.score = error;
})
