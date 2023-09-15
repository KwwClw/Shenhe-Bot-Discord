const { ActivityType } = require('discord.js');

let status = [
    {
      name: 'Kwwclw',
      type: ActivityType.Streaming,
      url: 'https://www.youtube.com/watch?v=D5d5xinZI3E',
    },
    {
      name: 'Listening',
      type: ActivityType.Streaming,
      url: 'https://open.spotify.com/album/51j1hkKJ7qorRtD3aZMVGG?si=CSb2Ln_9SXK87wfgUKPVPQ',
    },
    {
      name: 'Custom Status 1',
      type: ActivityType.Watching,
    },
    {
      name: '4MILL',
      type: ActivityType.Listening,
    },
  ]

module.exports = (client) => {
    console.log(`${client.user.tag} is online.`)

    setInterval(()=> {
      let random = Math.floor(Math.random() * status.length);
      client.user.setActivity(status[random])
    }, 1000);
};

// setInterval(()=> {
//   let random = Math.floor(Math.random() * status.length);
//   client.user.setActivity(status[random])
// }, 1000);

// setInterval(()=> {
//   client.user.setActivity({
//     name: 'Kwwclw',
//     type: ActivityType.Streaming,
//     url: 'https://www.youtube.com/watch?v=D5d5xinZI3E',
//   })