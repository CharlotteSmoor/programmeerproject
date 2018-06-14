function Volcano(_volcanoName, _volcanoType, _yOE){
    this.volcanoName = _volcanoName;
    this.volcanoType = _volcanoType;
    this.yOE = [];
}

function Country(_countryName){
    this.countryName = _countryName;
    this.volcanos = [];
}


// loads in data
window.onload = function() {
  queue()
  .defer(d3.json, '/data/testdata.json')
  .defer(d3.json, '/data/country_code_web.json')
  .defer(d3.json, '/data/countryCodes.json')
  .defer(d3.json, '/data/volcanoesByCountry.json')
  .awaitAll(load_data);
}

function load_data(data){
  d3.json('/data/volcanoesByCountry.json', function(error, lala){
      d3.json('/data/country_code_web.json', function(error, country_codes) {
            d3.json('/data/testdata.json', function(error, eruptions) {

          console.log(lala)
      if (error) throw error;
      var volcanos_per_country = [];
        for (var i = 1; i < eruptions.length; i++){
          for(var j = 0; j < country_codes.length; j++){
          if (eruptions[i].country == country_codes[j].country){
            var country = country_codes[j].code
            var volcano = eruptions[i].name
            var type = eruptions[i].type
            var year = eruptions[i].year
          }
        }
    volcanos_per_country.push({Country: country, Volcano: volcano, Type: type, Year: year})
  }

  var all_volcano_types = []
  for( var i = 0; i < volcanos_per_country.length; i++){
    var type = volcanos_per_country[i].Type
    if(!all_volcano_types.includes(type)){
      all_volcano_types.push(type)
    }
  }

  var count_types = []
  for (var j = 0; j < all_volcano_types.length; j++){
    var count = 0;
    for (var i = 0; i < volcanos_per_country.length; i++){
      if(volcanos_per_country[i].Type == all_volcano_types[j]){
        count++;
      }
    }
      count_types.push(count)
  }
  console.log(count_types)


    var list = {};
    for(var i = 0; i < volcanos_per_country.length; i++){
        var cou = volcanos_per_country[i].Country
        if(list[cou]){
          //console.log(list[cou])
          list[cou].push(new Volcano(volcanos_per_country[i].Volcano, volcanos_per_country[i].Type, volcanos_per_country[i].Year))
        } else {
            list[cou] = []
            list[cou].push(new Volcano(volcanos_per_country[i].Volcano, volcanos_per_country[i].Type, volcanos_per_country[i].Year))
        }
    }
    console.log(list)
      console.log(list.NZL[1]["volcanoType"])

      color_Country(volcanos_per_country)
      MakeMap(error, colorCountry, list)
      ready_donutdata(all_volcano_types, count_types)
      makeDonut(donutdata)
})
  });
});
};
