const myCanvas = {
  ui: {
    // 获取canvas对象
    canvas: document.querySelector('#canvas')
  },

  ctx: undefined,

  // 设置信号，来判断键鼠下鼠标的点击和弹起状态
  painting: false,

  // 设置上一次的坐标
  last: undefined,

  init: () => {
    // 创建drawing context
    myCanvas.ctx = myCanvas.ui.canvas.getContext('2d')

    // 获取用户文档（document）的宽高，设置canvas的宽高
    myCanvas.ui.canvas.width = document.documentElement.clientWidth
    myCanvas.ui.canvas.height = document.documentElement.clientHeight

    // 填充颜色
    myCanvas.ctx.fillStyle = 'black'

    // 设置画笔粗细
    myCanvas.ctx.lineWidth = 10

    //把画笔末端设为圆形
    myCanvas.ctx.lineCap = 'round'

    // 检测浏览器是否支持鼠标
    // 绑定画线事件
    if (!matchMedia('(pointer:fine)').matches) {
      // 触屏点击事件
      myCanvas.ui.canvas.ontouchstart = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        myCanvas.last = [x, y]
      }

      // 触屏移动事件
      myCanvas.ui.canvas.ontouchmove = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        myCanvas.drawLine(myCanvas.last[0], myCanvas.last[1], x, y)
        myCanvas.last = [x, y]
      }
    } else {
      myCanvas.ui.canvas.onmousedown = (e) => {
        myCanvas.painting = true
        // 鼠标按下时的位置设为last的初始值
        myCanvas.last = [e.clientX, e.clientY]
      }

      myCanvas.ui.canvas.onmouseup = () => {
        myCanvas.painting = false
      }

      myCanvas.ui.canvas.onmousemove = (e) => {
        if (myCanvas.painting) {
          // 画直线
          myCanvas.drawLine(myCanvas.last[0], myCanvas.last[1], e.clientX, e.clientY)
          myCanvas.last = [e.clientX, e.clientY]
        }
      }
    }
  },

  drawLine: (x1, y1, x2, y2)=>{
    myCanvas.ctx.beginPath()
    myCanvas.ctx.moveTo(x1, y1)
    myCanvas.ctx.lineTo(x2, y2)
    myCanvas.ctx.stroke()
  },
}

myCanvas.init()

// const bigPen = document.querySelector('#big-pen')
// const normalPen = document.querySelector('#normal-pen')
// const smallPen = document.querySelector('#small-pen')
// bigPen.onclick = () => {
//   ctx.lineWidth = 20
// }
// normalPen.onclick = () => {
//   ctx.lineWidth = 10
// }
// smallPen.onclick = ()=>{
//   ctx.lineWidth = 5
// }