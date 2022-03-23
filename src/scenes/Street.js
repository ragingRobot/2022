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
        this.houses = [];
        this.houses.push(new House(this, 500, 780, 1));
        this.houses.push(new House(this, 900, 810, 2));
        this.houses.push(new House(this, 1220, 796, 3));
        this.houses.push(new House(this, 1960, 345, 4));
        this.background = new Background(this, 1532, 800);
    }

    addItems() {

        this.add.sprite(1500, 780, 'gate');
    }
}
