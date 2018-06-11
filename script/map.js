// creates world map
function MakeMap(error, data) {
//if (error) throw error;
  var map = new Datamap({element: document.getElementById('map'),
   fills: {
     location: "firebrick",
     defaultFill: "green" },
     data: data,
     responsive: true,
     done: function(datamap){
       datamap.svg.selectAll(".datamaps-subunit").on("click", function(geography){
         var location = geography.id;
         if (location == data.country){
           
         }

       });
     },

})
};
