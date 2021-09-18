var userState = "Oregon";
var vaxCoverageApi = "https://disease.sh/v3/covid-19/vaccine/coverage/states/" + userState + "?lastdays=30&fullData=true";
var date = "1";
var vaxDateApi = "https://disease.sh/v3/covid-19/vaccine/coverage/states/" + userState + "?lastdays=" + date + "&fullData=true"
 


fetch(vaxCoverageApi).then(function (response) {
    if (response.ok) {
        response.json().then(function (data) {
            //console.log(data.date);
            //console.log(data.timeline.total);
            //console.log(vaxDateApi);
        });
    }
});

fetch(vaxDateApi).then(function (response) {
    if (response.ok) {
        response.json().then(function (data) {
            //console.log(data.date);
            //console.log(data.timeline.total);
            console.log(data);
        });
    }
});
        

    
   











