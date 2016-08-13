/**
 * @author mystaticself / http://mystaticself.com
 *
 * grain shader
 */

THREE.GrainShader = {
    uniforms: {
        "tDiffuse": { type: "t", value: null },
        "intensity":   { type: "f", value: 0.0175 },
        "time":   { type: "f", value: 0 }
    },

    vertexShader: [
        "varying vec2 vUv;",

        "void main() {",

            "vUv = uv;",
            "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

        "}"
    ].join("\n"),

    fragmentShader: [
        "uniform sampler2D tDiffuse;",
        "uniform float intensity;",
        "uniform float time;",

        "varying vec2 vUv;",

        "float rand(vec2 co){",
            "return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);",
        "}",

        "void main() {",
            "vec4 val = texture2D(tDiffuse, vUv);",
            "float r = rand(vUv + time);",
            "val += r < 0.5 ? (r * intensity) : (-r * intensity);",
            "gl_FragColor = val;",
        "}"
    ].join("\n")
};