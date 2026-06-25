import { useEffect, useRef, useState } from "react"

// Vertex shader source
const VERTEX_SHADER_SRC = `
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = position * 0.5 + 0.5;
    vUv.y = 1.0 - vUv.y; // Flip Y for WebGL texture coordinates
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

// Fragment shader source
const FRAGMENT_SHADER_SRC = `
  precision mediump float;
  
  varying vec2 vUv;
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform float uHover;
  uniform float uScrollVelo;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uObjectFitCover; // 1.0 for cover, 0.0 for contain

  void main() {
    // 1. Handle Object Fit Cover / Contain in shader
    vec2 uv = vUv;
    if (uObjectFitCover > 0.5) {
      float containerAspect = uResolution.x / uResolution.y;
      float imageAspect = uImageResolution.x / uImageResolution.y;
      vec2 ratio = vec2(
        min(containerAspect / imageAspect, 1.0),
        min(imageAspect / containerAspect, 1.0)
      );
      uv = vec2(
        vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
      );
    }

    // 2. Liquid Ripple effect driven by mouse hover
    vec2 mouseDist = uv - uMouse;
    mouseDist.x *= uResolution.x / uResolution.y; // Correct for aspect ratio
    float dist = length(mouseDist);

    vec2 distortion = vec2(0.0);
    
    // Wave ripple on hover
    if (uHover > 0.001) {
      float wave = sin(dist * 15.0 - uTime * 5.0) * 0.02 * uHover;
      distortion += normalize(mouseDist) * wave * smoothstep(0.4, 0.0, dist);
    }

    // 3. Scroll-driven gelatinous shear (wave-bend)
    // uScrollVelo shifts x coordinate based on y position with a sine wave wave-bend
    float scrollBend = sin(uv.y * 3.14159) * uScrollVelo * 0.12;
    distortion.x += scrollBend;

    // 4. Chromatic Aberration based on hover & scroll velocity
    float shift = 0.003 * (uHover * 0.5 + abs(uScrollVelo) * 1.5);
    
    vec4 colorR = texture2D(uTexture, uv + distortion + vec2(shift, 0.0));
    vec4 colorG = texture2D(uTexture, uv + distortion);
    vec4 colorB = texture2D(uTexture, uv + distortion - vec2(shift, 0.0));
    
    gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, colorG.a);
  }
