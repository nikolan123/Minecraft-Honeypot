# Minecraft-Honeypot

This project allows you to host a Minecraft server using Node.js and [minecraft-protocol](https://github.com/PrismarineJS/node-minecraft-protocol/) to find and report IP addresses of Server Scanners to AbuseIPDB. It also logs player activity and information and sends it to a Discord webhook

## Installation

To install all the required dependancies and set the required information, run the following command:

```bash
./setup.sh
```
This script will install Node.js (if not already installed) and the required dependencies for hosting the Minecraft server. The script will also prompt you to provide the necessary configuration details

Running the script will prompt you for the following information:

- AbuseIPDB API key: The API key used to report IPs to AbuseIPDB found [here](https://www.abuseipdb.com/account/api)
- Discord webhook: The webhook to send logs to
The installation script will set up the required environment variables based on your inputs and store them in .bashrc

# Running the Honeypot
To start the Honeypot, run the following command in your terminal:

```bash
node server.js
```
This will setup a Minecraft server and listen on the default port of 25565, it will then start logging player activity.