document.addEventListener("DOMContentLoaded", function() {
  init();
  drawSVGs();
})

function init() {
  var left = document.getElementById("car-left-button");
  var right = document.getElementById("car-right-button");
  var addEngineer = document.getElementById("add-engineer");
  var howSo = document.getElementById("how-so");
  var reasons = document.getElementById("reasons");
  var container = document.getElementById("car-content-container");
  var numElements = document.getElementsByClassName("car-content").length;
  var rect = document.getElementById("rect");
  var width;
  var active = 0;
  var activeSlide = document.getElementById("slide-" + active);
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
      if(activeSlide.id === "slide-4"){
        resetSlide3();
        rect.classList.add("shrink");
      } else if (activeSlide.id === "slide-5"){
        rect.classList.remove("shrink");
      }
      active += 1;
      activeSlide = document.getElementById("slide-" + active);
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
      if(activeSlide.id === "slide-4"){
        resetSlide3();
      } else if (activeSlide.id === "slide-5"){
        rect.classList.remove("shrink");
      }
      active -= 1;
      activeSlide = document.getElementById("slide-" + active);
      container.style.transform = "translateX(" + (active*width).toString() + "px)";
      if(active === 0){
        left.classList.add("none");
      } else if (activeSlide.id === "slide-5") {
        rect.classList.add("shrink");
      }
    }
  })

  howSo.addEventListener("click", function(e) {
    e.preventDefault();
    e.currentTarget.innerHTML = "What else?";
    e.currentTarget.classList.remove("slow-bounce");
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

  addEngineer.addEventListener("click", function(e) {
    e.preventDefault();
    if(addEngineer.checked === true){
      resetSlide3();
    } else {
      addEngineer.checked = true;
      document.getElementById("eng-title").innerHTML = "An Engineering Duo:";
      addEngineer.innerHTML = "Remove a Junior Engineer";
      addEngineer.classList.remove("slow-bounce")
      changePie("#pie1", PIE2);
      document.getElementById("pie3").classList.add("slideIn");
      document.getElementById("pie3").classList.remove("slideOut");
    }
  })

  window.addEventListener("resize", function(e){
    width = document.getElementById("car-content-container").offsetWidth*-1;
    container.style.transform = "translateX(" + (active*width).toString() + "px)";
  })

}

function resetSlide3(){
  var addEngineer = document.getElementById("add-engineer");
  document.getElementById("eng-title").innerHTML = "A Single Engineer's Day:";
  addEngineer.checked = false;
  addEngineer.innerHTML = "Add a Junior Engineer"
  changePie("#pie1", PIE1);
  document.getElementById("pie3").classList.remove("slideIn");
  document.getElementById("pie3").classList.add("slideOut");
}

function replacePie(svgId, pieData, labelText){
  var chart = d3.select(svgId)
}

function drawSVGs(){

  drawPie("#pie1", PIE1, "Senior")
  drawPie("#pie3", PIE3, "Junior")

  drawLineGraph()

}

function drawPie(svgId, pieData, labelText){
  var chart = d3.select(svgId),
    width = +chart.attr("width"),
    height = +chart.attr("height"),
    radius = Math.min(width, height) / 2;

  var g = svgId === "#pie1" ? chart.append("g").attr("transform", "translate(" + width / 3 + "," + height / 2 + ")") : chart.append("g").attr("transform", "translate(" + width / 2.25 + "," + height / 2 + ")");

  var color = d3.scaleOrdinal(["green", "yellow", "steelblue"]);

  var pie = d3.pie()
    .sort(null)
    .value(function(d) {return (d.percent)});

  var path = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(135);

  var label = d3.arc()
    .outerRadius(radius - 20)
    .innerRadius(radius - 20);

  var arc = g.selectAll(".arc")
      .data(pie(pieData))
    .enter()
      .append("g")
      .attr("class", "arc");

  arc.append("path")
    .attr("d", path)
    .attr("fill", function(d, i) {return (color(i))})

  chart.selectAll("path")
    .transition()
      .each(function(d) {this._current = d})

  arc.append("text")
    .attr("transform", function(d) {return ("translate(" + label.centroid(d) + ")")})
    .attr("dy", "8px")
    .attr("dx", "-5px")
    .text(function(d) {return (d.data.type + " (" + d.data.percent + "%)")});

  g.append("text")
    .attr("transform", "translate(-50, 10)")
    .attr("class", "jr-sr-label")
    .text(labelText);

  g.append("text")
    .attr("transform", "translate(-30, 25)")
    .text("Engineer");

}

function changePie(svgId, data){
  var chart = d3.select(svgId),
    width = +chart.attr("width"),
    height = +chart.attr("height"),
    radius = Math.min(width, height) / 2;

  var pie = d3.pie()
    .sort(null)
    .value(function(d) {return (d.percent)});

  chart.selectAll("path")
    .data(pie(data));

  chart.selectAll("path")
    .transition()
      .duration(750)
      .attrTween("d", arcTween);

  var g = chart.select("g")
  var arc = g.selectAll(".arc")
    .data(pie(data))
  var label = d3.arc()
    .outerRadius(radius - 20)
    .innerRadius(radius - 20);

  arc.selectAll("text").remove();

  arc.append("text")
    .attr("transform", function(d) {return ("translate(" + label.centroid(d) + ")")})
    .attr("dy", "8px")
    .attr("dx", "-5px")
    .text(function(d) {return (d.data.type + " (" + d.data.percent + "%)")});

}


function arcTween(finish){
  var arc = d3.arc()
    .outerRadius(190)
    .innerRadius(135);

  var interpolator = d3.interpolate(this._current, finish);
  this._current = interpolator(0);
  return function(d) {return arc(interpolator(d)); };
}


function drawLineGraph(){
  var margin = {top: 10, right: 10, bottom: 80, left: 75},
            width = 750 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

  var chart = d3.select("#line")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleLinear()
      .range([0, width])
      .domain([0, 10]);

  var y = d3.scaleLinear()
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

  var area = d3.area()
    .x(function(d) {return x(d.time)})
    .y0(height)
    .y1(function(d) {return y(d.work)})

  var valueline = d3.line()
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
  "I'm cute as a button.",
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
  },
  {
    type: "Slow, necessary work",
    percent: 50,
  },
  {
    type: "Challenging work",
    percent: 40,
  }
]

