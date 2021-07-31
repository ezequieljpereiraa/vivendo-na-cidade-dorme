const Discord = require('discord.js');

module.exports = {
	name: 'inflação',
	alias: [''],
	description: 'comando ping de teste',
	run: async (client, message, args, database) => {

        let idCanal = "855606089470574632"

        const embedInflacao = new Discord.MessageEmbed()
        .setColor('PURPLE')
        .setTitle('Dados sobre a economia local')
        .setDescription(`A inflação atual de Dorme é de  **2.75%**.
        `)
        .setThumbnail('https://i.pinimg.com/originals/dc/ec/92/dcec92cb65015e4d9a83ec238c683dd8.gif')

        message.channel.send(embedInflacao);
  

    }
};