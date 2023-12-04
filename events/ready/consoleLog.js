const { ActivityType } = require('discord.js');
var datetime = new Date();
var options = { 
//   year: 'numeric', 
//   month: 'long', 
//   day: 'numeric', 
//   hour: '2-digit', 
//   minute: '2-digit', 
//   second: '2-digit', 
//   hour12: false,
  timeZone: 'Asia/Bangkok' // Set the time zone to Thai time
};

var formattedDatetime = datetime.toLocaleString('en-EN', options);

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
      name: 'Metro Boomin',
      type: ActivityType.Watching,
    },
    {
      name: '21Savage',
      type: ActivityType.Listening,
    },
  ]

module.exports = (client) => {
    console.log(`${client.user.tag} is online.\n${formattedDatetime}`)

    setInterval(()=> {
      let random = Math.floor(Math.random() * status.length);
      client.user.setActivity(status[random])
    }, 1000);

    client.on('disconnect', (event) => {
      console.error(`Bot disconnected with code ${event.code} and reason: ${event.reason}`);
    });
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