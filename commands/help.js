const fs = require('fs');

module.exports = {
    name: 'help',
    description : 'lista todos os comandos',
    command_help: '!help',
    async execute(client,message,args,Discord){
        message.channel.send(all_commands);
    }
}

const command_files = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))
let all_commands =""
for(const file of command_files){
    const command = require(`./${file}`);
    all_commands+="```"+command.command_help+" - "+command.description+"\n ```"
}

