'use strict'
// 地图
//地图加载
var map = new AMap.Map("l-map", {
    resizeEnable: true
});
//输入提示
var autoOptions = {
    input: "tipinput"
};
var auto = new AMap.Autocomplete(autoOptions);
var placeSearch = new AMap.PlaceSearch({
    map: map
});  //构造地点查询类
AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
function select(e) {
    placeSearch.setCity(e.poi.adcode);
    placeSearch.search(e.poi.name);  //关键字查询查询
}


var query = function (i) {
  return document.querySelector(i)
}
// 文本框输入情况
query('#demand').addEventListener('keyup', showDemand)
function showDemand() {
  query('.demand-now').innerHTML = query('#demand').value.length
}
