'use strict'

 class CalendarDate {
   // 初始化执行函数
   constructor (dom) {
     this.dom = dom
     // calendar 表示日历还没有创建
     this.calendar = false
     this.dis = false
     this.date = new Date()
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
     // 获取当前时间对象
     var calendarDate = {}
     var weeks = ['一', '二', '三', '四', '五', '六', '日']
     calendarDate.year = this.date.getFullYear()
     calendarDate.month = this.date.getUTCMonth() + 1
     calendarDate.day = this.date.getDate()
     calendarDate.week = weeks[this.date.getDay() - 1]
     // 左边绘制时间
     this.justLeft(calendarDate, left)
   }

   //左边最初
   justLeft (date, left) {
     var showYear = this.createEl('a')
     showYear.innerHTML = date.year
     showYear.className = 'show-year'
     left.appendChild(showYear)

     var showWeek = this.createEl('a')
     showWeek.innerHTML = '星期' + date.week
     showWeek.className = 'show-week'
     left.appendChild(showWeek)

     var showDay = this.createEl('a')
     showDay.innerHTML = date.month + '月' + date.day + '日'
     showDay.className = 'show-day'
     left.appendChild(showDay)
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
