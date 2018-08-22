function loadCity() {

//GET ID OF COUNTRY CURRENTLY SELECTED
var countryID = $("#inlineFormCountry option:selected").val();
//console.log("countryID:" +countryID);

//GET ID OF PROVINCE CURRENTLY SELECTED
var provinceID = $("#inlineFormProvinceState option:selected").val();
//console.log("provinceID:" + provinceID);

// GET A REFERENCE TO THE CITY NODE
var refCity = firebase.database().ref('baseData/mapping/countries/' + countryID + '/provinces/' + provinceID + '/cities').orderByChild('nameCity');

document.getElementById("inlineFormCity").innerHTML = "";

var itemCount = 0;
refCity.once('value', function(snapshot) {
    var recordCount = snapshot.numChildren();
    document.getElementById("rowCount").innerHTML = recordCount + " city records found.";
    snapshot.forEach(function(childSnapshot) {
        itemCount += 1;
        iKey = childSnapshot.key;
        //console.log(iKey);
        childData = childSnapshot.val();
        //console.log(childData);
        var nameCity = childData.nameCity;
        var textLatitude = childData.textLatitude;
        var textLongitude = childData.textLongitude;
        iKey = iKey + "," + textLatitude + "," + textLongitude
        if (itemCount == 1) {
            document.getElementById("inlineFormCity").innerHTML = "<option selected value='" + iKey + "'>" + nameCity + "</option>"
            document.getElementById("nameCity").value = nameCity;
            document.getElementById("textLatitude").value = textLatitude;
            document.getElementById("textLongitude").value = textLongitude;
        } else {
            document.getElementById("inlineFormCity").innerHTML = document.getElementById("inlineFormCity").innerHTML + "<option value='" + iKey + "'>" + nameCity + "</option>"
        };

        if (itemCount == recordCount) {};
    });
});
};