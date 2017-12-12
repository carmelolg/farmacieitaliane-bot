const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
class OtherwiseController extends TelegramBaseController {

    /**
     * @param {Scope} scope
     */
    handle(scope) {
        scope.sendMessage('Non fare il furbo, il comando non esiste!')
    }
}


// module.export{
module.exports.OtherwiseController = OtherwiseController;
