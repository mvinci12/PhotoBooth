precision highp float;

varying vec2 uv;

uniform sampler2D texture;

void main() {
  vec4 color = texture2D(texture, uv);
  float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
  gl_FragColor = vec4(vec3(gray), color.a);
}
