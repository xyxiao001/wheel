'use stricts';
//拖动函数
function tuo(el) {
  var mousex, mousey, marginLeft;
  var move = function () {
    marginLeft = marginLeft.replace('px', '')
    el.style.left = event.x - mousex - marginLeft + 'px';
    el.style.top = event.y - mousey + 'px';
  };
  el.addEventListener('mousedown', function () {
    el.style.transitionDuration = '0ms'
    mousex = event.x - el.offsetLeft;
    mousey = event.y - el.offsetTop;
    marginLeft = window.getComputedStyle(el).marginLeft
    document.addEventListener('mousemove', move);
  });
  el.addEventListener('mouseup', function () {
    document.removeEventListener("mousemove", move, false);
  });
};
