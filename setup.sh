#!/bin/bash

apt update -y
apt upgrade -y

read -p "Enter your AbuseIPDB API key: " abuseipdb_key
read -p "Enter your Discord webhook URL: " discord_webhook

sed -i '/^export ABUSEIPDB_API_KEY/d' ~/.bashrc
sed -i '/^export DISCORD_WEBHOOK_URL/d' ~/.bashrc

echo "export ABUSEIPDB_API_KEY=$abuseipdb_key" >> ~/.bashrc
echo "export DISCORD_WEBHOOK_URL=$discord_webhook" >> ~/.bashrc

. ~/.bashrc

node_version=$(node -v 2>/dev/null)
if [ -z "$node_version" ]; then
  echo "Node.js not found. Installing Node.js..."
  curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
  sudo apt install -y nodejs
  echo "Node.js installed successfully."
else
  echo "Node.js already installed. Skipping installation."
fi

echo "Installing required packages..."
npm install
echo "Dependencies installed successfully."
