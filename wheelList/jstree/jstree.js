// 无限扩展菜单栏

//指定容器
'use strict'

// 开始执行

var jstree = function (dom, data) {
  this.dom = dom
  this.data = data
  this.ul = this.ce('ul')
}

//执行数据解析函数
jstree.prototype.start = function () {
  this.create()
  var that = this
  var list = this.queryAll('.jstree-item')
  for (var i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function () {
      var i = this.childNodes[0].childNodes[0]
      var id = this.getAttribute('myId')
      if (i.getAttribute('class') === 'down') {
        i.className = 'up'
        // 关闭
        that.closed(id)
      } else {
        i.className = 'down'
        // 展开
        var sons = []
        for (var j = 0; j < that.queryAll('li').length; j++) {
          if (that.queryAll('.jstree-item')[j].getAttribute('parentId') === id) {
            sons.push(that.queryAll('.jstree-item')[j])
          }
        }
        sons.forEach(function (val) {
          that.show(val)
        })
      }
    })
  }
  // .forEach(function (val) {
}

jstree.prototype.create = function () {
  // 生成一级菜单
  for (var i = 0; i < this.data.length; i++) {
    this.group(this.data[i], false, 1)
  }
  this.ul.className = 'jstree'
  this.dom.appendChild(this.ul)
}


jstree.prototype.query = function (el) {
  return document.querySelector(el)
}

jstree.prototype.queryAll = function (el) {
  return document.querySelectorAll(el)
}

jstree.prototype.ce = function (el) {
  return document.createElement(el)
}

jstree.prototype.group = function (obj ,son, n) {
  var li = this.ce('li')
  var a = this.ce('a')
  var span = this.ce('span')
  span.innerHTML = obj.name
  li.className = 'jstree-item'
  if (obj.son) {
    var i = this.ce('i')
    i.className = 'up'
    a.appendChild(i)
  }
  if (son) {
    var padding = 15 * n + 10
    n += 1
    a.style.paddingLeft = padding + 'px'
    this.hide(li)
  }
  a.appendChild(span)
  li.appendChild(a)
  li.setAttribute('myId', obj.myId)
  li.setAttribute('parentId', obj.parentId)
  this.ul.appendChild(li)
  if (obj.son) {
    for (var i = 0; i < obj.son.length; i++) {
      this.group(obj.son[i], true, n)
    }
  }
}

jstree.prototype.hide = function (el) {
   el.style.display = 'none'
}

jstree.prototype.show = function (el) {
  el.style.display = ''
}


jstree.prototype.closed = function (id) {
  var sons = []
  var that = this
  for (var j = 0; j < that.queryAll('li').length; j++) {
    if (that.queryAll('.jstree-item')[j].getAttribute('parentId') === id) {
      sons.push(that.queryAll('.jstree-item')[j])
      if (that.queryAll('.jstree-item')[j].childNodes[0].childNodes.length >= 2) {
        this.closed(that.queryAll('.jstree-item')[j].getAttribute('myId'))
      }
    }
  }
  sons.forEach(function (val) {
    val.childNodes[0].childNodes[0].setAttribute('class', 'up')
    that.hide(val)
  })
}
