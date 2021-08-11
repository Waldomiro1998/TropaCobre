const puppeteer = require('puppeteer')
const userModels = require('../models/userSchema.js')
const RANKS=[ {name:"Cobre",color:"#703616"},{name:"Bronze",color:"#db9b53"},{name:"Prata",color:"#c5c5c5"},{name:"Ouro",color:"#f8e461"},
        {name:"Platina",color:"#8deae9"},{name:"Diamante",color:"#ceb9f5"},{name:"Champion",color:"#b61255"}]

module.exports = {
    name: 'rank',
    description : 'seta o id do jogador com o id do discord',
    async execute(client,message,args,Discord){
        if(!args[0]) return message.reply("Por favor passe o id do jogador no rainbowsixtab");
        
        //tentar validar um id aqui
        
        let rank = await  WebRequest(args[0])
        try {
            let user = await userModels.create({
                userID: message.member.id,
                playerID: args[0]
            })
            user.save()
            message.reply("Agora você está sendo trakeado por mim :D");
            console.log("New User register");
          } catch (error) {
            message.reply("Você já está sendo trakeado");
          }
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