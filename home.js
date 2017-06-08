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

  drawLineGraph()

}

function drawPie(svgId, pieData, labelText){
  const chart = d3.select(svgId),
    width = +chart.attr("width"),
    height = +chart.attr("height"),
    radius = Math.min(width, height) / 2,
    g = chart.append("g").attr("transform", "translate(" + width / 3 + "," + height / 2 + ")");

  const color = d3.scaleOrdinal(["green", "yellow", "steelblue"]);

  const pie = d3.pie()
    .sort(null)
    .value(function(d) {return (d.percent)});

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
      .attr("class", function(d) {return ("arc " + d.data.type)});

  arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) {return (color(d.data.index))});

  arc.append("text")
    .attr("transform", function(d) {return ("translate(" + label.centroid(d) + ")")})
    .attr("dy", "-3px")
    .attr("dx", "-5px")
    .text(function(d) {return (d.data.type + " (" + d.data.percent + "%)")});

  g.append("text")
    .attr("transform", "translate(-20, 10)")
    .attr("class", "jr-sr-label")
    .text(labelText);

  g.append("text")
    .attr("transform", "translate(-30, 25)")
    .text("Engineer");

}

function drawLineGraph(){
  const margin = {top: 10, right: 10, bottom: 80, left: 75},
            width = 750 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

  const chart = d3.select("#line")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  const x = d3.scaleLinear()
      .range([0, width])
      .domain([0, 10]);

  const y = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 200]);

  chart.append("g")
    .attr("class", "axis x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x)
            .ticks(10));

  chart.append("text")
    .attr("transform", "translate(" + (width/2) + " ," + (height + 35) + ")")
    .style("text-anchor", "middle")
    .text("Days");

  chart.append("g")
    .attr("class", "axis y-axis")
    .call(d3.axisLeft(y).ticks(10, "s"));

  chart.append("text")
    .attr("transform", "rotate(-90) translate(" + (height/-2) + " , 0)")
    .attr("dy", "-50px")
    .attr("dx", "-2.35em")
    .text("Challenging Project Time");

  let area = d3.area()
    .x(function(d) {return x(d.time)})
    .y0(height)
    .y1(function(d) {return y(d.work)})

  let valueline = d3.line()
      .x((d) => ( x(d.time) ))
      .y((d) => ( y(d.work) ));

  chart.append("path")
      .datum(LINE2)
      .attr("class", "line line2")
      .attr("d", valueline);

  chart.append("path")
      .datum(LINE2)
      .attr("class", "area2")
      .attr("d", area);

  chart.append("path")
      .datum(LINE1)
      .attr("class", "line line1")
      .attr("d", valueline);

  chart.append("path")
      .datum(LINE1)
      .attr("class", "area1")
      .attr("d", area);

  chart.append("text")
      .attr("transform", "translate(" + (width/4) + " ," + (height - 220) + ")")
      .text("With a junior engineer");

  chart.append("text")
      .attr("transform", "translate(" + (width/1.7) + " ," + (height - 50) + ")")
      .text("Without a junior engineer");

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
    work: 5
  },
  {
    time: 1,
    work: 9
  },
  {
    time: 2,
    work: 16
  },
  {
    time: 3,
    work: 24
  },
  {
    time: 4,
    work: 30
  },
  {
    time: 5,
    work: 37
  },
  {
    time: 6,
    work: 48
  },
  {
    time: 7,
    work: 58
  },
  {
    time: 8,
    work: 62
  },
  {
    time: 9,
    work: 70
  },
  {
    time: 10,
    work: 78
  },
]

var LINE2 = [
  {
    time: 0,
    work: 10
  },
  {
    time: 1,
    work: 24
  },
  {
    time: 2,
    work: 44
  },
  {
    time: 3,
    work: 62
  },
  {
    time: 4,
    work: 90
  },
  {
    time: 5,
    work: 110
  },
  {
    time: 6,
    work: 122
  },
  {
    time: 7,
    work: 135
  },
  {
    time: 8,
    work: 152
  },
  {
    time: 9,
    work: 170
  },
  {
    time: 10,
    work: 198
  },
]
