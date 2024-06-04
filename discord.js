const axios = require('axios');
const config = require('./config.js')

async function sendEmbedToWebhook(client) {

    let embed;

    if(client.username == null)
        embed = {
            title: 'Server Pinged',
            description: client.socket.remoteAddress,
            color: 0xFF0000,
            timestamp: new Date().toISOString(),
        };
    else
        embed = {
            title: 'Join attempt',
            description: '**Username:** $client.username, **IP:** $client.socket.remoteAddress',
            color: 0xFF0000,
            timestamp: new Date().toISOString(),
        };
      
    try {
        const response = await axios.post(config.discord_webhook, {
            embeds: [embed],
        });

        if (response.status !== 204)
            console.log('Failed to send embed message to the webhook.');
        
    } catch (error) {
        console.error('Error sending embed message:', error.message);
    }
}

module.exports = {
    sendEmbedToWebhook
}
