document.addEventListener("DOMContentLoaded", function() {
  init();
})

function init() {
  var left = document.getElementById("car-left-button");
  var right = document.getElementById("car-right-button");
  var howSo = document.getElementById("how-so");
  var reasons = document.getElementById("reasons");
  var container = document.getElementById("car-content-container");
  var numElements = document.getElementsByClassName("car-content").length;
  var width;
  var active = 0;
  var str = "";

  right.addEventListener("click", function(e) {
    right.classList.remove("slow-bounce");
    if(active >= numElements-1){
      return;
    } else {
      width = document.getElementById("car-content-container").offsetWidth*-1;
      left.classList.add("block");
      left.classList.remove("none");
      active += 1;
      container.style.transform = "translateX(" + (active*width).toString() + "px)";
      if(active === numElements - 1){
        right.classList.add("none");
      }
    }
  })

  left.addEventListener("click", function(e) {
    if(active <= 0){
      return;
    } else {
      width = document.getElementById("car-content-container").offsetWidth*-1;
      right.classList.add("block");
      right.classList.remove("none");
      active -= 1;
      container.style.transform = "translateX(" + (active*width).toString() + "px)";
      if(active === 0){
        left.classList.add("none");
      }
    }
  })

  howSo.addEventListener("click", function(e) {
    e.currentTarget.innerHTML = "What else?";
    debugger
    reasons.innerHTML = REASONS[Math.floor(Math.random() * REASONS.length)];
  })

}

var REASONS = [
  "I grew up in and love the bay area.",
  "I know modern, relevant web technologies.",
  "I'm aligned with KQED's mission to illuminate and educate our world.",
  "I bake great cookies.",
  "I like KQED's engineering team.",
  "I'm not afraid to work hard.",
  "I have an eye for product.",

]
