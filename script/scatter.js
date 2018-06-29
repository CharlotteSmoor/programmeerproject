function readyScatter(type, data){
  // console.log(data[type])
  scatterdata = []
  var test = data[type];
  test.forEach(function(d){
    name = d.name
    year = d.year
    vei = d.vei
    total_deaths = d.total_deaths
    scatterdata.push({type: type, name: name, year: year, vei: vei, total_deaths: total_deaths})
  })

}
function createScatter(scatterdata){
// calculates largest amount in array
var max_yAxis = d3.max(scatterdata, function(d) { return d.vei ; } ) * 1.1;
var min_xAxis = d3.min(scatterdata, function(d) { return d.year; } ) * 1.1;
var max_xAxis = d3.max(scatterdata, function(d) { return d.year; } ) * 1.1;

var margin = {
        top: 20,
        right: 210,
        bottom: 50,
        left: 70
    },
    outerWidth = 1000,
    outerHeight = 400,
    width = outerWidth - margin.left - margin.right,
    height = outerHeight - margin.top - margin.bottom;

var x = d3.scale.linear()
    .range([0, width]).nice();

var y = d3.scale.linear()
    .range([height, 0]).nice();

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")
    // .tickSize(-height);

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    // .tickSize(-width);

var tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-10, 0])
        .html(function(d) {
            return "Name" + ": " + d.name + "<br>" + "Year" + ": " + d.year + "<br>" + "VEI" + ": " + d.vei + "<br>" + "deaths" + ": " + d.total_deaths;
        });

    var xMin = min_xAxis > 0 ? 0 : min_xAxis;

    x.domain([xMin, max_xAxis]);
    y.domain([0, max_yAxis]);

    // var color = d3.scale.category20();
    var color = d3.scale.ordinal()
        .range(['#a1d99b', '#74c476', '#41ab5d', '#4CAF50', '#238b45', '#006d2c', '#00441b']);

    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", outerWidth)
        .attr("height", outerHeight)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
    svg.call(tip);
    svg.append("rect")
        .attr("width", width)
        .attr("height", height);
    svg.append("g")
        .classed("x axis", true)
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis)
        .append("text")
        .attr("x", width)
        .attr("y", margin.bottom - 10)
        .style("text-anchor", "end")
        .text("Years");
    svg.append("g")
        .classed("y axis", true)
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", - margin.left)
        .attr("dy", "1.5em")
        .style("text-anchor", "end")
        .text("VEI")
        svg.append("text")
                .attr("x", width/2)
                .attr("y", 0)
                .attr("text-anchor", "middle")
                .style("font-size", "16px")
                .style('font-weight', 'bold')
                .text(type);

    var objects = svg.append("svg")
        .classed("objects", true)
        .attr("width", width)
        .attr("height", height);

    objects.selectAll(".dot")
        .data(scatterdata)
        .enter().append("circle")
        .classed("dot", true)
        .attr({
          r: function(d) {
                return 10;
            },
            cx: function(d) {
                return x(d.year);
            },
            cy: function(d) {
                return y(d.vei);
            }
        })
    .style("fill", function(d) {
        return color(d.name);
    })
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

    // var legend = svg.selectAll(".legend")
    //     .data(color.domain())
    //     .enter().append("g")
    //     .classed("legend", true)
    //     .attr("transform", function(d, i) {
    //         return "translate(0," + i * 20 + ")";
    //     });
    // legend.append("rect")
    //     .attr("x", width + 10)
    //     .attr("width", 12)
    //     .attr("height", 12)
    //     .style("fill", color);
    // legend.on("click", function(type) {
    //     // dim all of the icons in legend
    //     d3.selectAll(".legend")
    //         .style("opacity", 1);
    //     // make the one selected be un-dimmed
    //     d3.select(this)
    //         .style("opacity", 1);
    //     // select all dots and apply 0 opacity (hide)
    //     d3.selectAll(".dot")
    //     // .transition()
    //     // .duration(500)
    //     .style("opacity", 0.1)
    //
    // });
    // legend.append("text")
    //     .attr("x", width + 26)
    //     .attr("dy", ".65em")
    //     .text(function(d) {
    //         return d;
    //     });
};

function updateScatter(scatterdata){
  d3.select("#scatter").select("svg").remove()
  createScatter(scatterdata)
}
