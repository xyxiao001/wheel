// 首先获取到所有要展示的的图片
class carousel {
  constructor () {
    this.shows = document.querySelectorAll('.carousel-show a')
    this.id = 0
  }
  start () {
    // 取得外层容器
    var self = this
    this.carouselShow = document.querySelector('.carousel-show')
    this.carouselW = window.getComputedStyle(this.carouselShow).width
    var carouselH = window.getComputedStyle(this.carouselShow).height
    this.carouselW = this.carouselW.replace('px', '')
    this.carouselShow.style.width = this.carouselW * (this.shows.length + 2) + 'px'
    // 创建副本
    var one  = this.shows[0].cloneNode(true)
    var two = this.shows[1].cloneNode(true)
    document.querySelector('.carousel-show').appendChild(one)
    document.querySelector('.carousel-show').appendChild(two)
    document.querySelectorAll('.carousel-show a').forEach(function (show) {
      show.style.width = self.carouselW + 'px'
      show.style.height = carouselH
      show.addEventListener('mouseover', function () {
        self.stop()
      })
      show.addEventListener('mouseout', function () {
        self.timeOut = setInterval(go, 1500)
      })
    })
    // 定时器函数
    function go() {
      //改变translate3d
      self.carouselShow.style.transitionDuration = '1500ms'
      if (self.id > self.shows.length) {
        self.id = 0
        self.carouselShow.style.transitionDuration = '0ms'
      }
      self.carouselShow.style.webkitTransform = 'translate3d(' + -(self.carouselW * self.id) + 'px, 0px, 0px)'
      self.id = self.id + 1
    }
    this.timeOut = setInterval(go, 1500)
  }

  //停止定时器
  stop () {
    window.clearInterval(this.timeOut)
  }
}
