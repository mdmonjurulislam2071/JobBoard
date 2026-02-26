"use client"
import { useEffect, useRef } from "react"

function cn(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function FirefliesBackground({
  className,
  children,
  count = 40,
  color = "rgba(255,255,150,1)",
  speed = 1,
  glowIntensity = 1,
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let rect = container.getBoundingClientRect()
    let width = rect.width
    let height = rect.height
    canvas.width = width
    canvas.height = height

    let tick = 0
    let animationId

    const noise = (x, y, t) => {
      return (
        Math.sin(x * 0.01 + t) * 0.5 +
        Math.sin(y * 0.013 + t * 1.1) * 0.5 +
        Math.sin((x + y) * 0.007 + t * 0.9) * 0.3
      )
    }

    const createFirefly = () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: 2 + Math.random() * 2,
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.02 + Math.random() * 0.03,
      noiseOffsetX: Math.random() * 1000,
      noiseOffsetY: Math.random() * 1000,
      noiseSpeed: 0.3 + Math.random() * 0.4,
      depth: 0.3 + Math.random() * 0.7,
    })

    const fireflies = Array.from({ length: count }, createFirefly)

    const parseColor = (c) => {
      const match = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
      if (match) {
        return { r: +match[1], g: +match[2], b: +match[3] }
      }
      return { r: 255, g: 255, b: 150 }
    }

    const rgb = parseColor(color)

    const handleResize = () => {
      rect = container.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width
      canvas.height = height
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    const animate = () => {
      tick += speed
      ctx.fillStyle = "rgba(5,10,20,0.15)"
      ctx.fillRect(0, 0, width, height)

      for (const f of fireflies) {
        const nx = noise(f.noiseOffsetX, f.noiseOffsetY, tick * 0.01 * f.noiseSpeed)
        const ny = noise(f.noiseOffsetY, f.noiseOffsetX, tick * 0.01 * f.noiseSpeed + 100)

        f.x += nx * f.depth * speed * 0.5
        f.y += ny * f.depth * speed * 0.5

        if (f.x < -20) f.x = width + 20
        if (f.x > width + 20) f.x = -20
        if (f.y < -20) f.y = height + 20
        if (f.y > height + 20) f.y = -20

        const pulse = Math.sin(tick * f.pulseSpeed * speed + f.phase)
        const brightness = Math.max(0, pulse * 1.5 - 0.3)
        if (brightness <= 0) continue

        const size = f.size * f.depth * (0.8 + brightness * 0.2)
        const alpha = brightness * f.depth

        const glowRadius = size * (4 + brightness * 4) * glowIntensity
        const gradient = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, glowRadius)

        gradient.addColorStop(0, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.9})`)
        gradient.addColorStop(0.1, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.6})`)
        gradient.addColorStop(0.4, `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha * 0.2})`)
        gradient.addColorStop(1, `rgba(${rgb.r},${rgb.g},${rgb.b},0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(f.x, f.y, glowRadius, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(255,255,255,${alpha * 0.8})`
        ctx.beginPath()
        ctx.arc(f.x, f.y, size * 0.5, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${alpha})`
        ctx.beginPath()
        ctx.arc(f.x, f.y, size, 0, Math.PI * 2)
        ctx.fill()
      }

      animationId = requestAnimationFrame(animate)
    }

    ctx.fillStyle = "#050a14"
    ctx.fillRect(0, 0, width, height)
    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
      ro.disconnect()
    }
  }, [count, color, speed, glowIntensity])

  return (
    <div
      ref={containerRef}
      className={cn("fixed inset-0 overflow-hidden", className)}
      style={{
        background: "linear-gradient(to bottom,#050a14 0%,#0a1428 50%,#051020 100%)",
      }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      {children && <div className="relative z-10 h-full w-full">{children}</div>}
    </div>
  )
}

export default FirefliesBackground