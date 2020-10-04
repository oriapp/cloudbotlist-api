const fetch = require("node-fetch");
const domain = "https://cloud-botlist.xyz";
const domainGet = (type, clientID) => `${domain}/api/${type}/${clientID}`;
const checkClient = client =>
  "users" in client &&
  "guilds" in client &&
  "user" in client &&
  "id" in client.user &&
  "size" in client.guilds &&
  "size" in client.users
    ? true
    : false;

module.exports = async (client, userID) => {
  if (!client) throw new TypeError("Invalid client");
  if (!checkClient(client)) throw new TypeError("Invalid client");
  if (!userID) throw new ReferenceError("Invaild user ID");

  let voted = await fetch(domainGet("votes", client.user.id)).then(res =>
    res.json()
  );

  if(voted.error) {
  if(voted.error.message == "Votes database is empty") voted = false
  else if(voted.error.message == "this Bot doesnt have votes in database") voted = false
  else if (voted.error) throw new ReferenceError(voted.error.message);
  }

  return voted[userID] ? true : false;
};
