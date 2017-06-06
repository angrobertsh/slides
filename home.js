document.addEventListener("DOMContentLoaded", () => {
  init();
})

const init = () => {
  const left = document.getElementById("car-left-button");
  const right = document.getElementById("car-right-button");
  const container = document.getElementById("car-content-container");
  const numElements = document.getElementsByClassName("car-content").length;
  let width = document.getElementById("car-content-container").offsetWidth*-1;
  let active = 0;
  let str = "";

  right.addEventListener("click", (e) => {
    if(active >= numElements-1){
      return;
    } else {
      width = document.getElementById("car-content-container").offsetWidth*-1;
      left.style.display = "block";
      active += 1;
      container.style.transform = "translateX(" + (active*width).toString() + "px)";
      if(active === numElements - 1){
        right.style.display = "none";
      }
    }
  })

  left.addEventListener("click", (e) => {
    if(active <= 0){
      return;
    } else {
      width = document.getElementById("car-content-container").offsetWidth*-1;
      right.style.display = "block";
      active -= 1;
      container.style.transform = "translateX(" + (active*width).toString() + "px)";
      if(active === 0){
        left.style.display = "none";
      }
    }
  })

}
