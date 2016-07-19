'use strict'

 class CalendarDate {
   // 初始化执行函数
   constructor (dom) {
     this.dom = dom
     // calendar 表示日历还没有创建
     this.calendar = false
     this.dis = false
   }
   // 开始
   start () {
     var that = this
     var inputbox = this.createEl('div')
     inputbox.className = 'inputbox'
     var input = this.createEl('input')
     input.className = 'calendarDate'
     input.setAttribute('placeholder', '点击选择时间')
     var i = this.createEl('i')
     i.className = 'fa fa-calendar'
     i.setAttribute('aria-hidden', true)
     inputbox.appendChild(input)
     inputbox.appendChild(i)
     this.dom.appendChild(inputbox)
     this.query('.inputbox', true).addEventListener('click', function () {
       if (!that.calendar && !that.dis) {
         that.create()
       } else if (that.dis) {
         that.hide(that.query('.calendar', true))
         that.dis = false
       } else {
         that.show(that.query('.calendar', true))
         that.dis = true
       }
     })
   }

   // 创建日历
   create () {
     this.calendar = true
     this.dis = true
     var pickes = this.createEl('div')
     pickes.className = 'calendar'
     var left = this.createEl('div')
     left.className = 'left'
     var right = this.createEl('div')
     right.className = 'right'
     pickes.appendChild(left)
     pickes.appendChild(right)
     this.dom.appendChild(pickes)
   }

   // 自己封装选择器
   query (x, s) {
     return s ?  document.querySelector(x) : document.querySelectorAll(x)
   }

   // 创建节点
   createEl (el) {
     return document.createElement(el)
   }

   //addClass  实现
   addClass (el, name) {
     // 获取到原有的class
     var list = el.getAttribute('class').split('')
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
     var list = el.getAttribute('class').split('')
     // 对比如果有一样的删除
     for (var i = 0; i < list.length; i++) {
       if (list[i] === name || list[i] === '') {
         list.splice(i, 1)
       }
     }
     var newList = list.join(' ')
     el.className = newList
   }

   hide (el) {
      el.style.display = 'none'
   }

   show (el) {
     el.style.display = ''
   }

 }
