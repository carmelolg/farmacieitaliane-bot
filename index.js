'use strict'
const Parameters = require('./credentials.js')

const Telegram = require('telegram-node-bot')
const TextCommand = Telegram.TextCommand
const telegram = new Telegram.Telegram(Parameters.token, {
    workers: 1
})

const PharmacyController = require("./pharmacy").PharmacyController;
const StartController = require("./start").StartController;
const OtherwiseController = require("./otherwise").OtherwiseController;


telegram.router
    .when(new TextCommand('/start'), new StartController())
    .when(new TextCommand('/somethings'), new PharmacyController())
    .otherwise(new OtherwiseController())

