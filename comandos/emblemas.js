const Discord = require('discord.js');
const Canvas = require('canvas');


module.exports = {
	name: 'emblemas',
	alias: ['album'],
	description: 'Mostra todos os emblemas',
	run: async (client, message, args, database) => {
        let meuemblema  = await database.ref(`Servidores/Perfil/${message.author.id}/Emblemas`).once('value');
        const todosEmblemas = []// array com os emblemas
        let listadeemblemas = await database.ref(`Servidores/Perfil/Emblemas`).once('value');

        if (meuemblema.val() == null){
            message.channel.send("Estamos criando um álbum de emblemas para você. Digite o comando novamente! :)")
            meuemblema = await database.ref(`Servidores/Perfil/${message.author.id}/Emblemas/`).set({
                novato: "https://i.imgur.com/IZ4zrel.png"
            })
        }
        Object.keys(meuemblema.val()).forEach(function(key) {
            todosEmblemas.push(key, meuemblema.val()[key]);
        }); // tranforma as info do banco de dados em uma array, pq array tem index e precisamos deles
        console.log(todosEmblemas)
        // let indexNome = todosEmblemas.indexOf(emblemasalvo); // pega o index do nome do emblema
        // let contaMatematica = indexNome + 1 // pega o index do nome do emblema e adiciona + 1 trazendo o index do url. Ex: 0 = Novato 1 = novato.png
        // let indexUrl = todosEmblemas.slice(contaMatematica,contaMatematica + 1); //Pega o url dentro da array usando o index que calculamos
        // let urlEmblema = indexUrl.join() // transforma no url pego em uma string de texto, sem array

        // VARIAVEIS QUE GUARDAM OS URLS DOS EMBLEMAS. PULAR SEMPRE UM, PQ O NUMERO ANTERIOR É O NOME DO EMBLEMA
        //EX: INDEX0 = HALLOWEEN INDEX1 = IMAGE.COM/Halloween.png

        let index1 = todosEmblemas.slice(1,2); // configuração: sempre (numero do nome do emblema, numero do url emblema)
        let index3 = todosEmblemas.slice(3,4);
        let index5 = todosEmblemas.slice(5,6);
        let index7 = todosEmblemas.slice(7,8);
        let index9 = todosEmblemas.slice(9,10);
        let index11 = todosEmblemas.slice(11,12);
        let index13 = todosEmblemas.slice(13,14);
        let index15 = todosEmblemas.slice(15,16);
        let index17 = todosEmblemas.slice(17,18);
        let index19 = todosEmblemas.slice(19,20);
        let index21 = todosEmblemas.slice(21,22);
console.log(index5)
        // MONTANDO IMAGEM CANVAS
        //Variaveis basicas para criar um canvas e setar novas fontes
		const { registerFont, createCanvas } = require('canvas')
		registerFont('pixel.ttf', { family: 'Pixel' })
		registerFont('pixel2.ttf', { family: 'Pixel Arial 11' })
 
		const canvas = Canvas.createCanvas(600, 271);
		const ctx = canvas.getContext('2d');

		const fundoEmblemas = await Canvas.loadImage('https://i.imgur.com/F01BgoS.png');
			
		ctx.drawImage(fundoEmblemas, 0, 0);

        // Nome usuario
        ctx.font = '14px "Arial"';
		ctx.fillStyle = '#ffffff';
        ctx.fillText('Emblemas', 44, 260); // palavra emblemas
		ctx.fillText(message.author.tag, 170, 260); //nome user

        // ORGANIZANDO EMBLEMAS - PAGINA 1

        // POSIÇÃO 1 = NOME 0 INDEX 1
        if (index1.length === 0) {
            const emblem1 = await Canvas.loadImage(`https://i.imgur.com/MGXCUsc.png`);
            ctx.drawImage(emblem1, 20, 14, 100, 100);
         } else {
            const emblem1 = await Canvas.loadImage(`${index1}`);
            ctx.drawImage(emblem1, 20, 14, 100, 100);
         }

        // POSIÇÃO 2 = NOME 2 INDEX 3
        if (index3.length === 0){
                const emblem2 = await Canvas.loadImage(`https://i.imgur.com/MGXCUsc.png`);
        ctx.drawImage(emblem2, 130, 14, 100, 100);
        }else {
            const emblem2 = await Canvas.loadImage(`${index3}`);
            ctx.drawImage(emblem2, 130, 14, 100, 100);
        }
         // POSIÇÃO 3 = NOME 4 INDEX 5
         if (index5.length === 0) {
            const emblem3 = await Canvas.loadImage(`https://i.imgur.com/MGXCUsc.png`);
            ctx.drawImage(emblem3, 240, 14, 100, 100);
             console.log("Realmente não tem esse index no banco de dados")
         } else {
            const emblem3 = await Canvas.loadImage(`${index5}`);
            ctx.drawImage(emblem3, 240, 14, 100, 100);
            console.log("Esse index de alguma forma foi encontrado")
         }
         
        // POSIÇÃO 4  = NOME 6  INDEX 7
        if (index7.length === 0) {
            const emblem4 = await Canvas.loadImage(`https://i.imgur.com/MGXCUsc.png`);
            ctx.drawImage(emblem4, 350, 14, 100, 100);
        } else {
            const emblem4 = await Canvas.loadImage(`${index7}`);
            ctx.drawImage(emblem4, 350, 14, 100, 100);
        }

        // POSIÇÃO 5  = NOME 8  INDEX 9
        if (index9.length === 0) {
            const emblem5 = await Canvas.loadImage(`https://i.imgur.com/MGXCUsc.png`);
            ctx.drawImage(emblem5, 460, 14, 100, 100);
        } else {
            const emblem5 = await Canvas.loadImage(`${index9}`);
            ctx.drawImage(emblem5, 460, 14, 100, 100);
        }

        // COLUNA DE BAIXO

// POSIÇÃO 6 = NOME 10 INDEX 11
if (index11.length === 0) {
    const emblem6 = await Canvas.loadImage(`https://i.imgur.com/MGXCUsc.png`);
    ctx.drawImage(emblem6, 20, 130, 100, 100);
 } else {
    const emblem6 = await Canvas.loadImage(`${index11}`);
    ctx.drawImage(emblem6, 20, 130, 100, 100);
 }

// POSIÇÃO 7 = NOME 12 INDEX 13
if (index13.length === 0){
    const emblem7 = await Canvas.loadImage(`https://i.imgur.com/MGXCUsc.png`);
    ctx.drawImage(emblem7, 130, 130, 100, 100);
}else {
    const emblem7 = await Canvas.loadImage(`${index13}`);
    ctx.drawImage(emblem7, 130, 130, 100, 100);
}
 // POSIÇÃO 8 = NOME 14 INDEX 15
 if (index15.length === 0) {
    const emblem8 = await Canvas.loadImage(`https://i.imgur.com/MGXCUsc.png`);
    ctx.drawImage(emblem8, 240, 130, 100, 100);
     console.log("Realmente não tem esse index no banco de dados")
 } else {
    const emblem8 = await Canvas.loadImage(`${index15}`);
    ctx.drawImage(emblem8, 240, 130, 100, 100);
    console.log("Esse index de alguma forma foi encontrado")
 }
 
// POSIÇÃO 9  = NOME 16  INDEX 17
if (index17.length === 0) {
    const emblem9 = await Canvas.loadImage(`https://i.imgur.com/MGXCUsc.png`);
    ctx.drawImage(emblem9, 350, 130, 100, 100);
} else {
    const emblem9 = await Canvas.loadImage(`${index17}`);
    ctx.drawImage(emblem9, 350, 130, 100, 100);
}

// POSIÇÃO 10  = NOME 18  INDEX 19
if (index19.length === 0) {
    const emblem10 = await Canvas.loadImage(`https://i.imgur.com/MGXCUsc.png`);
    ctx.drawImage(emblem10, 460, 130, 100, 100);
} else {
    const emblem10 = await Canvas.loadImage(`${index19}`);
    ctx.drawImage(emblem10, 460, 130, 100, 100);
}

        // GERAR IMAGEM FINAL E ENVIAR
		const gerarEmblemas = new Discord.MessageAttachment(canvas.toBuffer(), 'seus-emblemas.png');
		message.channel.send(``,  gerarEmblemas);
        
    }
}