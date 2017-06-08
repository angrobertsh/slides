document.addEventListener("DOMContentLoaded", function() {
  init();
  drawSVGs();
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
  var oldVal = 0;
  var val;

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
    var rand = Math.random();
    if(rand < .75){
      val = Math.floor(Math.random() * REASONS_IMPORTANT.length);
      while(val === oldVal){
        val = Math.floor(Math.random() * REASONS_IMPORTANT.length);
      }
      reasons.innerHTML = REASONS_IMPORTANT[val]
      oldVal = val;
    } else {
      val = Math.floor(Math.random() * REASONS.length);
      while(val === oldVal){
        val = Math.floor(Math.random() * REASONS.length);
      }
      reasons.innerHTML = REASONS[val]
      oldVal = val;
    }
  })

  window.addEventListener("resize", function(e){
    width = document.getElementById("car-content-container").offsetWidth*-1;
    container.style.transform = "translateX(" + (active*width).toString() + "px)";
  })

}

function drawSVGs(){

  drawPie("#pie1", PIE1, "Sr.")
  drawPie("#pie2", PIE2, "Sr.")
  drawPie("#pie3", PIE3, "Jr.")

}

function drawPie(svgId, pieData, labelText){
  const chart = d3.select(svgId),
    width = +chart.attr("width"),
    height = +chart.attr("height"),
    radius = Math.min(width, height) / 2,
    g = chart.append("g").attr("transform", "translate(" + width / 3 + "," + height / 2 + ")");

  const color = d3.scaleOrdinal(["green", "yellow", "red"]);

  const pie = d3.pie()
    .sort(null)
    .value((d) => (d.percent));

  const path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(80);

  const label = d3.arc()
    .outerRadius(radius - 20)
    .innerRadius(radius - 20);

  const arc = g.selectAll(".arc")
      .data(pie(pieData))
    .enter()
      .append("g")
      .attr("class", (d) => ("arc " + d.data.type));

  arc.append("path")
    .attr("d", path)
    .attr("fill", (d) => (color(d.data.index)));

  arc.append("text")
    .attr("transform", (d) => ("translate(" + label.centroid(d) + ")"))
    .attr("dy", "-3px")
    .attr("dx", "-5px")
    .text((d) => (d.data.type + " (" + d.data.percent + "%)"));

  g.append("text")
    .attr("transform", "translate(-20, 10)")
    .attr("class", "jr-sr-label")
    .text(labelText);

  g.append("text")
    .attr("transform", "translate(-30, 25)")
    .text("Engineer");


}

var REASONS = [
  "I'm cute as a button",
  "I bake great cookies.",
  "I offer a fresh perspective on older problems.",
  "I offer a diverse perspective on problems.",
  "I'm pretty flexible with my pay rate.",
  "I'm steady and I'll stay for the long haul.",
  "I get along with everyone and am super nice.",
  "I have a wide breadth of knowledge across disciplines.",
]

var REASONS_IMPORTANT = [
  "I grew up in and love the bay area.",
  "I know modern, relevant web technologies.",
  "I'm aligned with KQED's mission to illuminate and educate our world.",
  "I like KQED's engineering team (and I think they like me, too!).",
  "I'm not afraid to work hard.",
  "I have an eye for product.",
  "I'm a fast, independent learner.",
  "I'm a clear and effective communicator.",
  "I work until I get the job done.",
  "I really want to help make KQED's web projects great!",
  "I can wear many hats and can contribute across teams.",
  "I keep up with the greater engineering community through meetups and events.",
  "I'll pay it forward and be a great teacher."
]

var PIE1 = [
  {
    type: "Learning",
    percent: 10,
    index: 0
  },
  {
    type: "Slow, necessary work",
    percent: 50,
    index: 1
  },
  {
    type: "Challenging work",
    percent: 40,
    index: 2
  }
]

var PIE2 = [
  {
    type: "Learning",
    percent: 10,
    index: 0
  },
  {
    type: "Slow, necessary work",
    percent: 15,
    index: 1
  },
  {
    type: "Challenging work",
    percent: 75,
    index: 2
  }
]

var PIE3 = [
  {
    type: "Learning",
    percent: 30,
    index: 0
  },
  {
    type: "Slow, necessary work",
    percent: 50,
    index: 1
  },
  {
    type: "Challenging work",
    percent: 20,
    index: 2
  }
]

var LINE1 = [
  {
    time: 0,
    work: 10
  },
  {
    time: 1,
    work: 20
  },
  {
    time: 2,
    work: 30
  },
  {
    time: 3,
    work: 40
  },
  {
    time: 4,
    work: 50
  },
  {
    time: 5,
    work: 60
  },
  {
    time: 6,
    work: 70
  },
  {
    time: 7,
    work: 80
  },
  {
    time: 8,
    work: 90
  },
  {
    time: 9,
    work: 100
  },
  {
    time: 10,
    work: 110
  },
]

var LINE2 = [
  {
    time: 0,
    work: 18
  },
  {
    time: 1,
    work: 36
  },
  {
    time: 2,
    work: 54
  },
  {
    time: 3,
    work: 72
  },
  {
    time: 4,
    work: 90
  },
  {
    time: 5,
    work: 108
  },
  {
    time: 6,
    work: 126
  },
  {
    time: 7,
    work: 144
  },
  {
    time: 8,
    work: 162
  },
  {
    time: 9,
    work: 180
  },
  {
    time: 10,
    work: 198
  },
]
