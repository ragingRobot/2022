/* globals __DEV__ */
import Phaser from 'phaser'
import Background from '../sprites/Background';
import House from '../sprites/House';
import AbstractGame from './AbstractGame';
import Controller from '../Controller.js';


export default class extends AbstractGame {
    constructor() {
        super('StreetScene')
    }

    addBackground() {
        this.houses = [];
        this.houses.push(new House(this, 500, 870, 1));
        this.houses.push(new House(this, 900, 852, 2));
        this.houses.push(new House(this, 1220, 870, 3));
        this.houses.push(new House(this, 1960, 420, 4));
        this.background = new Background(this, 1532, 800);
    }

    addItems() {

        this.add.sprite(1500, 780, 'gate');
    }

    checkUrl(pathname) {
        Controller.left = false;
        Controller.right = false;
        switch (pathname) {
            case '/software':
                this.walkToHouse(0);
                break;
            case '/art':
                this.walkToHouse(1);
                break;
            case '/contact':
                this.walkToHouse(2);
                break;
            case '/resume':
                this.walkToHouse(3);
                break;
            default:
                this.player.target = null;
                break;
        }
    }

    walkToHouse(index) {
        this.player.target = this.houses[index];
    }
}
