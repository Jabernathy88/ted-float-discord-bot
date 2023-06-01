import { config } from 'dotenv';

config();

import { Client, GatewayIntentBits, InteractionType, Routes, TextInputStyle } from 'discord.js';
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

client.on('interactionCreate', async (interaction) => {
    if (interaction.isUserContextMenuCommand()) {
        // console.log(interaction.commandName);
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
            await interaction.showModal(modal);
            const modalSubmitInteraction = await interaction.awaitModalSubmit({
                filter: (i) => { // parameter i, similar to user 'event' type parameter
                    console.log('Await Modal Submit');
                    return true;
                },
                time: 115000,
            });
            console.log(interaction.user.tag)
            console.log(interaction.targetUser.tag)

            modalSubmitInteraction.reply({
                content: `Thank you for reporting: ${interaction.targetMember}. Reason: ${modalSubmitInteraction.fields.getTextInputValue('reportMessage')}`,
                ephemeral: true, 
            });
        }
    }
});

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
