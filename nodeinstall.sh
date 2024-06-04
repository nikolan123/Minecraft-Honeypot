#!/bin/bash

apt update -y

. ~/.bashrc

node_version=$(node -v 2>/dev/null)
if [ -z "$node_version" ]; then
  echo "Node.js not found. Installing Node.js..."
  curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt install -y nodejs
  echo "Node.js installed successfully."
else
  echo "Node.js already installed. Skipping installation."
fi

echo "Installing required packages..."
npm install
echo "Dependencies installed successfully."
echo "Config file is config.js"
