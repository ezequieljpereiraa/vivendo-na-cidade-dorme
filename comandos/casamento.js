const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
	name: 'casamento',
	alias: ['casar'],
	description: 'Escolha uma casa para morar na Cidade Dorme.',
	run: async (client, message, args, database) => {

		// esse comando usa o Canvas para fazer a montagem com a foto dos usuarios e tbm reações

		const mencionausuario = message.mentions.users.first(); 
		const autordopedido = message.author.username
		let dbcasa = await database.ref(`Servidores/Perfil/${message.author.id}`).once('value');
		if (!mencionausuario){
			message.channel.send(`${message.author.username}, você não pode se casar com o vento. **Mencione alguém!**`)
		} else if (mencionausuario.id == message.author.id){
			message.channel.send(`${message.author.username} se amar é bom, mas já não é um pouco demais casar com você mesmo? Mencione uma pessoa que não seja **você.**`)
			
		} else if (dbcasa.val().Relacionamento == mencionausuario.username){
			message.channel.send(`${message.author.username}, você já está em um relacionamento com ${mencionausuario.username}.`)
		} else if (dbcasa.val().Relacionamento == 'Nenhum.') {
			const Filter = (reaction, user) => user.id == message.author.id;

			
	
			const Embed = new Discord.MessageEmbed()
			.setColor('PURPLE')
			.setTitle('Se casar')
			.setDescription(`Você deseja pedir a mão de **${mencionausuario}** em casamento? Clique na aliança para pedir.`)
			.setThumbnail('https://24.media.tumblr.com/c22bd3fe0fe2ec0944a2ef943bbff342/tumblr_mhnp3ctps41re3f0qo1_500.gif')
	
			const reactionMessage = await message.channel.send(Embed);
			
			await reactionMessage.react("💍");
			await reactionMessage.react("❌");
			reactionMessage.awaitReactions(Filter, {max: 1, time: 50000, errors: ["time"]}).then(async collected => {
			
				const reaction = collected.first();
	
		switch (reaction.emoji.name) {
	
					
		case "💍":
					//começa segundo codigo
					const FiltroMencionado = (reaction, user) => user.id == mencionausuario.id;
						const aceita = new Discord.MessageEmbed()
			.setColor('PURPLE')
			.setTitle('Pedido de casamento')
			.setDescription(`${mencionausuario}, você aceita o pedido de casamento de ${message.author.username}?`)
			.setThumbnail('https://media1.giphy.com/media/h7p31z5pWVwV1aenEh/giphy.gif')
			const reactionAceita = await message.channel.send(aceita);
			
			await reactionAceita.react("✅");
			await reactionAceita.react("❌");
	
			reactionAceita.awaitReactions(FiltroMencionado, {max: 1, time: 50000, errors: ["time"]}).then(async collected => {
			
				const reaction = collected.first();
	
				switch (reaction.emoji.name) {
					case "✅":
						dbcasa = await database.ref(`Servidores/Perfil/${message.author.id}`).update({
							Relacionamento: mencionausuario.username,
							RelacionamentoID: mencionausuario.id
						})
						let dbmencionado = await database.ref(`Servidores/Perfil/${mencionausuario.id}`).once('value');
						dbmencionado = await database.ref(`Servidores/Perfil/${mencionausuario.id}`).update({
							Relacionamento: message.author.username,
							RelacionamentoID: message.author.id
						})
						message.channel.send('', {files: ["https://art.pixilart.com/b4b7a4350309388.gif"]})

						const canvas = Canvas.createCanvas(600, 266);
						const ctx = canvas.getContext('2d');
						//fundo + coração 
						//https://i.imgur.com/gT0Ub6u.jpg
						const background = await Canvas.loadImage('https://i.imgur.com/rEIsfhN.png');
						ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
						// mensagem melosa
						let mensagensMelosas = ['> voz surrura no fundo da igreja: Só vim pelos doces... Quer dizer... *PALMAS* Que belo casal!', 
						'> voz surrura no fundo da igreja: Tem gosto para tudo... Quer dizer... *PALMAS* Que emoção!',
						'> voz surrura no fundo da igreja: Será que dura? Quer dizer... *PALMAS* Belo casal!'
						]
						const random = Math.floor(Math.random() * mensagensMelosas.length);
				
						ctx.font = '13px "Arial"';
						ctx.fillStyle = '#ffffff';
						ctx.fillText(mensagensMelosas[random], 20, 250);
				
						ctx.font = '18px "Arial"';
						ctx.fillStyle = '#ffffff';
						ctx.fillText(`A cidade celebra: ${message.author.username} e ${mencionausuario.username} oficializaram a união!`, 19, 220);
				
						//avatares
						const avatar1 = await Canvas.loadImage(message.author.avatarURL({dynamic: true, format: 'jpg', size: 1024 }));
				
						ctx.drawImage(avatar1, 20, 14, 150, 150);
						
						const avatar2 = await Canvas.loadImage(mencionausuario.avatarURL({dynamic: true, format: 'jpg', size: 1024 }));
				
						ctx.drawImage(avatar2, 430, 14, 150, 150);
				
						//coração
				
						const heart = await Canvas.loadImage('https://i.imgur.com/0yBuC7i.png');
				
						ctx.drawImage(heart, 230, 14, 150, 150);
				
						const gerarCasamento = new Discord.MessageAttachment(canvas.toBuffer(), 'casamento-cidadedorme.png');
							message.channel.send(``,  gerarCasamento);
						break
					case "❌":
						message.channel.send(`**UM SOCO DOERIA MENOS!!** Não... Não... Que lástima, que dor... ${mencionausuario.username}** recusou o seu pedido!** Se você correr agora talvez ninguém veja sua vergonha!`, {files: ["https://i.imgur.com/z2JBcTw.gif"]});
						
					break
				}
			}).catch(() => {
                message.reply(`**as vezes o silêncio é uma resposta. Forças ${message.author.username}... Você vai precisar!**`);
            });
		break
		case "❌":
			message.channel.send(`**Pedido cancelado!** Mais coragem da próxima vez!`);
			
		break
		
		} // fim switch primeiro codigo
		
	}).catch(() => {
		message.reply(' você demorou tempo demais para tomar uma decisão. Comando cancelado!');
	});// fim primeiro codigo
		} else {
			message.channel.send(`**OPA ${message.author.username},  espere um pouco.** Você deseja se casar com outra pessoa? Para isso é necessário se divorciar. **Utilize o comando /divorciar.**`)
			
			  // fim do primeiro codigo
			
		} // FECHA CODIGO DPS VERIFICAÇÃO SE JÁ É CASADO
		
	}
};

