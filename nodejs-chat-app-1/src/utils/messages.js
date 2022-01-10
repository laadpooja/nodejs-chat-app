const generateMessage = (username, text, avatar) => {
  return {
    username,
    text,
    avatar,
    createdAt: new Date().getTime()
  }
}

const generateLocationMessage = (username, baseURL, coords, avatar) => {
  return {
    username,
    avatar,
    url: `${baseURL}${coords.latitude},${coords.longitude}`,
    createdAt: new Date().getTime()
  }
}



module.exports = {
  generateMessage,
  generateLocationMessage
}