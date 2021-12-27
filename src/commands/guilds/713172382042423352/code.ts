import { MessageAttachment } from 'discord.js';
import fs from 'fs';

/** Typings */
import { Command } from 'src/structures/typings';

/** Export Command */
export = <Command>{
  // Body of command, this object is shared to api
  body: {
    name: 'code',
    description: "Regardez le derrière d'une commande",
    options: [
      {
        name: 'type',
        description: 'Sélectionnez la catégorie du bout de code',
        required: true,
        type: 'STRING',
        choices: [{ name: 'Command', value: 'command' }],
      },
      {
        name: 'name',
        description: "Nom de l'interaction",
        required: true,
        type: 'STRING',
      },
    ],
  },

  // This function is called for execute command
  exec: ({ interaction, sucrose }) => {
    const type = interaction.options.getString('type', true); //? Get type
    const name = interaction.options.getString('name', true); //? Get name

    //! If type === "command"
    if (type === 'command') {
      const commands = sucrose.interactions.commands.guilds.get('713172382042423352'); //? Get guild commands
      if (!(commands instanceof Map)) throw TypeError('commands is not a Map'); //! Throw if command is not a Map

      const command = commands.get(name.toLowerCase()); //? Get guild command
      if (!command) throw TypeError('command is undefined'); //! Throw if command is undefined

      const target = command.path.slice(0, command.path.length - 3); //? Get file name
      const path = `commands/guilds/713172382042423352/${target}`; //? Define path to command
      const files: { attachment: Buffer; name: string }[] = []; //? Defined files array

      if (fs.existsSync(`./src/${path}.ts`)) files.push({ attachment: fs.readFileSync(`./src/${path}.ts`), name: 'typescript' }); //? Fichier typescript
      if (fs.existsSync(`./dist/${path}.js`)) files.push({ attachment: fs.readFileSync(`./dist/${path}.js`), name: 'javascript' }); //? Fichier javascript

      if (!files.length) throw Error('this command have no files'); //! Throw error if files not contain a file
      interaction.reply({ content: `> 🟦 Voici le(s) fichier(s) de la commande **${name}**`, files }); //? Reply to member
    } else throw Error(`type "${type}" is not supported`); //! Throw if type is not supported
  },
};
