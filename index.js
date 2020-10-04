module.exports = {
  getStats: require("./src/getStats.js"),
  postStats: require("./src/postStats.js"),
  hasVoted: require("./src/hasVoted.js"),
  version: require("./package.json").version
};