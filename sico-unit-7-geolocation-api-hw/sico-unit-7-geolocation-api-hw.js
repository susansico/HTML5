/* sico-unit-7-geolocation-api-hw.js is working in conjunction with sico-unit-7-geolocation-api-hw.html. */

/* Holds Google map. */
var map;

/* Coordinates of Carob Lane, Los Altos */
var authorCoords = {
    latitude:37.353929,
    longitude:-122.087776
};

/* Third optional parameter to getCurrentPosition and watchPosition. */
var options = {
    enableHighAccuracy:true, /* Boolean. Get more accurate reading of coordinates. */
    timeout:27000, /* Browser should wait 5 minutes (set in milleseconds) before giving up and triggering message. */
    maximumAge:30000 /* Browser checks how old cache is against this value set in milleseconds and if older, returns new values. */
};

var watchId;

/* Browser calls function as soon as window loads. */
window.onload = GetMyLocation;

/* GetMyLocation calls Geolocation APIs in the navigator object. */
function GetMyLocation() {

    if (navigator.geolocation) { /* If geolocation is present on the device, proceed.*/

        //navigator.geolocation.getCurrentPosition(DisplayLocation, DisplayError);

        /* If Watch Me button on html page is clicked, WatchLocation is called. */
        var watchButton = document.getElementById("Watch");
        watchButton.onclick = WatchLocation;

        /* If ClearWatch button on html page is clicked, ClearWatch is called. */
        var clearWatchButton = document.getElementById("ClearWatch");
        clearWatchButton.onclick = ClearWatch;
    }
    else alert("Sorry, there is no geolocation support."); /*Geolocation is not present on device. */

}

/* WatchLocation call DisplayLocation, the successhandler, and DisplayError, the errorhandler.  */
function WatchLocation() {

    watchId = navigator.geolocation.watchPosition(DisplayLocation, DisplayError, options);

}

/* ClearWatch sets watchID to null. */
function ClearWatch() {

    if (watchId) {

        navigator.geolocation.clearWatch(watchId);
        watchId = null;

    }

}

/* DisplayLocation is the successhandler for the Geolocation API that displays latitude, longitude, the distance between the author's coordinates and the user's coordinates, and the accuracy of the coordinates, and calls ShowMap to display a Google map of the user's coordinates.  It is called with the Geolocation API position object which contains information about the user's position. */
function DisplayLocation(position) {

    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    /* Display latitude, longitude, and accuracy on the corresponding html page at the Location div. */
    var div = document.getElementById("Locations");
    div.innerHTML = "Your location is: " + "<br><br>";
    div.innerHTML += "Latitude: " + latitude + "<br>";
    div.innerHTML += "Longitude: " + longitude + "<br>";
    div.innerHTML += "Accuracy: " + position.coords.accuracy + " meters";

    /* Compute and display the users position from the author's residence, Carob Lane on the corresponding html page at the Distance div. */
    var km = ComputeDistance(position.coords, authorCoords);
    var distance = document.getElementById("Distances");
    distance.innerHTML = "You are " + km + " km from Carob Lane";

    /* Google Map */
    ShowMap(position.coords);

}

/* DisplayError is the errorhandler called from GetMyLocation.  It uses a switch/case structure to pop up an alert box with an error message for the corresponding error code. It is called with the Geolocation API error object which contains information about the type of error. */
function DisplayError(error) {

    switch(error.code) {

        case error.TIMEOUT:
            alert("Geolocation request timed out");
            break;
        case error.POSITION_UNAVAILABLE:
            alert("Geolocation Position unavailable");
            break;
        case error.PERMISSION_DENIED:
            alert("Geolocation Permission denied");
            break;
        default:
            alert("Geolocation returned an unknown error code: " + error.code);
    }

}

/* ComputeDistance calculates the distance between the user's location and the author's location. */
function ComputeDistance(startCoords, destCoords) {

    /* Computation needs to be in radians. */
    var startLatitudeRadians = DegreesToRadians(startCoords.latitude);
    var startLongitudeRadians = DegreesToRadians(startCoords.longitude);
    var destinationLatitudeRadians = DegreesToRadians(destCoords.latitude);
    var destinationLongitudeRadians = DegreesToRadians(destCoords.longitude);

    var Radius = 6371; /* Radius of the Earth in km. */
    var distance = Math.acos(Math.sin(startLatitudeRadians) * Math.sin(destinationLatitudeRadians) + Math.cos(startLatitudeRadians) * Math.cos(destinationLatitudeRadians) * Math.cos(startLongitudeRadians - destinationLongitudeRadians)) * Radius;

    return distance;

}

function DegreesToRadians(degrees) {

    var radians = (degrees * Math.PI) / 180;

    return radians;

}

/*  ShowMap integrates the Google Maps Javascript API into the Geolocation API. It displays a map of the user's location at the user's latitude and longitude at the Map div on the corresponding html page. */
function ShowMap(coords) {

    /* Google Map API Latitude and longitude object created with LatLng constructor. */
    var googleLatAndLong = new google.maps.LatLng(coords.latitude, coords.longitude);

    /* Options to create map. */
    var mapOptions={
        zoom:10, /* How far in initial map view will be. Range is 0 to 21 with 0 equal t0 worldview, 7 regional, and 18 street. */
        center:googleLatAndLong, /* Centers user's latitude and longitude at user's location using LatLng object's information. */
        mapTypeId:google.maps.MapTypeId.ROADMAP /* Also supports SATELLITE, HYBRID, and TERRAIN.  */
    };

    /* Get Map div on html page. */
    var mapDiv = document.getElementById("Map");
    /* Create map with Google Maps API Map constructor and display at Map div.  */
    map = new google.maps.Map(mapDiv, mapOptions);

    /* Add Google Map pin pointing to user's exact location and create an information window to be shown when user clicks on pin. */
    var title = "Your Location";
    var content = "You are here " + coords.latitude + ", " + coords.longitude;
    /* Call with map, latitude and longitude object, and title and content for information window. */
    AddMarker(map, googleLatAndLong, title, content);

}

/* AddMarker Adds a Google Map pin pointing to user's exact location and creates an information window to be shown when user clicks on pin. The information window shows the user's latitude and longitude coordinates. */
function AddMarker(map, latlong, title, content) {

    var markerOptions = {
        position:latlong,
        map:map,
        title:title,
        clickable:true /*Make the pin clickable so that information window pops up with a click on pin. */
    };

    /* Information Window object with content and latitude longitude object. */
    var infoWindowOptions = {
        content:content,
        position:latlong
    };
    /* Create information window with Google Maps API InfoWindow constructor. */
    var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

    /* Create marker with Google Maps API Marker constructor. */
    var marker = new google.maps.Marker(markerOptions);

    /* Add an event listener that calls the open method of the infoWindow object when user clicks on pin. */
    google.maps.event.addListener(marker, "click", function() {
        infoWindow.open(map, marker);
    });

}