/** Typings */
import { GuildMember } from 'discord.js';
import { Command } from 'src/structures/typings';

/** Export Command */
export = <Command>{
  // check permissions before called exec function
  permissions: { client: ['EMBED_LINKS'] },

  // Body of command, this object is shared to api
  body: {
    name: 'avatar',
    description: "Voir l'avatar d'un membre",
    options: [
      {
        name: 'member',
        description: 'Sélectionnez un membre',
        required: false,
        type: 'USER',
      },
    ],
  },

  // This function is called for execute command
  exec: ({ interaction }) => {
    //? Get member
    const member = interaction.options.getMember('member', false) || interaction.member;

    //! Check if member exist
    if (member instanceof GuildMember) {
      //? Get member avatar
      const avatar = member.user.displayAvatarURL({ size: 2048, format: 'png', dynamic: true });

      //? Send member avatar
      interaction.reply({ embeds: [{ image: { url: avatar } }] });
    } else throw TypeError('member is not a GuildMember');
  },
};
