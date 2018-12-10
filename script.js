// Use this URL for API Calls
var root_url = "http://comp426.cs.unc.edu:3001/";


$(document).ready(function () {

  login();
  //getcities();
    build_flight_interface('BOS');


});

//SJ
var getweatherdata = function (city) {
  $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=Imperial&APPID=c10bb3bd22f90d636baa008b1529ee25",
    type: "GET",
    dataType: "jsonp",
    success: function (data) {
      console.log(data);
      //will have to do more with the data. for now, it just logs it.
    }
  });
};




var acodetoaid = function (acode) {
  let value = 7;
  $.ajax({
    url: root_url + 'airports?filter[code]=' + acode,
    type: 'GET',
    xhrFields: { withCredentials: true },
    success: (response) => {
      value = response[0].id;
    },
    error: () => { alert('error'); return value; }
  });
  alert('Converting airport code to airport id');
  return value;
};

var aidtocity = function (aid) {
    let value = 'error';

  $.ajax({
    url: root_url + 'airports',
    type: 'GET',
    xhrFields: { withCredentials: true },
    success: (response) => {

      console.log(response);
      for (let i = 0; i < response.length; i++) {
        if (response[i].id == aid) {
          value = response[i].city;
        }
      }
    },
    error: () => { alert('error in aidtoacode'); }

  });
  alert('loading aidtocity');
  return value;
};

var build_flight_interface = function (acode) {
    let body = $('body');
    body.empty();
    // Get airport id given airport code & Get all flight objects that go through that airport

    let flights = getflightinfo(acodetoaid(acode));

    console.log(flights);
    let departures = flights[0];
    let arrivals = flights[1];

    alert('departures: ' + departures.length);

    body.append('<div class="flight departures">');
    for(let i = 0; i < departures.length; i++){
        alert('d'+i);
        console.log('departure'+i+ departures[i].arrival_id);
        body.append(`
        <div class="d" `+ i +` >
            <span class="time"> Departs at: ` + departures[i].departs_at + ` </span>
            <span class="destination"> Destination: ` + aidtocity(departures[i].arrival_id) +  `</span>
            <span class="flightnum"> Flight number: ` +  departures[i].number + `  </span>
            <span class="cancel"> <button class="cancel"> Cancel Flight </button>   </span>
        </div>
        `);
    }
    // Separate departures and arrivals
    body.append('</div>');
    body.append('<br> <br>');

    alert('arrivals: ' + arrivals.length);
    body.append('<div class="flight arrivals">');
    for(let i = 0; i < arrivals.length; i++){
        alert('a'+i);
        body.append(`
         <div class="a` + i +`">
            <span class="time"> Departs at: ` + arrivals[i].departs_at + ` </span>
            <span class="destination"> Destination: ` + aidtocity(arrivals[i].departure_id) + ` </span>
            <span class="flightnum"> Flight number: ` +  arrivals[i].number + `  </span>
            <span class="cancel"> <button class="cancel"> Cancel Flight </button>   </span>
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

//SJ
var getcities = function () {
  $.ajax({
    url: root_url + '/airports',
    type: 'GET',
    xhrFields: { withCredentials: true },
    success: (response) => {
      console.log(response);
      console.log(response.length)
    }
  });
};


var getflightinfo = function (aid) {
  let departure = [];
  let arrival = [];
  $.ajax({
    url: root_url + 'flights',
    type: 'GET',
    dataType: 'json',
    xhrFields: { withCredentials: true },
    success: (response) => {
     
      for (var x = 0; x  <response.length; x++){
        if( response[x].departure_id == aid){
          departure.push(response[x]);
        }
        if(response[x].arrival_id == aid){
          arrival.push(response[x]);
        }
      }
    }
  });
  alert('Flight info retrieved');
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