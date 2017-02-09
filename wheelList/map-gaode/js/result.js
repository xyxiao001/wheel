var query = function (i) {
  return document.querySelector(i);
}
//地图加载
var map = new AMap.Map("l-map", {
    resizeEnable: true
});
var lnglatXY = [120.1718859494253,30.264250329885062];
var geocoder = new AMap.Geocoder({});
geocoder.getAddress(lnglatXY, function(status, result) {
    if (status === 'complete' && result.info === 'OK') {
      query('#result-adress').value = result.regeocode.formattedAddress
    }
});

var marker = new AMap.Marker({  //加点
    map: map,
    draggable: false, // 是否可以拖拽,
    position: lnglatXY
});
map.setFitView();

query('#demand').value = '希望知道下城区长庆街道青云街47号现在堵不堵车。。'
// 文本框输入情况
query('#result-text').addEventListener('keyup', showDemand);
function showDemand() {
  query('.result-now').innerHTML = query('#result-text').value.length;
}
