/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player';
import { gsap } from "gsap";
import House from '../sprites/House';
import AbstractGame from './AbstractGame';
import House1Background from '../sprites/House1Background';


export default class extends AbstractGame {
    constructor() {
        super('House3Scene')
        this.path = '/contact';
    }

    addBackground() {
        this.background = new House1Background(this, 1532, 775);
    }

    addItems() {
        this.player.x = 600;
        this.player.y = 780;
        this.player.alpha = 0;
        this.background.alpha = 0;
        this.house = new House(this, 1220, 870, 3, true);

        const event = new Event("animationComplete");
        window.dispatchEvent(event);
    }

    fadeIn() {
        var tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 1 } });
        tl.to(this.house, {
            duration: 1,
            x: 500,
        }).to([this.player, this.background], {
            duration: 1,
            alpha: 1,
        });
    }
}
