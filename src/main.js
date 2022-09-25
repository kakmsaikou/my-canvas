const myCanvas = {
  ui: {
    canvas: document.querySelector('#canvas'),
    bigPen: document.querySelector('#big-pen'),
    normalPen: document.querySelector('#normal-pen'),
    smallPen: document.querySelector('#small-pen')
  },
  ctx: undefined,
  painting: false,
  last: undefined,

  init: () => {
    myCanvas.ctx = myCanvas.ui.canvas.getContext('2d')
    myCanvas.ui.canvas.width = document.documentElement.clientWidth
    myCanvas.ui.canvas.height = document.documentElement.clientHeight
    myCanvas.ctx.lineCap = 'round'

    myCanvas.setPenSize()
    myCanvas.setPenColor('blue')

    if (!matchMedia('(pointer:fine)').matches) {
      myCanvas.ui.canvas.ontouchstart = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        myCanvas.last = [x, y]
      }

      myCanvas.ui.canvas.ontouchmove = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        myCanvas.drawLine(myCanvas.last[0], myCanvas.last[1], x, y)
        myCanvas.last = [x, y]
      }
    } else {
      myCanvas.ui.canvas.onmousedown = (e) => {
        myCanvas.painting = true
        myCanvas.last = [e.clientX, e.clientY]
      }

      myCanvas.ui.canvas.onmouseup = () => {
        myCanvas.painting = false
      }

      myCanvas.ui.canvas.onmousemove = (e) => {
        if (myCanvas.painting) {
          myCanvas.drawLine(myCanvas.last[0], myCanvas.last[1], e.clientX, e.clientY)
          myCanvas.last = [e.clientX, e.clientY]
        }
      }
    }
  },

  drawLine: (x1, y1, x2, y2) => {
    myCanvas.ctx.beginPath()
    myCanvas.ctx.moveTo(x1, y1)
    myCanvas.ctx.lineTo(x2, y2)
    myCanvas.ctx.stroke()
  },

  setPenColor: (color = 'black') => {
    myCanvas.ctx.strokeStyle = color
  },

  setPenSize: (size = 10) => {
    myCanvas.ctx.lineWidth = size
  }
}

myCanvas.init()

// const bigPen = document.querySelector('#big-pen')
// const normalPen = document.querySelector('#normal-pen')
// const smallPen = document.querySelector('#small-pen')