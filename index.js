const Discord = require('discord.js');
const config = require("./config.json");
const client = new Discord.Client({partials: ["MEMBER", "MESSAGE", "CHANNEL", "USER", "REACTION"]});
const Mee6LevelsApi = require("./mee6-levels-api.js");
const firebase = require("firebase");
const Canvas = require('canvas');
const fs = require('fs');
const cron = require('cron');


// CONEXÃO COM O FIREBASE

const configF = {
  apiKey: "AIzaSyDb2xO606On8X89hmZHUn0_aAzRFkmGRv4",
  authDomain: "bancodb-54931.firebaseapp.com",
  databaseURL: "https://bancodb-54931.firebaseio.com",
  projectId: "bancodb-54931",
  storageBucket: "bancodb-54931.appspot.com",
  messagingSenderId: "989263792085",
  appId: "1:989263792085:web:74b4ff8df56cf591a69f5c"
};
 // Initialize Firebase
 firebase.initializeApp(configF);
 const database = firebase.database();

 


// CONFIGURAÇÃO DO COMANDO USANDO O SIMBOLO DE /
client.comandos = new Discord.Collection()

let arquivos = fs.readdirSync('./comandos').filter((f) => f.endsWith(".js"))

for (var arqui of arquivos) {
  let comando = require("./comandos/"+arqui)
  client.comandos.set(comando.name, comando)
  console.log(arqui+' foi carregado corretamente!')
}



// INICIAR BOT
client.on('ready', async () => {
    console.log(`Bot rodando!`);
    client.user.setActivity(`Doctor Who...`);


});

