const Discord = require('discord.js');

module.exports = {
	name: 'registrar',
	alias: [''],
	description: 'comando ping de teste',
	run: async (client, message, args, database) => {

        let idCanal = "855606089470574632"

        const embedBoasvindas = new Discord.MessageEmbed()
        .setColor('PURPLE')
        .setTitle('Cadastro | Olá, queremos saber mais sobre você!')
        .setDescription(`**Maggie diz:** Antes de entrar na nossa cidade é necessário criar sua documentação.
        Não se preocupe, eu sou a guia da cidade e irei te ajudar nisso. 
        E não se esqueça de ler nossas regras para entender melhor como funciona Dorme.

        Clique nas reações para definir algumas coisas sobre você coisas sobre você!
        `)
        .setThumbnail('https://i.imgur.com/54xuT6a.png')

        message.channel.send(embedBoasvindas);
      

        const embedPronome = new Discord.MessageEmbed()
        .setColor('PURPLE')
        .setTitle('QUAL O SEU PRONOME?')
        .setDescription(`Ganhe um cargo de acordo com seu pronome.⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
        Caso queira, você pode escolher mais de uma opção.

        🇪 - Ele/Dele
        🇦 - Ela/Dela
        🇺 - Elu/Delu
        
        Lembre-se de reagir a mensagem do emoji correspondente para receber o cargo!`)
      
        

        //const channel1 = message.guild.channels.cache.find(c => c.id === idCanal && c.type === 'text');
        //if (!channel1) return console.log('Unable to find channel.');
       
        const enviarmsgpronome = await message.channel.send(embedPronome);
        let embedPronomeid = enviarmsgpronome.id
        let canalRegistroid = enviarmsgpronome.channel.id

        //const enviarmsg1 = await client.channels.cache.get(idCanal).send(embedPronome) 

        await enviarmsgpronome.react("🇪");
        await enviarmsgpronome.react("🇦");
        await enviarmsgpronome.react("🇺");

        let dbConfig = await database.ref(`Servidores/Configuracoes`).once('value');

        dbConfig = database.ref(`Servidores/Configuracoes`).update({ //salvando id da msg de pronome para usar dps no index.js
            
            embedPronomeid : embedPronomeid,
            canalRegistroid : canalRegistroid
            
        }) 
           

         //const enviarmsg1 = await channel1.messages.fetch(embed)
         //enviarmsg1.send(embedPronome);

         ///////////////////////////

         const embedIdade = new Discord.MessageEmbed()
        .setColor('PURPLE')
        .setTitle('QUAL A SUA IDADE?')
        .setDescription(`Ganhe cargo de +18 ou -18 no servidor.
        Você só deve escolher uma opção.⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

        🔞 - Maior de idade
        🎓 - Menor de idade
      
        Lembre-se de reagir a mensagem para receber o cargo!`)
       
        const enviarmsgidade = await message.channel.send(embedIdade);
        let embedIdadeid = enviarmsgidade.id

        await enviarmsgidade.react("🔞");
        await enviarmsgidade.react("🎓");
            
            
        dbConfig = database.ref(`Servidores/Configuracoes`).update({
            
            embedIdadeid : embedIdadeid
            
        }) 

    }
};