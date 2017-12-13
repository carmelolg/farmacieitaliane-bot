var Telegram = require('telegram-node-bot');
var TelegramBaseController = Telegram.TelegramBaseController;
var FinderService = require('./cloud');
var Constant = require('./../constants');

class FinderController extends TelegramBaseController {

    /**
     * @param {Scope} scope
     */
    handle(scope) {

        if(scope.message.text && (!Number(scope.message.text) || scope.message.text.length != 5)){
            scope.sendMessage(Constant.USER_NOTPOLITE);
            return;
        }

        scope.sendMessage('Sto cercando le farmacie disponibili, attendi un attimo..\n');
        FinderService.getPharmaciesListByParam(scope.message, function (err, list) {
            if (err) {
                scope.sendMessage(err);
            } else {

                if (!list.length) {
                    scope.sendMessage(Constant.RESUL_EMPTY);
                    return;
                }

                list.forEach(function (pharmacy, index) {
                    var message = '';
                    message = message.concat('Risultato ' + ++index + '\n');
                    message = message.concat('Farmacia: ' + pharmacy.descrizionefarmacia + '\n');
                    message = message.concat('Indirizzo: ' + pharmacy.indirizzo + ' ' + pharmacy.cap + ' ' + pharmacy.descrizionecomune + ' [(Google Maps)](https://www.google.com/maps/?q=' + pharmacy.latitudine.replace(",", ".") + ',' + pharmacy.longitudine.replace(",", ".") + ')\n');
                    message = message.concat('Tipo di farmacia: ' + pharmacy.descrizionetipologia);
                    scope.sendMessage(message, {'parse_mode': 'Markdown'});
                });
            }
        });
    }

}

module.exports.FinderController = FinderController;
