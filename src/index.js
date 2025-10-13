require('dotenv').config();
const { Client, GatewayIntentBits, PermissionFlagsBits } = require('discord.js');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,         
        GatewayIntentBits.GuildMessages,   
        GatewayIntentBits.MessageContent,  
        GatewayIntentBits.GuildMembers     
    ]
});

const BOT_TOKEN = process.env.BOT_TOKEN;
const TRAP_CHANNEL_ID = process.env.TRAP_CHANNEL_ID;
const FIVE_MINUTES = 5 * 60 * 1000;
client.once('ready', () => {
    console.log(`Watching channel: ${TRAP_CHANNEL_ID}`);
    console.log(`Will delete messages from last 5 minutes`);
});
client.on('messageCreate', async (message) => {
    if (message.author.bot) {
        return; 
    }
    if (message.channel.id !== TRAP_CHANNEL_ID) {
        return;
    }
    console.log('TRAP TRIGGERED!');
    try {
        await deleteUserMessages(message);
        await message.guild.members.ban(message.author.id, {
            reason: `Auto-banned for posting in trap channel`, 
            deleteMessageSeconds: 0
        });
    } catch (error) {
        console.log(error.message);
    }
});
async function deleteUserMessages(triggerMessage) {
    const server = triggerMessage.guild;           
    const badUserId = triggerMessage.author.id;    
    const fiveMinutesAgo = Date.now() - FIVE_MINUTES; 

    let totalMessagesDeleted = 0; 
    const allChannels = server.channels.cache;
    for (const [channelId, channel] of allChannels) {
        if (!channel.isTextBased()) {
            continue;
        }
        const botPermissions = channel.permissionsFor(server.members.me);
        if (!botPermissions || !botPermissions.has(PermissionFlagsBits.ManageMessages)) {
            continue;
        }
        
        try {
            const recentMessages = await channel.messages.fetch({ limit: 100 });
            for (const [messageId, msg] of recentMessages) {
                if (msg.author.id === badUserId && msg.createdTimestamp > fiveMinutesAgo) {
                        await msg.delete(); 
                        totalMessagesDeleted++;
                    
                }
            }
            
        } catch (fetchError) {
            console.log(`Couldn't check #${channel.name} (no permission?)`);
        }
    }
}
client.login(BOT_TOKEN).catch((error) => {
    console.log('Error:', error.message);
});