module.exports = () => {
    console.log(`Bot has enter in :${guild.name} \n server_id: ${guild.id} \n members_count: ${guild.memberCount}`)
    
    RANKS.forEach(rank => {   
        let role = message.guild.roles.cache.find(x => x.name === rank.name); 
        if(role=== undefined){
            guild.roles.create({ data:{ name: rank.name, color:rank.color }})
        }   
    });
    
    client.user.setActivity(`Pai tá on`)
}