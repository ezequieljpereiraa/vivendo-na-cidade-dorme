const Discord = require('discord.js');
const ms = require('parse-ms');

module.exports = {
	name: 'daily',
	alias: ['arvorebrilhante, arvore'],
	description: 'Premio diario',
	run: async (client, message, args, database) => {
       // Comando da da arvore de diamantes

        let user = message.author;
        let timeout = 86400000; //tempo q o usuario podera ganhar diamantes novamente - 1 dia
        let dbRecompensa = await database.ref(`Servidores/Perfil/${message.author.id}/recompensaDiaria`).once('value');
        
      

        // verificar se o usuario tem uma tabela de recompensaDiaria e se tiver continua
       
        if (dbRecompensa.val() == null){
            dbRecompensa = await database.ref(`Servidores/Perfil/${message.author.id}/recompensaDiaria`).set({
                recompensaDiaria: 'esperandoData'
                
            })
        message.channel.send("Configurando algumas coisas... Tente novamente!")
        }
        
        let author =  dbRecompensa.val().recompensaDiaria

        if(author !== null && timeout - (Date.now() - author) > 0){

            let time = ms(timeout - (Date.now() - author));

            const embedJapegou = new Discord.MessageEmbed()
        .setColor('GREEN')
		.setTitle('A ÁRVORE BRILHANTE PRECISA DESCANSAR')
		.setDescription(`**Você ja coletou diamantes hoje.** Deixe a natureza descansar. Você pode tentar novamente em ${time.days} dias, ${time.hours} hora(s), ${time.minutes} minutos, e ${time.seconds} segundos.`)
		.setThumbnail('https://i.imgur.com/z0UbaBz.png')
            return message.channel.send(embedJapegou)
        } else {
            let dbInfo =  await database.ref(`Servidores/Perfil/${message.author.id}`).once('value');
            let amount = Math.floor(Math.random() * 50) + 1;
            let valor = dbInfo.val().xp

            

            database.ref(`Servidores/Perfil/${message.author.id}`).update({
                xp: valor + amount
            })

            database.ref(`Servidores/Perfil/${message.author.id}/recompensaDiaria`).set({
                recompensaDiaria: Date.now()
            })

            const embedPegardiamante = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('A ÁRVORE BRILHANTE')
            .setDescription(`${user} se aproxima da grande árvore brilhante e ganha **${amount}** diamantes. **Que dia de sorte!**`)
            .setThumbnail('https://i.imgur.com/kczPmcw.png')

            message.channel.send(embedPegardiamante)
        }
        

    }
}