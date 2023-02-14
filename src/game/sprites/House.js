import { gsap } from "gsap";

const HOUSE_ROUTES = {
    "1": "software",
    "2": "art",
    "3": "contact",
    "4": "resume"
}
export default class House extends Phaser.Physics.Matter.Sprite {
    constructor(scene, x, y, houseNumber, isExit) {
        var shapes = scene.cache.json.get('shapes');
        super(scene.matter.world, x, y, 'house' + houseNumber, 0, {
            isSensor: true,
            shape: shapes['house' + houseNumber]
        });
        this.startX = x;
        this.startY = y;
        this.isExit = isExit;
        this.scene = scene;
        this.houseNumber = houseNumber;
        this.isSensor = true;
        scene.add.existing(this);
        this.setStatic(true);
    }

    PlayerAction = () => {
        if (this.isExit) {
            if (this.scene.fadeAway) {
                this.scene.fadeAway(() => {
                    var tl = gsap.timeline({
                        onComplete: () => {
                            this.scene.scene.start('StreetScene', {
                                houseNumber: this.houseNumber, startPosition: {
                                    x: this.startX,
                                    y: this.startY,
                                }
                            });
                            if (window.navigate) {
                                window.navigate("/");
                                window.scrollTo(0, document.body.scrollHeight);
                            }
                        }, defaults: { ease: "power2.inOut", duration: 1 }
                    });
                    tl.to(this, {
                        duration: .5,
                        x: this.startX,
                        y: this.startY,
                    })
                });
            }

            return;
        }
        if (window.navigate) {
            window.navigate(HOUSE_ROUTES[this.houseNumber]);
            window.scrollTo(0, document.body.scrollHeight);
        }
        this.scene.scene.start('House' + this.houseNumber + 'Scene');
    }
}