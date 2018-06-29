// loads data
window.onload = function() {
  queue()
  .defer(d3.json, 'data/volcanoesByCountry.json')
  .defer(d3.json, 'data/erruptionsByYear.json')
  .defer(d3.json, 'data/types.json')
  .awaitAll(load_data);
}

function load_data(data){
  d3.json('data/volcanoesByCountry.json', function(error, volcanoes_country){
    d3.json('data/erruptionsByYear.json', function(error, erruptions){
      d3.json('data/types.json', function(error, types){

      console.log(volcanoes_country)

      if (error) throw error;
      var allCountries = ["ATA","CAN","CHL","CHN","CMR","COG","COL","COM","CPV","CRI","ECU","ERI","ESP","ETH","GLP","GRC","GTM","IDN","ISL","ITA","JPN","KNA","MEX","MSR","MTQ","NIC","NZL","PER","PHL","PNG","PRK","PRT","RUS","SAU","SLB","SLV","TON","TTO","TUR","TWN","TZA","USA","VCT","VUT","WSM","YEM"]
      var allTypes = ["Caldera","Pyroclastic cone","Submarine volcano","Stratovolcano","Maar","Shield volcano","Complex volcano","Fissure vent","Pumice cone","Subglacial volcano","Crater rows","Tuff cone","Cinder cone","Lava dome","Pyroclastic shield","Volcanic field","Mud volcano"]


      // dropdown menu
      d3.selectAll(".dropdown-item").on("click", function(){
        var dropdown_value = this.getAttribute("value");
        updateMap([], dropdown_value)
      })

      // implementation of the slider
      var slider = document.getElementById("myRange");
      var output = document.getElementById("demo");
      output.innerHTML = slider.value; // Display the default slider value

      // update current slider value (each time the slider handle is dragged)
      slider.oninput = function() {
          output.innerHTML = this.value
          slidervalue = this.value
          updateMap(slidervalue, [])
        }

      function updateMap(slidervalue, dropdown_value) {
        d3.select('#map').select('svg').remove();
        color_Country(allCountries, volcanoes_country, erruptions[slidervalue], dropdown_value)
        MakeMap(error, colorCountry, volcanoes_country, allTypes, types)
      }
      })
    })
  });
};
