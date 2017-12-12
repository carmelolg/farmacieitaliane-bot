var Telegram = require('telegram-node-bot')
var TelegramBaseController = Telegram.TelegramBaseController
var FinderService = require('./cloud')
var GeocoderService = require('./geocoder')

class FinderController extends TelegramBaseController {

    /**
     * @param {Scope} scope
     */
    handle(scope) {
        scope.sendMessage('Elaboro la tua richiesta...\n')

        if (scope.message.text) {

        }

        GeocoderService.getCapByLocation(scope.message.location.latitude, scope.message.location.longitude, function(err, cap) {

            FinderService.getNearestPharmaciesByCapAndCurrentPosition(cap, scope.message.location.latitude, scope.message.location.longitude, function(err, list) {
                var message = '';
                var index = 1;
                list.forEach(function(pharmacy) {
                    message = message.concat('\nRISULTATO N° ' + index + '\n');
                    message = message.concat('Farmacia: \n' + pharmacy.descrizionefarmacia + '\n\n');
                    message = message.concat('Indirizzo: \n' + pharmacy.indirizzo + ' ' + pharmacy.cap + ' ' + pharmacy.descrizionecomune + '\n\n');
                    message = message.concat('Tipo di farmacia: \n' + pharmacy.descrizionetipologia + '\n\n');
                    message = message.concat('Google maps: \n https://www.google.com/maps/?q=' + pharmacy.latitudine.replace(",", ".") + ',' + pharmacy.longitudine.replace(",", ".") + '\n');
                    index++;
                });
                scope.sendMessage(message);
            });
        })
    }
}
// module.export{
module.exports.FinderController = FinderController;
