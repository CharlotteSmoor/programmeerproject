// creates world map
function MakeMap(error, data) {
if (error) throw error;
  var map = new Datamap({element: document.getElementById('map'),
   fills: { defaultFill: "green" }

})
};
