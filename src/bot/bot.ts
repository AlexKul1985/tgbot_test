import { Telegraf } from 'telegraf' 
import { TelegrafContext } from 'telegraf/typings/context'
import { getConfig } from '../config/config'
import { db } from '../db'

const config = getConfig('conf_env')

const bot = new Telegraf(config.bot_section.bot_token)

bot.start( async ( ctx: TelegrafContext ) => { 
    const data: any =  ctx.from 

    db.task('getInsertUserId', async t => {
        const userId = await t.oneOrNone('SELECT id FROM users WHERE id = $1', Number(data.id), u => u && u.id);
        if( !userId ) {
            await t.one('INSERT INTO users(id,name) VALUES($1,$2) RETURNING id', [Number(data.id), data.first_name], u => u.id);
            console.log('DATA:', data);
            ctx.reply( `Поздравляю, вы добавлены в базу` )
        } else {
            ctx.reply( `Пользователь ${data.first_name} зарегистрирован!` )
        }
    });
    }
)

bot.command('regUsers', async (ctx) => {
    db.any('SELECT * FROM users')
    .then( users => {
        let arrName: Array<string> = users.map( ( user ) => user.name )
        let strName = arrName.join(', ')
        ctx.reply( `Зарегистрированные пользователи: ${strName}` )
    });
})

bot.launch().then( () => {
    console.log('OK')
})