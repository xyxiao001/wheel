'use strict'

class CalendarDate {
  // 初始化执行函数
  constructor (dom) {
    this.dom = dom
    // calendar 表示日历还没有创建
    this.calendar = false
    this.dis = false
    this.date = new Date()
    this.calendarDate = {}
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
    var weeks = ['一', '二', '三', '四', '五', '六', '日']
    this.calendarDate.year = this.date.getFullYear()
    this.calendarDate.month = this.date.getUTCMonth() + 1
    this.calendarDate.day = this.date.getDate()
    this.calendarDate.week = weeks[this.date.getDay() - 1]
    this.calendarDate.Alldays = this.days(this.calendarDate.year, this.calendarDate.month)
    var calendarDate = this.calendarDate
    // 左边绘制时间
    this.justLeft(calendarDate, left, right)
    // 右边开始绘制哦
    this.justRight(calendarDate, right, left)
  }

   //左边最初
  justLeft (date, left, right) {
   left.innerHTML = ''
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

   // 右边最初
  justRight (date, right, left, animate) {
    right.innerHTML = ''
    var that = this
    // 上方控制
    var controle = this.createEl('div')
    // 向左图标 控制月份减一
    var reduce = this.createEl('i')
    // 向右图标 控制月份加一
    var add = this.createEl('i')
    // 显示当前年月
    var now = this.createEl('a')
    controle.className = 'controle'
    reduce.className = 'fa fa-chevron-left go-left'
    reduce.setAttribute('aria-hidden', true)
    add.className = 'fa fa-chevron-right go-right'
    add.setAttribute('aria-hidden', true)
    now.className = 'controle-show'
    now.innerHTML = date.year + '/' +  date.month
    controle.appendChild(reduce)
    controle.appendChild(now)
    controle.appendChild(add)
    right.appendChild(controle)
    // 下面的日历
    this.dateTable(right, date, left, animate)

    // 下方控件
    var footer = this.createEl('div')
    footer.className = 'calendarDate-footer'
    var today = this.createEl('a')
    today.innerHTML = '今天'
    today.className = 'go-today'
    var ok = this.createEl('a')
    ok.innerHTML = '确定'
    ok.className = 'go-time'
    footer.appendChild(today)
    footer.appendChild(ok)
    right.appendChild(footer)
    today.addEventListener('click', function () {
      var now = new Date()
      var weeks = ['一', '二', '三', '四', '五', '六', '日']
      date.year = now.getFullYear()
      date.month = now.getUTCMonth() + 1
      date.day = now.getDate()
      date.week = weeks[now.getDay() - 1]
      date.Alldays = that.days(date.year, date.month)
      that.justRight(date, right, left, 'animate')
      that.justLeft(date, left, right)
    })
    //月份减少
    this.query('.right .go-left', true).addEventListener('click', function () {
      if (date.month > 1) {
        date.month = date.month - 1
        date.Alldays = that.days(date.year, date.month)
      } else {
        date.year = date.year - 1
        date.month = 12
      }
      date.day = 1
      date.Alldays = that.days(date.year, date.month)
      var weeks = ['一', '二', '三', '四', '五', '六', '日']
      var news = new Date(date.year + '/' + date.month + '/' + date.day)
      var newWeek = news.getDay()
      if (newWeek === 0) {
        newWeek = 7
      }
      date.week = weeks[newWeek - 1]
      that.justRight(date, right, left, 'left-animate')
      that.justLeft(date, left, right)
    })

    // 月份增加
    this.query('.right .go-right', true).addEventListener('click', function () {
      if (date.month < 12) {
        date.month = date.month + 1
      } else {
        date.year = date.year + 1
        date.month = 1
      }
      var weeks = ['一', '二', '三', '四', '五', '六', '日']
      var news = new Date(date.year + '/' + date.month + '/' + date.day)
      var newWeek = news.getDay()
      if (newWeek === 0) {
        newWeek = 7
      }
      date.day = 1
      date.week = weeks[newWeek - 1]
      date.Alldays = that.days(date.year, date.month)
      that.justRight(date, right, left, 'right-animate')
      that.justLeft(date, left, right)
    })
    // 绑定其他事件处理
    this.another(date, left, right)
  }

   // 右边的下面日历
  dateTable (right, date, left, animate) {
   var that = this
   var table = this.createEl('table')
   var thead = this.createEl('thead')
   var tr = this.createEl('tr')
   var header = ['一', '二', '三', '四', '五', '六', '日']
   header.forEach(function (val) {
     var th = that.createEl('th')
     th.innerHTML = val
     tr.appendChild(th)
   })
   thead.appendChild(tr)
   table.appendChild(thead)
   table.className = animate
   // 得到第一天是周几
   var tbody = this.createEl('tbody')
   var firstDay = new Date(date.year + "/" +  date.month + "/" + 1).getDay()
   if (firstDay === 0) {
     firstDay = 7
   }
   for (var i = 0; i < date.Alldays + firstDay - 1; i++) {
     var value = i - firstDay + 2
     if (i === 0 || i % 7 === 0) {
       var tr = this.createEl('tr')
     }
     var td = this.createEl('td')
     if (i >= firstDay - 1) {
       var a = this.createEl('a')
       a.innerHTML = value
       if (value === date.day) {
         a.className = 'choose'
       }
       td.appendChild(a)
       a.addEventListener('click', function () {
         var weeks = ['一', '二', '三', '四', '五', '六', '日']
         var news = new Date(date.year + '/' + date.month + '/' + date.day)
         var newWeek = news.getDay()
         if (newWeek === 0) {
           newWeek = 7
         }
         date.week = weeks[newWeek - 1]
         date.day = parseInt(this.innerHTML)
         that.justRight(date, right, left)
         that.justLeft(date, left, right)
       })
     }
     tr.appendChild(td)
     if (i === 0 || i % 7 === 0) {
       tbody.appendChild(tr)
     }
   }
   table.appendChild(tbody)
   right.appendChild(table)
  }

   //返回当前月的天数
  days (year, month) {
   var days = 30
   switch (month) {
     case 1:
     case 3:
     case 5:
     case 7:
     case 8:
     case 10:
       days = 31
       break
     case 2:
       if (year % 4 ===  0 && year % 100 !==  0) {
         days = 29
       } else {
         if (year % 400 === 0) {
           days = 29
         } else {
           days = 28
         }
       }
       break
   }
   return days
  }

  // 很多其他处理事件
  another (date, left, right) {
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
