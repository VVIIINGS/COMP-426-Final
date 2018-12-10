// Use this URL for API Calls
var root_url = "http://comp426.cs.unc.edu:3001/";


$(document).ready(function () {
  var slider = document.getElementById("myRange");
  var snow_slider = document.getElementById("snow_box");
  var rain_slider = document.getElementById("rain_box");

  login();
  build_homepage();
  //put in all airports
  add_to_page(slider.value, snow_slider.checked, rain_slider.checked);

  rain_slider.oninput = function () {
    console.log("rain slider")
    add_to_page(slider.value, snow_slider.checked, rain_slider.checked);
  }
  snow_slider.oninput = function () {
    console.log("snow slider")
    add_to_page(slider.value, snow_slider.checked, rain_slider.checked);
  }
  //getcities();
  //build_flight_interface('BOS');
  //alert("are you logged in?");
  //build_flight_interface('CLT');

});



var acodetoaid = function (acode) {
  return airports_w_code.id;
};

var aidtocity = function (aid) {
  for (let i = 0; i < allairports.length; i++) {
    if (allairports[i].id == aid) {
      return allairports[i].city;
    }
  }
};

// AJAX GET request for all flight instances
// Iterate through all instances and find instance with matching fid
// Return the boolean response[i].is_cancelled
var iscancelled = function (fid) {
  for (let i = 0; i < instances.length; i++) {
    if (instances[i].flight_id == fid) {
      console.log('current id is: ' + instances[i].flight_id);
      console.log('given fid is: ' + fid);
      console.log('flight cancelled?:' + instances[i].is_cancelled);
      return instances[i].is_cancelled;
    }
  }
};

// AJAX PUT request on specific instance that matches fid that sets is_cancelled to true
// Return iscancelled(fid)
// Set this method's return value to flight status span on button click
// Effectively, this should cancel the flight then update interface
var cancelflight = function (fid) {


};


var instances = [];
var allairports = [];
var airports_w_code = [];
var flights = [];

var build_flight_interface = function (acode) {
  let body = $('body');
  body.empty();
  // Get airport id given airport code & Get all flight objects that go through that airport



  // Get all instances and store into local variable
  $.ajax({
    url: root_url + 'instances',
    type: 'GET',
    xhrFields: { withCredentials: true },
    success: (response) => {
      instances = response;
    },
    error: () => { alert('error getting instances'); return value; }
  });

  // Load all flights and store into local variable
  $.ajax({
    url: root_url + 'flights',
    type: 'GET',
    dataType: 'json',
    xhrFields: { withCredentials: true },
    success: (response) => {
      console.log('flight get response: ' + response);
      flights = response;
    }
  });

  // Load all airports and store into local variable
  $.ajax({
    url: root_url + 'airports',
    type: 'GET',
    xhrFields: { withCredentials: true },
    success: (response) => {
      allairports = response;
    },
    error: () => { alert('error in getting airports'); }

  });

  // Load all airports with correct airport code
  $.ajax({
    url: root_url + 'airports?filter[code]=' + acode,
    type: 'GET',
    xhrFields: { withCredentials: true },
    success: (response) => {
      airports_w_code = response[0];
    },
    error: () => { alert('error getting airports with code'); }
  });

  alert('please wait 10');

  let correctflights = getflightinfo(acodetoaid(acode));


  console.log(correctflights);
  let departures = correctflights[0];
  let arrivals = correctflights[1];


  body.append('<div class="flight departures">');
  for (let i = 0; i < departures.length; i++) {
    console.log('departure' + i + departures[i].arrival_id);
    body.append(`
        <div class="d" `+ i + ` >
            <span class="time"> Departs at: ` + departures[i].departs_at.slice(11, 16) + ` </span>
            <span class="destination"> Destination: ` + aidtocity(departures[i].arrival_id) + `</span>
            <span class="flightnum"> Flight number: ` + departures[i].number + `  </span>
            <span class="cancel"> Is cancelled? `+ iscancelled(departures[i].id) + `<button class="cancel"> Cancel Flight </button>   </span>
        </div>
        `);
  }
  // Separate departures and arrivals
  body.append('</div>');
  body.append('<br> <br>');


  body.append('<div class="flight arrivals">');
  for (let i = 0; i < arrivals.length; i++) {
    body.append(`
         <div class="a` + i + `">
            <span class="time"> Departs at: ` + arrivals[i].departs_at.slice(11, 16) + ` </span>
            <span class="destination"> Destination: ` + aidtocity(arrivals[i].departure_id) + ` </span>
            <span class="flightnum"> Flight number: ` + arrivals[i].number + `  </span>
            <span class="cancel"> Is cancelled? `+ iscancelled(arrivals[i].id) + `<button class="cancel"> Cancel Flight </button>   </span>
         </div>
        `);
  }

  body.append('</div>');

};

