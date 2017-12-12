'use strict'
const Parameters = require('./credentials.js')

const Telegram = require('telegram-node-bot')
const TextCommand = Telegram.TextCommand
const telegram = new Telegram.Telegram(Parameters.token, {
    workers: 1
})

const StartController = require("./start").StartController;
const FinderController = require("./finder").FinderController;
const HelpController = require("./help").HelpController;


telegram.router
    .when(new TextCommand('/start'), new StartController())
    .when(new TextCommand('/help'), new HelpController())
    .otherwise(new FinderController())

