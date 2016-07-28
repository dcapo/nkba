import Vue from 'vue';
import nba from 'nba';
import NorthKoreanScoring from './NorthKoreanScoring';

nba.usePromises();
const game = {gameId: "0021401082"};

let vue = new Vue({
    el: '#app',
    data: {
        json: ''
    }
});

nba.stats.playByPlay(game).then((data) => {
    let scoring = new NorthKoreanScoring(data.playByPlay);
    vue.json = scoring.calculate();
}, (error) => {
    vue.json = error;
})
