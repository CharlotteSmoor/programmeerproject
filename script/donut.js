// Donut chart
// http://www.adeveloperdiary.com/d3-js/create-a-simple-donut-chart-using-d3-js/

function ready_donutdata(data, list){
  var donutdata = []
  var total_volcanoes = Object.keys(data).length
  if (data != undefined || data != null){
    for (var i = 0; i < list.length; i++){
        var count = 0;
        Object.keys(data).forEach(function(key) {
          if (data[key] == list[i]){
            count++;
          }
      })
      if(count != 0){
        donutdata.push({type: list[i], percentage: parseFloat(((count/(total_volcanoes)*100))).toFixed(2)})
      }
    }
      return donutdata
      console.log(total_volcanoes)
    }
}

function makeDonut(donutdata, types){

var pie=d3.layout.pie()
    .value(function(d){return d.percentage})
    .sort(null)
    .padAngle(.03);

  var w=300,h=1000;

  var outerRadius=w/2;
  var innerRadius=(outerRadius-60);

  // var color = d3.scale.category20();
  var color = d3.scale.ordinal()
      .range(['#a1d99b', '#74c476', '#41ab5d', '#4CAF50', '#238b45', '#006d2c', '#00441b']);

// '#4CAF50', "#7ebe03", "#bbfc3d"

  var arc=d3.svg.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

    var tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .style("background", "#000")
      .text("a simple tooltip");

  var svg=d3.select("#donut")
    .append("svg")
    .attr({
        width:w,
        height:800,
    }).append('g')
    .attr({
        transform:'translate('+w/2+','+h/2+')'
    });
  var path=svg.selectAll('path')
    .data(pie(donutdata))
    .enter()
    .append('path')
    .attr({
        d:arc,
        fill:function(d,i){
            return color(d.data.type);
        }
    })
    .on("click", function(d) {
      d3.select(this).transition()
      // console.log(this)
      // .on("mouseover", function(d) {
      type = d.data.type
      readyScatter(type,types)
      updateScatter(scatterdata);
});

// svg.append("text")
//         .attr("x", 0)
//         .attr("y", -200)
//         .attr("text-anchor", "middle")
//         .style("font-size", "16px")
//         .style("text-decoration", "underline")
//         .text("Types of volcanoes in" + '<strong>', volcano_location, '</strong>')
      // });


  path.transition()
    .duration(1000)
    .attrTween('d', function(d) {
        var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
        return function(t) {
            return arc(interpolate(t));
        };
    });


  var restOfTheData=function(){
      var text=svg.selectAll('text')
          .data(pie(donutdata))
          .enter()
          .append("text")
          .transition()
          .duration(200)
          .attr("transform", function (d) {
              return "translate(" + arc.centroid(d) + ")";
          })
          .attr("dy", ".4em")
          .attr("text-anchor", "middle")
          .text(function(d){
              return d.data.percentage+"%";
          })
          .style({
              fill:'#fff',
              'font-size':'10px'
          });

      var legendRectSize=20;
      var legendSpacing=7;
      var legendHeight=legendRectSize+legendSpacing;


      var legend=svg.selectAll('.legend')
          .data(color.domain())
          .enter()
          .append('g')
          .attr({
              class:'legend',
              transform:function(d,i){

                  return 'translate(-35,' + ((i*legendHeight)-65) + ')';
              }
          });
      legend.append('rect')
          .attr({
              width:legendRectSize,
              height:legendRectSize,
              rx:20,
              ry:20
          })
          .style({
              fill:color,
              stroke:color
          });

      legend.append('text')
          .attr({
              x:30,
              y:15
          })
          .text(function(d){
              return d;
          }).style({
              fill:'#929DAF',
              'font-size':'14px'
          });
  };

  setTimeout(restOfTheData,1000);
}

function updateDonut(donutdata, types){
  d3.select("#donut").select("svg").remove()
  makeDonut(donutdata, types)
}
