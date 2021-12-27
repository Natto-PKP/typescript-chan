import { Params } from 'src/structures/typings';

const guildId = '713172382042423352';

export = {
  listener: ({ sucrose }: Params<'ready'>) => {
    // console.log(`${sucrose.guilds.cache.size} guilds`);
    // sucrose.interactions.commands.create('code', guildId);
  },
};
