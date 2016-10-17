'use strict'
class Verification {
  constructor() {
    const self = ''
    this.box = document.querySelector('.v-box')
    this.bg =  document.querySelector('.v-bg')
    this.bg.addEventListener('click', this.hideBox)
  }
  start() {
    self = this
    this.addClass(this.box, 'v-show')
    this.removeClass(this.box, 'v-hide')
  }
  hideBox() {
    self.removeClass(self.box, 'v-show')
    self.addClass(self.box, 'v-hide')
  }
  //addClass  实现
  addClass (el, name) {
  // 获取到原有的class
  var list = el.getAttribute('class').split(' ')
  // 添加新的
  var add = true
  // 判断添加的是否存在
  for (var i = 0; i < list.length; i++) {
    if (list[i] === name) {
      add = false
    }
  }
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
  for (var i = 0; i < list.length; i++) {
    if (list[i] === name || list[i] === '') {
      list.splice(i, 1)
    }
  }
  var newList = list.join(' ')
  el.className = newList
  }
}

// function Verification() {
//
// }
//
// Verification.prototype.start = function () {
// }
