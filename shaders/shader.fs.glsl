precision mediump float;

varying vec2 fragTexCoord;
uniform sampler2D sampler;

void main()
{
  //gl_FragColor = texture2D(sampler, fragTexCoord);
  gl_FragColor = vec4(0.0, 0.3, 0.0, 1.0);
}