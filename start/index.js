const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
class StartController extends TelegramBaseController {

    /**
     * @param {Scope} $
     */
    handle($) {
        $.sendMessage('Ciao, ti aiuterò a trovare la farmacia più vicina a te.\n\nPer maggiori informazioni sui comandi a tua disposizione mandami un /help.\n')
    }
}


// module.export{a
module.exports.StartController = StartController;
