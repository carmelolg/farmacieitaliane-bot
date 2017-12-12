var Parameters = require('./../credentials.js');

var googleMapsClient = require('@google/maps').createClient({
    key: Parameters.googleApiKey
});

module.exports = {}


var getCapByLocation = function(latitude, longitude, cb) {

    googleMapsClient.reverseGeocode({
        latlng: [latitude, longitude]
    }, function(err, response) {
        if (err) {
            cb(err);
        } else if (response && !err) {
            if (response.json.results.length) {

                var firstResult = response.json.results[0];

                var cap = firstResult.address_components.filter(function(component) {
                    return component.types.indexOf('postal_code') > -1;
                })[0];

                cb(null, cap.short_name);
            }
        }
    });

}



module.exports.getCapByLocation = getCapByLocation;
