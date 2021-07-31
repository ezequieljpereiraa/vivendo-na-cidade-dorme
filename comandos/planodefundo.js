const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
	name: 'fundo',
	alias: ['bg','background','planodefundo'],
	description: 'Mude o plano de fundo do seu perfil. Envie o comando /fundo + link da imagem.',
	run: async (client, message, args, database) => {
        const background = await Canvas.loadImage(args[0]).then(async img => {
            let db = await database.ref(`Servidores/Perfil/${message.author.id}/Fundo`).once('value');
            if (db.val() == null){
                let db = await database.ref(`Servidores/Perfil/${message.author.id}/Fundo`).set({
                    bg: args[0]
                })
            } else {
                let db = await database.ref(`Servidores/Perfil/${message.author.id}/Fundo/`).update({
                    bg: args[0]
                })
                await message.delete();
                await message.reply(`**fundo do perfil atualizado com sucesso. Veja seu perfil digitando /perfil!**`)
            }
        }).catch( () => {
            return message.reply('**url inválido. Verifique se seu url termina com .png ou.jpg. Imagens .gif ficaram estáticas. Tente novamente!**');
        })
    }
}