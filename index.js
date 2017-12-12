'use strict'
const Parameters = require('./credentials.js')

const Telegram = require('telegram-node-bot')
const TextCommand = Telegram.TextCommand
const RegexpCommand = Telegram.RegexpCommand
const telegram = new Telegram.Telegram(Parameters.token, {
    workers: 1
})

const StartController = require("./start").StartController;
const OtherwiseController = require("./otherwise").OtherwiseController;
const PostsController = require("./posts").PostsController;
const PagesController = require("./pages").PagesController;
const AuthorController = require("./author").AuthorController;

telegram.router
    .when(new RegexpCommand(/ciao|hey|we|ping/i), new StartController())
    .when(new TextCommand('/start'), new StartController())
    .when(new TextCommand('/last'), new PostsController())
    .when(new TextCommand('/pages'), new PagesController())
    .when(new TextCommand('/author'), new AuthorController())
    .otherwise(new OtherwiseController())

