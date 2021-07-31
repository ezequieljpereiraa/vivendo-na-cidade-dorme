const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
	name: 'lojadofarol',
	alias: ['lojadowilly'],
	description: 'comando ping de teste',
	run: async (client, message, args, database) => {
        let itemEscolhido = ''
        let dbconectaUsuario = await database.ref(`Servidores/Perfil/${message.author.id}`).once('value');
        let minhasvaras  = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar/imagemVaras`).once('value');
        let dbitensPescaria = await database.ref(`Servidores/Perfil/${message.author.id}/itens/Pescaria`).once('value');
        if (dbconectaUsuario.val() == null){
            let db = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).set({
                vara: '0',
                varaEquipada: 0,
                iscas: 0
                
            })
        }

        let dbitensUsuario = await database.ref(`Servidores/Perfil/${message.author.id}/itens`).once('value');
        if (dbitensUsuario.val() == null){
            let db = await database.ref(`Servidores/Perfil/${message.author.id}/itens`).set({
                Pescaria: { // nome item ou tipo, quantidade
                    vara01: 0,
                    vara02: 0,
                    vara03: 0
                }
                
            })
        }

        const Embed = new Discord.MessageEmbed()
		.setColor('BLUE')
		.setTitle('LOJA DO FAROL')
		.setDescription('**Willy sorri para você:** Olá, não ligue para a poeira... Hum, realmente eu eu devia fazer uma faxina nessa velha lojinha, mas estou meio ocupado. Vamos, vamos fique a vontade para olhar meus produtos! **(Clique na reação <:iconeitens:827685855934152725> para ver os itens da loja)**')
		.setThumbnail('https://i.imgur.com/TXL7UoK.png')
		.setImage('https://i.imgur.com/z5NFpN7.png')

        const itensWilly = new Discord.MessageEmbed()
		.setColor('BLUE')
		.setTitle('LOJA DO FAROL - ITENS')
		.setDescription('**Willy diz:** Esses são os itens que tenho a venda. Tudo de ótima qualidade... Ok, algumas coisas não são tão boas assim, mas dá para usar! **(Compre utilizando as reações)**')
        .setThumbnail('https://i.imgur.com/TXL7UoK.png')
        .addField('**Você tem:**',  `**${dbconectaUsuario.val().xp} diamantes.**`, false)
		.setImage('https://i.imgur.com/AmGUdmM.png')
        
        const semDiamantes = new Discord.MessageEmbed()
		.setColor('BLUE')
		.setTitle('LOJA DO FAROL')
		.setDescription('**Willy diz:** Como? Ah, você não tem diamantes o suficiente? Bom, você vai precisar de diamantes para comprar coisas pela cidade. Dizem por aí que existe uma **/arvorebrilhante** que dá diamantes de graça... Ah, bobagem... Deve ser história de pescador!')
		.setThumbnail('https://i.imgur.com/IyXX15o.png')

        

        async function comprouItem() { // COLOQUEI ESSE EMBED NA FUNÇÃO PQ TAVA DANDO CONFLITO COM A ATUALIZAÇÃO DO DB
            let dbitensUsuario = await database.ref(`Servidores/Perfil/${message.author.id}/itens`).once('value');

          const comprouItem = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('LOJA DO FAROL')
        .setDescription(`**Willy diz:** Que belezura, você comprou **${itemEscolhido}**. Obrigado pela compra.. *pisca para você*... **Volte sempre**!`)
        .setThumbnail('https://i.imgur.com/2yDTmsT.png')

        await message.channel.send(comprouItem)
          }
        

        const Filter = (reaction, user) => user.id == message.author.id;

		const reactionMessage = await message.channel.send(Embed);

		await reactionMessage.react("<:iconeitens:827728709678661662>"); //modificado para o server do cidade
	
		reactionMessage.awaitReactions(Filter, {max: 1, time: 30000, errors: ["time"]}).then(async collected => {
		
			const reaction = collected.first();

			switch (reaction.emoji.id) {
				case "827728709678661662": // cod emoji cidade mostrar itens loja |||

                    /// CODIGO REAÇÕES PARA COMPRAR OS ITENS ///
                    
        const Filter2 = (reaction, user) => user.id == message.author.id;

		const reactionMessage2 = await reactionMessage.edit(itensWilly)
    
		await reactionMessage2.react("<:numero1:827728709473140749>");
        await reactionMessage2.react("<:numero2:827728710034522152>");
        await reactionMessage2.react("<:numero3:827729195912003634>");
        await reactionMessage2.react("<:numero4:827729196120932452>");
	
		reactionMessage2.awaitReactions(Filter2, {max: 1, time: 30000, errors: ["time"]}).then(async collected => {
		
			const reaction2 = collected.first();
           
                switch (reaction2.emoji.id) {
				case "827728709473140749": // VARA 01 - VARA SIMPLES
                    
                    itemEscolhido = 'vara simples'


                    if (dbconectaUsuario.val().xp >= 100) {

                            dbconectaUsuario = await database.ref(`Servidores/Perfil/${message.author.id}`).update({
                                xp: dbconectaUsuario.val().xp - 100
                                
                            })
                            
                            dbitensPescaria = await database.ref(`Servidores/Perfil/${message.author.id}/itens/Pescaria`).update({
                                vara01: dbitensPescaria.val().vara01 + 1
                                
                            })

                            minhasvaras = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar/imagemVaras`).update({
                                
                                    imagemvara01 : 'https://stardewvalleywiki.com/mediawiki/images/0/00/Training_Rod.png',
                                
                            })

                            comprouItem();
                        
                            
                    } else {
                           message.channel.send(semDiamantes)
                        }

					break

                    case "827728710034522152": // VARA 02
                    
                    itemEscolhido = 'vara de bambu'

                    if (dbconectaUsuario.val().xp >= 500) {

                            dbconectaUsuario = await database.ref(`Servidores/Perfil/${message.author.id}`).update({
                                xp: dbconectaUsuario.val().xp - 500
                                
                            })
                            
                            dbitensPescaria = await database.ref(`Servidores/Perfil/${message.author.id}/itens/Pescaria`).update({
                                vara02: dbitensPescaria.val().vara02 + 1
                                
                            })

                            minhasvaras = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar/imagemVaras`).update({
                                
                                    imagemvara02 :  'https://stardewvalleywiki.com/mediawiki/images/d/da/Bamboo_Pole.png',
                                
                            })

                            comprouItem();
                        
                            
                    } else {
                           message.channel.send(semDiamantes)
                        }

					break

                    case "827729195912003634":
                        // VARA 03 - VARA DE FIBRA DE VIDRO
           itemEscolhido = 'vara de fibra'
                    
           if (dbconectaUsuario.val().xp >= 4500) {
   
                   dbconectaUsuario = await database.ref(`Servidores/Perfil/${message.author.id}`).update({
                       xp: dbconectaUsuario.val().xp - 4500
                       
                   })
                   
                   dbitensPescaria = await database.ref(`Servidores/Perfil/${message.author.id}/itens/Pescaria`).update({
                       vara03: dbitensPescaria.val().vara03 + 1
                       
                   })

                   minhasvaras = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar/imagemVaras`).update({
                                
                    imagemvara03 : 'https://stardewvalleywiki.com/mediawiki/images/5/5e/Fiberglass_Rod.png',
                
            })
   
                   comprouItem();
               
                   
           } else {
                  message.channel.send(semDiamantes)
               }
                       break

                       case "827729196120932452": // 20 ISCAS
                        
           itemEscolhido = '20 iscas'
                    
           if (dbconectaUsuario.val().xp >= 20) {
            let dbPescar = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).once('value');
                   dbconectaUsuario = await database.ref(`Servidores/Perfil/${message.author.id}`).update({
                       xp: dbconectaUsuario.val().xp - 20
                       
                   })
                   
                   dbPescar = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                       iscas: dbPescar.val().iscas + 20
                       
                   })
   
                   comprouItem();
               
                   
           } else {
                  message.channel.send(semDiamantes)
               }
                       break
			}
		}).catch(() => {
            message.channel.send(`Willy espera e espera **${message.author.username}** tomar uma decisão, mas parece que ele decidiu não comprar nada!`);
        }); 

        ////////// FIM DO CODIGO REAÇÕES PARA COMPRAR ITENS - ABAIXO E O FIM DO CODIGO DO PRIMEIRO EMBED, ENTRANDO NA LOJA -
                        
					break
			}
		}).catch(() => {
            message.channel.send(`**${message.author.username} ** se distrai com algo lá fora e vai embora sem comprar nada.`);
        }); 



    }
}