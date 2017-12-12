var Telegram = require('telegram-node-bot')
var TelegramBaseController = Telegram.TelegramBaseController
var GeocoderService = require('./geocoder')
var Utils = require('./utils')

class FinderController extends TelegramBaseController {

    /**
     * @param {Scope} scope
     */
    handle(scope) {
        scope.sendMessage('Elaboro la tua richiesta...\n')

        GeocoderService.getCapByLocation(scope.message.location.latitude, scope.message.location.longitude, function(err, cap) {
            var request = require('request');
            request("http://opendatasalutedata.cloudapp.net/v1/datacatalog/Farmacie/?$filter=cap   eq '" + cap + "' &format=json",
                function(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        var resultObject = JSON.parse(body);
                        var list = resultObject.d;
                        var message = '';
                        var index = 1;
                        list.forEach(function(pharmacy) {
                            if (pharmacy.datafinevalidita === '-' && Utils.distanceBetweenTwoGeoPoint(pharmacy.latitudine, pharmacy.longitudine, scope.message.location.latitude, scope.message.location.longitude) < 0.7) {
                                message = message.concat('\nRISULTATO N° ' + index + '\n');
                                message = message.concat('Farmacia: \n' + pharmacy.descrizionefarmacia + '\n\n');
                                message = message.concat('Indirizzo: \n' + pharmacy.indirizzo + ' ' + pharmacy.cap + ' ' + pharmacy.descrizionecomune + '\n\n');
                                message = message.concat('Tipo di farmacia: \n' + pharmacy.descrizionetipologia + '\n\n');
                                message = message.concat('Google maps: \n https://www.google.com/maps/?q=' + pharmacy.latitudine.replace(",", ".") + ',' + pharmacy.longitudine.replace(",", ".") + '\n');
                                index++;
                            }
                        });
                        scope.sendMessage(message);
                    }
                })
        });
    }
}


// module.export{
module.exports.FinderController = FinderController;
