const Discord = require('discord.js');
const Canvas = require('canvas');


module.exports = {
	name: 'escolhervara',
    alias: [''],
	description: 'comando ping de teste',
	run: async (client, message, args, database) => {

        // ESSE COMANDO É UMA PIRA DA MINHA MENTE, EU NEM SEI COMO FIZ ISSO, MAS USEI INDEX E UMAS COISAS LOUCAS

        let minhasvaras  = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar/imagemVaras`).once('value');
        let dbpescar  = await database.ref(`Servidores/Perfil/${message.author.id}/itens/Pescaria`).once('value');
        let dbminhasvaras = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar/imagemVaras`).once('value');
        let dbremovervara = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar/imagemVaras/imagemvara0`).once('value');
        let dbConectaPescaria = await database.ref(`Servidores/Perfil/${message.author.id}/itens/Pescaria`).once('value');
        const canvas = Canvas.createCanvas(600, 328);
		const ctx = canvas.getContext('2d');

		const { registerFont, createCanvas } = require('canvas')
		registerFont('pixel.ttf', { family: 'Pixel' })
		registerFont('pixel2.ttf', { family: 'Pixel Arial 11' })

         if (dbpescar.val().vara01 === 0 && dbpescar.val().vara02 === 0 && dbpescar.val().vara03 === 0 || minhasvaras.val() === null) { // SE NÃO TIVER NENHUMA VARA O INVENTARIO DE VARAS GERA ESSA IMAGEM
            
            // MONTANDO IMAGEM CANVAS SEM VARAS
    
		const fundoSemVaras = await Canvas.loadImage('https://i.imgur.com/azwOBqb.png');
			
		ctx.drawImage(fundoSemVaras, 0, 0);

        // Nome usuario
        ctx.font = '14px "Arial"';
		ctx.fillStyle = '#ffffff';
		ctx.fillText(message.author.tag, 39, 260); //nome user

        // GERAR IMAGEM FINAL E ENVIAR
		const gerarEmblemas = new Discord.MessageAttachment(canvas.toBuffer(), 'sem-varas.png');
		message.channel.send(``,  gerarEmblemas);


        } else { // SE TIVER QUALQUER VARA ESSE CODIGO GERA AS IMAGENS DAS VARAS E A OPÇÃO DE SELECIONAR
            let suavaraAtual = ''
            let varaatual = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).once('value');
            if(varaatual.val().vara === 0) {
                
                suavaraAtual = 'nenhuma'
            } else if(varaatual.val().vara === 1) {
                
                suavaraAtual = 'simples'
            } else  if(varaatual.val().vara === 2) {
                
                suavaraAtual = 'bambu'
            }else if(varaatual.val().vara === 3) {
                
                suavaraAtual = 'fibra'
            }
            

            const todasVaras = []// array com as varas e suas imagens

            let listadevaras = await database.ref(`Servidores/itensPesca/guardaimgVaras`).once('value');
            
                    Object.keys(minhasvaras.val()).forEach(function(key) {
                        todasVaras.push(key, minhasvaras.val()[key]);
                    }); // tranforma as info do banco de dados em uma array, pq array tem index e precisamos deles
                    console.log(todasVaras)
                    // let indexNome = todosEmblemas.indexOf(emblemasalvo); // pega o index do nome do emblema
                    // let contaMatematica = indexNome + 1 // pega o index do nome do emblema e adiciona + 1 trazendo o index do url. Ex: 0 = Novato 1 = novato.png
                    // let indexUrl = todosEmblemas.slice(contaMatematica,contaMatematica + 1); //Pega o url dentro da array usando o index que calculamos
                    // let urlEmblema = indexUrl.join() // transforma no url pego em uma string de texto, sem array
            
                    // VARIAVEIS QUE GUARDAM OS URLS DOS EMBLEMAS. PULAR SEMPRE UM, PQ O NUMERO ANTERIOR É O NOME DO EMBLEMA
                    //EX: INDEX0 = HALLOWEEN INDEX1 = IMAGE.COM/Halloween.png
            
                    let index1 = todasVaras.slice(1,2); // configuração: sempre (numero do nome da vara, numero do url vara)
                    let index3 = todasVaras.slice(3,4);
                    let index5 = todasVaras.slice(5,6);
                    // ABAIXO O NOME DAS VARAS
                    let nome1 = todasVaras.slice(0,1);
                    let nome2 = todasVaras.slice(2,3);
                    let nome3 = todasVaras.slice(4,5);
    
                
            console.log(index5)
                    // MONTANDO IMAGEM CANVAS VARAS
                    //Variaveis basicas para criar um canvas e setar novas fontes
            
            		const fundoVaras = await Canvas.loadImage('https://i.imgur.com/7UJh2Gv.png');
                        
            		ctx.drawImage(fundoVaras, 0, 0);
            
                    // Nome usuario
                    ctx.font = '14px "Arial"';
            		ctx.fillStyle = '#ffffff';

                    

            		ctx.fillText(message.author.tag, 39, 260); //nome user
            
                    // ORGANIZANDO VARAS - PAGINA 1
                    let quantVaras  = await database.ref(`Servidores/Perfil/${message.author.id}/itens/Pescaria`).once('value');
                    // POSIÇÃO 1 = NOME 0 INDEX 1 
                    if (index1.length === 0) {
                        const vara1 = await Canvas.loadImage(`https://i.imgur.com/5yGDu8y.png`);
                        ctx2.drawImage(vara1, 136, 104, 70, 70);
                        
                     } else {
                        const vara1 = await Canvas.loadImage(`${index1}`);
                        ctx.drawImage(vara1, 136, 104, 70, 70);
                        ctx.font = '18px "Arial"';
            		    ctx.fillStyle = '#7e2f00';
                        ctx.fillText(`Vara atual: ${suavaraAtual}`, 419, 240);

                        if(nome1[0] === 'imagemvara01'){
                            ctx.fillText(`Quant: ${dbConectaPescaria.val().vara01}`, 140, 200);
                        } else if(nome1[0] === 'imagemvara02') {
                            ctx.fillText(`Quant: ${dbConectaPescaria.val().vara02}`, 140, 200);
                        } else if(nome1[0] === 'imagemvara03') {
                            ctx.fillText(`Quant: ${dbConectaPescaria.val().vara03}`, 140, 200);
                        }
                        
                     }
            
                    // POSIÇÃO 2 = NOME 2 INDEX 3
                    if (index3.length === 0){
                            const vara2 = await Canvas.loadImage(`https://i.imgur.com/5yGDu8y.png`);
                    ctx.drawImage(vara2, 256, 104, 70, 70);
                    }else {
                        const vara2 = await Canvas.loadImage(`${index3}`);
                        ctx.drawImage(vara2, 256, 104, 70, 70);
                        ctx.font = '18px "Arial"';
            		    ctx.fillStyle = '#7e2f00';
                        ctx.fillText(`Vara atual: ${suavaraAtual}`, 419, 240); 

                        if(nome2[0] === 'imagemvara01'){
                            ctx.fillText(`Quant: ${dbConectaPescaria.val().vara01}`, 269, 200);
                        } else if(nome2[0] === 'imagemvara02') {
                            ctx.fillText(`Quant: ${dbConectaPescaria.val().vara02}`, 269, 200);
                        } else if(nome2[0] === 'imagemvara03') {
                            ctx.fillText(`Quant: ${dbConectaPescaria.val().vara03}`, 269, 200);
                        }
                    }
                     // POSIÇÃO 3 = NOME 4 INDEX 5
                     if (index5.length === 0) {
                        const vara3 = await Canvas.loadImage(`https://i.imgur.com/5yGDu8y.png`); //sem vara
                        ctx.drawImage(vara3, 380, 104, 70, 70);
                         console.log("Realmente não tem esse index no banco de dados")
                     } else {
                        const vara3 = await Canvas.loadImage(`${index5}`);
                        ctx.drawImage(vara3, 380, 104, 70, 70);
                        ctx.font = '18px "Arial"';
            		    ctx.fillStyle = '#7e2f00';
                        ctx.fillText(`Vara atual: ${suavaraAtual}`, 419, 240); 

                        if(nome3[0] === 'imagemvara01'){
                            ctx.fillText(`Quant: ${dbConectaPescaria.val().vara01}`, 389, 200);
                        } else if(nome3[0] === 'imagemvara02') {
                            ctx.fillText(`Quant: ${dbConectaPescaria.val().vara02}`, 389, 200);
                        } else if(nome3[0] === 'imagemvara03') {
                            ctx.fillText(`Quant: ${dbConectaPescaria.val().vara03}`, 389, 200);
                        }
                     }
                     
            
                    // GERAR IMAGEM FINAL E ENVIAR
                    /////////////////////// REAÇÃO ////////////////////////////////
                    const Filter = (reaction, user) => user.id == message.author.id;
            		const gerarEmblemas = new Discord.MessageAttachment(canvas.toBuffer(), 'suas-varas.png');
            		const reactionMessage = await message.channel.send(``,  gerarEmblemas);

                    

                    
                let dbescolherVara = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).once('value');
                let verificaVaras = await database.ref(`Servidores/Perfil/${message.author.id}/itens/Pescaria`).once('value');

        if (index1.length === 0) {
            
         } else {
            await reactionMessage.react("<:numero1:827728709473140749>");
         }
         
         if (index3.length === 0) {
            
        } else {
            await reactionMessage.react("<:numero2:827728710034522152>");
        }

        if (index5.length === 0) {
            
        } else {
            await reactionMessage.react("<:numero3:827729195912003634>");
        }

        reactionMessage.awaitReactions(Filter, {max: 1, time: 30000, errors: ["time"]}).then(async collected => {
		
			const reaction = collected.first();

			switch (reaction.emoji.id) {
                
                  case "827728709473140749": // VARA 01
                  if (nome1[0] === "imagemvara01"){
                    message.channel.send(`**${message.author.username}, agora você está equipado com a vara simples!**`)
                      dbescolherVara = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                        vara: 1
                    })
                    }else if (nome1[0] === "imagemvara02"){
                        message.channel.send(`**${message.author.username}, agora você está equipado com a vara de bambu!**`)
                        dbescolherVara = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                          vara: 2
                      })
                    } else if (nome1[0] === "imagemvara03"){
                        message.channel.send(`**${message.author.username}, agora você está equipado com a vara de fibra!**`)
                        dbescolherVara = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                          vara: 3
                      })
                    }
                    console.log(nome1)
                     
				break  
				
                case "827728710034522152": //ESPAÇO 2
                if (nome2[0] === "imagemvara01"){
                    message.channel.send(`**${message.author.username}, agora você está equipado com a vara simples!**`)
                      dbescolherVara = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                        vara: 1
                    })
                    }else if (nome2[0] === "imagemvara02"){
                        message.channel.send(`**${message.author.username}, agora você está equipado com a vara de bambu!**`)
                        dbescolherVara = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                          vara: 2
                      })
                    } else if (nome2[0] === "imagemvara03"){
                        message.channel.send(`**${message.author.username}, agora você está equipado com a vara de fibra!**`)
                        dbescolherVara = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                          vara: 3
                      })
                    }
				break
                
                case "827729195912003634": //VARA 03
                if (nome3[0] === "imagemvara01"){
                    message.channel.send(`**${message.author.username}, agora você está equipado com a vara simples!**`)
                      dbescolherVara = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                        vara: 1
                    })
                    }else if (nome3[0] === "imagemvara02"){
                        message.channel.send(`**${message.author.username}, agora você está equipado com a vara de bambu!**`)
                        dbescolherVara = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                          vara: 2
                      })
                    } else if (nome3[0] === "imagemvara03"){
                        message.channel.send(`**${message.author.username}, agora você está equipado com a vara de fibra!**`)
                        dbescolherVara = await database.ref(`Servidores/Perfil/${message.author.id}/Pescar`).update({
                          vara: 3
                      })
                    }
				break
			}
		}).catch(() => {
            message.reply(' **você demorou demais para tomar uma decisão e o comando foi cancelado!**');
        }); 

/////////////////////////////// FIM REAÇÃO /////////////////////////////

        }

        
    } //fecha todo o codigo
}