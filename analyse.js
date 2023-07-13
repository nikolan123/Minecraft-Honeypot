const axios = require('axios');
const config = require('./config.js')
const moment = require('moment');
const discord = require('./discord.js')

// local database to store reported IPs and their timestamps
const reportedIPs = new Map();


function analyse(client){
    if(client.username == null)
        console.log('Pinged from ' + client.socket.remoteAddress);
    else
        console.log(client.username + ' connected from ' + client.socket.remoteAddress);

    if(config.send_to_webhook)
        discord.sendEmbedToWebhook(client);

    if(config.report_ip){
        const lastReportedAt = reportedIPs.get(client.socket.remoteAddress);
  
        if (lastReportedAt && moment().diff(lastReportedAt, 'hours') < 24) {
            console.log('IP '+client.socket.remoteAddress+' has been reported within the last 24 hours, not reporting');
        } else {
            reportIP(client.socket.remoteAddress);
        }
    }
}

async function reportIP(ip) {
    try {
      const response = await axios.post('https://api.abuseipdb.com/api/v2/report', {
        ip: ip,
        categories: [14, 15], // 14 = portscan, 15 = hacking
        comment: 'Scanning for Minecraft servers (port '+config.port+')',
      }, {
        headers: {
          'Key': config.abuseipdb_key,
          'Accept': 'application/json',
        },
      });

      if (response.status === 200) {
        reportedIPs.set(ip, moment());
        console.log('IP reported successfully:', ip);
        console.log('Report ID:', response.data.data.reportId);
      } else {
        console.log('Failed to report IP:', ip);
      }
    } catch (error) {
      console.error('Error reporting IP:', error.message);
    }
}

module.exports = {
    analyse
}