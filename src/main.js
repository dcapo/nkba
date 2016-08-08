import Vue from 'vue';
import _ from 'lodash';
import App from './components/App.vue';
import Schedule from './components/Schedule.vue';
import Game from './components/Game.vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let router = new VueRouter();

router.map({
    '/teams/:id': {
        name: 'schedule',
        component: Schedule
    },
    '/games/:id': {
        name: 'game',
        component: Game
    }
});

router.redirect({ 
    '*': { name: 'schedule' }
});

router.start(App, '#app');
