const Discord = require("discord.js");


module.exports = {
    name: 'marcador',
    alias: ['marcarpagina'],  
	description: 'Marque a data e a página que a leitura parou.',
	run: async (client, message, args, database) => {
        // CONEXAO COM BANCO DE DADOS E DEFINIR PRIMEIRO VALOR DATA
        let dbmarcador = await database.ref(`Servidores/Biblioteca/Marcador/${message.guild.id}`).once('value');
       
        if (dbmarcador.val() == null){
            let dbmarcador = await database.ref(`Servidores/Biblioteca/Marcador/${message.guild.id}`).set({
                Data: 0,
                Pagina: 0
            })
        } 

        let marcarLivro = {
            Data: dbmarcador.val().Data,
            Pagina: dbmarcador.val().Pagina
        }
       
       
       
        message.channel.send("Qual a data do próximo encontro?").then(msg1 => {
            let data = message.channel.createMessageCollector(c => c.author.id === message.author.id, {max: 1})
            .on('collect', c => {
                let date = c.content
                database.ref(`Servidores/Biblioteca/Marcador/${message.guild.id}`).update ({
                Data: date,
                });

            if (!date) {
                message.channel.send('Por favor, insira uma data.')
            } else {
                message.channel.send("Quantas páginas tem o livro?").then(msg3 => {
                    let descrição = message.channel.createMessageCollector(d => d.author.id === message.author.id, {max: 1})
                    .on('collect', d => {
                        let desc = d.content
                        database.ref(`Servidores/Biblioteca/Marcador/${message.guild.id}`).update ({
                            Pagina: desc,
                            });
                        message.channel.send("Página marcada com sucesso!")
                        // let anunciar = new Discord.MessageEmbed()
                        //     .setColor('RED')
                        //     .setTitle('MARCADOR DE PÁGINA')
                        //     .setThumbnail('https://i.imgur.com/fFUJpc2.gif')
                        //     .setDescription(`No dia ${date}, paramos a leitura na página ${desc}!`)
                        //     .setFooter("Bibliotecário(a): "+message.author.username, message.author.displayAvatarURL({size: 32}))
                           
                        //     client.channels.cache.get('723590131952648274').send(anunciar) 
                          
                    })
                })
            }
            })
        })
    }
};