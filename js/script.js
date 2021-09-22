// var userState = "Oregon";
// var vaxCoverageApi = "https://disease.sh/v3/covid-19/vaccine/coverage/states/" + userState + "?lastdays=30&fullData=true";
// var date = "12";
// var vaxDateApi = "https://disease.sh/v3/covid-19/vaccine/coverage/states/" + userState + "?lastdays=" + date + "&fullData=true"
var vaxCoverageApi ="https://disease.sh/v3/covid-19/vaccine/coverage/states?lastdays=15&fullData=true"
 


fetch(vaxCoverageApi).then(function (response) {
    if (response.ok) {
        response.json().then(function (data) {
            console.log(data)
        });
    }
});



    
   











