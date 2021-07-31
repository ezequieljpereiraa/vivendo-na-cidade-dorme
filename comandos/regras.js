const Discord = require('discord.js');
const cron = require('cron');

module.exports = {
	name: 'configurarregras',
	alias: [''],
	description: 'comando ping de teste',
	run: async (client, message, args, database) => {

        const embedRegras = new Discord.MessageEmbed()
        .setColor('PURPLE')
        .setTitle('REGRAS | LEIA COM ATENÇÃO! ^^')
        .setDescription(`
        **Maggie diz:** SEJA BEM-VINDE AO SERVER CIDADE DORME!!

        Antes de qualquer coisa você precisa saber das nossas regras. Não se preocupe, tudo aqui é bem simples!

        **- Seja gentil e tenha bom senso.

- Não faça spam ou flood (enviar um monte de mensagem atrás da outra só para bagunçar os canais).

- Respeite a raça, religião, sexualidade, gênero ou qualquer outra individualidade dos outros habitantes.

- Respeite as crianças do servidor e tome cuidado com o que vai falar na frente delas.

- Não compartilhe ou envie imagens +18 nos nossos canais.**

Agora deixe a gente saber um pouco mais sobre você no canal <#855904569502466058> e entenda mais sobre a cidade na nossa <#855921405777150012>.
        
Aqui o respeito reina, sinta-se a vontade para dividir o que vocês produzir, fazer perguntas, dividir seus estudos e principalmente FAZER AMIGOS!
`)
        .setThumbnail('https://i.imgur.com/kIvF5uq.png')

        message.channel.send(embedRegras);
      

    }
};