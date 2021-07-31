const Discord = require('discord.js');
const ms = require('parse-ms');

module.exports = {
	name: 'vidente',
	alias: [''],
	description: 'Horoscopo, sorte do dia, fases da lua e outras coisas misticas.',
	run: async (client, message, args, database) => {
       
        let timeout = 86400000;
        let dbVidente = await database.ref(`Servidores/Perfil/${message.author.id}/vidente`).once('value');
        
        let jaConsultou = 'Volte em 24 horas para uma nova consulta';
      

        // CONFIGURAÇÕES PARA FUNCIONAR APENAS UMA VEZ NO DIA
        if (dbVidente.val() == null){
            let db = await database.ref(`Servidores/Perfil/${message.author.id}/vidente`).set({
                dataVidente: 'esperandoData',
                analiseFrase: 'esperando',
                analiseEvitar: 'evite',
                analiseAmor: 'amor'
                
            })

            const primeiraVezVidente = new Discord.MessageEmbed()
    .setColor('PURPLE')
    .setDescription(`Estamos configurando algumas coisas sobre você. Tente novamente!`)
    .setThumbnail('https://stardewcommunitywiki.com/mediawiki/images/8/8b/Fortune_Teller.png')
    .setFooter("Solicitado por: "+message.author.username, message.author.displayAvatarURL({size: 32}))
            message.channel.send(primeiraVezVidente)
        }

        let author = dbVidente.val().dataVidente
// FUNÇÃO QUE GERA OS EMBED E OS BAGUIO TUDO FI



        ///////////

    //PEGAR A FASE DA LUA
        
    const getJulianDate = (date = new Date()) => {
        const time = date.getTime();
        const tzoffset = date.getTimezoneOffset()
        
        return (time / 86400000) - (tzoffset / 1440) + 2440587.5;
      }

      

      const LUNAR_MONTH = 29.530588853;
const getLunarAge = (date = new Date()) => {
const percent = getLunarAgePercent(date);
const age = percent * LUNAR_MONTH;
return age;
}
const getLunarAgePercent = (date = new Date()) => {
return normalize((getJulianDate(date) - 2451550.1) / LUNAR_MONTH);
}
const normalize = value => {
value = value - Math.floor(value);
if (value < 0)
value = value + 1
return value;
}

    const getLunarPhase = (date = new Date()) => {
        
        const age = getLunarAge(date);
        if (age < 1.84566)
          return "Lua Nova";
        else if (age < 5.53699)
          return "Lua Crescente Côncava"; // lua crescente Waxing Crescent
        else if (age < 9.22831)
          return "Quarto Crescente"; // lua crescente First Quarter
        else if (age < 12.91963)
          return "Crescente Convexa Gibosa"; // lua crescente Waxing Gibbous
        else if (age < 16.61096)
          return "Lua Cheia";
        else if (age < 20.30228)
          return "Minguante Convexa Gibosa"; // minguante Waning Gibbous
        else if (age < 23.99361)
          return "Quarto Minguante"; //minguante Last Quarter
        else if (age < 27.68493)
          return "Lua Minguante côncava"; // minguante Waning Crescent
        return "Lua Nova";
      }
///////////////////////////////////////

///  COMANDOS DO VIDENTE

let nomeEmblema = args[0] // PEGA A PRIMEIRA COISA DIGITADA DEPOIS DO COMANDO
let urlEmblema = args[1] // PEGA A SEGUNDA
let respostas = ['Sim','sim','SIM'] // RESPOSTAS QUE O USUARIO PODE DAR
let usuario = message.author.username
let explicacaoLua = '';
let emojilua = '';

if (getLunarPhase() === 'Lua Nova') {
explicacaoLua = 'novos começos. Esse é um ótimo momento para começar novos projetos e também refletir sobre medos, sombras e receios, ou seja, olhar as partes desconhecidas de nós mesmos. Também é considerado o momento de nos transformar, nos curar para iniciar a nova vida. É fazer uma limpeza em nós mesmos para que tenhamos um novo começo.'
emojilua = '🌑';
} else if (getLunarPhase() === 'Lua Crescente Côncava') {
explicacaoLua = 'o crescimento, como o próprio nome diz. Agora que plantamos novas sementes, iniciamos os nossos projetos, é preciso que eles cresçam fortes. Você acabou de pensar em tudo o que não deseja para si, tomou a decisão de quais serão seus recomeços, pois agora é o momento de fazer crescer suas intenções. Tudo aquilo que espera crescer, prosperar, fortificar em sua vida você precisa fazer nesse momento.'
emojilua = '🌘';
} else if (getLunarPhase() === 'Quarto Crescente') {
explicacaoLua = 'continuar seu crescimento. Os objetivos estão agora enraizados em seu consciente e as plantinhas estão criando folhas. Há uma determinação em se concretizar os projetos e compromissos antes assumidos e revisados. É necessário agir, arregaçar as mangas e trabalhar, enfrentando desafios e procurando a direção certa.'
emojilua = '🌗';
} else if (getLunarPhase() === 'Crescente Convexa Gibosa') {
explicacaoLua = 'a reavaliação de tudo o que fez até então, e observar se realmente o caminho irá te levar até o seu objetivo. Porém é importante você prestar atenção em sua intuição, avaliar tudo cuidadosamente. A lua está chegando ao fim de sua fase ascendente. Obstáculos podem aparecer na evolução dos planos, trazendo decepções ou desânimo. A planta está pronta para florescer, mas ainda é um momento que requer cuidados. É necessário clarificar e analisar as opções, apelar para a paciência e verificar os detalhes, talvez abrindo mão de algumas exigências. '
emojilua = '🌖';
} else if (getLunarPhase() === 'Lua Cheia') {
explicacaoLua = 'representa a colheita, então reconheça os frutos adquiridos até então. Perceba como foi feito a sua autoanálise lá no começo, assim como os resultados dos mesmos. Mesmo que se tenha resultados negativos, aceite-as de braços abertos. A lua alcançou sua luz plena e sua posição é exatamente oposta ao sol. Seu campo magnético influencia os líquidos dos corpos vivos e exalta a manifestação do potencial total. Não há como crescer ou brilhar além: os projetos atingiram seu auge. Se não percebermos essa realização, permitiremos a aparição da frustração e do descontentamento, o que leva aos distúrbios emocionais, a “loucura” da lua cheia. Os relacionamentos podem tornar-se obsessivos, pois os ânimos estão exaltados.'
emojilua = '🌕';
} else if (getLunarPhase() === 'Minguante Convexa Gibosa') {
explicacaoLua = `agradecer. Agradeça as oportunidades, aprendizados, os desafios, as mudanças e os resultados. Se houve aquele momento ruim, e que você venceu, agradeça. Dependendo do que colheu na fase da Lua Cheia, a sensação pode ser de alegria ou tristeza, revendo o que foi feito e qual será o próximo passo. O momento requer introspecção e avaliação dos frutos: o jardineiro deve colhê-los ou eles apodrecerão. Os resultados devem ser avaliados com clareza e assumidos integralmente, independente de estarmos satisfeitos ou não. Deve-se colher aquilo que foi semeado. Disseminar significa dispersar: este é o momento e ajudar nossos companheiros que ainda não terminaram suas colheitas. Encare seus medos ${usuario}, liberte-se dos padrões ultrapassados, reconheça e aceite as forças primitivas e emoções arcaicas que moram dentro de si para poder fragmentá-las e dispersá-las.`
emojilua = '🌔';
} else if (getLunarPhase() === 'Quarto Minguante') {
explicacaoLua = 'se ver carregado de várias energias que adquiriu ao longo dessa jornada. É o momento de se limpar mentalmente. Se quiser tirar algumas férias, praticar algo que te deixe feliz, conversar com pessoas que lhe fazem bem, o faça. É o momento de libertar toda a energia acumulada. Inclusive, se quiser fazer uma faxina física em sua casa/escritório/quarto, o faça. Preste atenção na sua alimentação. Completadas as tarefas e cumprido os prazos, podemos esperar, com humildade e paciência, pelas recompensas. Se não estivermos satisfeitos com o resultado final, devemos encarar os fatos e descobrir quais as mudanças internas necessárias para que, exteriormente, também haja melhorias. Podem aparecer sentimentos de inadequação e decepção; não devemos entrar em crise, mas sim aceitar a morte natural das sementes plantadas na lua nova, limpar o terreno e se preparar para um novo plantio.'
emojilua = '🌓';
} else if (getLunarPhase() === 'Lua Minguante côncava') {
explicacaoLua = 'relaxar, pois um novo ciclo está por vir. É nesse momento que você avalia a trajetória que passou, revê quais os projetos que ainda precisam ser finalizados, e começa a se preparar para o recomeço. É considerado um período de tração, recomposição e renovação. O campo deve ser limpo, a mente purificada, a percepção psíquica aguçada para ouvirmos a orientação de nossa voz interior.'
emojilua = '🌒'
}





if (!args.length) {
const embedVidente = new Discord.MessageEmbed()
    .setColor('PURPLE')
    .setTitle('O VIDENTE')
    .setDescription(`
    **Hum...** Veja só quem resolveu aparecer. **Que bom que me procurou ${usuario}...**
    **O destino nunca erra. Se você veio até a minha tenda é porque tem algo a resolver.**

    `)
    .addField(`✨ /vidente análise`, `Saiba sua previsão do dia segundo minha bola de cristal digite o comando e te contarei tudo o que os astros falam sobre seu dia.`)
    .addField(`${emojilua} /vidente lua`, `Descubra a fase da lua atual e o que ela diz sobre sua vida.`)
    .addField(`🥠 /vidente biscoito`, `Pegue um biscoito da sorte e receba uma frase que vai mudar sua vida.`)
    .addField(`❔ /vidente resposta`, `Tem uma pergunta rápida de Sim ou Não? Pense na pergunta, digite o comando e os astros te responderam.`)
    .setThumbnail('https://stardewcommunitywiki.com/mediawiki/images/8/8b/Fortune_Teller.png')
    .setFooter("Solicitado por: "+message.author.username, message.author.displayAvatarURL({size: 32}))
    message.channel.send(embedVidente);

}
else if (args[0] === "analise" || args[0] === "análise" || args[0] === "ANALISE" || args[0] === "ANÁLISE") {


// FUNÇÃO QUE VERIFICA SE VAI ENVIAR OU NÃO ISSO

if(author !== null && timeout - (Date.now() - author) > 0) {

    let time = ms(timeout - (Date.now() - author));

    const embedVidenteAnalise = new Discord.MessageEmbed()
    .setColor('PURPLE')
    .setTitle(`Análise para ${message.author.tag} | O VIDENTE`)
    .setDescription(`
    **O vidente diz:** Espera... Eu acho que já te disse suas informações do dia. Você pode se consultar novamente não fará com que as informações dos astros mudem. Utilize o dia de hoje para pensar sobre o que te falei hoje e volte daqui ${time.hours} horas para uma nova consulta. Relembre:

    `)
    .addField(`✨ SOBRE SUAS ENERGIAS NO DIA DE HOJE:`,`Hoje é um dia de procurar ${dbVidente.val().analiseFrase}.`, true)
    .addField(`🚫 COISAS QUE VOCÊ DEVE EVITAR:`,`Evite ${dbVidente.val().analiseEvitar}`, true)
    .addField(`💗 VIDA AMOROSA`,`${dbVidente.val().analiseAmor}`, true)
    .setThumbnail('https://stardewcommunitywiki.com/mediawiki/images/8/8b/Fortune_Teller.png')
    .setFooter("Solicitado por: "+message.author.username, message.author.displayAvatarURL({size: 32}))

    message.channel.send(embedVidenteAnalise);

} else {
    let analiseFrases = [
        "calma",
        "coisas que tragam alegria",
        "mais exercicios físicos",
        "uma boa meditação guiada",
        "o auto perdão",
        "novos hobbies que não exijam muito de você",
        "mais concentração nos estudos",
        "se envolver menos em brigas",
        "se impor mais sobre os assuntos que te incomodam"
        ]
        
        const randomAnalise = Math.floor(Math.random() * analiseFrases.length);
        
        let analiseEvitar = [
        "dar muita atenção ao que os seus parentes falarem de você.",
        "falar mal dos outros.",
        "stalkear pessoas que fazem ou fizeram parte da sua vida.",
        "ficar muito tempo sem comer.",
        "se culpar demais por coisas do passado.",
        "pensar muito nas coisas que aconteceram na última semana.",
        "entrar em discussões, brigas ou qualquer coisa que possa te deixar para baixo.",
        "contar muito da sua vida para as pessoas.",
        "ficar muito tempo sem responder as pessoas que te apoiam todos os dias."
        ]
        
        const randomAnaliseEvitar = Math.floor(Math.random() * analiseEvitar.length);
        
        let analiseAmor = [
        "Pare de ver muitos defeitos nas pessoas. Muitos dos defeitos que você critica são apenas reflexos do que você é.",
        "O amor irá bater na sua porta, mas antes é necessário você se amar.",
        "Dê uma chance para flertes que irão aparecer e não tenha medo de ser feliz.",
        "Pense com cuidado sobre as atitudes de pessoas que irão se aproximar de você e esteja com os olhos abertos.",
        "Pare de procurar nas pessoas que você se relaciona uma cópia de si. Todos somos diferentes!",
        "Comece a levar mais a sério as pessoas que estão te dando carinho e retribua.",
        "Não tenha medo de viver os próximos relacionamentos que irão aparecer.",
        "Mostre toda sua confiança, porque se você não gostar de si mesmo ninguém irá gostar. Nunca é tarde para estar com alguém especial.",
        "Amar vai além de beijos. Você encontrará alguém que soma com você em todos os sentidos. Esteja com disposição para viver isso!"
        ]
        
        const randomAnaliseAmor = Math.floor(Math.random() * analiseAmor.length);
        
        let evitar = analiseEvitar[randomAnaliseEvitar]
        let frase = analiseFrases[randomAnalise]
        let amor = analiseAmor[randomAnaliseAmor]
        
        // codigo para salvar infos no db

        if (dbVidente.val() == null){
            let db = await database.ref(`Servidores/Perfil/${message.author.id}/vidente`).set({
                dataVidente: Date.now(),
                analiseFrase: frase,
                analiseEvitar: evitar,
                analiseAmor: amor
                
            })
        } else {
            database.ref(`Servidores/Perfil/${message.author.id}/vidente`).update({
                dataVidente: Date.now(),
                analiseFrase: frase,
                analiseEvitar: evitar,
                analiseAmor: amor
            })
        }

        
        
        
        const embedVidenteAnalise = new Discord.MessageEmbed()
            .setColor('PURPLE')
            .setTitle(` Análise para ${message.author.tag} | O VIDENTE`)
            .setDescription(`
            O vidente passa as mãos sobre uma bola de cristal que treme sobre a mesa. Ele solta um pequeno suspiro e olha para você...
        
        
            `)
            .addField(`✨ SOBRE SUAS ENERGIAS NO DIA DE HOJE:`,`Hoje é um dia de procurar ${frase}.`, true)
            .addField(`🚫 COISAS QUE VOCÊ DEVE EVITAR:`,`Evite ${evitar}`, true)
            .addField(`💗 VIDA AMOROSA`,`${amor}`, true)
            .setThumbnail('https://stardewcommunitywiki.com/mediawiki/images/6/65/LuckStar.gif')
            .setFooter("Solicitado por: "+message.author.username, message.author.displayAvatarURL({size: 32}))
            message.channel.send(embedVidenteAnalise);
}

} else if (args[0] === "lua" || args[0] === "Lua" || args[0] === "LUA" || args[0] === "moon") { // FASE DA LUA

  const embedVidenteLua = new Discord.MessageEmbed()
          .setColor('PURPLE')
          .setTitle(`Fase da Lua atual para ${message.author.tag} | O VIDENTE`)
          .setDescription(`
          **O vidente diz:** Toda fase da lua traz algo novo para você. Verifique sempre o calendário lunar para saber o que fazer com a sua vida.
  
          `)
          .addField(`${emojilua} FASE DA LUA:`,`${getLunarPhase()}`)
          .addField(` ✨ O QUE A FASE DA LUA TRAZ PARA SUA VIDA:`, ` **A fase da lua atual é ${getLunarPhase()}**, uma fase propicia para ${explicacaoLua}`)
          .setThumbnail('https://stardewcommunitywiki.com/mediawiki/images/9/9a/LuckSwirlingLights.gif')
          .setFooter("Solicitado por: "+message.author.username, message.author.displayAvatarURL({size: 32}))
          message.channel.send(embedVidenteLua);
  
} else if (args[0] === "resposta" || args[0] === "RESPOSTA" || args[0] === "Resposta") { // tipo magic 8ball
    let bolaCristal = [
        'Sim!',
        'Não!',
        'O que você acha? É claro que não!',
        'Uau... Energia forte. Sim, sim, sim.',
        'Nunca.',
        'Talvez.',
        'É certo que sim!',
        'Muito provável!',
        'Os sinais apontam que sim.',
        'Os sinais apontam que não.'
        ]
        
        const randomBola = Math.floor(Math.random() * bolaCristal.length);

        
    const embedVidenteRoll = new Discord.MessageEmbed()
        .setColor('PURPLE')
        .setTitle(`Procurando respostas para ${message.author.tag}... | O VIDENTE`)
        .setDescription(`
            O vidente passa a mão sobre a bola de cristal... As energias vibram sobre seu corpo e ele se dirige a você:

            **A resposta que você procura é:** ${bolaCristal[randomBola]}
        
        `)
        .setThumbnail('https://stardewcommunitywiki.com/mediawiki/images/8/8b/Fortune_Teller.png')
        .setFooter("Solicitado por: "+message.author.username, message.author.displayAvatarURL({size: 32}))
        
        message.channel.send(embedVidenteRoll);
        
} else if (args[0] === "biscoito" || args[0] === "BISCOITO" || args[0] === "Biscoito" || args[0] === "cookie") { // tipo magic 8ball

let lines = [];

require('fs').readFileSync('./comandos/biscoitodasorte.txt', 'utf-8').split(/\r?\n/).forEach(function(line){
   lines.push(line);
});


    const randomBiscoito = Math.floor(Math.random() * 39 + 0);

        
    const embedBiscoito = new Discord.MessageEmbed()
        .setColor('PURPLE')
        .setTitle(`🥠 Biscoito da Sorte para ${message.author.tag} | O VIDENTE `)
        .setDescription(`
        
        O vidente te entrega um biscoito da sorte, você abre e está escrito:

        >  **"${lines[randomBiscoito]}"**

        
        `)
        .setThumbnail('https://stardewcommunitywiki.com/mediawiki/images/a/a0/LuckPyramid.gif')
        .setFooter("Solicitado por: "+message.author.username, message.author.displayAvatarURL({size: 32}))
        
        message.channel.send(embedBiscoito);
        
}

        


        
        

    }// FIM DO COMANDO VIDENTE
};// FIM DO COMANDO VIDENTE