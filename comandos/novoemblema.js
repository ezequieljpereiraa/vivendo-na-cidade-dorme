const Discord = require('discord.js');

module.exports = {
	name: 'novoemblema',
	alias: [''],
	description: 'comando ping de teste',
	run: async (client, message, args, database) => {
        // VARIAVEIS BASICAS
        let nomeEmblema = args[0] // PEGA A PRIMEIRA COISA DIGITADA DEPOIS DO COMANDO
        let urlEmblema = args[1] // PEGA A SEGUNDA
        let respostas = ['Sim','sim','SIM'] // RESPOSTAS QUE O USUARIO PODE DAR
        let usuario = message.author.id

        // CONEXAO DB E CRIA UM NOVO EMBLEMA CASO NÃO EXISTA NENHUM
        if(message.member.roles.cache.find(r => r.name === "Adms")) {

        let dbEmblemas = await database.ref(`Servidores/Perfil/Emblemas/`).once('value');
        if (dbEmblemas.val() == null){
            dbEmblemas= await database.ref(`Servidores/Perfil/Emblemas/`).set({
                novato: ".img/selos/novato.png"
            })
        } 

		if (!args.length) {
			return message.channel.send(`${message.author.username}, você não configurou nenhum emblema!`);
		}
		else if (args[0]) {
        const Guild = client.guilds.cache.get("695652027891581019"); 
        const Members = Guild.members.cache.map(member => member.user.id);

    //         object = Object.assign(...Members.map(valor => ({ nome: nomeEmblema, url: urlEmblema, [valor]: 'false' })));
	// let aaa = JSON.stringify(object)

    const embedNovoemblema = new Discord.MessageEmbed()
		.setColor('GREEN')
		.setTitle('Criar novos emblemas')
		.setDescription('Verifique as informações abaixo e digite **sim** para confirmar. Todos os usuarios não recebem o emblema por padrão. Para dar emblemas digite /addemblema.')
		.setThumbnail(urlEmblema)
        .addField('NOME', `${nomeEmblema}`, false)
        .addField('LINK DA IMAGEM',  `${urlEmblema}`, false)

            message.channel.send(embedNovoemblema).then(msg1 => {
                let confirma = message.channel.createMessageCollector(c => c.author.id === message.author.id, {max: 1})
                .on('collect', c => {
                    resposta1 = c.content
                    let encontrou = respostas.includes(resposta1); 
                    if (encontrou == true){
                        database.ref(`Servidores/Perfil/Emblemas/`).update ({
                            [nomeEmblema]: urlEmblema
                        

                        })
                        message.channel.send(`**EMBLEMA ENVIADO COM SUCESSO!**`)
                    } else {
                        return message.channel.send('**Emblema não configurado!**')
                    }
                })
            }) 
        
    }  
    
} else {
        message.channel.send('**Você não tem permissão para utilizar esse comando!**')
    }
        
        
	}
};