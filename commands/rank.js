const webScrap = require('../functions_lib.js')

module.exports = {
    name: 'rank',
    description : 'seta o id do jogador com o id do discord',
    async execute(client,message,args,Discord){
        if(!args[0]) return message.reply("Por favor passe um segundo parametro id do jogador no rainbowsixtab");
        
        let rank = await  webScrap.WebRequest(args[0])
        if(rank!=false){
            var query = { "userID": message.member.id },
            update = {"playerID": args[0] },
            options = { upsert: true };

            webScrap.userModels.findOneAndUpdate(query, update, options, function(error, result) {
                if (!error) {
                    if (result) {
                        
                        result.save(function(error) {
                            if (!error) {
                                message.reply("Atualizado com sucesso")
                            } else {
                                throw error;
                            }
                        });
                    }            
                }
                });
            webScrap.RANKS.forEach(rank => {   
                let rank_roles = message.member.roles.cache.find(role => role.name === rank.name);
                if (rank_roles){
                    async function start(target_role) {await message.member.roles.remove(target_role);}
                    start(rank_roles)  
                } 
            });

            let role = message.member.guild.roles.cache.find(role => role.name === rank);
            if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
        }else{
            message.reply("Coloca um id que existe no rainbowsixtab")
        }
    }

}