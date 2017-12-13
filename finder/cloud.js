var request = require('request');
var Utils = require('./utils');
var Constant = require('./../constants');
var GeocoderService = require('./geocoder');

module.exports = {}

// Public methods

/**
 *
 * @param message messaggio in input
 */
var getPharmaciesListByParam = function(message, cb){
    if (message.text) {
        getNearestPharmaciesByCap(message.text, cb);
    } else if (message.location && message.location.latitude && message.location.longitude) {
        GeocoderService.getCapByLocation(message.location.latitude, message.location.longitude, function(err, cap) {
            getNearestPharmaciesByCapAndCurrentPosition(cap, message.location.latitude, message.location.longitude, cb);
        });
    } else {
        cb(Constant.ERROR_MESSAGE_DEFAULT);
    }
}

var getNearestPharmaciesByCapAndCurrentPosition = function(cap, currentLat, currentLon, cb) {

    var array = [];
    _requestOpenData(cap, function(error, list) {

        if (error) {
            cb(Constant.ERROR_MESSAGE_DEFAULT);
        } else {
            list.forEach(function(pharmacy) {
                if (pharmacy.datafinevalidita === '-' && Utils.distanceBetweenTwoGeoPoint(pharmacy.latitudine, pharmacy.longitudine, currentLat, currentLon) < 0.7) {
                    array.push(pharmacy);
                }
            });
            cb(null, array);
        }

    });
}

var getNearestPharmaciesByCap = function(cap, cb) {
    _requestOpenData(cap, function(error, list) {
        if (error) {
            cb(Constant.ERROR_MESSAGE_DEFAULT);
        } else {
            cb(null, list.filter(function(p) {
                return p.datafinevalidita === '-';
            }));
        }
    });
}

// Private methods
function _requestOpenData(cap, cb) {
    request("http://opendatasalutedata.cloudapp.net/v1/datacatalog/Farmacie/?$filter=cap   eq '" + cap + "' &format=json",
        function(error, response, body) {
            if (error) {
                cb(error);
            } else {
                var resultObject = JSON.parse(body);
                var list = resultObject.d;
                cb(null, list);
            }
        });
}


// Export
module.exports.getNearestPharmaciesByCapAndCurrentPosition = getNearestPharmaciesByCapAndCurrentPosition;
module.exports.getNearestPharmaciesByCap = getNearestPharmaciesByCap;
module.exports.getPharmaciesListByParam = getPharmaciesListByParam;
