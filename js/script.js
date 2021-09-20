
 var seatGeekApiUrl = 'https://api.seatgeek.com/2/events?client_id=&client_id=MjMzOTUyMTJ8MTYzMTg0NTU2NC4zMDQ1MzI4'
    
    fetch(seatGeekApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                stateVenueResults(data)
            });
        } 
    })

// for (var i = 0; i < data.events.length; i++) {
//     //Take value input from html and compare it to for loop and find which one has 'this' location, and that's the one we need
// }


    var stateVenueResults = function (data) {
        var exampleText = data.events[0].venue.state;
        console.log(exampleText);
    }
