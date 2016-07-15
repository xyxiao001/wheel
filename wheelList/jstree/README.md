## 来一个无限扩展菜单插件   类似于展开

### 数据格式要求
<pre><code>
var data = [
  {
    name: '手机',
    parentId: 0, //如果是一级菜单  那么parentId 为零
    myId: 1,  // 唯一标示符 primary-key  主键
    son: [
      {
        name: '苹果',
        parentId: 1, // 指明属于哪一个菜单栏下
        myId: 2,
        son: [
          {
            name: 'iphone3GS',
            parentId: 2,
            myId: 3,
          },
          {
            name: 'iphone4',
            parentId: 2,
            myId: 4,
          },
          {
            name: 'iphone4s',
            parentId: 2,
            myId: 5,
          },
          {
            name: 'iphone5',
            parentId: 2,
            myId: 6,
          },
          {
            name: 'iphone5S',
            parentId: 2,
            myId: 7,
          },
          {
            name: 'iphone6',
            parentId: 2,
            myId: 8,
          },
          {
            name: 'iphone6plus',
            parentId: 2,
            myId: 9,
          },
          {
            name: 'iphone6s',
            parentId: 2,
            myId: 10,
          },
          {
            name: 'iphone6splus',
            parentId: 2,
            myId: 11,
          }
        ]
      },
      {
        name: '小米',
        parentId: 1,
        myId: 12,
        son: [
          {
            name: '小米1',
            parentId: 12,
            myId: 13,
          },
          {
            name: '小米2',
            parentId: 12,
            myId: 14,
          }
        ]
      }
    ]
  },
  {
    name: '电脑',
    parentId: 0,
    myId: 1000
  },
  {
    name: '电视机',
    parentId: 0,
    myId: 2000
  },
]
</code></pre>

<code><pre>
  引入jstree
  实例化  var a = new jstree('传入你想要放的dom',  '这个是数据')
  启动   a.start()

</code></pre>
