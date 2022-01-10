const users = [];

function randomIntFromInterval(min, max) { // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const addUser = ({
  id,
  username,
  room
}) => {
  //Clear the received reqest data
  username = username.trim().toLowerCase();
  room = room.trim().toLowerCase();


  //Validate the received reqest data
  if (!username || !room) {
    return {
      error: 'Username and room are required!'
    }
  }

  //check for existing user
  const existingUser = users.find((user) => user.room === room && user.username === username);

  //validate Username
  if (existingUser) {
    return {
      error: 'Username is already in use!'
    }
  }

  //store users
  const user = {
    id,
    username,
    room,
    avatar: randomIntFromInterval(1, 12)
  };
  users.push(user);
  return {
    user
  };

}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }

}

const getUser = (id) => {
  return users.find((user) => user.id === id);
}

const getUsersInRoom = (room) => {
  //clean the data
  room = room.trim().toLowerCase();
  return users.filter((user) => user.room === room);
}


module.exports = {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
}