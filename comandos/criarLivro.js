const Discord = require("discord.js");

module.exports = {
    name: 'novolivro',
    alias: ['addlivro'],   
	description: 'Adiciona um novo livro no Clube do Livro.',
	run: async (client, message, args, database) => {
        let dbcriarlivros = await database.ref(`Servidores/Biblioteca/Marcador/${message.guild.id}`).once('value');
        if (dbcriarlivros.val() == null){
            let dbcriarlivros = await database.ref(`Servidores/Biblioteca/Marcador/${message.guild.id}`).set({
                Nome: 'Nenhum nome definido.',
                Autor: 'Sem autor definido.',
                Sinopse: 'Sem sinopse.',
                Bibliotecario: 'Não definido.'
            })
        } 

        let adicionarLivro = {
            Nome: dbcriarlivros.val().Nome,
            Autor: dbcriarlivros.val().Autor,
            Sinopse: dbcriarlivros.val().Sinopse,
            Bibliotecario: dbcriarlivros.val().Bibliotecario
        } 
        

        message.channel.send("Qual o nome do livro?").then(msg1 => {
            let nameBook = message.channel.createMessageCollector(c => c.author.id === message.author.id, {max: 1})
            .on('collect', c => {
                let nomeLivro = c.content
                database.ref(`Servidores/Biblioteca/Marcador/${message.guild.id}`).update ({
                    Nome: nomeLivro,
                    });
    
            if (!nomeLivro) {
                message.channel.send('Coloque um nome para o livro.')
            } else {
                message.channel.send("Quem escreveu?").then(msg3 => {
                    let authorBook = message.channel.createMessageCollector(d => d.author.id === message.author.id, {max: 1})
                    .on('collect', d => {
                        let autorLivro = d.content
                        database.ref(`Servidores/Biblioteca/Marcador/${message.guild.id}`).update ({
                            Autor: autorLivro,
                            });
        
                        // let anunciar = new Discord.MessageEmbed()
                        //     .setColor('RED')
                        //     .setTitle('LIVRO QUE ESTAMOS LENDO')
                        //     .setDescription(`**LIVRO:** ${adicionarLivro.Nome} | **ESCRITO POR:** ${adicionarLivro.Autor}.`)
                        //     .setFooter("Bibliotecário(a): "+message.author.username, message.author.displayAvatarURL({size: 32}))
                        
                        // client.channels.cache.get('723590131952648274').send(anunciar)  
                        // database.ref(`Servidores/Biblioteca/Marcador/${message.guild.id}`).update ({
                        //     Bibliotecario: message.author.username,
                        //     });
                          message.channel.send("Livro adicionado com sucesso!")
                    })
                })
            }
            })
        })
    }
};