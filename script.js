// Use this URL for API Calls
var root_url = "http://comp426.cs.unc.edu:3001/";

var _nobaby = false;
var _cabinclass = false;
var _priceslider = true;

var _airline_picker = false;
var _mhc = false;
var _latitude_picker = false;

var _seatnumber = false;
var _amw = false;
var _noredeye = false;


$(document).ready(function(){
    //MW: I changed the document read function to include everything 
    //so it will load of the functions automatically (feel free to change back)
    // HY We don't need to do this, we can call functions dynamically using onclick functions

//MW: functions for slider
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
        output.innerHTML = this.value;
    }
//MW: end functions for slider

});

var getweatherdata = function(city){
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=Imperial&APPID=c10bb3bd22f90d636baa008b1529ee25",
        type: "GET",
        dataType: "jsonp",
        success: function(data){
            console.log(data);
            //will have to do more with the data. for now, it just logs it.
        }
    });
};

var build_ticket_interface = function(){
let body = $('body');
if(_nobaby){

}

if(_cabinclass){

}

if(_priceslider){

}

if(_airline_picker){

}

if(_mhc){

}

if(_latitude_picker){

}

if(_seatnumber){

}

if(_amw){

}

if(_noredeye){

}

};

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




// Only show tickets from selected airline
var airline_picker = function(){
    _airline_picker = !_airline_picker;

};

// Only show available tickets next to chosen gender and age
var mhc = function(){
    _mhc = !_mhc;
};

// Avoid east / west of certain latitude
var latitude_picker = function(){
    _latitude_picker = !_latitude_picker;

};



