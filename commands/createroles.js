module.exports = {
    name: 'createroles',
    description : 'cria todas as roles necessarias pelo bot',
    async execute(client,message,args,Discord){
        RANKS.forEach(rank => {   
            let role = message.guild.roles.cache.find(x => x.name === rank.name); 
            if(role=== undefined){
                guild.roles.create({ data:{ name: rank.name, color:rank.color }})
            }   
        });
    }
}