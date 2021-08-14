
const puppeteer = require('puppeteer')

const RANKS=[ {name:"Cobre",color:"#703616"},{name:"Bronze",color:"#db9b53"},{name:"Prata",color:"#c5c5c5"},{name:"Ouro",color:"#f8e461"},
        {name:"Platina",color:"#8deae9"},{name:"Diamante",color:"#ceb9f5"},{name:"Champion",color:"#b61255"}]

const userModels = require('./models/userSchema.js')


async function WebRequest(player_id){
    const RANK_DICTIONARY = {Copper:"Cobre",Bronze:"Bronze", Silver:"Prata",Gold:"Ouro", Platinum: "Platina",Diamond:"Diamonte",Champion:"Champion"};
    const browser = await puppeteer.launch();
    
    let page = await browser.newPage();
    
    await page.goto(`https://tabstats.com/siege/player/${player_id}`)
    
    try{
        let rank = await page.evaluate(() =>{
            return document.querySelector(".ranktitle").innerHTML.split(" ")[0]
        })
        await browser.close()
        return RANK_DICTIONARY[rank]
    }catch{
        await browser.close()
        return false
    }     
}

async function UpdateAllMembersRank(client)
{  
    let users;
    try{
        users = await userModels.find();
        }catch(err){
            console.log(err);
        }
    
    client.guilds.cache.filter((guild) => {
        users.forEach(async (user)=>{  
            if ( guild.members.cache.has(user.userID) )
            {
                let member = guild.member(user.userID) 
                let rank = await  WebRequest(user.playerID)
                if(rank!=false){
                    RANKS.forEach(rank => {   
                        let rank_roles = member.roles.cache.find(role => role.name === rank.name);
                        if (rank_roles){
                            async function start(target_role) {await member.roles.remove(target_role);}
                            start(rank_roles)  
                        } 
                    });
            
                    let role = member.guild.roles.cache.find(role => role.name === rank);
                    if (role) guild.members.cache.get(user.userID).roles.add(role);
                }
            }    
        })
    });  
}  


module.exports = {UpdateAllMembersRank,WebRequest,userModels,RANKS}

