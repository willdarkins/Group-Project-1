var stateInputEl = document.getElementById('state');
// var result = stateInputEl.options[stateInputEl.selectedIndex].text;

var covidContainer = document.querySelector('#covid-container')

// an array of states giving full spelling and abbreviations
var states = {'AL': 'Alabama', 'AK': 'Alaska', 'AZ': 'Arizona', 'AR': 'Arkansas',
'CA': 'California', 'CO': 'Colorado', 'CT': 'Connecticut', 'DE': 'Delaware',
'FL': 'Florida', 'GA': 'Georgia', 'HI': 'Hawaii', 'ID': 'Idaho','IL': 'Illinois',
'IN': 'Indiana', 'IA': 'Iowa', 'KS': 'Kansas', 'KY': 'Kentucky', 'LA': 'Louisiana',
'ME': 'Maine', 'MO': 'Maryland', 'MA': 'Massachesetts', 'MI': 'Michigan',
'MN': 'Minnesota', 'MS': 'Mississippi', 'MO': 'Missouri', 'MT': 'Montana',
'NE': 'Nebraska', 'NV': 'Nevada', 'NH': 'New Hampshire', 'NJ': 'New Jersey', 
'NM': 'New Mexico', 'NY': 'New York', 'NC': 'North Carolina', 'ND': 'North Dakota', 
'OH': 'Ohio', 'OK': 'Oklahoma', 'OR': 'Oregon', 'PA': 'Pensylvania', 'RI': 'Rhode Island', 
'SC': 'South Carolina', 'TN': 'Tennessee', 'TX': 'Texas', 'UT': 'Utah', 'VT': 'Vermont', 
'VA': 'Virginia', 'WA': 'Washington', 'WV': 'West Virginia', 'WI': 'Wisconsin', 
'WY': 'Wyoming', 'SD': 'South Dakota',}

// grab value from the dropdown
function getSelectedValue() {
    var abbrvState = stateInputEl.options[stateInputEl.selectedIndex].text;
    if (abbrvState) {
        getFullState(abbrvState)
        getVenue(abbrvState);
    }
}

// convert that to the full state and pass to getCovidCases
function getFullState (abbrvState) {
    var state = states[abbrvState]
    console.log(state)
    getCovidCases(state)
    stateVaxTotals(abbrvState)

}

function getCovidCases(state) {
    var apiUrl = 'https://disease.sh/v3/covid-19/nyt/states/'
    var days = '?lastdays=1'

    fetch (apiUrl + state + days)
    .then(function(covidResponse) {
         if (covidResponse.ok) {
         covidResponse.json().then(function(data){
            // console.log(data);
            var covidCases = data
            console.log(covidCases)
            displayCases(covidCases);
            // displayCases(covidCases)
         });
        } else {
            // temporary failsafe
            console.log("Error")
        }
    })
}

var getSelectedState = function() {
    // get value from option tag in dropdown
    var abbvrState = selectedStateEl.options[selectedStateEl.selectedIndex].value;;
    if (abbvrState) {
        stateVaxTotals(abbvrState);
    }
};



function getVenue(abbrvState) {
var seatGeekApiUrl = 'https://api.seatgeek.com/2/events?venue.state=' + abbrvState + '&client_id=MjMzOTUyMTJ8MTYzMTg0NTU2NC4zMDQ1MzI4'
fetch(seatGeekApiUrl).then(function (response) {
    if (response.ok) {
        response.json().then(function (data) {
            var concertData = data
            stateVenueResults(concertData)
            
        });
    }
})
}

var stateVaxTotals = function (abbvrState) {
    // change object properties (abbreviation) to their values (full name) to insert full name of state into API url
    var fullStateName = states[abbvrState];
    // fetch request with fullStateName var concatenated into API url
    fetch("https://disease.sh/v3/covid-19/vaccine/coverage/states/" + fullStateName + "?lastdays=2&fullData=true")
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data.timeline[0].total);
            displayVax(data);
            // create variable that will select the div where the data will be displayed
            // var containerEl = document.querySelector('#test');
            // empty out div before appending vax data
            // containerEl.innerHTML = null
            // var displayVaxTotal = document.createElement("div");
            // displayVaxTotal.setAttribute(data.timeline[0].total);
            // append displayVaxTotal to the div
            // containerEl.appendChild(displayVaxTotal);
        })
};

function displayCases(covidCases) {
    // window.alert('hello')
        // console.log(covidCases[0].cases)
        covidContainer.textContent='';
        var caseContainer = document.createElement('div')
        var caseHolder = document.createElement('span')
        caseHolder.setAttribute('style', 'color: white')
        caseHolder.classList.add('total-state-cases')
        caseHolder.textContent= 'Total State Cases: ' + covidCases[0].cases
        caseContainer.appendChild(caseHolder)
        covidContainer.appendChild(caseContainer)
    }

function displayVax(data) {
    var vaxContainer = document.createElement('div');
    var vaxHolder = document.createElement('span');
    vaxHolder.setAttribute('style', 'color: white')
    vaxHolder.classList.add('total-state-cases')
    vaxHolder.textContent = 'Total Vaccination: ' + data.timeline[0].total
    vaxContainer.appendChild(vaxHolder)
    covidContainer.appendChild(vaxContainer);
}

var stateVenueResults = function (concertData) {
    var exampleText = concertData.events;
    for (var i = 0; i < exampleText.length; i++) {
        var venueName = concertData.events[i].venue.name;
        var venueContainer = document.createElement('div');
        var venueHolder = document.createElement('span');
        venueHolder.setAttribute('style', 'color: white')
        venueHolder.classList.add('total-state-cases');
        venueHolder.textContent = venueName;
        venueContainer.appendChild(venueHolder);
        covidContainer.appendChild(venueContainer);

        var showTime = concertData.events[i].datetime_local
        var listedDate = showTime.split('T')
        var finalListedTime = (moment(listedDate[1], 'HH:mm').format('hh:mm a'));
        var finalListedDate = (listedDate[0])
        var dateSeparator = finalListedDate.split('-')
        var month = dateSeparator[1];
        var day = dateSeparator[2];
        var year = dateSeparator[0];
        var realDate = month + '-' + day + '-' + year;
        var concertInfoContainer = document.createElement('div');
        var concertNameContainer = document.createElement('span');
        concertNameContainer.textContent = realDate + finalListedTime
        concertNameContainer.setAttribute('style', 'color: white');
        concertNameContainer.classList.add('total-state-cases');
        concertInfoContainer.appendChild(concertNameContainer);
        covidContainer.appendChild(concertNameContainer);


        for (var j = 0; j < concertData.events[i].performers.length; j++) {
            var performersInput = concertData.events[i].performers[j].short_name;
            var performerContainer = document.createElement('div');
            var performerHolder = document.createElement('span');
            performerHolder.textContent = performersInput
            performerHolder.setAttribute('style', 'color: white');
            performerHolder.classList.add('total-state-cases');
            performerContainer.appendChild(performerHolder);
            covidContainer.appendChild(performerContainer);
        }
    }
}

// function displayCases();
// create a function that takes the data loops through the arrays and grabs DATES AND CASES
// if (data.length === 0) {
//  attach "no covid data found" to an html
// }
// clear whatever could be in the html
// for (var i = 0; i < data.length; i++) {
// 
// loop through each array to grab covid cases from each day, possibly the dates too


stateInputEl.addEventListener('click', getSelectedValue);