var PIE2 = [
  {
    type: "Learning",
    percent: 10,
  },
  {
    type: "Slow, necessary work",
    percent: 15,
  },
  {
    type: "Challenging work",
    percent: 75,
  }
]

var PIE3 = [
  {
    type: "Learning",
    percent: 30,
  },
  {
    type: "Slow, necessary work",
    percent: 50,
  },
  {
    type: "Challenging work",
    percent: 20,
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

var BAR1 = [
  "JavaScript":
    {
      s1: 50,
      s2: 0,
      j: 20
    },
  "Python":
    {
      s1: 25,
      s2: 15,
      j: 25
    },
  "Ruby":
    {
      s1: 40,
      s2: 40,
      j: 30
    },
  "CSS":
    {
      s1: 0,
      s2: 50,
      j: 20
    },
  "SQL":
    {
      s1: 0,
      s2: 50,
      j: 20
    }
]

var BAR2 = [
  "JavaScript":
    {
      s1: 50,
      s2: 0,
      j: 20
    },
  "Python":
    {
      s1: 25,
      s2: 15,
      j: 25
    },
  "Ruby":
    {
      s1: 40,
      s2: 40,
      j: 30
    },
  "CSS":
    {
      s1: 0,
      s2: 50,
      j: 0
    },
  "SQL":
    {
      s1: 0,
      s2: 50,
      j: 0
    }
]
