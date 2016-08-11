// 首先获取到所有要展示的的图片
class carousel {
  constructor () {
    this.shows = document.querySelectorAll('.carousel-show a')
    this.id = 1

  }
  start () {
    // 取得外层容器
    var carouselShow = document.querySelector('.carousel-show')
    var carouselW = window.getComputedStyle(carouselShow).width
    carouselW = carouselW.replace('px', '')
    carouselShow.style.width = carouselW * this.shows.length + 'px'
    this.shows.forEach(function (show) {
      show.style.width = carouselW + 'px'
    })
    console.log(carouselShow.style)
    setTimeout(function () {
      //改变translate3d
      carouselShow.style.webkitTransform = 'translate3d(' + -carouselW + 'px, 0px, 0px)'
    }, 1500)
  }
}
