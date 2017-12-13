const Telegram = require('telegram-node-bot')
const TelegramBaseController = Telegram.TelegramBaseController
class HelpController extends TelegramBaseController {

    /**
     * @param {Scope} $
     */
    handle($) {
        var message = '';
        message = message.concat('A. Vuoi trovare una farmacia intorno a te? \nInviami la tua posizione.\n\n')
        message = message.concat('B. Vuoi l\'elenco delle farmacie del tuo quartiere? \nInviami il tuo CAP.\n\n')
        message = message.concat('NB: Il bot utilizza gli Open Data del Ministero della Salute.\n' +
            'Se le farmacie che cercavi non sono tra i risultati, è possibile che non sono ancora state aggiunte all\'interno del catalogo.\n\n')
        message = message.concat('Per maggiori informazioni puoi scrivermi. Il mio nickname è @carmelolg.\n\n')
        $.sendMessage(message)
    }
}


// module.export{a
module.exports.HelpController = HelpController;