var login = function () {
  let data = {
    user: {
      username: "smh",
      password: "charlotte",
    },
  };
  $.ajax({
    url: 'http://comp426.cs.unc.edu:3001/sessions',
    type: 'POST',
    data: data,
    xhrFields: { withCredentials: true },
    success: function (d, textStatus, jqXHR) {
      console.log("you are logged in")
    },
    error: function (jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 0) {
        alert(
          'Unable to reach server. Make sure you are online. If you are off-campus, make sure you are connected to the VPN.'
        );
      } else if (jqXHR.status === 401) {
        alert(
          'Incorrect username and/or password.'
        );
      } else {
        alert(
          'An unknown error occurred logging in.'
        );
      }
    },
    complete: function (jqXHR, textStatus) {
      //isSubmitting = false;
      //$loginSubmitButton.prop('disabled', false);
    },
  });
}



var getflightinfo = function (aid) {
  let departure = [];
  let arrival = [];
  for (var x = 0; x < flights.length; x++) {
    if (flights[x].departure_id == aid) {
      departure.push(flights[x]);
    }
    if (flights[x].arrival_id == aid) {
      arrival.push(flights[x]);
    }
  }
  return [departure, arrival];
};



// //MW: functions for slider
// var slider = document.getElementById("myRange");
// var output = document.getElementById("demo");
// output.innerHTML = slider.value; // Display the default slider value
//
// // Update the current slider value (each time you drag the slider handle)
// slider.oninput = function () {
//   output.innerHTML = this.value;
// }
// //MW: end functions for slider
// //this.build_flight_interface('CLT');
//

//SJ - update home page after each slider event
var add_to_page = function (temp, snow, rain) {
  $('.ticketwindow').empty();

  $.ajax({
    url: root_url + '/airports',
    type: 'GET',
    xhrFields: { withCredentials: true },
    success: (response) => {
      cities_array = response;
      for (let i = 0; i < cities_array.length; i++) {
        postweather(response[i].city, response[i].code, temp, snow, rain)
      }
    }
  });
}

//SJ - create the home page
var build_homepage = function () {
  let body = $('body');
  body.empty();
  body.append("<h1>Weather</h1>")
  let windowcontainer = $('<div class="window-container"></div>')
  body.append(windowcontainer)
  let search = $('<div class="search"></div>');
  search.append('<p>Max Temperature: <span id="demo">123</span></p>')
  let slidecontainer = $('<div class="slidecontainer"></div')
  slidecontainer.append('<input type="range" min="-32" max="123" value="123" class="slider" id="myRange" onmouseup="temp_release()" oninput="temp_update()">');
  search.append(slidecontainer);
  search.append('<p>Snow:</p>');
  let switchcontainer1 = $('<label class="switch"></label>');
  switchcontainer1.append('<input type="checkbox" id="snow_box">');
  switchcontainer1.append('<span class="toggleslider round"></span>');
  search.append(switchcontainer1)
  search.append('<p>Rain:</p>')
  let switchcontainer2 = $('<label class="switch"></label>');
  switchcontainer2.append('<input type="checkbox" id="rain_box">');
  switchcontainer2.append('<span class="toggleslider round"></span>');
  search.append(switchcontainer2)
  windowcontainer.append(search);
  windowcontainer.append('<div class="ticketwindow"></div>');


}

//when the button is clicked, it converts button value to a string
//NEEDS TO BE UPDATED TO RUN HUTCH'S CODE
var newpage = function (CityCode) {
  create_page(CityCode.id)
}

var create_page = function (citycode) {
  //this is Hutch and Michael's create newpage function 
  console.log(citycode)
}

//SJ-when slider is moved, changed page temp value
var temp_update = function () {
  var slider = document.getElementById("myRange");
  var output = document.getElementById("demo");
  output.innerHTML = slider.value
}
//SJ - when temp slider is released, refresh the airports
var temp_release = function () {
  var slider = document.getElementById("myRange");
  var snow_slider = document.getElementById("snow_box")
  var rain_slider = document.getElementById("rain_box")
  add_to_page(slider.value, snow_slider.checked, rain_slider.checked);
}