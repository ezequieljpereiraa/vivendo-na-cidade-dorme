const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
	name: 'morarjuntos',
	alias: ['morarcom'],
	description: 'Se mude para a mesma casa que outro habitante da cidade.',
	run: async (client, message, args, database) => {
        let dbverifica = await database.ref(`Servidores/Perfil/${message.author.id}`).once('value');
        const mencionausuario = message.mentions.users.first(); 
		const autordopedido = message.author.username
		
		if (!mencionausuario){
			message.channel.send(`**${message.author.username}, mencione alguém**`)
		} else if (mencionausuario.id == message.author.id){
			message.channel.send(`**${message.author.username} cite outra pessoa sem ser você!**`)
			
		} else if (dbverifica.val().Morando == 'sozinho') {
			const Filter = (reaction, user) => user.id == message.author.id;

			const Embed = new Discord.MessageEmbed()
			.setColor('BLUE')
			.setTitle('Morar juntos')
			.setDescription(`Você deseja morar com **${mencionausuario}**? Utilize as reações.`)
			.setThumbnail('https://i.pinimg.com/originals/8d/b9/4c/8db94c1a04c725fb65aae2a9fc9fe9ab.gif')
	
			const reactionMessage = await message.channel.send(Embed);
			
			await reactionMessage.react("✅");
			await reactionMessage.react("❌");
			reactionMessage.awaitReactions(Filter, {max: 1, time: 50000, errors: ["time"]}).then(async collected => {
			
				const reaction = collected.first();
	
		switch (reaction.emoji.name) {
	
					
		case "✅":
					//começa segundo codigo
					const FiltroMencionado = (reaction, user) => user.id == mencionausuario.id;
						const aceita = new Discord.MessageEmbed()
			.setColor('BLUE')
			.setTitle('Morar juntos | Aceitar novo morador')
			.setDescription(`${mencionausuario}, você quer morar com ${message.author.username}? Vocês podem morar sozinhos procurando uma nova casa em /casa. Utilize as reações.`)
			.setThumbnail('https://i.pinimg.com/originals/8d/b9/4c/8db94c1a04c725fb65aae2a9fc9fe9ab.gif')
			const reactionAceita = await message.channel.send(aceita);
			
			await reactionAceita.react("✅");
			await reactionAceita.react("❌");
	
			reactionAceita.awaitReactions(FiltroMencionado, {max: 1, time: 50000, errors: ["time"]}).then(async collected => {
			
                const reaction = collected.first();
                let dbcasa = await database.ref(`Servidores/Perfil/${message.author.id}`).once('value');
                let dbmencionado = await database.ref(`Servidores/Perfil/${mencionausuario.id}`).once('value');

				switch (reaction.emoji.name) {
					case "✅":
						dbcasa = await database.ref(`Servidores/Perfil/${message.author.id}`).update({
							 Casa: dbmencionado.val().Casa,
							 Morando: mencionausuario.username
						})
						message.channel.send(`Agora ${message.author.username} e ${mencionausuario.username} moram juntos.`)
						
						dbmencionado = await database.ref(`Servidores/Perfil/${mencionausuario.id}`).update({
							Casa: dbmencionado.val().Casa,
							Morando: message.author.username
					   })
						break
					case "❌":
						message.channel.send(`**${mencionausuario.username}** recusou o seu pedido!`);
						
					break
				}
			}).catch(() => {
                message.reply(', você demorou tempo demais para tomar uma decisão. Comando cancelado!');
            }); // fim segundo codigo
		break
		case "❌":
			message.channel.send(`**Parece que você mudou de ideia.** Nada melhor do nosso próprio lar!`);
			
		break
		
		} // fim switch primeiro codigo
		
	}).catch(() => {
        message.reply(' você demorou tempo demais para tomar uma decisão. Comando cancelado!');
    });  // fim do primeiro codigo
		} else {
			message.channel.send(`**${message.author.username}, você já está morando com ${dbverifica.val().Morando}.** Para morar com outra pessoa saia da sua casa atual ou peça para que a pessoa que mora com você saia utilizando /casa.`);
		}
		
	}
};
