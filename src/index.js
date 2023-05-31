import { config } from 'dotenv';
// @discordjs/rest not needed?

config();

import { Client, GatewayIntentBits, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

const { TED_BOT_TOKEN, TED_CLIENT_ID, TED_GUILD_ID } = process.env;
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: '10' }).setToken(TED_BOT_TOKEN);

client.on('ready', () => console.log(`${client.user.tag} has logged in.`));

const commands = [
    {
        name: 'Report',
        type: 2,
    }
];

async function main() {
    try {
        await rest.put(Routes.applicationGuildCommands(TED_CLIENT_ID, TED_GUILD_ID), {
            body: commands,
        });
        client.login(TED_BOT_TOKEN);
    } catch (err) {
        console.log(err);
    }
};

main();
