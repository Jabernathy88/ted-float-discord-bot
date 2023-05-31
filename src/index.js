import { config } from 'dotenv';

config();

import { Client, GatewayIntentBits, Routes, TextInputStyle } from 'discord.js';
import { REST } from '@discordjs/rest';
import { ActionRowBuilder, ModalBuilder, TextInputBuilder } from '@discordjs/builders';

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

client.on('interactionCreate', (interaction) => {
    if (interaction.isUserContextMenuCommand()) {
        console.log(interaction.commandName);
        if (interaction.commandName === 'Report') {
            const modal = new ModalBuilder()
                .setCustomId('reportUserModal')
                .setTitle('Report a User')
                .setComponents(
                    new ActionRowBuilder().setComponents(
                        new TextInputBuilder()
                            .setCustomId('reportMessage')
                            .setLabel('Report Message')
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                            .setMinLength(10)
                            .setMaxLength(500)
                    )

                );
            interaction.showModal(modal);
        }
    }
})

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
