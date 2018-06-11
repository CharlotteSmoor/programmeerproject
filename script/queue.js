"use strict";
// loads in data
window.onload = function() {
  queue()
  .defer(d3.json, '/data/testdata.json')
  .defer(d3.json, '/data/country_code_web.json')
  .awaitAll(load_data);
}

function load_data(data){
    d3.json('/data/testdata.json', function(error, eruptions) {
      d3.json('/data/country_code_web.json', function(error, country_codes) {
      if (error) throw error;
      var volcanos_per_country = [];
        for (var i = 1; i < eruptions.length; i++){
          for(var j = 0; j < country_codes.length; j++){
          if (eruptions[i].country == country_codes[j].country){
            var country = country_codes[j].code
            var volcano = eruptions[i].name
          }
        }
    volcanos_per_country.push({Country: country, Volcano: volcano})
  }
  console.log(volcanos_per_country)

      MakeMap(volcanos_per_country)

  });
});
};
