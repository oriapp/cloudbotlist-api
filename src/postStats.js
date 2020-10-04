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
  const getStats = require("./getStats.js");

  module.exports = async (client, apiKey, log = true, serversOnly = false) => {
    if (!client) throw new TypeError("Invalid client");
    if (!checkClient(client)) throw new TypeError("Invalid client");
    if (!apiKey) throw new ReferenceError("Invaild API key");
    await getStats(client.user.id);
    const headers = {
      Authorization: apiKey,
      "Content-Type": "application/json"
    };
    const body = JSON.stringify(
      serversOnly
        ? { guilds: client.guilds.size }
        : {
          guilds: client.guilds.size,
          users: client.users.size
        }
    );
    const cblRes = await fetch(domainGet("bots", client.user.id), {
      method: "POST",
      headers,
      body
    }
    ).then(res => res.json());
    if (cblRes.error) throw new ReferenceError(cblRes.error.message);
    if (log) {
      console.log(`[cloud-botlist.xyz] Server count was updated to ${cblRes.servers}`);
      if (!serversOnly)
        console.log(`[cloud-botlist.xyz] User count was updated to ${cblRes.users}`);
    }
    return cblRes.users || cblRes.users === 0
      ? { servers: cblRes.servers, users: cblRes.users }
      : { servers: cblRes.servers };
  };