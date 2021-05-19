## CBL API ~~dead~~

A very simple package to post stats / retrieve stats of bots from the Cloud Bots List API.

## Usage

```js
const cbl = require('cloudlist.js');
```

### Getting stats

**Params:**

`botID` - The user ID of the bot whose stats and information are being retreived

```js
cbl.getStats(botID);
```

**Response:**

Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise 'Just a JavaScript Promise') that resolves to:

```ts
{
  id: string, // The bot's user ID
  prefix: string, // The bot's prefix
  owner: Array<string>, // An array of the bot's owners' IDs, can sometimes be more than one ID
  library: string, // The library the bot uses
  description: string, // The bot's short description
  longDescription: string, // The bot's long description
  certified: boolean, // Is the bot certified?
  pageURL: string, // The bot's page on SBL
  website?: string // A URL leading to the bot's website
  support?: string // The code for the invite to the bot's support server
  github?: string // The bot's GitHub repository
  servers?: number, // The bot's server count, (sometimes doesn't exist)
  users?: number, // The bot's user count, (sometimes doesn't exist)
  votes: number // The amount of users that voted for the bot on the website, can be 0
}
```

### Posting stats

**Params:**

`client` - [discord.js](https://www.npmjs.com/package/discord.js 'discord.js NPM page') / [Eris](https://www.npmjs.com/package/eris 'Eris NPM page') Client - The bot whose stats are being posted

`apiKey` - String - The CBL API key

[Optional] `log` - Boolean - Wether to `console.log` after posting (defaults to true)

[Optional] `serversOnly` - Boolean - Wether to only post the server amount or also the user (default to false)

```js
cbl.postStats(client, apiKey);
```

**Response:**

if `log` is true,

Logs:

> [CBL] Server count was updated to newServerCount

and if `serversOnly` is false, also

> [CBL] User count was updated to newUserCount

Returns a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise 'Just a JavaScript Promise') that resolves to:

```ts
{
  servers: number // The newly-posted server count
  users?: number  // The newly-posted / already stored user count, if exists
}
```

## Examples

```js
// Get stats
cbl
  .getStats('bot_id')
  .then(console.log)
  .catch(console.error);
// Post stats
cbl
  .postStats(client, 'API_KEY') // Post server and user count
  .then(console.log)
  .catch(console.error);
cbl
  .postStats(client, 'API_KEY', null, true) // Post ONLY server count
  .then(console.log)
  .catch(console.error);
```

## Notes

Uses [`node-fetch`](https://www.npmjs.com/package/node-fetch "node-fetch's NPM page")

## Additional Resources


[Cloud Bots List](https://cloud-botlist.xyz 'The official Cloud Bots List website')
