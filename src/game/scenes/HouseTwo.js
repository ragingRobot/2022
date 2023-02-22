/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player';
import { gsap } from "gsap";
import House from '../sprites/House';
import AbstractGame from './AbstractGame';
import House1Background from '../sprites/House1Background';
import Key from '../sprites/Key';
import Controller from '../Controller';


export default class extends AbstractGame {
    constructor() {
        super('House2Scene')
        this.path = '/art';
    }

    addBackground() {
        this.background = new House1Background(this, 1532, 800);
    }

    addItems() {
        this.player.x = 600;
        this.player.y = 780;
        this.player.alpha = 0;
        this.background.alpha = 0;
        this.house = new House(this, 900, 850, 2, true);

        if(!Controller.hasKey){
            const key = new Key(this, 2000, 900);
            key.alpha = 0;
            this.objects.push(key);
        }
        const event = new Event("animationComplete");
        window.dispatchEvent(event);
    }

    fadeIn() {
        var tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 1 } });
        tl.to(this.house, {
            duration: 1,
            x: 500,
        }).to([this.player, this.background, ...this.objects], {
            duration: 1,
            alpha: 1,
        });
    }
}
