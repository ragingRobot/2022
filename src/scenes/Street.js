/* globals __DEV__ */
import Phaser from 'phaser'
import Background from '../sprites/Background';
import House from '../sprites/House';
import AbstractGame from './AbstractGame';


export default class extends AbstractGame {
    constructor() {
        super('StreetScene')
    }

    addBackground() {
        const house1 = new House(this, 500, 780, 1);
        const house2 = new House(this, 900, 810, 2);
        const house3 = new House(this, 1120, 795, 3);
        const house4 = new House(this, 1960, 345, 4);
        this.background = new Background(this, 1532, 800);
    }

    addItems() {

        this.add.sprite(1500, 780, 'gate');
    }
}
