/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player';
import { gsap } from "gsap";
import House from '../sprites/House';
import AbstractGame from './AbstractGame';
import House1Background from '../sprites/House1Background';
import FirePlace from '../sprites/FirePlace';
import Door from '../sprites/Door';

export default class extends AbstractGame {
    constructor() {
        super('House3Scene')
        this.path = '/contact';
    }

    addBackground() {
        this.background = new House1Background(this, 1532, 775);
        this.objects.push(new FirePlace(this, 1100, 845));
        this.objects.push(new Door(this, 2050, 844));
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
        const itemsToFade = [this.player, this.background, ...this.objects];
        itemsToFade.forEach(item => {
            item.alpha = 0;
        });
        const duration = "ontouchstart" in document.documentElement ? 0 : 1;
        var tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration } });
        tl.to(this.house, {
            duration,
            x: 500,
        }).to(itemsToFade, {
            duration,
            alpha: 1,
        });
    }
}
