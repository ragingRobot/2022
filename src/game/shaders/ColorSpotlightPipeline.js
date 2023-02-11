var ColorSpotlightPipeline = new Phaser.Class({

    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

    initialize:

    function ColorSpotlightPipeline (game)
    {
        Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
            game: game,
            renderer: game.renderer,
            fragShader:`
                precision mediump float;
                uniform vec2  resolution;
                uniform float tx;
                uniform float ty;
                uniform float r;
                uniform sampler2D uMainSampler;
                varying vec2 outTexCoord;
                vec4 makeCircle(vec2 st,vec2 center){
                    float d = distance(st,center);
                    vec4 samplecolor = texture2D(uMainSampler, outTexCoord);

                    if (d > r) {
                        float gray = dot(samplecolor.rgb, vec3(0.299, 0.587, 0.114));
                        return vec4(vec3(gray), samplecolor.w);
                    }
                    return samplecolor;
                } 
                void main(void) {
                        // st is the normalized position of the pixel in the scene
                    vec2 st = vec2(gl_FragCoord.x/resolution.x,gl_FragCoord.y/resolution.y);

                    gl_FragColor = makeCircle(st,vec2(tx,ty));
                }`
        });
    } 
});

export default ColorSpotlightPipeline;