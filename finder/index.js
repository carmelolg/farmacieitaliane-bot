const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController

class FinderController extends TelegramBaseController {

    /**
     * @param {Scope} scope
     */
    handle(scope) {
        scope.sendMessage('Non fare il furbo, il comando non esiste!')



        // var request = require('request');
        // request("http://opendatasalutedata.cloudapp.net/v1/datacatalog/AziendeSanitarieLocali/?$filter=denominazioneazienda eq 'RM/A' &format=json",
        //     function (error, response, body) {
        //         if (!error && response.statusCode == 200) {
        //             console.log(body) // Print the google web page.
        //         }
        //     })
    }
}


// module.export{
module.exports.FinderController  = FinderController ;
