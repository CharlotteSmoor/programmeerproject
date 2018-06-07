window.onload = function() {
  queue()
  .defer(d3.json, 'testdata.json')
  .awaitAll(load_data);
};

function load_data(error, data){
  d3.json('testdata.json', function(error, response) {
    console.log(response)

    MakeMap()
});
}

  function MakeMap(error, data) {
  if (error) throw error;
    var map = new Datamap({element: document.getElementById('map'),
	   fills: { defaultFill: "green" }

	})
 };