// ADICIONAR REAÇÃO/CARGOS/CADASTRO
client.on('messageReactionAdd', async(reaction, user, message) => {
  let dbConfig = await database.ref(`Servidores/Configuracoes`).once('value');
  let dbConfigCargos = await database.ref(`Servidores/Configuracoes/cargos`).once('value');

  let cargo_maior_id = dbConfigCargos.val().maioridadeid //coloque o ID do cargo entre as ""
  let cargo_menor_id = dbConfigCargos.val().menoridadeid
  let cargo_pron_ele_id = dbConfigCargos.val().pronomeEleid
  let cargo_pron_ela_id = dbConfigCargos.val().pronomeElaid
  let cargo_pron_elu_id = dbConfigCargos.val().pronomeEluid
  let pronome_emoji_ele = "🇪"; //coloque o EMOJI entre as ""
  let pronome_emoji_ela = "🇦";
  let pronome_emoji_elu = "🇺";
  let idCanal = dbConfig.val().canalRegistroid;
  let msg_pronome_id = dbConfig.val().embedPronomeid; //coloque o ID da mensagem entre as ""
  let msg_idade_id = dbConfig.val().embedIdadeid; 
  let idade_emoji_maior = "🔞";
  let idade_emoji_menor = "🎓";

  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch;
  if (user.bot) return;
  if (!reaction.message.guild) return;

  // PRONOME
  if (reaction.message.id === msg_pronome_id){
    if(reaction.emoji.name === pronome_emoji_ele) {
      
      await reaction.message.guild.members.cache.get(user.id).roles.add(cargo_pron_ele_id)

       }
   }
   
   if (reaction.emoji.name === pronome_emoji_ela){
    
    await reaction.message.guild.members.cache.get(user.id).roles.add(cargo_pron_ela_id)
        
          
   }

   if (reaction.emoji.name === pronome_emoji_elu){
    
    await reaction.message.guild.members.cache.get(user.id).roles.add(cargo_pron_elu_id)
          
   }

   // IDADE

   if (reaction.message.id === msg_idade_id){
    if(reaction.emoji.name === idade_emoji_maior) {

      
      await reaction.message.guild.members.cache.get(user.id).roles.add(cargo_maior_id)

      if(!reaction.message.guild) return;
      let membroid = reaction.message.guild.members.cache.get(user.id)
      if(!cargo_menor_id) return;
      if(!membroid) return;
      if(membroid.roles.cache.has(cargo_menor_id)){
        membroid.roles.remove(cargo_menor_id);
      
      }

       }

       if(reaction.emoji.name === idade_emoji_menor) {
     
        await reaction.message.guild.members.cache.get(user.id).roles.add(cargo_menor_id)

        if(!reaction.message.guild) return;
        let membroid = reaction.message.guild.members.cache.get(user.id)
        if(!cargo_maior_id) return;
        if(!membroid) return;
        if(membroid.roles.cache.has(cargo_maior_id)){
          membroid.roles.remove(cargo_maior_id);
        
        }

         }
   }
 });


 // REMOVER REAÇÕES

 client.on('messageReactionRemove', async(reaction, user, message) => {
  let dbConfig = await database.ref(`Servidores/Configuracoes`).once('value');
  let dbConfigCargos = await database.ref(`Servidores/Configuracoes/cargos`).once('value');

  let cargo_maior_id = dbConfigCargos.val().maioridadeid //coloque o ID do cargo entre as ""
  let cargo_menor_id = dbConfigCargos.val().menoridadeid
  let cargo_pron_ele_id = dbConfigCargos.val().pronomeEleid
  let cargo_pron_ela_id = dbConfigCargos.val().pronomeElaid
  let cargo_pron_elu_id = dbConfigCargos.val().pronomeEluid
  let pronome_emoji_ele = "🇪"; //coloque o EMOJI entre as ""
  let pronome_emoji_ela = "🇦";
  let pronome_emoji_elu = "🇺";
  let idCanal = dbConfig.val().canalRegistroid;
  let msg_pronome_id = dbConfig.val().embedPronomeid; //coloque o ID da mensagem entre as ""
  let msg_idade_id = dbConfig.val().embedIdadeid; 
  let idade_emoji_maior = "🔞";
  let idade_emoji_menor = "🎓";

  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.partial) await reaction.fetch;
  if (user.bot) return;
  if (!reaction.message.guild) return;

  // PRONOME
  if (reaction.message.id === msg_pronome_id){
    if(reaction.emoji.name === pronome_emoji_ele) {
      
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cargo_pron_ele_id)

       }
   }
   
   if (reaction.emoji.name === pronome_emoji_ela){
    
    await reaction.message.guild.members.cache.get(user.id).roles.remove(cargo_pron_ela_id)
        
          
   }

   if (reaction.emoji.name === pronome_emoji_elu){
    
    await reaction.message.guild.members.cache.get(user.id).roles.remove(cargo_pron_elu_id)
          
   }

   // IDADE

   if (reaction.message.id === msg_idade_id){
    if(reaction.emoji.name === idade_emoji_maior) {
      
      await reaction.message.guild.members.cache.get(user.id).roles.remove(cargo_maior_id)

       }

       if(reaction.emoji.name === idade_emoji_menor) {
        
        await reaction.message.guild.members.cache.get(user.id).roles.remove(cargo_menor_id)

         }
   }
 });

 
 // TROCAR IMAGEM A CADA X HORAS
 client.on('message', async message => {

 // CONFIGURAÇÃO DO CRON JOB. USAR PARA INSTALAR O COMANDO
 if (message.content === '/configurarpraca') {

  let climas2 = ['um céu com poucas nuvens e sem chuva.', 
  'muita chuva.', 
  'um grande frio.', 
  'um calor intenso.', 
  'um clima agradavel e sem previsão de chuvas.',
  'um clima sereno com pancadas de chuva a qualquer momento.',
  'uma leve garoa.',
  'ventos fortes.',
  'um pouco de frio.',
  'chuva de granizo.',
  'um clima agradavel.'
  ]
  const random2 = Math.floor(Math.random() * climas2.length); // Sorteia uma das frases da tabela climas2.

  const embedDiaConfig = new Discord.MessageEmbed()
  .setColor('YELLOW')
    .setTitle('***Bom dia***, dormenses.')
    .setDescription(` **A previsão do tempo é:** ${climas2[random2]}`)
    .setThumbnail('https://i.imgur.com/Q34Gja3.png')
    .setImage("https://i.imgur.com/IMTkNJh.png")

  

  const imagemPracaDiaConfig = await message.channel.send(embedDiaConfig)

// salva em variaveis o id da mensagem que acabamos de conigurar e o canal onde ela foi enviada
  let pegaid = imagemPracaDiaConfig.id
  let pegaidCanal = imagemPracaDiaConfig.channel.id
 
// conecta com o firebase
  let dbConfigDia = await database.ref(`Servidores/Configuracoes`).once('value');
  let dbMarConfig = await database.ref(`Servidores/Configuracoes/mardofarol`).once('value');

// atualiza o banco de dados trocando as imagens do farol
dbMarConfig = await database.ref(`Servidores/Configuracoes/mardofarol`).update({
  imagemFarol: 'https://i.imgur.com/AZM8ZBm.png',
  imagemMar: 'https://i.imgur.com/MzMndqn.gif'
  
})

//cria as tabelas do banco de dados se não existir e salva o id da msg

  if (dbConfigDia.val() == null){
    
    dbConfig = database.ref(`Servidores/Configuracoes`).update({
      Configuracoes: {
      estadoPraca: "dia",
      idPraca : pegaid,
      idCanalPraca: pegaidCanal
      }
    }) 
  } else {
    dbConfigDia = database.ref(`Servidores/Configuracoes`).update({
      estadoPraca: "dia",
      idPraca : pegaid,
      idCanalPraca: pegaidCanal
    }) 
} 
  } // FIM DA CONFIGURAÇÃO DA PRAÇA


//DIA /////////////////////////////////////////////////////////////
let amanhecer =	new cron.CronJob('00 00 06 * * *', async ()  => {

  console.log("ativou o amanhecer")

  let climasDia = ['um céu com poucas nuvens e sem chuva.', 
    'muita chuva.', 
    'um grande frio.', 
    'um calor intenso.', 
    'um clima agradavel e sem previsão de chuvas.',
    'um clima sereno com pancadas de chuva a qualquer momento.',
    'uma leve garoa.',
    'ventos fortes.',
    'um pouco de frio.',
    'chuva de granizo.',
    'um clima agradavel.'
    ]
    
    const randomDia = Math.floor(Math.random() * climasDia.length);
  
    const embedDia = new Discord.MessageEmbed()
      .setColor('YELLOW')
        .setTitle('***Bom dia***, dormenses.')
        .setDescription(` **A previsão do tempo é** ${climasDia[randomDia]}`)
        .setThumbnail('https://i.imgur.com/Q34Gja3.png')
        .setImage("https://i.imgur.com/IMTkNJh.png")
  
  
    let dbConfigDia = await database.ref(`Servidores/Configuracoes`).once('value');
    let dbMarDia = await database.ref(`Servidores/Configuracoes/mardofarol`).once('value');

  let idMensagemDia = dbConfigDia.val().idPraca
  let idCanalDia = dbConfigDia.val().idCanalPraca
  
  dbConfigDia = await database.ref(`Servidores/Configuracoes`).update({
    estadoPraca: 'dia',
  
  })
  
  dbMarDia = await database.ref(`Servidores/Configuracoes/mardofarol`).update({
    imagemFarol: 'https://i.imgur.com/AZM8ZBm.png',
    imagemMar: 'https://i.imgur.com/MzMndqn.gif'
    
  })
  
    const channelDia = message.guild.channels.cache.find(c => c.id === idCanalDia && c.type === 'text');
     if (!channelDia) return console.log('Unable to find channel.');
    
      const editarMsg1 = await channelDia.messages.fetch(idMensagemDia)
      editarMsg1.edit(embedDia);
    
}); // fim  funcao cron job DIA
    

amanhecer.start()

// NOITE  //////////////////////////////////////////////////////////////////
let anoitecer =	new cron.CronJob('00 00 18 * * *', async ()  => {


  let climasDia = ['um céu com poucas nuvens e sem chuva.', 
    'muita chuva.', 
    'um grande frio.', 
    'um calor intenso.', 
    'um clima agradavel e sem previsão de chuvas.',
    'um clima sereno com pancadas de chuva a qualquer momento.',
    'uma leve garoa.',
    'ventos fortes.',
    'um pouco de frio.',
    'chuva de granizo.',
    'um clima agradavel.'
    ]
    
    const randomDia = Math.floor(Math.random() * climasDia.length);
  
    const embedDia = new Discord.MessageEmbed()
    .setColor('#206694')
    .setTitle('***Boa noite***, dormenses.')
    .setDescription(` **A previsão do tempo é** ${climasDia[randomDia]}`)
    .setThumbnail('https://i.imgur.com/BaSyw1d.png')
    .setImage("https://i.imgur.com/0ns054Q.png")
  
  
    let dbConfigDia = await database.ref(`Servidores/Configuracoes`).once('value');
    let dbMarDia = await database.ref(`Servidores/Configuracoes/mardofarol`).once('value');

  let idMensagemDia = dbConfigDia.val().idPraca
  let idCanalDia = dbConfigDia.val().idCanalPraca
  
  dbConfigDia = await database.ref(`Servidores/Configuracoes`).update({
    estadoPraca: 'noite',
  
  })
  
  dbMarDia = await database.ref(`Servidores/Configuracoes/mardofarol`).update({
    imagemFarol: 'https://i.imgur.com/yNuQ34c.png',
    imagemMar: 'https://i.imgur.com/7jnyAIE.gif'
    
  })
  
    const channelDia = message.guild.channels.cache.find(c => c.id === idCanalDia && c.type === 'text');
     if (!channelDia) return console.log('Unable to find channel.');
    
      const editarMsg1 = await channelDia.messages.fetch(idMensagemDia)
      editarMsg1.edit(embedDia);
 
    
}); // fim  funcao cron job anoitecer
    

anoitecer.start()

}); // fim do comando


