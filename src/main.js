// 获取canvas对象
let canvas = document.getElementById('canvas')

// 获取用户文档（document）的宽高，设置canvas的宽高
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight

// 创建drawing context
let ctx = canvas.getContext('2d')

// 填充颜色
ctx.fillStyle = 'black'

// 设置画笔粗细
ctx.lineWidth = 10

//把画笔末端设为圆形
ctx.lineCap = 'round'

// 设置信号，来判断键鼠下鼠标的点击和弹起状态
let painting = false

// 设置上一次的坐标
let last

// 封装画线函数
function drawLine(x1, y1, x2, y2) {
  ctx.beginPath()
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.stroke()
}

// 检测浏览器是否支持鼠标
if (!matchMedia('(pointer:fine)').matches) {
  // 触屏点击事件
  canvas.ontouchstart = (e) => {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    last = [x, y]
  }

  // 触屏移动事件
  canvas.ontouchmove = (e) => {
    let x = e.touches[0].clientX
    let y = e.touches[0].clientY
    drawLine(last[0], last[1], x, y)
    last = [x, y]
  }
} else {
  canvas.onmousedown = (e) => {
    painting = true
    // 鼠标按下时的位置设为last的初始值
    last = [e.clientX, e.clientY]
  }

  canvas.onmouseup = () => {
    painting = false
  }

  canvas.onmousemove = (e) => {
    if (painting) {
      // 画直线
      drawLine(last[0], last[1], e.clientX, e.clientY)
      last = [e.clientX, e.clientY]
    }
  }
}