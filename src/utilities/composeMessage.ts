export default function composeMessage(emoji: string[], roles: string[]): string {
  let message: string = 'Velkommen! Du kan reagere på denne meldingen med forskjellige emoji for å få tildelt roller\n';

  emoji.forEach((reaction, index) => {
    message += `Reager med ${reaction} for å få rollen ${roles[index]}\n`;
  })

  return message;
}