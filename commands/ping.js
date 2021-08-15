module.exports = {
    name: 'ping',
    description : 'faz o ping do usuario',
    command_help: '!ping',
    async execute(client,message,args,Discord){
        const m = await message.channel.send("Ping?")
        m.edit(`Seu ping:${m.createdTimestamp - message.createdTimestamp}ms \n latência da API: ${Math.round(client.ws.ping)}ms`)
    }
}