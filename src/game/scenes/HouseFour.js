/* globals __DEV__ */
import Phaser from 'phaser'
import Player from '../sprites/Player';
import { gsap } from "gsap";
import House from '../sprites/House';
import Ghost from '../sprites/Ghost';
import AbstractGame from './AbstractGame';
import House4Background from '../sprites/House4Background';
import Chest from '../sprites/Chest';
import Table from '../sprites/Table';
import FancyBed from '../sprites/FancyBed';
import FancyCouch from '../sprites/FancyCouch';
import FancyChair from '../sprites/FancyChair';
import BookShelf from '../sprites/BookShelf';


export default class extends AbstractGame {
    constructor() {
        super('House4Scene')
        this.path = '/resume';
    }

    addBackground() {
        this.background = new House4Background(this, 1400, 450);
        this.objects.push(this.add.sprite(1000, 510, 'gamesprites', 'House4sprites-14.png'));
        this.objects.push(this.add.sprite(1300, 500, 'gamesprites', 'House4sprites-13.png'));
        this.objects.push(new Table(this, 1200, 790));
        this.objects.push(new FancyBed(this, 2050, 885));
        this.objects.push(new FancyCouch(this, 1050, 960));
        this.objects.push(new FancyChair(this, 1650, 690));
        this.objects.push(new BookShelf(this, 2050, 460));
    }

    addItems() {
        this.ghost = new Ghost(this, 1000, 600);
        this.ghost.alpha = 0;
        this.player.x = 600;
        this.player.y = 780;
        this.player.alpha = 0;
        this.background.alpha = 0;
        this.house = new House(this, 1960, 420, 4, true);
        const chest = new Chest(this,1700, 410);
        chest.alpha = 0;
        this.objects.push(chest);

        const event = new Event("animationComplete");
        window.dispatchEvent(event);
    }

    fadeIn() {
        this.objects.forEach((item)=> {
            item.alpha = 0;
        });
        const duration = "ontouchstart" in document.documentElement ? 0 : 1;
        var tl = gsap.timeline({
            defaults: { ease: "power2.inOut", duration }
        });
        tl.to(this.house, {
            duration,
            x: 460,
            y: 800,
        }).to([this.player, this.background, this.ghost, ...this.objects], {
            duration,
            alpha: 1,
        });
    }


    fadeAway(callBack) {
        gsap.timeline().to([this.ghost], {
            duration: .2,
            alpha: 0,
        });
        super.fadeAway(callBack);
    }
}
