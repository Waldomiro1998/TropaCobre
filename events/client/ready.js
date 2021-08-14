const webScrap = require('../../functions_lib.js')

const DOZE_HORAS=43200 

module.exports = (Discord,client) => {
    console.log(`Ready, \n users: ${client.users.cache.size} \n channels: ${client.channels.cache.size}  \n servers: ${client.guilds.cache.size}`)     
   
    setInterval(async function(){
        webScrap.UpdateAllMembersRank(client)
   }, 3000)

   
}
