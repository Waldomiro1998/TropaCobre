module.exports = {
    name: 'createroles',
    description : 'cria todas as roles necessárias pelo bot para ele associar o seu rank',
    command_help: '!createroles',
    async execute(client,message,args,Discord){
        RANKS.forEach(rank => {   
            let role = message.guild.roles.cache.find(x => x.name === rank.name); 
            if(role=== undefined){
                guild.roles.create({ data:{ name: rank.name, color:rank.color }})
            }   
        });
    }
}