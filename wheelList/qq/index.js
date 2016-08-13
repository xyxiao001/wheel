//拖动函数
function tuo(el) {
  var move = function () {
    el.style.left = event.x - mousex + 'px';
    el.style.top = event.y - mousey + 'px';
  };
  el.addEventListener('mousedown', function () {
    el.style.transitionDuration = '0ms'
    mousex = event.x - el.offsetLeft;
    mousey = event.y - el.offsetTop;
    document.addEventListener('mousemove', move);
  });
  el.addEventListener('mouseup', function () {
    document.removeEventListener("mousemove", move, false);
  });
};
