var userState = "California";
var vaxCoverageApi = "https://disease.sh/v3/covid-19/vaccine/coverage/states/" + userState + "?lastdays=30&fullData=false";
 
fetch(vaxCoverageApi).then(function (response) {
    if (response.ok) {
        response.json().then(function (data) {
            console.log(data);
        });
    }
});
        

    
   











