function ready_scatterdata(){
  
}
function createScatter(){
// calculates largest amount in array
var max_of_array = Math.max.apply(Math, pokemon_types);

// set margin, width and height for the whole graph
var margin = {top: 10, right: 10, bottom: 50, left: 50};
var padding = 1;
var fullwidth = 750;
var fullheight = 400;
var width = 700 - margin.left - margin.right;
var height = 350 - margin.top - margin.bottom;

// obtained implementation of tooltip from: http://bl.ocks.org/Caged/6476579
var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
    return "<strong>Amount of Pokémon:</strong><span style='color:white'>" + d + "</span>";
  })

// create SVG element
var svg = d3.select("body")
  .append("svg")
   .attr("width", fullwidth)
   .attr("height", fullheight)
  .append("g")
   .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   svg.call(tip);

 // scale x and y axes,
 // use of rangeRoundBands inspired by https://bost.ocks.org/mike/bar/3/
 var x = d3.scale.ordinal()
     .domain(d3.range(type.length))
     .rangeRoundBands([0, width], .05);

 var y = d3.scale.linear()
    .domain([0, max_of_array])
    .range([height, 0]);

 var xAxis = d3.svg.axis()
     .scale(x)
     .orient("bottom")
     .tickFormat(function(d) { return type[d]; })

 var yAxis = d3.svg.axis()
     .scale(y)
     .orient("left")

// create bars and hide and show tooltip
svg.selectAll("rect")
  .data(pokemon_types)
  .enter()
  .append("rect")
  .attr("class", "bar")
  .attr("x", function (d, i){ return x(i);})
  .attr("y", function (d){ return y(d);})
  .attr("width", x.rangeBand())
  .attr("height", function (d){ return height - y(d);})
  .on('mouseover', tip.show)
  .on('mouseout', tip.hide)

// provide x-axis
svg.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis)
     .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", function(d) { return "rotate(-65)"});

// provide y-axis
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
  .append("text")
    .text("# Pokémons")
    .style("text-anchor", "end")
    .attr("y", -35)
    .attr("dy", ".201em")
    .attr("transform", "rotate(-90)");
}
