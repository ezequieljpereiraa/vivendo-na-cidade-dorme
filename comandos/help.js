const Discord = require ('discord.js');

module.exports = {
	name: 'ajuda',
	alias: ['help'],
	description: 'Mostra todos os comandos do bot Vida na Cidade Dorme',
	run: async (client, message, args, database) => {

    if (args[0] == 'perfil') {
        const perfil = new Discord.MessageEmbed()
		.setColor('BLUE')
        .setTitle('COMANDOS - VIDA NA CIDADE DORME | PERFIL')
        .setThumbnail('https://i.imgur.com/bXSwzW7.gif')
		.setDescription('Todos os comandos do bot. Mostrando detalhes adicionais para **perfil**')
		.addField('**/perfil**', `Mostra seu perfil contendo nome, relacionamento, sua casa, conquistas.`, false)
        .addField('**/emblemas**',  `Mostra sua lista de emblemas (conquistas). Adquira emblemas em eventos do servidor.`, false)
        .addField('**/casa**',  `Visite a imobiliária do Luís e compre uma casa para morar. Sua casa aparece no seu perfil e pode ser adquirida com diamantes.`, false)
        .addField('**/fundo**',  `Adiciona um fundo personalizado ao seu perfil. Envie /fundo + link da imagem. **Tamanho recomendado: 600x266** `, false)
        .addField('**/removerfundo**',  `Retira o fundo personalizado e volta o fundo padrão ao seu perfil.`, false)
        .addField('**/casar**',  `Se casa com a pessoa mencionada. Digite /casamento + mencione um usuário.`, false)
        .addField('**/morarjuntos**',  `Digite /morarjuntos + mencione um usuário. Você só pode morar com uma pessoa e assim que ela aceitar você se mudará para a casinha dela e perderá sua casa atual.`, false)
        .addField('**/divorciar**',  `Remove a pessoa atual como companheira e te dá o status de "Sem relacionamentos". Digite o comando e confirme utilizando as reações.`, false)
        .setFooter("Solicitado por: "+message.author.username, message.author.displayAvatarURL({size: 32}))
        message.channel.send(perfil)
    } else if (args[0] == 'livros') {
            const livro = new Discord.MessageEmbed()
            .setColor('BLUE')
            .setTitle('COMANDOS - VIDA NA CIDADE DORME | CLUBE DO LIVRO')
            .setThumbnail('https://i.imgur.com/bXSwzW7.gif')
            .setDescription('Todos os comandos listados aqui são exclusivos para bibliotecários. Mostrando detalhes adicionais para **livros**.')
            .addField('**/novolivro**', `Adiciona um novo livro. É necessário informar o nome do livro e por quem foi escrito.`, false)
            .addField('**/livroatual**',  `Mostra qual livro está sendo lido no momento pelo clube, página e data do último encontro.`, false)
            .addField('**/marcador**',  `Salva a data e o dia que o clube parou a leitura.`, false)
            .setFooter("Solicitado por: "+message.author.username, message.author.displayAvatarURL({size: 32}))
                message.channel.send(livro)
        } else if (args[0] == 'mods') {
                const mods = new Discord.MessageEmbed()
                .setColor('BLUE')
                .setTitle('COMANDOS - VIDA NA CIDADE DORME | MODERAÇÃO')
                .setThumbnail('https://i.imgur.com/bXSwzW7.gif')
                .setDescription('Todos os comandos listados aqui são exclusivos para moderadores. Mostrando detalhes adicionais para **mods**.')
                .addField('**/novoemblema**', `Cria um novo emblema. Escreva /novoemblema + nome do emblema começando em letra minuscula + link da imagem. (Ex: /novoemblema novatos www.foto.com/novatos.png) `, false)
                .addField('**/addemblema**',  `Adiciona ou remove emblemas dos habitantes. Digite /addemblema + mencione o user da pessoa + nome do emblema. (Ex: /addemblema @zezinho festa)`, false)
                .setFooter("Solicitado por: "+message.author.username, message.author.displayAvatarURL({size: 32}))
                    message.channel.send(mods)
            } else if (args[0] == 'outros') {
                    const mods = new Discord.MessageEmbed()
                    .setColor('BLUE')
                    .setTitle('COMANDOS - VIDA NA CIDADE DORME | OUTROS')
                    .setThumbnail('https://i.imgur.com/bXSwzW7.gif')
                    .setDescription('Todos os comandos do bot. Mostrando detalhes adicionais para **outros**.')
                    .addField('**/daily**', `Visite a misteriosa árvore brilhante e tente ganhar alguns diamantes. Essa ação só pode ser realizada uma vez ao dia.`, false)
                    .setFooter("Solicitado por: "+message.author.username, message.author.displayAvatarURL({size: 32}))
                        message.channel.send(mods)
               
                } else {
                 const embedHelp = new Discord.MessageEmbed()
		.setColor('BLUE')
        .setTitle('COMANDOS - VIDA NA CIDADE DORME')
        .setThumbnail('https://i.imgur.com/bXSwzW7.gif')
		.setDescription('Todos os comandos do bot. ')
        .addField('**Perfil**',  '`/perfil`, `/emblemas`, `/casar`, `/divorciar`, `/fundo`, `/removerfundo`, `/casa`, `/morarjuntos`. **Veja mais info com */ajuda + perfil.* **', false)
        .addField('**Clube do Livro**',  '`/livroatual`, `/novolivro`, `/marcador`. **Veja mais info com */ajuda + livros.* **', false)
        .addField('**Pescar**',  '`/pescar`, `/escolhervara`, `/lojadowilly`. **Veja mais info com */ajuda + pescar.* **', false)
        .addField('**Outros**',  '`/daily`. **Veja mais info com */ajuda + outros.* **', false)
        .addField('**Moderação**',  'Exclusivo para mods: `/novoemblema`, `/addemblema` **Veja mais info com */ajuda + mods.* **', false)
        .setFooter("Solicitado por: "+message.author.username, message.author.displayAvatarURL({size: 32}))
            message.channel.send(embedHelp)
            }
        }
            
    }