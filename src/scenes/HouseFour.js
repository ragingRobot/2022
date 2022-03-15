/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player';
import { gsap } from "gsap";
import House from '../sprites/House';
import Ghost from '../sprites/Ghost';
import AbstractGame from './AbstractGame';
import House4Background from '../sprites/House4Background';


export default class extends AbstractGame {
    constructor() {
        super('House4Scene')
    }

    addBackground() {
        this.background = new House4Background(this, 1732, 400);
    }

    addItems() {
        this.ghost = new Ghost(this);
        this.ghost.alpha = 0;
        this.player.x = 600;
        this.player.y = 780;
        this.player.alpha = 0;
        this.background.alpha = 0;
        const house = new House(this, 1960, 345, 4, true);

        var tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 1 } });
        tl.to(house, {
            duration: 1,
            x: 460,
            y: 710,
        }).to([this.player, this.background, this.ghost], {
            duration: 1,
            alpha: 1,
        });
    }
}
