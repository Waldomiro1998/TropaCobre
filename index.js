const Discord = require('discord.js');

//DATABASE
const mongoose = require('mongoose');
//MODELS


const client = new Discord.Client({ partials: ["MESSAGE","CHANNEL","REACTION"]});

client.commands = new Discord.Collection();
client.events = new Discord.Collection();


['command_handler','event_handler'].forEach(handler=>{
    require(`./handlers/${handler}`)(client, Discord);
})

mongoose.connect("mongodb+srv://waldomironeto8:tatamomonene123@discordbot.atc79.mongodb.net/TropaCobreDatabase?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology: true,
    useFindAndModify:false 
}).then(()=>{console.log("CONECTION STABLISH WITH DATABASE")}).catch((err) =>{
    console.log(err)
})


//constantes
const RANKS=[ {name:"Cobre",color:"#703616"},{name:"Bronze",color:"#db9b53"},{name:"Prata",color:"#c5c5c5"},{name:"Ouro",color:"#f8e461"},
        {name:"Platina",color:"#8deae9"},{name:"Diamante",color:"#ceb9f5"},{name:"Champion",color:"#b61255"}]



client.login('ODcxODYxOTM0NDU3MjUzODk4.YQhesw.ayOCjyWe-8yXLUbVPNdUqVbmZrA')



/*let user;
try{
    user = await userModels.findOne({ userID: member.id });
    if (user){
        let rank = await  WebRequest(data[member.id])                           
        RANKS.forEach(rank => {   
            let rank_roles = member.roles.cache.find(role => role.name === rank.name);
            if (rank_roles){
                async function start(target_role) {await member.roles.remove(target_role);}
                start(rank_roles)  
            } 
        })

        let role = member.guild.roles.cache.find(role => role.name === rank);
        if (role) guild.members.cache.get(message.author.id).roles.add(role);
    }
}catch(err){
    console.log(err);
}
*/