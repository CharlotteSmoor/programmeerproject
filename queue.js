window.onload = function() {
};

// load in data using queue
d3.queue()
  .defer(d3.json, 'testdata.json')
  .awaitAll(load_data);

  function load_data(error, data){
    d3.json('testdata.json', function(error, response) {
    console.log("hello")
  })
}
