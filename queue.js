// loads in data
window.onload = function() {
  queue()
  .defer(d3.json, 'testdata.json')
  .awaitAll(load_data);

function load_data(error, data){
  if (error) throw error;
      //console.log(data)
      MakeMap()
}
};
