// World map

function color_Country(data) {
        colorCountry = {}
        for (var i = 0; i < data.length; i++){
            country = data[i].Country
            colorCountry[country] = {fillKey: "COUNTRY", value: data[i].Volcano };
        	}
          return colorCountry

    }

// creates world map
function MakeMap(error, colorCountry, list) {
  if (error) throw error;
  console.log(colorCountry)
    var map = new Datamap({element: document.getElementById('map'),
    fills: {
      COUNTRY: '#a50f15',
      defaultFill: "green"
  },
  data: colorCountry,
  // responsive: true,

  done: function(datamap){
    datamap.svg.selectAll(".datamaps-subunit").on("click", function(geography){
      var location = geography.id;
    });
  },
  geographyConfig: {
      popupTemplate: function(geo, data) {
        if (!data){
          return ['<div class="hoverinfo"><strong>',
                  geo.properties.name,
                  ': no known volcanoes',
                  '</strong></div>'].join('');
        }
          return ['<div class="hoverinfo"><strong>',
              geo.properties.name, '</strong>',
            '<br>Volcanoes: <strong>', data.value , '</strong>',
            '</div>'].join('');},
      },
      popOnHover: true,
      highlightOnHover: true,
      highlightFillColor: function(geo) {return geo["fillColor"] || "orange"; },

 });
}