// CRIA NO BANCO DE DADO ALGUMAS TABELAS SE O USUARIO É NOVO NO SERVIDOR. ELE PRECISA DIGITAR QUALQUER COISA
//PARA ESSE COMANDO FUNCIONAR.

client.on('message', async message => {
  if (message.channel.type == 'DM') return;
  if (message.author.bot) return ;

  database.ref(`Servidores/Perfil/${message.author.id}`)
  .once('value').then(async function(db) {
    if (db.val() == null) {
      database.ref(`Servidores/Perfil/${message.author.id}`)
      .set({
        xp: 0, //Diamantes
        level: 1, //Nunca usei. O level vem do bot mee6. Ignorar isso
        Relacionamento: 'Nenhum.', // Nome da pessoa que está casada
        RelacionamentoID: 0, //ID Da pessoa
        Casa: 0, // Id da casa que a pessoa possui. Olhar o arquivo perfil.js para entender como funciona
        Prefeito: 'Não',
        quantEmblemas: 1 // Nunca usei
      })

      database.ref(`Servidores/Perfil/${message.author.id}/Emblemas`)
      .set({
        novato: 'https://i.imgur.com/IZ4zrel.png' // assim que entra no servidor já ganha o emblema de novato
      })

      database.ref(`Servidores/Perfil/${message.author.id}/`)
      .update({
        Morando: 'sozinho'
      })
    }
  })


 }); // fim do on
 
client.login(config.token);