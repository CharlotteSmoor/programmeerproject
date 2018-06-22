// World map

function color_Country(list, alldata, specific_year_data) {
        colorCountry = {}

        for (var i = 0; i < list.length; i++){
          country = list[i]
          colorCountry[country] = {fillKey: "ALL", value: alldata[list[i]]}
        }
        if (specific_year_data != undefined || specific_year_data != null){
          for (var j = 0; j < specific_year_data.length; j++){
            country = specific_year_data[j]
            colorCountry[country] = {fillKey: "YEAR", value: specific_year_data[j]}
          }
        }
        return colorCountry
}

// creates world map
function MakeMap(error, colorCountry, volcanoes_country, allTypes, types) {
  if (error) throw error;
    var map = new Datamap({element: document.getElementById('map'),
    fills: {
      ALL: '#4CAF50',
      YEAR: 'darkgreen',
      defaultFill: '#c6c4c4'
  },
  data: colorCountry,
  // responsive: true,

  done: function(datamap){
    datamap.svg.selectAll(".datamaps-subunit").on("click", function(geography){
      var location = geography.id
      var volcano_location = volcanoes_country[location]
      donutdata = ready_donutdata(volcano_location, allTypes)
      updateDonut(donutdata, types)
    });
  },
  geographyConfig: {
      popupTemplate: function(geo, data) {
        if (!data){
          return ['<div class="hoverinfo"><strong>',
                  geo.properties.name,
                  ': no known volcano eruptions',
                  '</strong></div>'].join('');
        }
          return ['<div class="hoverinfo"><strong>',
              geo.properties.name, '</strong>',
            '<br>Volcanoes: <strong>', data.value, '</strong>',
            '</div>'].join('');},
      },
      popOnHover: true,
      highlightOnHover: true,
      highlightFillColor: function(geo) {return geo["fillColor"] || "orange"; },

 });
}
