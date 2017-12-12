const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
class HelpController extends TelegramBaseController {

    /**
     * @param {Scope} $
     */
    handle($) {
        var message = '';
        message = message.concat('A. Vuoi trovare una farmacia intorno a te? \nInviami la tua posizione.\n\n')
        message = message.concat('B: Vuoi l\'elenco delle farmacie della tua città? \nScrivimi il nome del tuo comune.\n\n')
        message = message.concat('NB: se invii il nome di un comune che non esiste, non posso aiutarti in nessun modo. \n\n')
        $.sendMessage(message)
    }
}


// module.export{a
module.exports.HelpController = HelpController;
