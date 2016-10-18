'use strict'
class Verification {
  constructor() {
    const self = ''
    this.left = 5
    this.group = document.querySelector('.v-group')
    this.bg = document.querySelector('.v-bg')
    this.control = document.querySelector('.s-control')
    this.text = document.querySelector('.s-text')
    this.bg.addEventListener('click', this.hideBox)
    document.querySelector('.v-closed').addEventListener('click', this.hideBox)
    this.control.addEventListener('mousedown', this.go)
    document.querySelector('body').addEventListener('mouseup', this.leave)
  }
  start() {
    self = this
    this.addClass(this.group, 'v-show')
    this.removeClass(this.group, 'v-hide')
  }
  hideBox() {
    self.removeClass(self.group, 'v-show')
    self.addClass(self.group, 'a-hide')
    document.querySelector('.a-hide').addEventListener('animationend', self.animateHide)
  }
  // 消失动画
  animateHide () {
    document.querySelector('.a-hide').removeEventListener('animationend', self.animateHide)
    self.removeClass(self.group, 'a-hide')
    self.addClass(self.group, 'v-hide')
  }
  // 开始移动函数
  go () {
    self.addClass(self.control, 'v-go')
    self.addClass(self.text, 'fade-out')
    document.querySelector('body').addEventListener('mousemove', self.move)
  }
  // 结束
  leave () {
    self.removeClass(self.control, 'v-go')
    self.removeClass(self.text, 'fade-out')
    document.querySelector('body').removeEventListener('mousemove', self.move)
  }
  // 移动
  move() {
    console.log(1)
  }

  //addClass  实现
  addClass (el, name) {
    // 获取到原有的class
    var list = el.getAttribute('class').split(' ')
    // 添加新的
    var add = true
    // 判断添加的是否存在
    list.forEach(function (val, index) {
      if (list[index] === name) {
        add = false
      }
    })
    if (add) {
      list.push(name)
    }
    var newList = list.join(' ')
    el.className = newList
  }


  //移处class
  removeClass (el, name) {
  // 获取到原有的class
  var list = el.getAttribute('class').split(' ')
  // 对比如果有一样的删除
  list.forEach(function (val, index) {
    if (list[index] === name || list[index] === '') {
      list.splice(index, 1)
    }
  })
  var newList = list.join(' ')
  el.className = newList
  }
}
