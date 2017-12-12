module.exports = {}

var distanceBetweenTwoGeoPoint = function(lat1, lon1, lat2, lon2) {

    if (typeof lat1 === 'string') {
        lat1 = parseFloat(lat1.replace(",", "."))
    }

    if (typeof lon1 === 'string') {
        lon1 = parseFloat(lon1.replace(",", "."))
    }

    if (typeof lat2 === 'string') {
        lat2 = parseFloat(lat2.replace(",", "."))
    }

    if (typeof lon2 === 'string') {
        lon2 = parseFloat(lon2.replace(",", "."))
    }

    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);

    var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180)
}

module.exports.distanceBetweenTwoGeoPoint = distanceBetweenTwoGeoPoint;
