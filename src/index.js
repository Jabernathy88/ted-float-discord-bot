// initial commit

import { config } from 'dotenv';

config();

import { Client, GatewayIntentBits, Routes, REST } from 'discord.js';
// @discordjs/rest not needed?

const { TED_BOT_TOKEN, CLIENT_ID, GUILD_ID } = process.env;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });


