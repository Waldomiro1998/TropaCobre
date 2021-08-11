module.exports = {
    name: 'clearoles',
    description : 'deleta todas as roles criadas pelo bot',
    async execute(client,message,args,Discord){
        RANKS.forEach(rank => {   
            let role = message.guild.roles.cache.find(x => x.name === rank.name); 
            if(role != undefined){
                role.delete() .then(deleted => console.log(`Deleted role ${deleted.name}`))
                .catch(console.error);
            }   
        });
    }
}