$(document).ready(function(){


    //MW: I changed the document read function to include everything 
    //so it will load of the functions automatically (feel free to change back)




var getweatherdata = function(city){

    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=Imperial&APPID=c10bb3bd22f90d636baa008b1529ee25",
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            console.log(data);
            //will have to do more with the data. for now, it just logs it.
        }
    })

}

//MW: functions for slider
var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value;

slider.oninput = function() {
    alert("hey");
  output.innerHTML = this.value;
}
//MW: end functions for slider



//MW: no baby




});