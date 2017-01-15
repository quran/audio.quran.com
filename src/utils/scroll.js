const keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(evemt = window.event) {
  if (evemt.preventDefault) {
    evemt.preventDefault();
  }
  evemt.returnValue = false;
}

function preventDefaultForScrollKeys(evemt) {
  if (keys[evemt.keyCode]) {
    preventDefault(evemt);
    return false;
  }
}

export function disableScroll() {
  if (window.addEventListener) {
    window.addEventListener('DOMMouseScroll', preventDefault, false);
  }
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove = preventDefault; // mobile
  document.onkeydown = preventDefaultForScrollKeys;
}

export function enableScroll() {
  if (window.removeEventListener) {
    window.removeEventListener('DOMMouseScroll', preventDefault, false);
  }
  window.onmousewheel = document.onmousewheel = null;
  window.onwheel = null;
  window.ontouchmove = null;
  document.onkeydown = null;
}
