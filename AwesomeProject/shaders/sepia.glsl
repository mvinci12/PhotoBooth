precision highp float;

varying vec2 uv;

uniform sampler2D texture;

void main() {
  vec4 color = texture2D(texture, uv);
  vec4 sepia = vec4(
    dot(color.rgb, vec3(0.393, 0.769, 0.189)),
    dot(color.rgb, vec3(0.349, 0.686, 0.168)),
    dot(color.rgb, vec3(0.272, 0.534, 0.131)),
    color.a
  );
  gl_FragColor = sepia;
}
