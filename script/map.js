
function color_Country(data) {
        colorCountry = {}
        for (var i = 0; i < data.length; i++){
          country = data[i].Country
	         colorCountry[country] = {fillKey: "COUNTRY"};
        	}
          return colorCountry
    }

// creates world map
function MakeMap(error, colorCountry, volcanos_per_country) {
if (error) throw error;
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
      popupTemplate: function(geo, map) {
        if (!map){
          return ['<div class="hoverinfo"><strong>',
                  geo.properties.name,
                  ': no known volcanoes',
                  '</strong></div>'].join('');
        }
          return ['<div class="hoverinfo"><strong>',
              geo.properties.name, '</strong>',
            '<br>Volcanoes: <strong>', , '</strong>',
            '</div>'].join('');},
      },
      popOnHover: true,
      highlightOnHover: true,
      highlightFillColor: function(geo) {return geo["fillColor"] || "orange"; },

 });
}
