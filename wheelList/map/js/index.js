'use strict'
var query = function (i) {
  return document.querySelector(i)
}
// 百度地图API功能
function G(id) {
  return document.getElementById(id);
}

var map = new BMap.Map("l-map");
map.centerAndZoom('杭州', 12);
// 添加带有定位的导航控件
var navigationControl = new BMap.NavigationControl({
  // 靠左上角位置
  anchor: BMAP_ANCHOR_TOP_LEFT,
  // LARGE类型
  type: BMAP_NAVIGATION_CONTROL_LARGE,
  // 启用显示定位
  enableGeolocation: true
});
map.addControl(navigationControl);
// 添加定位控件
var geolocationControl = new BMap.GeolocationControl();
geolocationControl.addEventListener("locationSuccess",
function(e) {
  // 定位成功事件
  var address = '';
  address += e.addressComponent.province;
  address += e.addressComponent.city;
  address += e.addressComponent.district;
  address += e.addressComponent.street;
  address += e.addressComponent.streetNumber;
  console.log("当前定位地址为：" + address);
});
geolocationControl.addEventListener("locationError",
function(e) {
  // 定位失败事件
  alert(e.message);
});
map.addControl(geolocationControl);
var ac = new BMap.Autocomplete( //建立一个自动完成的对象
{
  "input": "suggestId",
  "location": map
});

ac.addEventListener("onhighlight",
function(e) { //鼠标放在下拉列表上的事件
  var str = "";
  var _value = e.fromitem.value;
  var value = "";
  if (e.fromitem.index > -1) {
    value = _value.province + _value.city + _value.district + _value.street + _value.business;
  }
  str = "FromItem<br />index = " + e.fromitem.index + "<br />value = " + value;

  value = "";
  if (e.toitem.index > -1) {
    _value = e.toitem.value;
    value = _value.province + _value.city + _value.district + _value.street + _value.business;
  }
  str += "<br />ToItem<br />index = " + e.toitem.index + "<br />value = " + value;
  G("searchResultPanel").innerHTML = str;
});

var myValue;
ac.addEventListener("onconfirm",
function(e) { //鼠标点击下拉列表后的事件
  var _value = e.item.value;
  myValue = _value.province + _value.city + _value.district + _value.street + _value.business;
  G("searchResultPanel").innerHTML = "onconfirm<br />index = " + e.item.index + "<br />myValue = " + myValue;

  setPlace();
});

function setPlace() {
  map.clearOverlays(); //清除地图上所有覆盖物
  function myFun() {
    var pp = local.getResults().getPoi(0).point; //获取第一个智能搜索的结果
    map.centerAndZoom(pp, 18);
    map.addOverlay(new BMap.Marker(pp)); //添加标注
  }
  var local = new BMap.LocalSearch(map, { //智能搜索
    onSearchComplete: myFun
  });
  local.search(myValue);
}

function showInfo(e){
	// console.log(e.point.lng, e.point.lat)
  var point = new BMap.Point(e.point.lng, e.point.lat);
  var pt = e.point;
  var geoc = new BMap.Geocoder();
  geoc.getLocation(pt, function(rs){
    var addComp = rs.addressComponents;
    var adress = addComp.province + addComp.city  + addComp.district  + addComp.street + addComp.streetNumber;
    query('#suggestId').value = adress
  });
}
// 地图点击事件
map.addEventListener("click", showInfo);

// 文本框输入情况
query('#demand').addEventListener('keyup', showDemand)
function showDemand() {
  query('.demand-now').innerHTML = query('#demand').value.length
}
