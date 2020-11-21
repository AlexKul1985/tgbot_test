import { Telegraf } from 'telegraf' 
import { getConfig } from '../config/config'

const config = getConfig('conf_env')

const bot = new Telegraf(config.bot_section.bot_token)
bot.start((ctx) => { 
    return ctx.reply('Welcome test!')
}
)
bot.launch().then( () => {
    console.log('OK')
})