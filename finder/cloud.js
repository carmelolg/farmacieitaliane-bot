var request = require('request');
var Utils = require('./utils');
var Constant = require('./../constants');

module.exports = {}

var getNearestPharmaciesByCapAndCurrentPosition = function(cap, currentLat, currentLon, cb) {

    var array = [];
    requestOpenData(cap, function(error, list) {

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
    requestOpenData(cap, function(error, list) {
        if (error) {
            cb(Constant.ERROR_MESSAGE_DEFAULT);
        } else {
            cb(null, list.filter(function(p) {
                return p.datafinevalidita === '-';
            }));
        }
    });
}

function requestOpenData(cap, cb) {
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

module.exports.getNearestPharmaciesByCapAndCurrentPosition = getNearestPharmaciesByCapAndCurrentPosition;
module.exports.getNearestPharmaciesByCap = getNearestPharmaciesByCap;
