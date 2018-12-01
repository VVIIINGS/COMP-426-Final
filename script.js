$(document).ready(function(){


    //stuff


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
    })

}
