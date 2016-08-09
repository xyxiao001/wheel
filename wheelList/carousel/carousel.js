// 首先获取到所有要展示的的图片
class carousel {
  constructor() {
    this.imgs = document.querySelectorAll('.carousel-show img')
    // 当前展示index
    this.index = 0
    // 定时器
    var self = this
    this.time = setInterval(function() {
      self.index = self.index + 1
      if (self.index === self.imgs.length) {
        self.index = 0
      }
      self.start()
    }, 3000)
  }
  start () {
    this.imgs.forEach(function (img) {
      img.className = ''
    })
    //默认第一显示
    this.imgs[this.index].className = 'now'
    // 前一个
    if (this.index === 0) {
      this.imgs[this.imgs.length - 1].className = 'pre'
    } else {
      this.imgs[this.index - 1].className = 'pre'
    }
    // 后一个
    if (this.index === this.imgs.length - 1) {
      this.imgs[0].className = 'next'
    } else {
      this.imgs[this.index + 1].className = 'next'
    }
  }
}
