const fs = require("fs");

const puppeteer = require('puppeteer');
//API discord
const Discord = require('discord.js')

const { Client, Intents } = require("discord.js");
const intents = new Intents([
    Intents.NON_PRIVILEGED, // include all non-privileged intents, would be better to specify which ones you actually need
    "GUILD_MEMBERS", // lets you request guild members (i.e. fixes the issue)
]);
const client = new Client({ ws: { intents } });

const config = require('./config.json')

const RANKS=[ {name:"Cobre",color:"#703616"},{name:"Bronze",color:"#db9b53"},{name:"Prata",color:"#c5c5c5"},{name:"Ouro",color:"#f8e461"},
        {name:"Platina",color:"#8deae9"},{name:"Diamante",color:"#ceb9f5"},{name:"Champion",color:"#b61255"}]

const DOZEHORAS=43200*1000

client.on("ready", ()=>{
    console.log(`Ready, \n users: ${client.users.cache.size} \n channels: ${client.channels.cache.size}  \n servers: ${client.guilds.cache.size}`)   
    
})

client.on("guildCreate", guild =>{
    console.log(`Bot has enter in :${guild.name} \n server_id: ${guild.id} \n members_count: ${guild.memberCount}`)
    
    RANKS.forEach(rank => {   
        let role = message.guild.roles.cache.find(x => x.name === rank.name); 
        if(role=== undefined){
            guild.roles.create({ data:{ name: rank.name, color:rank.color }})
        }   
    });
    
    client.user.setActivity(`Pai tá on`)
    
})

client.on("guildDelete",guild =>{
    console.log(`Bot has been kicked from \n server: ${guild.name}(id: ${guild.id})`)
})


//quando alguem manda mensagem 

client.on("message", async message =>{
    if(message.author.bot) return //ignora mensagens de outros bots
    if(message.channel.type ==="dm") return //ignora dm's 
  
    const guild = client.guilds.cache.get(message.guild.id); // servidor que foi mandado a mensagem
    const author = message.author.member //autor da mensagem

    let args = message.content.slice(config.prefix.length).trim().split(/ +/g) //gera um array com todos os parametros do codigo 
    
    args.forEach(element => { //ignora uppercases
        element.toLowerCase()
    });

    const comando = args[0].toLowerCase() //comando principal
    
   
    let param1 = args[1].toLowerCase() //parametro de comando
   

    //faz o calculo do ping do servidor e do usuario
    if(comando === "ping")
    {
        const m = await message.channel.send("Ping?")
        m.edit(`Seu ping:${m.createdTimestamp - message.createdTimestamp}ms \n latência da API: ${Math.round(client.ws.ping)}ms`)
    }//cria as roles necessarias para o servidor
    else if(comando ==="roles")
    {   
        RANKS.forEach(rank => {   
            let role = message.guild.roles.cache.find(x => x.name === rank.name); 
            if(role=== undefined){
                guild.roles.create({ data:{ name: rank.name, color:rank.color }})
            }   
        });
    }//deleta as roles criadas pelo bot
    else if(comando==="clearroles"){
        RANKS.forEach(rank => {   
            let role = message.guild.roles.cache.find(x => x.name === rank.name); 
            if(role != undefined){
                role.delete() .then(deleted => console.log(`Deleted role ${deleted.name}`))
                .catch(console.error);
            }   
        });
    }
    else if( comando === "rank" && param1 != null)
    {     
        let rank = await  WebRequest(param1)        
        RANKS.forEach(rank => {   
            let rank_roles = message.member.roles.cache.find(role => role.name === rank.name);
            if (rank_roles){
                async function start(target_role) {await message.member.roles.remove(target_role);}
                start(rank_roles)  
            } 
        });

        let role = message.member.guild.roles.cache.find(role => role.name === rank);
        if (role) message.guild.members.cache.get(message.author.id).roles.add(role);
    }


})

client.login(config.token)


setInterval(() => UpdateAllMembersRank(),4000);


async function UpdateAllMembersRank()
{
    jsonReader('./registered.json',(err,data)=>{
        if(err){
            console.log(err)
        }else{
            
            client.guilds.cache.forEach(guild =>{
                if (!guild)
                    return console.log(`Can't find any guild with the ID "${id}"`);
                guild.members
                    .fetch()
                    .then((members) =>
                        members.forEach((member) => async function(){
                            if (member.id in data){
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
                        }),
                    );
            });
        
        }
    })
         
}


async function WebRequest(player_id){
    const RANK_DICTIONARY = {Copper:"Cobre",Bronze:"Bronze", Silver:"Prata",Gold:"Ouro", Platinum: "Platina",Diamond:"Diamonte",Champion:"Champion"};
    const browser = await puppeteer.launch();
    
    let page = await browser.newPage();
    
    await page.goto(`https://tabstats.com/siege/player/${player_id}`)
    let rank = await page.evaluate(() =>{
        return{
            current_rank:  document.querySelector(".ranktitle").innerHTML.split(" ")[0]
        }
    }) 
    await browser.close()
    return  RANK_DICTIONARY[rank.current_rank]
}


function jsonReader(filePath,cb){
    fs.readFile(filePath,'utf-8',(err,fileData) =>{
    if(err){
        return cb && cb(err)
    }
    try{
        const object = JSON.parse(fileData)
        return cb && cb(null,object)
    }catch(err){
       return cb && cb(err)
    }

    })
}
