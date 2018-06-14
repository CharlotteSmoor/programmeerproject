// Donut chart
// http://www.adeveloperdiary.com/d3-js/create-a-simple-donut-chart-using-d3-js/

function ready_donutdata(all_volcano_types, count_types){
  donutdata = []
  for(var i = 0; i < all_volcano_types.length; i++){
      var type = all_volcano_types[i]
      var count = count_types[i]
      var percentage = parseFloat(((count/(817)*100))).toFixed(2);
      donutdata.push({type: type, percentage: percentage})
    }
  console.log(donutdata)
}

function makeDonut(donutdata){
  var pie=d3.layout.pie()
    .value(function(d){return d.percentage})
    .sort(null)
    .padAngle(.03);

  var w=300,h=1000;

  var outerRadius=w/2;
  var innerRadius=100;

  var color = d3.scale.category20();

  var arc=d3.svg.arc()
    .outerRadius(outerRadius)
    .innerRadius(innerRadius);

  var svg=d3.select("#chart")
    .append("svg")
    .attr({
        width:w,
        height:h,
        class:'shadow'
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
    });

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
