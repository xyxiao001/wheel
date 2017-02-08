'use strict'
//地图加载
var map = new AMap.Map("l-map", {
    resizeEnable: true
});
//输入提示
var autoOptions = {
    input: "suggestId"
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

map.plugin('AMap.Geolocation', function() {
    var geolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        buttonOffset: new AMap.Pixel(15, 140),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        buttonPosition:'RB'
    });
    map.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
});
//解析定位结果
function onComplete(data) {
    var str=['定位成功'];
    str.push('经度：' + data.position.getLng());
    str.push('纬度：' + data.position.getLat());
    if(data.accuracy){
         str.push('精度：' + data.accuracy + ' 米');
    }//如为IP精确定位结果则没有精度信息
    str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
}
//解析定位错误信息
function onError(data) {
    alert('定位失败');
}

map.on('click', function(e) {
    // alert('您在[ '+ e.lnglat.getLng()+','+ e.lnglat.getLat() +' ]的位置点击了地图！');
    var geocoder = new AMap.Geocoder({
        city: "010", //城市，默认：“全国”
        radius: 1000 //范围，默认：500
    });
    //地理编码,返回地理编码结果
    geocoder.getLocation('北京市海淀区苏州街', function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
            //geocoder_CallBack(result);
        }
    });
});

// 表单校验
var query = function (i) {
  return document.querySelector(i)
}
// 文本框输入情况
query('#demand').addEventListener('keyup', showDemand)
function showDemand() {
  query('.demand-now').innerHTML = query('#demand').value.length
}
