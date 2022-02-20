var DistortionPipeline = new Phaser.Class({

    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

    initialize:

    function DistortionPipeline (game)
    {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader:`
                precision mediump float;
                uniform float     time;
                uniform vec2      resolution;
                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;
                
                void main( void ) {
                    vec2 uv = outTexCoord;
                    uv.y += (sin((uv.x + (time * 5.0)) * 2.0) * 0.03) + (sin((uv.x + (time * 0.2)) * 10.0) * 0.01);
                    uv.x += (sin((uv.y + (time * 0.5)) * 2.0) * 0.03) + (sin((uv.y + (time * 0.2)) * 5.0) * 0.01);
                    vec4 texColor = texture2D(uMainSampler, uv);
                    gl_FragColor = texColor;
                }`
        });
    } 
});

export default DistortionPipeline;