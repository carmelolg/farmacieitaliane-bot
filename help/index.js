const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
class HelpController extends TelegramBaseController {

    /**
     * @param {Scope} $
     */
    handle($) {
        $.sendMessage('A. Vuoi trovare una farmacia intorno a te? Inviami la tua posizione.\n')
        $.sendMessage('B: Vuoi l\'elenco delle farmacie della tua città? Scrivimi il nome del tuo comune.\n')
        $.sendMessage('NB: se invii il nome di un comune che non esiste, non posso aiutarti in nessun modo. \n')
    }
}


// module.export{a
module.exports.HelpController = HelpController;
