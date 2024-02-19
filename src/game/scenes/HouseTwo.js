/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player';
import { gsap } from "gsap";
import House from '../sprites/House';
import AbstractGame from './AbstractGame';
import House1Background from '../sprites/House1Background';
import Key from '../sprites/Key';
import Controller from '../Controller';
import Tv from '../sprites/Tv';
import Couch from '../sprites/Couch';
import Bed from '../sprites/Bed';
import Tub from '../sprites/Tub';
import Toilet from '../sprites/Toilet';
import Washer from '../sprites/Washer';
import Door from '../sprites/Door';
import Painting from '../sprites/Painting';
import CoolChair from '../sprites/CoolChair';
import Laser from '../sprites/Laser';
import Saw from '../sprites/Saw';

export default class extends AbstractGame {
    constructor() {
        super('House2Scene')
        this.path = '/art';
    }

    addBackground() {
        this.background = new House1Background(this, 1532, 800);
        this.objects.push(new Door(this, 1750, 870));
        this.objects.push(new Toilet(this, 1910, 865));
        this.objects.push(new Painting(this, 1150, 940));
        this.objects.push(new CoolChair(this, 1350, 1010));
        this.objects.push(new Saw(this, 820, 960));
        this.objects.push(new Laser(this, 1350, 1040));
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
        this.objects.forEach(item => item.alpha = 0);
        const duration = "ontouchstart" in document.documentElement ? 0 : 1;
        var tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration } });
        tl.to(this.house, {
            duration,
            x: 500,
        }).to([this.player, this.background, ...this.objects], {
            duration,
            alpha: 1,
        });
    }
}
