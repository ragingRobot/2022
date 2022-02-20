import FirePipeline from './firePipeline';
import DistortionPipeline from './DistortionPipeline';
import SpotlightPipeline from './SpotlightPipeline';
import ColorSpotlightPipeline from './ColorSpotlightPipeline';
class ShaderManager {
    setup(camera, game, player, scene) {
        this.game = game;
        this.camera = camera;
        this.player = player;
        this.pulseSpeed = .0009;
        this.particles = scene.add.particles('blueDot');
        this.circle = new Phaser.Geom.Ellipse(400, 300, 200,200);

        this.emitter = this.particles.createEmitter({
            angle: { min: 0, max: 360, steps: 32 },
            lifespan: 1000,
            speed: 400,
            quantity: 32,
            scale: { start: 1, end: 0 },
            on: false,
            deathZone: { type: 'onLeave', source: this.circle }
        });
/*
        this.emitter2 =this.particles.createEmitter({
            //frame: { frames: [ 'red', 'green', 'blue' ], cycle: true },
            scale: { start: 0.5, end: 0 },
            blendMode: 'ADD',
            on: false,
            emitZone: { type: 'edge', source: this.circle, quantity: 48, yoyo: false }
        });
        */
        this.updatePulse();

        if (!this.firePipeline) {
            this.firePipeline = this.game.renderer.addPipeline('Fire', new FirePipeline(this.game));
        }

        if (!this.distortionPipeline) {
            this.distortionPipeline = this.game.renderer.addPipeline('Distortion', new DistortionPipeline(this.game));
        }
        this.t = 0;
        this.tIncrement = 0.005;

        if (!this.spotlightPipeline) {
            this.spotlightPipeline = this.game.renderer.addPipeline('SpotLight', new SpotlightPipeline(this.game));
            this.spotlightPipeline.setFloat2('resolution', this.game.config.width, this.game.config.height);
            this.spotlightPipeline.setFloat1('r', .2);
        }

        if (!this.colorSpotlightPipeline) {
            this.colorSpotlightPipeline = this.game.renderer.addPipeline('ColorSpotLight', new ColorSpotlightPipeline(this.game));
            this.colorSpotlightPipeline.setFloat2('resolution', this.game.config.width, this.game.config.height);
        }
        //this.colorSpotLight();
    }

    reset() {
        if (this.camera) {
            this.camera.clearRenderToTexture();
            this.game.renderer.clearPipeline();
        }
    }
    checkSetup() {
        return this.game && this.camera && this.player;
    }

    distort(sprite) {
        if (!this.checkSetup()) {
            return;
        }
        if (sprite) {
            sprite.setPipeline('Distortion');
        }
        //this.camera.setRenderToTexture(this.distortionPipeline);
    }

    spotLight() {
        if (!this.checkSetup()) {
            return;
        }

        this.camera.setRenderToTexture(this.spotlightPipeline);
    }

    colorSpotLight(sprite) {
        if (!this.checkSetup()) {
            return;
        }

        if (sprite) {
            sprite.setPipeline('ColorSpotLight');
        }
        //this.camera.setRenderToTexture(this.colorSpotlightPipeline);
    }

    fire(sprite) {
        if (!this.checkSetup()) {
            return;
        }
        if (sprite) {
            sprite.setPipeline('Fire');
        }
    }

    updatePulse(max_life = 3, target) {
        if(this.player.life > this.pulseValue && target){
            this.particles.emitParticleAt(target.x, target.y);
        }

        setTimeout(() => {
            this.max_life = max_life;
            this.pulseValue = this.player.life / 7;
            if (this.player.life === this.max_life) {
                this.pulseValue = this.player.life;
            }
        }, 20);
    }

    pulse(center) {
        var top = center + .01;
        var bottom = center - .01;

        if (this.pulseValue > top || this.pulseValue < bottom) {
            this.pulseSpeed = -this.pulseSpeed;
        }
        this.pulseValue += this.pulseSpeed;
        return this.pulseValue;
    }

    update(player) {
        if (player && player.x && this.camera) {
            this.t += this.tIncrement;
            this.distortionPipeline.setFloat1('time', this.t);
            this.firePipeline.setFloat1('time', this.t);

            const radius = this.player.life === this.max_life ? this.player.life : this.player.life / 7;
            const pulse = this.pulse(radius);
            let y = (this.camera.height - (player.y - this.camera.scrollY));

            this.colorSpotlightPipeline.setFloat1('r', pulse);
            this.colorSpotlightPipeline.setFloat1('tx', (player.x - this.camera.scrollX) / this.game.config.width);
            this.colorSpotlightPipeline.setFloat1('ty', y / this.game.config.height);

            this.circle.width = pulse * 700 * 2;
            this.circle.height = pulse * 500 * 2;
            this.circle.x = player.x;
            this.circle.y = player.y;
        }

    }
}

export default new ShaderManager();