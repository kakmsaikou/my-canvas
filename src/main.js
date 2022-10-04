import ('./iconfont.js')

const mouse = document.querySelector('#mouse')
window.addEventListener('mousemove', function (event) {
  mouse.style.left = event.clientX - mouse.offsetWidth / 2 + 'px'
  mouse.style.top = event.clientY - mouse.offsetHeight / 2 + 'px'
})

function removeMouseClass(className) {
  if (mouse.classList.contains(className)) {mouse.classList.remove(className)}
}

const myCanvas = {
  ui: {
    canvas: document.querySelector('#canvas'),
    others: document.querySelector('.others').children,
    colors: document.querySelector('.pen-color').children
  },
  ctx: undefined,
  painting: false,
  last: undefined,
  events: {
    '.big-pen': ['setPenSize', 'big'],
    '.normal-pen': ['setPenSize', 'normal'],
    '.small-pen': ['setPenSize', 'small'],
    '.red-pen': ['setPenColor', 'red'],
    '.blue-pen': ['setPenColor', 'blue'],
    '.green-pen': ['setPenColor', 'green'],
    '.black-pen': ['setPenColor', 'black'],
    '.pen': ['setPen', undefined],
    '.eraser': ['setEraser', undefined],
    '.clean': ['cleanCanvas', undefined]
  },
  styleList: {
    'black': '#000',
    'red': '#ed1c24',
    'blue': '#00a2e8',
    'green': '#22b14c',
    'white': '#fff',
    'big': 20,
    'normal': 15,
    'small': 10
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
    removeMouseClass('red')
    removeMouseClass('blue')
    removeMouseClass('green')
    removeMouseClass('white')
    mouse.classList.add(color)
    const colors = Array.from(myCanvas.ui.colors)
    const selectedColor = color + '-pen'
    myCanvas.selectStyle(colors, selectedColor)
    myCanvas.ctx.strokeStyle = myCanvas.styleList[color]
  },

  setPenSize: (size = 'normal') => {
    removeMouseClass('big')
    removeMouseClass('normal')
    removeMouseClass('small')
    mouse.classList.add(size)
    myCanvas.ctx.lineWidth = myCanvas.styleList[size]
  },

  setPen: () => {
    const others = Array.from(myCanvas.ui.others)
    myCanvas.selectStyle(others, 'pen')
    myCanvas.setPenColor()
    myCanvas.setPenSize()
  },

  setEraser: () => {
    const others = Array.from(myCanvas.ui.others)
    myCanvas.selectStyle(others, 'eraser')
    myCanvas.setPenColor('white')
    myCanvas.setPenSize()
  },

  cleanCanvas: () => {
    myCanvas.ctx.clearRect(0, 0, myCanvas.ui.canvas.width, myCanvas.ui.canvas.height)
    myCanvas.setPenColor()
    myCanvas.setPenSize()
  },

  selectStyle: (arr, targetClass) => {
    arr.map(i => {
      if (i.classList.contains('selected')) {
        i.classList.remove('selected')
      }
      if (i.classList.contains(targetClass)) {
        i.classList.add('selected')
      }
    })
  }
}

myCanvas.init()