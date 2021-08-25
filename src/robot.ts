import Discord, {Intents} from 'discord.js';
import {composeMessage, updateRole} from './utilities';
import * as config from '../config/config.json';
import * as secrets from '../config/secret.json';

if (config.emoji.length !== config.roles.length) throw new Error("Antall emoji og roller er ikke like, oppdater config.");

const robotIntents = new Intents();
robotIntents.add(
  Intents.FLAGS.GUILDS,
  Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  Intents.FLAGS.GUILD_MESSAGES,
  Intents.FLAGS.GUILD_MEMBERS);

const robot = new Discord.Client({ intents: robotIntents});

robot.on('message', message => {
  if (message.author.id === config.adminID && message.content == config.initCommand) {
    message.channel.send(composeMessage(config.emoji, config.roles))
    .then( sentMessage => {
      config.emoji.forEach((emoji) => {
        sentMessage.react(emoji);
      })
    })
  }
})

robot.on('messageReactionAdd', (event, user) => {
  updateRole('add', robot, event, user);
})

robot.on('messageReactionRemove', (event, user) => {
  updateRole('remove', robot, event, user);
})

robot.login(secrets.token)
  .then( () => {
    console.log('Beep boop, started.');
  })
  .catch( (reason) => {
    console.log('Startup failed, beep boop.')
    console.log(reason);
  })
