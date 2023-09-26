class Particle {
  constructor(x, y, size) {
    this.speed = 0.6
    this.x = x
    this.y = y
    this.vx = (Math.random() - 0.5) * this.speed
    this.vy = (Math.random() - 0.5) * this.speed
    this.opacity = 1
    this.size = size
  }
  draw(context) {
    this.opacity -= this.speed / 200
    context.fillStyle = this.color()
    context.fillRect(this.x, this.y, this.size, this.size)
  }
  move() {
    this.x += this.vx
    this.y += this.vy + (1 - this.opacity) * this.speed
  }
  color() {
    return 'rgba(0,255,0 ' + this.opacity + ')'
  }
}

class Laser {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.steps = []
    this.particles = []
  }
  drawTo(x, y, ctx) {
    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.fillStyle = 'red'
    ctx.fillRect(x, y, 5, 5)
  }
  drawEnd(ctx) {
    var p = this.steps.shift()
    if (p !== undefined) {
      this.drawTo(p[0], p[1], ctx)
    } else {
      var index = this.particles.length
      while (index--) {
        var p = this.particles[index]
        p.move()
        if (
          p.opacity < 0 ||
          p.x < 0 ||
          p.x > this.w ||
          p.y < 0 ||
          p.y > this.h
        ) {
          this.particles.splice(index, 1)
        } else {
          p.draw(ctx)
        }
      }
    }
  }
  endFrom(x0, y0) {
    var nrOfSteps = 800
    var i = nrOfSteps
    while (i--) {
      var x =
        this.x + (i * (x0 - this.x)) / nrOfSteps + (Math.cos(i / 10) * i) / 4
      var y =
        this.y + (i * (y0 - this.y)) / nrOfSteps + (Math.sin(i / 10) * i) / 4
      this.steps.push([x, y])
      if (i < 100) {
        this.particles.push(new Particle(this.x, this.y, 2))
      }
    }
  }
}

class LaserWriter {
  constructor(Dom1, Dom2) {
    var canvas = Dom1.value
    var canvas2 = Dom2.value
    this.ctx = canvas.getContext('2d')
    this.ctx2 = canvas2.getContext('2d')
    this.w = canvas.width = canvas2.width = 600
    this.h = canvas.height = canvas2.height = 500
    this.tick = 0
    this.pointsIndex = 0
    this.points = []
    this.particles = []
    this.size = 3
    this.startX = 0
    this.laserStart = { x: 300, y: 50 }
    this.x = 0
    this.y = 0
  }

  init(text, size) {
    this.ctx.font = size + 'px serif'
    // Draw black text on the canvas temporarily
    this.startX = (this.w - this.ctx.measureText(text).width * 3) * 0.5
    this.ctx.fillText(text, 1, 100)
    var width = 500
    var height = 300
    var image = this.ctx.getImageData(0, 0, width, height)
    var buffer32 = new Uint32Array(image.data.buffer)
    for (var x = 0; x < width; x++) {
      for (var y = 0; y < height; y++) {
        // The buffer is linear, y*w+x is a trick
        // to calculate the linear index.
        if (buffer32[y * width + x]) {
          // There is a pixel here, add a point
          this.points.push([x, y])
        }
      }
    }
    this.ctx.clearRect(0, 0, this.w, this.h)
    this.ctx.fillStyle = 'rgba(4, 210, 246, 0.34)'
    this.ctx2.strokeStyle = 'rgba(20, 255, 70, 1)'
    this.ctx2.lineCap = 'round'
    this.ctx2.lineWidth = 4

    this.laser = new Laser(this.laserStart.x, this.laserStart.y)
  }
  draw() {
    this.ctx2.clearRect(0, 0, this.w, this.h)
    if (this.pointsIndex < this.points.length) {
      var p = this.points[this.pointsIndex]
      this.x = p[0] * this.size + this.startX
      this.y = p[1] * this.size + 80
      this.drawPointAt(this.x, this.y)
      this.laser.drawTo(this.x, this.y, this.ctx2)
      if (this.tick % 2 === 0) {
        var particle = new Particle(this.x, this.y, this.size)
        this.particles.push(particle)
      }
    } else if (this.pointsIndex === this.points.length) {
      this.laser.endFrom(this.x, this.y)
    } else {
      this.laser.drawEnd(this.ctx2)
    }

    this.drawParticles()

    this.pointsIndex++
    this.tick++

    if (this.pointsIndex < this.points.length + 10000) {
      // Draw three steps (ticks) then redraw screen
      if (this.tick % 3 === 0) {
        requestAnimationFrame(() => this.draw())
      } else {
        this.draw()
      }
    }
  }

  drawPointAt(x, y) {
    this.ctx.beginPath()
    this.ctx.arc(x, y, this.size * 2, 0, Math.PI * 2, false)
    this.ctx.fill()
  }
  drawParticles() {
    var index = this.particles.length
    while (index--) {
      var p = this.particles[index]
      p.move()
      if (p.opacity < 0 || p.x < 0 || p.x > this.w || p.y < 0 || p.y > this.h) {
        this.particles.splice(index, 1)
      } else {
        p.draw(this.ctx2)
      }
    }
  }
}

export default LaserWriter