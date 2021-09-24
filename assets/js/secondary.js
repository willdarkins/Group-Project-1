var covidContainer = document.querySelector('#covid-container')

var stateInputEl = document.getElementById('state');
// var result = stateInputEl.options[stateInputEl.selectedIndex].text;
var covidContainerEl = document.querySelector('#totalStateCases');

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
    }
}

// convert that to the full state and pass to getCovidCases
function getFullState (abbrvState) {
    var state = states[abbrvState]
    console.log(state)
    getCovidCases(state)
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


function displayCases(covidCases) {
    // window.alert('hello')
        // console.log(covidCases[0].cases)
        var caseContainer = document.createElement('div')
        var caseHolder = document.createElement('span')
        caseHolder.textContent= 'Total State Cases: ' + covidCases[0].cases
        caseContainer.appendChild(caseHolder)
        covidContainer.appendChild(caseContainer)

    }


  getCovidCases('Oregon')
