const jimp = require("jimp");
const Discord = require('discord.js');
const Canvas = require('canvas');
const Mee6LevelsApi = require("../mee6-levels-api.js");

module.exports = {
	name: 'perfil',
	alias: ['id'],
	description: 'Seu perfil. Mude seu plano de fundo, escolha sua casa, ganhe emblemas oficias da Cidade.',
	run: async (client, message, args, database) => {
		//Variaveis conexão com o bot meee6 de levels e rank
		let idMencionado = message.mentions.users.first(); 
		const guildId = "695652027891581019"; 
		let userId = message.author.id; 
		let idUsuario = message.author.id;
		const Filter = (reaction, user) => user.id == idUsuario.id; 
		
		if (!idMencionado){
			idUsuario = message.author
			
		} else {
			userId = idMencionado.id
			idUsuario = message.mentions.users.first(); 
		}
		console.log(userId, idUsuario.username)
		Mee6LevelsApi.getUserXp(guildId, userId).then(async user => { // começo codigo mee6

		//Variaveis basicas para criar um canvas e setar novas fontes
		const { registerFont, createCanvas } = require('canvas')
		registerFont('pixel.ttf', { family: 'Pixel' })
		registerFont('pixel2.ttf', { family: 'Pixel Arial 11' })
 
		const canvas = Canvas.createCanvas(600, 328);
		const ctx = canvas.getContext('2d');

		let aliasArgs = ['emblema', 'emblemas', 'em'] // variavel com varias expressões
		// EMBLEMAS
		let encontrou = aliasArgs.includes(args[0]);  // verifica se o /perfil + emblemas está escrito corretamente
		if (encontrou == true) { 
			
			

		}else { // Se digitou /perfil + alguma coisa aleatoria nada acontece.
			
			// Se digitou somente /perfil chama os códigos:
		// if(args[0] == idMencionado){
			//CONECTA O BG E PEGA O FUNDO
		let dbfundo = await database.ref(`Servidores/Perfil/${idUsuario.id}/Fundo/`).once('value');

		let fundo = [];
		if (dbfundo.val() == null){
			fundo = 'https://i.imgur.com/QAHlkn9.png';

			database.ref(`Servidores/Perfil/${idUsuario.id}/Fundo/`).set({
				bg: 'https://i.imgur.com/QAHlkn9.png'
			});
		}else {
			fundo = dbfundo.val().bg
		};


				// MORADIA - CONFIGURAÇÕES CASAS

		let dbcasa = await database.ref(`Servidores/Perfil/${idUsuario.id}`).once('value');
		let casa = dbcasa.val().Casa;
		let urlCasa = [];
		let nomeCasa = [];
		let nomeLocal = [];
		let localCasa = []; // posiciona a casa no perfil

		if (casa == 0){
			urlCasa = 'https://i.imgur.com/Fg8naPf.png' //default
			nomeCasa = 'Vila dos Impuros'
			nomeLocal = [285, 320]
			localCasa = [462, 210]
		}

		if (casa == 1){
			urlCasa = 'https://i.imgur.com/brD1iJs.png' //predio
			nomeCasa = 'Região Central'
			nomeLocal = [285, 320]
			localCasa = [460, 180]
		}

		if (casa == 2){
			urlCasa = 'https://i.imgur.com/jfNSZ0R.png'//fazenda
			nomeCasa = 'Fazendas do Norte'
			nomeLocal = [254, 320]
			localCasa = [420, 205]
		}

		if (casa == 3){
			urlCasa = 'https://i.imgur.com/X2RDRLK.png' //prefeito
			nomeLocal = [254, 320]
			nomeCasa = 'Prefeitura da Cidade'
			localCasa = [452, 180]
		}

		if (casa == 4){
			urlCasa = 'https://i.imgur.com/6s96k7W.png' //prefeito
			nomeLocal = [254, 320]
			nomeCasa = 'BurguesCity'
			localCasa = [437, 159]
		}


	// VARIAVEIS DO CANVAS E PLANO DE FUNDO 

		const background = await Canvas.loadImage(fundo);
		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

	// OPACIDADE FUNDO
	const opacidade = await Canvas.loadImage('https://i.imgur.com/WJKjJ2U.png');

	ctx.drawImage(opacidade,0, 0, canvas.width, canvas.height);

	// FAIXA CIDADE DORME
	if (casa == 0 || casa == 1 || casa == 3 || casa == 4) {
		ctx.fillStyle = "#ababab"; //cinza
	} else {
		ctx.fillStyle = "#a0b93a"; //verde
	}
	ctx.fillRect(0, 299, 599.99, 28.87);

	// INTERFACE

	const interface = await Canvas.loadImage('https://i.imgur.com/iIoKqzE.png');

		ctx.drawImage(interface,0, 0, canvas.width, canvas.height);

		                   // TEXTOS
		let dbuser = await database.ref(`Servidores/Perfil/${idUsuario.id}`).once('value');
		
		ctx.font = '16px "Pixel Arial 11"';
		ctx.fillStyle = '#ffffff';
		ctx.fillText(idUsuario.username, 340, 50); //nome
	

		if (dbuser.val().Relacionamento == 'Nenhum.'){
			ctx.font = '16px "Pixel Arial 11"';
		ctx.fillStyle = '#ffffff';
		ctx.fillText('Sem relacionamento.', 300, 100);//relacionamento
		}else {
			let idAmor = dbuser.val().RelacionamentoID
			let usernameAmor = dbuser.val().Relacionamento
			
		ctx.font = '14px "Pixel Arial 11"';
		ctx.fillStyle = '#ffffff';
		ctx.fillText(usernameAmor, 340, 100);

		}
		
		//RANK, LEVEL MEE6 BOT
		let posicaoLevel = [];
		if (`${user.level}` <= 9) {
			posicaoLevel = [35, 214]
		} else {
			posicaoLevel = [28, 214]
		}
		console.log(posicaoLevel)
		ctx.font = '17px "Pixel"';
		ctx.fillStyle = '#ffffff';
		ctx.fillText(`${user.level}`, posicaoLevel[0], posicaoLevel[1]);

		// DIAMANTES: EXIBE TEXTO COM O NUM DE DIAMANTES E TBM POSICIONA NO LOCAL CORRETO
		let numeros = dbcasa.val().xp
		let digitos = Math.log(numeros) * Math.LOG10E + 1 | 0; 
		let posicaoDiamantes = [];

		if (digitos == 0 || digitos <= 4) { 
			posicaoDiamantes = [97,268];
		} else if (digitos == 5){
			posicaoDiamantes = [92,268];
		} else if (digitos >= 6){
			posicaoDiamantes = [76,268];
		} 

		console.log(digitos)
		ctx.font = '17px "Pixel"';
		ctx.fillStyle = '#ffffff';
		ctx.fillText(dbcasa.val().xp, posicaoDiamantes[0], posicaoDiamantes[1]);

		                  // TEXTO CASA + EXIBIR IMAGEM CASA
		ctx.font = '13px "Pixel Arial 11"';
		ctx.fillStyle = '#000000';
		ctx.fillText(nomeCasa, nomeLocal[0], nomeLocal[1]);

		const casinha = await Canvas.loadImage(urlCasa);
		ctx.drawImage(casinha, localCasa[0], localCasa[1]);//local casa
	
		// PREFEITURA EMBLEMA
		if (dbcasa.val().Prefeito == 'Sim') {
			ctx.font = '14px "Pixel Arial 11"';
		ctx.fillStyle = '#ffffff';
		ctx.fillText('Líder da Cidade', 320, 156);
		// 	const prefeituraEmblema = await Canvas.loadImage('https://i.imgur.com/1Evw9F6.png');
		// ctx.drawImage(prefeituraEmblema, 19, 131);
		}
		

	 // AVATAR + MASCARA

	ctx.beginPath();
	ctx.arc(105, 90, 76, 0, 2 * Math.PI);
	ctx.stroke();
	ctx.closePath();
	ctx.clip();


	const avatar = await Canvas.loadImage(idUsuario.avatarURL({dynamic: true, format: 'jpg', size: 1024 }));

	ctx.drawImage(avatar, 30, 14, 150, 150);
	ctx.save();
	ctx.restore();

	// GERA IMAGEM PERFIL
		const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'perfil-cidadedorme.png');
		message.channel.send(``,  attachment) 
		
	}
		}); // fim codigo me6 bot
	}
};