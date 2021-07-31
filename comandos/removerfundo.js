const jimp = require("jimp");
const Discord = require('discord.js');

module.exports = {
	name: 'removerfundo',
	alias: ['fundopadrão','removerbg','bgpadrão'],
	description: 'Mude o plano de fundo do seu perfil. Envie o comando /fundo + link da imagem.',
	run: async (client, message, args, database) => {
        const Filter = (reaction, user) => user.id == message.author.id;
        
        const EmbedFundo = new Discord.MessageEmbed()
		.setColor('GREEN')
		.setTitle('Remover fundo personalizado do perfil')
		.setDescription('Utilize as reações para confirmar ou cancelar a ação.')
		.addField('ATENÇÃO', `**Deseja mesmo remover o plano de fundo do seu perfil? Você ficará com o fundo padrão.** `, false)

        const perguntaFundo = await message.channel.send(EmbedFundo);
        
        await perguntaFundo.react("✅");
        await perguntaFundo.react("❌");
        
        perguntaFundo.awaitReactions(Filter, {max: 1, time: 30000, errors: ["time"]}).then(async collected => {
		
			const reaction = collected.first();

			switch (reaction.emoji.name) {
				case "✅":
					let db = await database.ref(`Servidores/Perfil/${message.author.id}/Fundo`).once('value');
            if (db.val() == null){
                let db = await database.ref(`Servidores/Perfil/${message.author.id}/Fundo`).set({
                    bg: 'https://i.imgur.com/d2sZmwZ.jpg'
                    
                })
                await message.delete();
                await message.reply(`**fundo removido. Veja seu perfil digitando /perfil!**`)
            } else {
                let db = await database.ref(`Servidores/Perfil/${message.author.id}/Fundo/`).update({
                    bg: 'https://i.imgur.com/d2sZmwZ.jpg'
                })
                await message.delete();
                await message.reply(`**fundo removido. Veja seu perfil digitando /perfil!**`)
            }
					break
				case "❌":
                    await message.delete();
					message.channel.send(`**Comando cancelado!**`)
					break
			}
		}).catch()
		

        
        // .catch( () => {
        //     return message.reply('**Url invalido. Tente novamente!**');
        // })
    }
}