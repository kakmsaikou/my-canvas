const myCanvas = {
  ui: {
    canvas: document.querySelector('#canvas'),
    bigPen: document.querySelector('#big-pen'),
  },
  ctx: undefined,
  painting: false,
  last: undefined,
  events: {
    '.big-pen': ['setPenSize', 20],
    '.normal-pen': ['setPenSize', 10],
    '.small-pen': ['setPenSize', 5],
    '.red-pen': ['setPenColor', '#ed1c24'],
    '.blue-pen': ['setPenColor', '#00a2e8'],
    '.green-pen': ['setPenColor', '#22b14c'],
    '.black-pen': ['setPenColor', 'black'],
    '.pen': ['setPen', undefined],
    '.eraser': ['setEraser', undefined],
    '.clean': ['cleanCanvas', undefined]
  },

  init: () => {
    myCanvas.ctx = myCanvas.ui.canvas.getContext('2d')
    myCanvas.ui.canvas.width = document.documentElement.clientWidth
    myCanvas.ui.canvas.height = document.documentElement.clientHeight
    myCanvas.ctx.lineCap = 'round'

    myCanvas.bindEvent()

    myCanvas.setPen()

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

  bindEvent: () => {
    for (let key in myCanvas.events) {
      if (myCanvas.events.hasOwnProperty(key)) {
        const fn = myCanvas[myCanvas.events[key][0]]
        document.querySelector(key).onclick = () => {
          fn(myCanvas.events[key][1])
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
  },

  setPen: () => {
    myCanvas.setPenColor()
    myCanvas.setPenSize()
  },

  setEraser: () => {
    myCanvas.setPenColor('white')
    myCanvas.setPenSize()
  },

  cleanCanvas: ()=>{
    myCanvas.ctx.clearRect(0,0,myCanvas.ui.canvas.width,myCanvas.ui.canvas.height);
    myCanvas.setPenColor()
    myCanvas.setPenSize()
  }
}

myCanvas.init()