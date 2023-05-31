// eslint-disable-next-line no-useless-escape
const regexUrl = /https?:\/\/(www\.)?[-\w@:%\.\+~#=]{1,256}\.[a-z0-9()]{2,}\b([-\w()@:%\.\+~#=//?&]*)/i;

module.exports = regexUrl;
