precision mediump float;

attribute vec3 vertPosition;
varying vec2 fragTexCoord;
uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main()
{
  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}