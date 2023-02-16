/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player';
import { gsap } from "gsap";
import House from '../sprites/House';
import AbstractGame from './AbstractGame';
import House1Background from '../sprites/House1Background';
import Tv from '../sprites/Tv';
import Couch from '../sprites/Couch';
import FirePlace from '../sprites/FirePlace';
import Bed from '../sprites/Bed';
import Tub from '../sprites/Tub';
import Toilet from '../sprites/Toilet';
import Washer from '../sprites/Washer';
import Door from '../sprites/Door';


export default class extends AbstractGame {
    constructor() {
        super('House1Scene')
        this.path = '/software';
    }

    addBackground() {
        this.background = new House1Background(this, 1532, 800);
        this.objects.push(new Couch(this, 680, 870));
        this.objects.push(new Tv(this, 810, 870));
        this.objects.push(new FirePlace(this, 970, 870));
        this.objects.push(new Bed(this, 1200, 870));
        this.objects.push(new Door(this, 1400, 870));
        this.objects.push(new Tub(this, 1510, 870));
        this.objects.push(new Toilet(this, 1650, 865));
        this.objects.push(new Washer(this, 1910, 870));
        this.objects.forEach(item => item.alpha = 0);
    }

    addItems() {
        this.player.x = 500;
        this.player.y = 780;
        this.player.alpha = 0;
        this.background.alpha = 0;
        this.house = new House(this, 500, 870, 1, true);

    }

    fadeIn() {
        var tl = gsap.timeline({ defaults: { ease: "power2.inOut", duration: 1 } });
        tl.to(this.house, {
            duration: .5,
            x: 500,
        }).to([this.player, this.background, ...this.objects], {
            duration: 1,
            alpha: 1,
        });
    }
}
