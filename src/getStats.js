const fetch = require("node-fetch");
const domain = "https://cloud-botlist.xyz/";
const domainGet = (type, clientID) => `${domain}/api/${type}/${clientID}`;

module.exports = async clientID => {
  if (typeof clientID !== "string" || !clientID)
    throw new ReferenceError("Invalid bot ID");
  const cblRes = await fetch(domainGet("bots", clientID)).then(res => res.json())
  if (cblRes.error) throw new ReferenceError(cblRes.error.message);
  return cblRes;
};