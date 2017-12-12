const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
class StartController extends TelegramBaseController {

    /**
     * @param {Scope} $
     */
    handle($) {
        $.sendMessage('Benvenuto nel bot di Vita da fuori campus!')
    }
}


// module.export{
module.exports.StartController = StartController;
