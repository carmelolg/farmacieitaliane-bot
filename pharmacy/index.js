const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController

class PharmacyController extends TelegramBaseController {

    /**
     * @param {Scope} scope
     */
    handle(scope) {
        scope.sendMessage('Work in progress')


        // var request = require('request');
        // request("http://opendatasalutedata.cloudapp.net/v1/datacatalog/AziendeSanitarieLocali/?$filter=denominazioneazienda eq 'RM/A' &format=json",
        //     function (error, response, body) {
        //         if (!error && response.statusCode == 200) {
        //             console.log(body) // Print the google web page.
        //         }
        //     })
    }
}


module.exports.PharmacyController = PharmacyController;
