const Discord = require("discord.js");

module.exports = {
	name: 'livroatual',
	alias: ['livro','livros'],
	description: 'Mostra informações sobre o Clube do Livro.',
	run: async (client, message, args, database) => {
		let server = message.guild.id
		// let dbcriarlivros = await database.ref(`Servidores/Biblioteca/Marcador/${}`).once('value');
		let dblivroatual = await database.ref(`Servidores/Biblioteca/Marcador/${message.guild.id}`).once('value');

		let infoLivros = {
			Nome: dblivroatual.val().Nome,
			Autor: dblivroatual.val().Autor,
			Sinopse: dblivroatual.val().Sinopse,
			Data: dblivroatual.val().Data,
			Pagina: dblivroatual.val().Pagina,
			Bibliotecario: dblivroatual.val().Bibliotecario
		}
	
		let mostrainfo = new Discord.MessageEmbed()
		.setColor('RED')
		.setTitle('CLUBE DO LIVRO 📚')
		.setDescription('Mais informações no nosso canal do clube.')
		.setThumbnail('https://i.imgur.com/fFUJpc2.gif')
		.addField('📖 LIVRO ATUAL:', `\n${infoLivros.Nome}\n`, false)
		.addField('✏️ ESCRITO POR:', `${infoLivros.Autor}`, false)
		.addField('✨ DATA DO ENCONTRO:', `${infoLivros.Data}`, true)
		.addField('✨ NÚMERO DE PÁGINAS:', `${infoLivros.Pagina}`, true)
		.setImage('https://i.imgur.com/ztCPVPu.png')
		.setFooter("Bibliotecário(a): "+infoLivros.Bibliotecario, message.author.displayAvatarURL({size: 32}))
		message.channel.send(mostrainfo)  
	
	

	
    }
};


