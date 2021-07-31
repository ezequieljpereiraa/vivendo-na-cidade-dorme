const Discord = require('discord.js');
module.exports = {
	name: 'casa',
	alias: ['casinha', 'house'],
	description: 'Escolha uma casa para morar na Cidade Dorme.',
	run: async (client, message, args, database) => {
// ESSE É UM COMANDO USANDO REAÇÕES, EU USO ESSE CODIGO EM VÁRIOS LUGARES
		const Filter = (reaction, user) => user.id == message.author.id;

		let dbcasa = await database.ref(`Servidores/Perfil/${message.author.id}`).once('value');
		let verificaDiamantes = await database.ref(`Servidores/Perfil/${message.author.id}`).once('value');
		const Embed = new Discord.MessageEmbed()
		.setColor('GREEN')
		.setTitle('🏠 IMOBILIÁRIA DO LUÍS')
		.setDescription('**Luis abre um sorriso e diz:** Utilize as reações para adquirir uma nova casa. Vai ser um prazer vender para você!')
		.setThumbnail('https://i.imgur.com/WxGvJgg.png')
		.addField('CASA', `**Localizada:** Vila dos Impuros - 💎 300`, true)
		.addField('APARTAMENTO', `**Localizado:** Região Central - 💎 1.200`)
		.addField('FAZENDA', `**Localizada:** Fazendas do Norte - 💎 4.200`, true)
		.addField('MANSÃO ELEGANTE', `**Localizada:** BurguesCity - 💎 10.000`)
		.setImage('https://i.imgur.com/YWwLWaA.png')

		const semDiamantes = new Discord.MessageEmbed()
		.setColor('GREEN')
		.setTitle('🚨 Luís bufa:')
		.setDescription(`Runf.. ${message.author.username}, parece que você não tem diamantes o suficiente para comprar essa casa!`)
		.setThumbnail('https://i.imgur.com/TcTQ4mZ.png')

		const reactionMessage = await message.channel.send(Embed);


		await reactionMessage.react("🟩");
		await reactionMessage.react("🟨");
		await reactionMessage.react("🟦");
		await reactionMessage.react("🟥");

		reactionMessage.awaitReactions(Filter, {max: 1, time: 30000, errors: ["time"]}).then(async collected => {
		
			const reaction = collected.first();

			switch (reaction.emoji.name) {
				case "🟩":
					
				// Removendo diamante do usuario e dando a casinha comprada
					if (verificaDiamantes.val().xp < 300){
						message.channel.send(semDiamantes);
					}else {
						dbcasa = await database.ref(`Servidores/Perfil/${message.author.id}`).update({
						Casa: 0,
						xp: verificaDiamantes.val().xp - 300
					})
					message.channel.send(`**Luís diz:** Parabéns, ${message.author.username}. Você acaba de adquirir uma simples... normal... comum... casa padrão. Mas garanto que é ótima!`);
					}
					
					break
				case "🟨":
					if (verificaDiamantes.val().xp < 1200){
						message.channel.send(semDiamantes);
					}else {
						dbcasa = await database.ref(`Servidores/Perfil/${message.author.id}`).update({
						Casa: 1,
						xp: verificaDiamantes.val().xp - 1200
					})
					message.channel.send(`**Luís diz:** Parabéns, ${message.author.username}. Você acaba de adquirir um apartamento! Dizem que não é bom fazer barulho depois das 22h00...`);
					}
					break
				case "🟦":
					if (verificaDiamantes.val().xp < 4200){
						message.channel.send(semDiamantes);
					}else {
						dbcasa = await database.ref(`Servidores/Perfil/${message.author.id}`).update({
						Casa: 2,
						xp: verificaDiamantes.val().xp - 4200
					})
					message.channel.send(`**Luís diz:** Parabéns, ${message.author.username}. Você acaba de adquirir uma casa na fazenda. Como é bom estar longe de tudo!`);
					}
					
					break
				case "🟥":
					if (verificaDiamantes.val().xp < 10000){
						message.channel.send(semDiamantes);
					}else {
						dbcasa = await database.ref(`Servidores/Perfil/${message.author.id}`).update({
						Casa: 4,
						xp: verificaDiamantes.val().xp - 10000
					})
					message.channel.send(`**Luís diz:** Parabéns, ${message.author.username}. Deseja um vinho caro? Uma massagem? Como é bom te oferecer uma residência que combina com a sua elegância!`);
					}
					break
			}
		}).catch(() => {
            message.reply(' **parece que você demorou tempo demais para tomar uma decisão.** Luis foi atender outro cliente!');
        }); 
		
	}
};

