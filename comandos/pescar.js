const Discord = require('discord.js');
const Canvas = require('canvas');

module.exports = {
	name: 'pescar',
	alias: ['mardofarol'],
	description: 'comando ping de teste',
	run: async (client, message, args, database) => {
        let peganomeCanal = message.channel.name
        let dbUsuario = await database.ref(`Servidores/Perfil/${message.author.id}`).once('value');
        let dbPescar = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).once('value');
        let dbMar = await database.ref(`Servidores/Configuracoes/mardofarol`).once('value');
        let dbitensPesca = await database.ref(`Servidores/itensPesca`).once('value');
        let dbimgVara01 = await database.ref(`Servidores/itensPesca/imgVara01`).once('value');
        let dbimgVara02 = await database.ref(`Servidores/itensPesca/imgVara02`).once('value');
        let dbimgVara03 = await database.ref(`Servidores/itensPesca/imgVara03`).once('value');
        let dbConectaItens = await database.ref(`Servidores/Perfil/${message.author.id}/itens/inventario`).once('value');
        let dbConectaPescaria = await database.ref(`Servidores/Perfil/${message.author.id}/itens/Pescaria`).once('value');
       
        if (peganomeCanal === 'mar-do-farol'){
       

        if (dbPescar.val() == null){
            let db = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).set({
                
                vara: 0,
                iscas: 0
                
            })
            message.channel.send("Configuramos o seu modo de pesca. Envie o comando novamente! :)")
        }
        if (dbitensPesca.val() == null){
            dbitensPesca = await database.ref(`Servidores/itensPesca`).update({
                vara01 : "pão estranho, argila, caldo pálido, concha, pedra, cenoura subterrânea, planta estragada, óculos quebrados, cd quebrado, vagem",
                vara02 : "colher enferrujada, palha para mastigar, couve-flor, batata, pingente de sereia, jojo-cola,pote de feijão, pudim de arroz",
                vara03: "sementes mistas, avelãs torradas, tecido, mudas de uva, lanchinho, salada de frutas, estátua de galinha, panquecas"

            })
        }

        if (dbConectaItens.val() === null) {
			dbConectaItens = await database.ref(`Servidores/Perfil/${message.author.id}/itens/inventario`).set({
                nomes: "Pirulito"
            })
            message.channel.send("Configurando novas atualizações no mar do farol. Digite o comando novamente! :)")
		}

        if (dbPescar.val().vara === "0"){ // CORRIGINDO BUG QUE DEIXEI PASSAR, DEPOIS DE UM TEMPO DÁ PARA REMOVER ISSO
            dbPescar = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                
                vara: 0
                
            })
        }

        let itens01 = dbitensPesca.val().vara01.split(/\s*,\s*/)
        let itens02 = dbitensPesca.val().vara02.split(/\s*,\s*/)
        let itens03 = dbitensPesca.val().vara03.split(/\s*,\s*/)

        console.log(itens01)

		const Embed = new Discord.MessageEmbed()
		.setColor('BLUE')
		.setTitle('MAR DO FAROL')
		.setDescription('Você escuta o **som de fortes ondas**. Ah, o Mar do Farol, um local lindo para fugir dos problemas e relaxar enquanto pesca. (Utilize a reação para pescar)')
		.addField('**Iscas restantes:**', `**${dbPescar.val().iscas}**`, false)
        .setThumbnail(dbMar.val().imagemFarol)
		.setImage(dbMar.val().imagemMar)

        const embedPeixe = new Discord.MessageEmbed()
		.setColor('BLUE')
		.setTitle('MAR DO FAROL')
		.setDescription('CC')
		.setThumbnail('https://i.imgur.com/WxGvJgg.png')
		.setImage('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a26faa96-9360-4219-abdd-0ff5fcee226c/d9l55gq-f28b3797-5464-4ff7-bdac-513692bd0930.gif?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYTI2ZmFhOTYtOTM2MC00MjE5LWFiZGQtMGZmNWZjZWUyMjZjXC9kOWw1NWdxLWYyOGIzNzk3LTU0NjQtNGZmNy1iZGFjLTUxMzY5MmJkMDkzMC5naWYifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.ZHFo9WpWUOn4PJ1W8AxB2bS-95Z4hjNe5GuiPSvhvTE')

		const semIscas = new Discord.MessageEmbed()
		.setColor('BLUE')
		.setTitle('Você não tem iscas para pescar')
		.setDescription(`Compre iscas com o Willy na **/lojadofarol** e tente novamente!`)
		.setThumbnail(dbMar.val().imagemFarol)

        const semVara = new Discord.MessageEmbed()
		.setColor('BLUE')
		.setTitle('Você não pode pescar sem ter uma vara')
		.setDescription(`Para pescar é necessário trazer sua vara. Veja todas suas varas e escolha uma utilizando o comando **/escolhervara**!`)
		.setThumbnail(dbMar.val().imagemFarol)

        const pescouNada = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Você joga sua linha na água...')
        .setDescription(`Você boceja... Espera... Parece que há algo preso no anzol... Você luta, mas apenas sua isca foi levada... Tente novamente!`)
        // .addField('**Iscas restantes:**', `**${dbPescar.val().iscas}**`, false)
        .setThumbnail(dbMar.val().imagemFarol)

        const quebrouVara = new Discord.MessageEmbed()
        .setColor('BLUE')
        .setTitle('Você joga sua linha na água...')
        .setDescription(`PARECE ALGO GRANDE. VOCÊ FAZ FORÇA... LUTA SEM PARAR E... **Sua vara quebra em dois pedaços e é puxada para o fundo do mar**!`)
        .addField('**Iscas restantes:**', `**${dbPescar.val().iscas}**`, false)
        .setThumbnail(dbMar.val().imagemFarol)

        const Filter = (reaction, user) => user.id == message.author.id;
		const reactionMessage = await message.channel.send(Embed);


		await reactionMessage.react("<:continuar:848685055710068736>"); // EMOJI SETA CONTINUAR, MUDAR NO CIDADE


		reactionMessage.awaitReactions(Filter, {max: 1, time: 30000, errors: ["time"]}).then(async collected => {
		
			const reaction = collected.first();

			switch (reaction.emoji.id) {
				case "848685055710068736": // ID EMOJI CONTINUAR 
                    console.log('Clicar vc conseguiu')
                    // SORTEIA UM NUMERO QUE CORRRESPONDE UM INDEX NAS ARRAY VARA0XPOSSIBILIDADES
                    const sorteioitemAleatorio01 = Math.floor(Math.random() * itens01.length);
                    const sorteioitemAleatorio02 = Math.floor(Math.random() * itens02.length);
                    const sorteioitemAleatorio03 = Math.floor(Math.random() * itens03.length);
                    console.log(sorteioitemAleatorio01, sorteioitemAleatorio02, sorteioitemAleatorio03)

                    if (dbPescar.val().vara === 0){
                        message.channel.send(semVara)
                    } else if (dbPescar.val().vara === 1){
                        const vara01Possibilidades = ['itemAleatorio', 'Nada', 'itemAleatorio', 'Nada', 'itemAleatorio', 'Nada', 'Nada', 'Nada', 'Nada', 'itemAleatorio', 'quebrouVara']
                        
                        const sorteio01 = Math.floor(Math.random() * vara01Possibilidades.length);// SORTEIA UM INDEX DO VARA01POSSIBILIDADES
                        const resultado01 = vara01Possibilidades[sorteio01] // PEGA O INDEX SORTEADO E SALVA O NOME DO ITEM DELE

                    // PEGAR A IMAGEM DO PREMIO PESCADO PELA VARA 01 - VARA SIMPLES
                    let itemGanho01 = itens01[sorteioitemAleatorio01].replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    const todasImagensVara01 = []
                    console.log(itemGanho01)
                   Object.keys(dbimgVara01.val()).forEach(function(key) {
                       todasImagensVara01.push(key, dbimgVara01.val()[key]);
                   });
           
                   let indexNome01 = todasImagensVara01.indexOf(itemGanho01); 
                   let contaMatematica01 = indexNome01 + 1
                   let indexUrl01 = todasImagensVara01.slice(contaMatematica01,contaMatematica01 + 1);
                   let urlItem01 = indexUrl01.join()

                    console.log(urlItem01)

                    // CRIAR EMBED COM A IMAGEM DO ITEM E INFOS
                    const pescouItem01 = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setTitle('Você joga sua linha na água...')
                    .setDescription(`Sua vara não é das melhores e quase quebra, mas você consegue pescar algo. Você conseguiu o item **${itens01[sorteioitemAleatorio01]}** e **3 diamantes**!`)
                    // .setThumbnail(dbMar.val().imagemFarol)
                    .setThumbnail(urlItem01)
                   
                    let nomedoitem01 = itens01[sorteioitemAleatorio01]

                        if (dbPescar.val().iscas >= 1) {


                            if (resultado01 === 'itemAleatorio'){ // VERIFICA SE A VARIAVEL DO SORTEIO E IGUAL AO ITEMALEATORIO
                                dbPescar = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                                    iscas: dbPescar.val().iscas - 01 //REMOVE UMA ISCA
                                    
                                })

                                dbUsuario = await database.ref(`Servidores/Perfil/${message.author.id}/`).update({
                                    xp: dbUsuario.val().xp + 03 // DÁ DIAMANTES
                                    
                                })
                                
                                message.channel.send(pescouItem01)

                                dbConectaItens = await database.ref(`Servidores/Perfil/${message.author.id}/itens/inventario`).update({
                                    nomes: dbConectaItens.val().nomes + `, ${itens01[sorteioitemAleatorio01]}`
                                })
                            } else if(resultado01 === 'quebrouVara') {
                                message.channel.send(quebrouVara)

                                dbPescar = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                                    iscas: dbPescar.val().iscas - 01 //REMOVE UMA ISCA
                                    
                                })
                                
                                if (dbConectaPescaria.val().vara01 > 1){
                                    
                                    dbConectaPescaria = await database.ref(`Servidores/Perfil/${message.author.id}/itens/Pescaria`).update({
                                        vara01: dbConectaPescaria.val().vara01 - 01
                                    })

                                    dbPescar = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                                        vara: 0 //RETIRA A VARA DA MÃO DO USUARIO, PQ ELE QUEBROU
                                        
                                    })

                                } else {
                                   
                                    dbConectaPescaria = await database.ref(`Servidores/Perfil/${message.author.id}/itens/Pescaria`).update({
                                        vara01: dbConectaPescaria.val().vara01 - 01 //remove a vara
                                    })

                                    dbPescar = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                                        vara: 0
                                        
                                    })

                                    dbPescar = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar/imagemVaras/imagemvara01`).remove();
                                }
                            } else {
                                dbPescar = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                                    iscas: dbPescar.val().iscas - 01 //REMOVE UMA ISCA
                                    
                                })
                               message.channel.send(pescouNada)
                            }
                        } else {
                            message.channel.send(semIscas)
                        }

                    } else if (dbPescar.val().vara === 2){ // CONFIGURAÇÕES DA VARA 2 - VARA DE BAMBU
                    const vara02Possibilidades = ['itemAleatorio', 'Nada', 'itemAleatorio', 'Nada', 'itemAleatorio', 'Nada', 'itemAleatorio', 'Nada', 'itemAleatorio', 'Nada']
                    const sorteio02 = Math.floor(Math.random() * vara02Possibilidades.length);
                    const resultado02 = vara02Possibilidades[sorteio02]

                    let itemGanho02 = itens02[sorteioitemAleatorio02].replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    const todasImagensVara02 = []
                    console.log(itemGanho02)
                   Object.keys(dbimgVara02.val()).forEach(function(key) {
                       todasImagensVara02.push(key, dbimgVara02.val()[key]);
                   });
           
                   let indexNome02 = todasImagensVara02.indexOf(itemGanho02); 
                   let contaMatematica02 = indexNome02 + 1
                   let indexUrl02 = todasImagensVara02.slice(contaMatematica02,contaMatematica02 + 1);
                   let urlItem02 = indexUrl02.join()
                   console.log(indexNome02)
                    const pescouItem02 = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setTitle('Você joga sua linha na água...')
                    .setDescription(`Você faz um pouco de força, mas consegue pescar algo. Você conseguiu o item **${itens02[sorteioitemAleatorio02]}** e **05 diamantes**!`)
                    .setThumbnail(urlItem02)
                   

                        if (dbPescar.val().iscas >= 1) {
                            if (resultado02 === 'itemAleatorio'){
                                dbPescar = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                                    iscas: dbPescar.val().iscas - 01
                                    
                                })

                                dbUsuario = await database.ref(`Servidores/Perfil/${message.author.id}/`).update({
                                    xp: dbUsuario.val().xp + 05 // DÁ DIAMANTES
                                    
                                })
                                message.channel.send(pescouItem02)

                                dbConectaItens = await database.ref(`Servidores/Perfil/${message.author.id}/itens/inventario`).update({
                                    nomes: dbConectaItens.val().nomes + `, ${itens02[sorteioitemAleatorio02]}`
                                })
                            } else {
                                dbPescar = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                                    iscas: dbPescar.val().iscas - 01 //REMOVE UMA ISCA
                                    
                                })
                               message.channel.send(pescouNada)
                            }
                        } else {
                            message.channel.send(semIscas)
                        
                        }

                    } else if (dbPescar.val().vara === 3){ // CONFIGURAÇÕES DA VARA 3 - VARA DE FIBRA
                        const vara03Possibilidades = ['itemAleatorio', 'Nada', 'itemAleatorio', 'Nada', 'itemAleatorio', 'Nada', 'itemAleatorio', 'Nada', 'itemAleatorio', 'itemAleatorio', 'Nada']
                        const sorteio03 = Math.floor(Math.random() * vara03Possibilidades.length);
                        const resultado03 = vara03Possibilidades[sorteio03]

                        let itemGanho03 = itens03[sorteioitemAleatorio03].replace(/\s+/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "");
                    const todasImagensVara03 = []
                    console.log(itemGanho03)
                   Object.keys(dbimgVara03.val()).forEach(function(key) {
                       todasImagensVara03.push(key, dbimgVara03.val()[key]);
                   });

                        let indexNome03 = todasImagensVara03.indexOf(itemGanho03); 
                        let contaMatematica03 = indexNome03 + 1
                        let indexUrl03 = todasImagensVara03.slice(contaMatematica03,contaMatematica03 + 1);
                        let urlItem03 = indexUrl03.join()
    
                        const pescouItem03 = new Discord.MessageEmbed()
                        .setColor('BLUE')
                        .setTitle('Você joga sua linha na água...')
                        .setDescription(`Você não faz nenhum esforço e consegue pescar algo. Você conseguiu o item **${itens03[sorteioitemAleatorio03]}** e **10 diamantes**!`)
                        .setThumbnail(urlItem03)

                        if (dbPescar.val().iscas >= 1) {
                            if (resultado03 === 'itemAleatorio'){
                                dbPescar = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                                    iscas: dbPescar.val().iscas - 01
                                    
                                })

                                dbUsuario = await database.ref(`Servidores/Perfil/${message.author.id}/`).update({
                                    xp: dbUsuario.val().xp + 10 // DÁ DIAMANTES
                                    
                                })
                                await message.channel.send(pescouItem03)
                                dbConectaItens = await database.ref(`Servidores/Perfil/${message.author.id}/itens/inventario`).update({
                                    nomes: dbConectaItens.val().nomes + `, ${itens03[sorteioitemAleatorio03]}`
                                })
                            } else {
                                dbPescar = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                                    iscas: dbPescar.val().iscas - 01 //REMOVE UMA ISCA
                                    
                                })
                               message.channel.send(pescouNada)
                            }
                        } else {
                            message.channel.send(semIscas)
                            
                        }

                    } 
                        
                        
				break

			}
		}).catch(() => {
            message.reply(' observa as ondas durante um longo tempo e desiste de pescar.');
        }); 

        } // fim verificação se esse e o canal certo.
        

    }
}