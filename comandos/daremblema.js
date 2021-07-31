const Discord = require('discord.js');


module.exports = {
	name: 'addemblema',
	alias: ['daremblema'],
	description: 'comando ping de teste',
	run: async (client, message, args, database) => {
        // um comando que voce pode dar emblemas pras pros usuarios se eles não tiverem
        
        if(message.member.roles.cache.find(r => r.name === "Adms")){
            const mencionausuario = message.mentions.users.first(); // usuario mencionado na mensagem
        
        const Filter = (reaction, user) => user.id == message.author.id; // fiiltro para o react


         if (message.mentions.users.size) { // se algum usuario for mencionado começa os codigos abaixo:
           
            if (args[1]) { // se depois de mencionar o usuario foi digitado o nome do emblema continua o código
                let emblemasalvo = args[1]; // salva o nome do emblema que digiou

                //conecta com o firebase e salva essa conexão em variaveis para ser usadas dps
                let meuemblema = await database.ref(`Servidores/Perfil/${mencionausuario.id}/Emblemas`).once('value'); 
                let xxx = await database.ref(`Servidores/Perfil/Emblemas/${emblemasalvo}/${mencionausuario.id}`).once('value');
                let ide = mencionausuario.id

                if (meuemblema.val() == null){
                    dbEmblemas= await database.ref(`Servidores/Perfil/${mencionausuario.id}/Emblemas/`).set({
                        novato: "https://i.imgur.com/IZ4zrel.png"
                    })
                }


                const Embed = new Discord.MessageEmbed()
		.setColor('GREEN')
		.setTitle('Adicionar/Remover emblemas de usuários')
		.setDescription('Utilize as reações. ➕ - Adiciona emblema | ➖ - Retira emblema |❌ - Cancela')
		.addField('USUARIO', `${mencionausuario}`, true)
		.addField('EMBLEMA', `${emblemasalvo}`, true)
        
        const infos = await message.channel.send(Embed);
                
        await infos.react("➕");
        await infos.react("➖");
        await infos.react("❌");
                
        infos.awaitReactions(Filter, {max: 1, time: 40000, errors: ["time"]}).then(async collected => {
                    
        const reaction = collected.first();
                    
		switch (reaction.emoji.name) {
			case "➕":
                const todosEmblemas = []// array com os emblemas
                let listadeemblemas = await database.ref(`Servidores/Perfil/Emblemas`).once('value');
                // Object.keys(listadeemblemas.val() ).forEach((key) => {
                //     todosEmblemas.push([key], listadeemblemas.val()[key]);
                //   });

                

                Object.keys(listadeemblemas.val()).forEach(function(key) {
                    todosEmblemas.push(key, listadeemblemas.val()[key]);
                }); // tranforma as info do banco de dados em uma array, pq array tem index e precisamos deles
                console.log(todosEmblemas)
                let indexNome = todosEmblemas.indexOf(emblemasalvo); // pega o index do nome do emblema
                let contaMatematica = indexNome + 1 // pega o index do nome do emblema e adiciona + 1 trazendo o index do url. Ex: 0 = Novato 1 = novato.png
                let indexUrl = todosEmblemas.slice(contaMatematica,contaMatematica + 1); //Pega o url dentro da array usando o index que calculamos
                let urlEmblema = indexUrl.join() // transforma no url pego em uma string de texto, sem array
                console.log(indexNome) //ok
                console.log(contaMatematica) //ok
                console.log(indexUrl) //ok
                console.log(urlEmblema) //ok

                let encontrou = todosEmblemas.includes(emblemasalvo); // procura na nossa array clone do banco de dados se o emblema digitado existe
                console.log(encontrou)
                 if (encontrou == true){ // se o emblema existe então o usuario ganha ele
                    meuemblema = await database.ref(`Servidores/Perfil/${mencionausuario.id}/Emblemas`).update ({
                        [emblemasalvo]: urlEmblema
                        
                    })
                   
                    message.channel.send(`O emblema **${emblemasalvo}**  foi adicionado a conta de ${mencionausuario.tag}`);
                 }else {
                    message.channel.send(`O emblema **${emblemasalvo}** não existe no banco de dados. Adicione usando /novoemblema!`);
                
                 }

                // if (listadeemblemas.val() == emblemasalvo){
                //      message.channel.send(`Encontrei o emblema **${emblemasalvo}**  no banco de dados.`);
                    
                //     //  message.channel.send(`O emblema **${emblemasalvo}** foi adicionado a ${mencionausuario}!`);
                    
               
                // }else {
                //    message.channel.send(`O emblema **${emblemasalvo}** não existe no banco de dados. Adicione usando /novoemblema!`);
                // //     atualizaemblema = await database.ref(`Servidores/Perfil/${mencionausuario.id}/Emblemas`).update ({
                // //         [listadeemblemas.val().emblemasalvo] : listadeemblemas.val()
                            
                // // });
               
                // }
            
                
			    break
		    case "➖":

                // if (meuemblema.val() == null){
                //     message.channel.send("**EMBLEMA NÃO ENCONTRADO. Verifique se digitou o nome corretamente e tente novamente!**");
                // } else {
                    
                // if (meuemblema.val().nome == emblemasalvo){
                //     atualizaemblema = await database.ref(`Servidores/Perfil/Emblemas/${emblemasalvo}/`).update ({
                //     [mencionausuario.id] : 'false'
                // });
                // message.channel.send(`O emblema **${emblemasalvo}** foi removido de ${mencionausuario}!`);
                // }
                // }
                    
                 break
            case "❌":
                infos.delete();
                message.delete();
                break
            }
        
		}).catch()
        console.log("Demorou demais!") 
            }else{
                return message.reply(`**Você precisa digitar o nome do emblema!**`);
            }
         }else{
            return message.reply('**Mencione um usuario depois do comando!**');
        }
    
        console.log('Você tem essa permissão')
        } else {
            message.channel.send('**Você não tem permissão para utilizar esse comando!**')
        }

        
        
	}
};