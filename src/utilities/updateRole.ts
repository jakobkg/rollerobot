import Discord from 'discord.js';
import * as config from '../../config/config.json';

export default function updateRole(action: 'add' | 'remove',
  robot: Discord.Client,
  event: Discord.MessageReaction | Discord.PartialMessageReaction,
  user: Discord.User | Discord.PartialUser) {
    event.fetch().then( event => {
      user.fetch(true).then( user => {
        if (event.message.author?.id === robot.user?.id && user.id !== robot.user?.id) {
          config.emoji.forEach((emoji, index) => {
            if (emoji === event.emoji.toString()) {
              const userObj = event.message.guild?.members.cache.get(user.id);
              const roleObj = event.message.guild?.roles.cache.find( role => role.name == config.roles[index]);
    
              if (!(userObj === undefined) && !(roleObj === undefined)) {
                if (action === 'add') userObj.roles.add(roleObj.id);
                if (action === 'remove') userObj.roles.remove(roleObj.id);
              }
            }
          })
        }
      })
    })
  }
