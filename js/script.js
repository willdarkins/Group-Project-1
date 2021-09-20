
 var seatGeekApiUrl = 'https://api.seatgeek.com/2/events?client_id=&client_id=MjMzOTUyMTJ8MTYzMTg0NTU2NC4zMDQ1MzI4'
    
    fetch(seatGeekApiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                stateVenueResults(data)
            });
        } 
    })

    var stateVenueResults = function (data) {
        var exampleText = data.events;
        for (var i= 0; i < exampleText.length ; i++) {
            var stateInput = data.events[i].venue.state;
            console.log(stateInput);
        }
    }
