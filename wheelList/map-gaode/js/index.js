'use strict'
//地图加载
var map = new AMap.Map("l-map", {
    resizeEnable: true
});
// 保存经度纬度
var lnglatXY;
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

var marker;
map.on('click', function(e) {
    // alert('您在[ '+ e.lnglat.getLng()+','+ e.lnglat.getLat() +' ]的位置点击了地图！');
    lnglatXY = [e.lnglat.getLng(), e.lnglat.getLat()];
    var geocoder = new AMap.Geocoder({});
    //地理编码,返回地理编码结果
    geocoder.getAddress(lnglatXY, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          query('#suggestId').value = result.regeocode.formattedAddress
        }
    });
    if (marker !== undefined) {
      marker.hide()
    }
    marker = new AMap.Marker({  //加点
        map: map,
        draggable: false, // 是否可以拖拽,
        position: lnglatXY
    });
    map.setFitView();
});

// 表单校验
var query = function (i) {
  return document.querySelector(i);
}
// 文本框输入情况
query('#demand').addEventListener('keyup', showDemand);
function showDemand() {
  query('.demand-now').innerHTML = query('#demand').value.length;
}

query('#submit').addEventListener('click', submit);
var msg = 'error'
function submit() {
  // 表单提交
  if(rule()) {
    query('.weui-toptips_warn').style.display = "block"
    query('.weui-toptips_warn').innerHTML = msg
    setTimeout(function () {
      query('.weui-toptips_warn').style.display = "none"
    }, 1000)
  }
}

// 校验规则
function rule() {
  var adress = query('#suggestId').value.replace(/(^\s*)|(\s*$)/g, '')
  var name = query('#name').value.replace(/(^\s*)|(\s*$)/g, '')
  var phone = query('#phone').value.replace(/(^\s*)|(\s*$)/g, '')
  var demand = query('#demand').value.replace(/(^\s*)|(\s*$)/g, '')
  if (adress.length === 0) {
    msg = '地址不能为空'
    return true
  }
  if (name.length === 0) {
    msg = '姓名不能为空'
    return true
  }
  if (phone.length === 0) {
    msg = '手机不能为空'
    return true
  } else if (phone.length !== 11) {
    msg = '请输入正确的手机号码'
    return true
  }
  if (demand.length === 0) {
    msg = '需求描述不能为空'
    return true
  }
}
