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
   var that = this
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

   //年份选择
   showYear.addEventListener('click', function () {
     that.hide(showWeek)
     that.hide(showDay)
     if (showYear.innerHTML !== '去选月') {
       showYear.innerHTML = '去选月'
       // 创建年份的东西
       if (that.query('.select-month', true)) {
         that.hide(that.query('.select-month', true))
       }
       that.selectYear(date, left, right)
     } else {
       showYear.innerHTML = '去选年'
       // 创建年份的东西
       if (that.query('.select-year', true)) {
         that.hide(that.query('.select-year', true))
       }
       that.selectMonth(date, left, right)
     }
   })
  }

  // 年份选择
  selectYear (date, left, right) {
    if (!this.query('.select-year', true)) {
      var that = this
      var div = this.createEl('div')
      div.className = 'select-year'
      for (var i = date.year - 1; i < date.year + 10; i++) {
        if (i === date.year - 1) {
          var upC = this.createEl('a')
          var up = this.createEl('i')
          up.className = 'fa fa-chevron-up'
          upC.className = 'year-control'
          upC.appendChild(up)
          div.appendChild(upC)
        } else if (i === date.year + 9) {
          var downC = this.createEl('a')
          var down = this.createEl('i')
          down.className = 'fa fa-chevron-down'
          downC.className = 'year-control'
          downC.appendChild(down)
          div.appendChild(downC)
        } else {
          var a = this.createEl('a')
          a.className = 'year-item'
          a.innerHTML = i
          div.appendChild(a)
          a.addEventListener('click', function () {
            date.year = this.innerHTML
            that.justRight(date, right, left, 'animate')
          })
        }
      }
      left.appendChild(div)

      // 往下年份
      downC.addEventListener('click', function () {
        // Array.of(that.query('.year-item'))[0].forEach(function (val) {
        //   val.innerHTML = parseInt(val.innerHTML) + 9
        // })
        var goDown = that.query('.year-item')
        for (var i = 0; i < goDown.length; i++) {
          goDown[i].innerHTML = parseInt(goDown[i].innerHTML) + 9
        }
      })

      // 网上
      upC.addEventListener('click', function () {
        // Array.of(that.query('.year-item'))[0].forEach(function (val) {
        //   val.innerHTML = parseInt(val.innerHTML) - 9
        // })
        var goUp = that.query('.year-item')
        for (var i = 0; i < goUp.length; i++) {
          goUp[i].innerHTML = parseInt(goUp[i].innerHTML) - 9
        }
      })


      // 年份被点击
      // Array.of(that.query('.year-item'))[0].forEach(function (val) {
        // val.addEventListener('click', function () {
        //   date.year = this.innerHTML
        //   that.justRight(date, right, left, 'animate')
        // })
      // })
    } else {
      this.show(this.query('.select-year', true))
    }
  }

  // 月份选择
  selectMonth (date, left, right) {
    var that = this
    if (!this.query('.select-month', true)) {
      var div = this.createEl('div')
      div.className = 'select-month'
      for (var i = 1; i <= 12; i++) {
        var a = this.createEl('a')
        a.innerHTML = i + '月'
        a.className = 'month-item'
        div.appendChild(a)
      }
      left.appendChild(div)
    } else {
      this.show(this.query('.select-month', true))
    }

    // 月份选择
    // Array.of(that.query('.month-item'))[0].forEach(function (val, index) {
    //   val.addEventListener('click', function () {
        // date.month = index + 1
        // that.justRight(date, right, left, 'animate')
    //   })
    // })
    var goMonth = this.query('.month-item')
    for (var i = 0; i < goMonth.length; i++) {
      goMonth[i].addEventListener('click', function () {
        var value = this.innerHTML
        date.month = value.substring(0, value.length-1)
        that.justRight(date, right, left, 'animate')
      })
    }
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
    // 确定
    ok.addEventListener('click', function () {
      that.hide(that.query('.calendar', true))
      that.dis = false
      that.query('.inputbox>.calendarDate', true).value = date.year + '年' + date.month + '月' + date.day + '日'
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
      date.day = 1
      var news = new Date(date.year + '/' + date.month + '/' + date.day)
      var newWeek = news.getDay()
      if (newWeek === 0) {
        newWeek = 7
      }
      date.week = weeks[newWeek - 1]
      date.Alldays = that.days(date.year, date.month)
      that.justRight(date, right, left, 'right-animate')
      that.justLeft(date, left, right)
    })
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
   table.className = animate ? animate : ''
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
         date.day = parseInt(this.innerHTML)
         var news = new Date(date.year + '/' + date.month + '/' + date.day)
         var newWeek = news.getDay()
         if (newWeek === 0) {
           newWeek = 7
         }
         date.week = weeks[newWeek - 1]
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
