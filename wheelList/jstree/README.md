## 来一个无限扩展菜单插件   类似于展开

### 数据格式要求

[https://github.com/xyxiao001/wheel/tree/master/wheelList/jstree/1.png](如图)

{
  {
    name: 手机,
    parentID: 0, //如果是一级菜单  那么parentID 为零
    myId: 1,  // 唯一标示符 primary-key  主键
    son: [
      {
        name: 苹果手机，
        parentID: 1, // 指明属于哪一个菜单栏下
        myId: 2,
        son: [
          {
            name: 苹果手机，
            parentID: 2,
            myId: 3,
          }
        ]
      }
    ]
  }
}
