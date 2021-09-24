var concertStateInput = 'WA'

var seatGeekApiUrl = 'https://api.seatgeek.com/2/events?venue.state=' + userStateInput + '&client_id=MjMzOTUyMTJ8MTYzMTg0NTU2NC4zMDQ1MzI4'


fetch(seatGeekApiUrl).then(function (response) {
    if (response.ok) {
        response.json().then(function (data) {
            stateVenueResults(data)
            console.log(data);
        });
    }
})

var stateVenueResults = function (data) {
    var exampleText = data.events;
    for (var i = 0; i < exampleText.length; i++) {
        var venueName = data.events[i].venue.name;
        var tableDataPoint = document.createElement('td');
        var venueHolder = document.createElement('span');
        venueHolder.textContent = venueName;
        tableDataPoint.appendChild(venueHolder);
        venueContainer.appendChild(tableDataPoint);

        var showTime = data.events[i].datetime_local
        var listedDate = showTime.split('T')
        var finalListedTime = (moment(listedDate[1], 'HH:mm').format('hh:mm a'));
        console.log(finalListedTime);
        var finalListedDate = (listedDate[0])
        var dateSeparator = finalListedDate.split('-')
        var month = dateSeparator[1];
        var day = dateSeparator[2];
        var year = dateSeparator[0];
        var realDate = month + '-' + day + '-' + year;
        var concertInfoContainer = document.createElement('div');

        var concertDateEl = document.createElement('div');
        var concertNameContainer = document.createElement('span');
        concertNameContainer.textContent = realDate;
        concertDateEl.appendChild(concertNameContainer);
        concertInfoContainer.appendChild(concertDateEl);

        for (var j = 0; j < data.events[i].performers.length; j++) {
            var performersInput = data.events[i].performers[j].short_name;
            console.log(performersInput);
        }
    }
}