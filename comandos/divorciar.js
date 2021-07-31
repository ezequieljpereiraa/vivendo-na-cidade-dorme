const Discord = require ('discord.js');

module.exports = {
	name: 'divorciar',
	alias: ['divorcio'],
	description: 'Mostra todos os comandos do bot Vida na Cidade Dorme',
	run: async (client, message, args, database) => {

            const Filter = (reaction, user) => user.id == message.author.id; // fiiltro para o react
            let dbdivorcio = await database.ref(`Servidores/Perfil/${message.author.id}`).once('value');
            let idAmor = dbdivorcio.val().RelacionamentoID
            let usernameAmor = dbdivorcio.val().Relacionamento

        if (dbdivorcio.val().Relacionamento == 'Nenhum.'){
            message.channel.send("**Você não está em um relacionamento!**");
        } else {

            const Embed = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setTitle('Divorciar 💔')
            .setDescription(`Deseja mesmo terminar seu relacionamento com ${usernameAmor}? Utilize as reações.`)

            
            const infos = await message.channel.send(Embed);
                    
            await infos.react("✅");
            await infos.react("❌");
    
            infos.awaitReactions(Filter, {max: 1, time: 50000, errors: ["time"]}).then(async collected => {
                        
                const reaction = collected.first();
                            
                switch (reaction.emoji.name) {
                    case "✅":
                        dbuser = await database.ref(`Servidores/Perfil/${message.author.id}/`).update ({
                                Relacionamento: 'Nenhum.',
                                RelacionamentoID: 0
                                    
                        });

                        dbparceiro = await database.ref(`Servidores/Perfil/${idAmor}/`).update ({
                            Relacionamento: 'Nenhum.',
                            RelacionamentoID: 0
                                
                    });
                        message.channel.send(`Você se divorciou de ${usernameAmor}. Nem tudo que é belo dura! Vivam em paz! 💔`);
                        break
                    case "❌":
                        
                            message.channel.send(`**Comando cancelado pelo usuário!**`);
                            break
                }
        }).catch(() => {
            message.reply(' você demorou tempo demais para tomar uma decisão. Comando cancelado!');
        }); 
            

        }


       


    }
}