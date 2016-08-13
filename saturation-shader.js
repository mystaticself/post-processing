/**
 * @author mystaticself / http://mystaticself.com
 *
 * saturation shader
 */

THREE.SaturationShader = {

	uniforms: {
		"tDiffuse": { value: null },
		"adjustment": { value: 1.0 },
	},

	vertexShader: [

		"varying vec2 vUv;",

		"void main() {",

			"vUv = uv;",
			"gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",

		"}"

	].join( "\n" ),

	fragmentShader: [

		"uniform sampler2D tDiffuse;",
		"uniform float adjustment;",

		"varying vec2 vUv;",

		"vec3 saturation(vec3 rgb, float adjustment)",
		"{",
		    "const vec3 W = vec3(0.2125, 0.7154, 0.0721);",
		    "vec3 intensity = vec3(dot(rgb, W));",
		    "return mix(intensity, rgb, adjustment);",
		"}",

		"void main() {",

			"vec4 c = texture2D(tDiffuse, vUv);",
			"c.rgb = saturation(c.rgb, adjustment);",
			"gl_FragColor = c;",

		"}"

	].join( "\n" )

};