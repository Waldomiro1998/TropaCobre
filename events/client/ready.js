const puppeteer = require('puppeteer')
const RANKS=[ {name:"Cobre",color:"#703616"},{name:"Bronze",color:"#db9b53"},{name:"Prata",color:"#c5c5c5"},{name:"Ouro",color:"#f8e461"},
        {name:"Platina",color:"#8deae9"},{name:"Diamante",color:"#ceb9f5"},{name:"Champion",color:"#b61255"}]
const userModels = require('../../models/userSchema.js')

module.exports = (Discord,client) => {
    console.log(`Ready, \n users: ${client.users.cache.size} \n channels: ${client.channels.cache.size}  \n servers: ${client.guilds.cache.size}`)      
    setInterval(async function(){
        UpdateAllMembersRank()
   }, 2000)

   async function UpdateAllMembersRank()
    {  
        let users;
        try{
            users = await userModels.find();
            users.forEach(async (user)=>{  
                if (user){

                    let rank = await  WebRequest(user.playerID)
                    client.guilds.cache.forEach((guild) => { console.log(guild.name) })       
                }
            })

            }catch(err){
                console.log(err);
            }
     
    }  
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