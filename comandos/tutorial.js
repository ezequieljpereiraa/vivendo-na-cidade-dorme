const Discord = require('discord.js');
const cron = require('cron');

module.exports = {
	name: 'configurartutorial',
	alias: [''],
	description: 'comando ping de teste',
	run: async (client, message, args, database) => {

        const embedRegras = new Discord.MessageEmbed()
        .setColor('PURPLE')
        .setTitle('SEJA BEM-VINDE AO SERVER CIDADE DORME!!')
        .setDescription(`
        
Olá, eu sou a Maggie. Você acabou de cair de paraquedas por aqui? Se sente perdido? Não se preocupe que estou aqui para lhe ajudar no que for necessário.  :smile:

Primeiramente, seja muite bem-vinde ao servidor!
O server tem a estética de uma cidade e é dividida em diversas categorias no qual, cada uma delas, apresenta um canal para usos específicos. Bora conhecê-los?


:deciduous_tree: **Praça**

#banquinho - Canal principal do servidor, onde passamos boa parte do tempo conversando e se distraindo com os outros membros.

#escolher-músicas - Canal para uso exclusivo do bot @Discoteca, no qual, para usufruir, escreva o termo ''-p'' e, em seguida, o link da música que queira ouvir. Para pausar, só digitar ''-pause'' e, para parar, ''-stop''.

:school:  **Escola**

#sala-de-aula - Canal em que se encontra onde há essa bela explicação de como funciona o server. 

#apresentações - Canal para você poder contar um pouco de si mesmo, caso queira, e ao mesmo tempo, conhecer um pouco melhor os outres integrantes do servidor.

:trophy:  **Ginásio**

#competições - Canal no qual utilizamos para realizar certas gincanas no server.

#vencedores - Canal para listar todos os vencedores dos desafios já realizados.
        `)
        .setThumbnail('https://i.imgur.com/nijTTd3.png')

        message.channel.send(embedRegras);
      

    }
};