`

/**
 * WebGLDistortedImage renders an image onto a WebGL canvas with fluid mouse hover
 * distortion, scroll velocity bending, and chromatic aberration.
 *
 * @param {object} props
 * @param {string} props.src - Path to the image.
 * @param {string} props.alt - Alt tag.
 * @param {string} [props.className] - Class name.
 * @param {float} [props.scrollVelocity=0] - Current scroll speed delta.
 * @param {string} [props.objectFit="cover"] - "cover" or "contain".
 */
export function WebGLDistortedImage({
  src,
  alt,
  className,
  scrollVelocity = 0,
  objectFit = "cover"
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  
  // Interpolation targets and current states (for butter smooth animation)
  const stateRef = useRef({
    mouse: { x: 0.5, y: 0.5 },
    targetMouse: { x: 0.5, y: 0.5 },
    hover: 0,
    targetHover: 0,
    scrollVelo: 0,
    targetScrollVelo: 0,
    time: 0,
    imgWidth: 1,
    imgHeight: 1,
    canvasWidth: 1,
    canvasHeight: 1
  })

  const [imageLoaded, setImageLoaded] = useState(false)

  // Track hover state
  const handleMouseEnter = () => {
    stateRef.current.targetHover = 1
  }

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    stateRef.current.targetMouse = { x, y }
  }

  const handleMouseLeave = () => {
    stateRef.current.targetHover = 0
  }

  // Update target scroll velocity when prop changes
  useEffect(() => {
    stateRef.current.targetScrollVelo = scrollVelocity
  }, [scrollVelocity])

  // Setup WebGL Pipeline
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", { alpha: true, antialias: true })
    if (!gl) {
      console.warn("WebGL not supported in this browser.")
      return
    }

    // Compile shaders helper
    const createShader = (type, source) => {
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compiling error:", gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC)
    const fs = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC)
    if (!vs || !fs) return

    // Link Program
    const program = gl.createProgram()
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program))
      return
    }

    gl.useProgram(program)

    // Set up full screen quad geometry
    const vertices = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1
    ])

    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const positionLoc = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

    // Uniform locations
    const uniforms = {
      uTexture: gl.getUniformLocation(program, "uTexture"),
      uMouse: gl.getUniformLocation(program, "uMouse"),
      uHover: gl.getUniformLocation(program, "uHover"),
      uScrollVelo: gl.getUniformLocation(program, "uScrollVelo"),
      uTime: gl.getUniformLocation(program, "uTime"),
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uImageResolution: gl.getUniformLocation(program, "uImageResolution"),
      uObjectFitCover: gl.getUniformLocation(program, "uObjectFitCover")
    }

    // Create and initialize texture
    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    
    // Set texture wrapping and filtering parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    // Fill with a single pixel transparent color first
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      new Uint8Array([0, 0, 0, 0])
    )

    // Load Image
    let image = new Image()
    let isDisposed = false

    image.onload = () => {
      if (isDisposed) return
      stateRef.current.imgWidth = image.naturalWidth || 100
      stateRef.current.imgHeight = image.naturalHeight || 100

      // Re-bind texture and upload image data
      gl.bindTexture(gl.TEXTURE_2D, texture)
      // Enable premultiplied alpha for PNGs with transparency
      gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
      setImageLoaded(true)
    }
    image.src = src

    // Resize handling using ResizeObserver
    const resizeCanvas = () => {
      if (!canvas || !containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      
      // Calculate high-DPI display canvas sizes
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = rect.width
      const height = rect.height
      
      canvas.width = width * dpr
      canvas.height = height * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
      
      stateRef.current.canvasWidth = canvas.width
      stateRef.current.canvasHeight = canvas.height
    }

    const resizeObserver = new ResizeObserver(() => resizeCanvas())
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current)
    }

    // Initial resize call
    resizeCanvas()

    // Render loop
    let animationFrameId
    const lerp = (start, end, amt) => (1 - amt) * start + amt * end

    const render = () => {
      if (isDisposed) return

      const state = stateRef.current

      // Lerp mouse
      state.mouse.x = lerp(state.mouse.x, state.targetMouse.x, 0.1)
      state.mouse.y = lerp(state.mouse.y, state.targetMouse.y, 0.1)

      // Lerp hover
      state.hover = lerp(state.hover, state.targetHover, 0.1)

      // Lerp scroll velocity
      state.scrollVelo = lerp(state.scrollVelo, state.targetScrollVelo, 0.08)

      // Increment time
      state.time += 0.02

      // Clear canvas
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)

      // Bind texture
      gl.bindTexture(gl.TEXTURE_2D, texture)

      // Pass uniforms
      gl.uniform1i(uniforms.uTexture, 0)
      gl.uniform2f(uniforms.uMouse, state.mouse.x, state.mouse.y)
      gl.uniform1f(uniforms.uHover, state.hover)
      gl.uniform1f(uniforms.uScrollVelo, state.scrollVelo)
      gl.uniform1f(uniforms.uTime, state.time)
      gl.uniform2f(uniforms.uResolution, state.canvasWidth, state.canvasHeight)
      gl.uniform2f(uniforms.uImageResolution, state.imgWidth, state.imgHeight)
      gl.uniform1f(uniforms.uObjectFitCover, objectFit === "cover" ? 1.0 : 0.0)

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, 6)

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    // Cleanups
    return () => {
      isDisposed = true
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      
      gl.deleteTexture(texture)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [src, objectFit])

  return (
    <div
      ref={containerRef}
      className={className}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100%",
        height: "100%"
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          pointerEvents: "none" // Canvas sits inside hover listener container
        }}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 bg-white/5 animate-pulse rounded-xl" />
      )}
    </div>
  )
}

export default WebGLDistortedImage;
