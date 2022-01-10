const rooms = [{
    roomname: 'The Avengers'
  },
  {
    roomname: 'Dragon Valley'
  },
  {
    roomname: 'Mountain Rangers'
  },
  {
    roomname: 'Foodies'
  },
  {
    roomname: 'Garden Maker'
  },
  {
    roomname: 'Indian Tigers'
  },
  {
    roomname: 'Create New'
  }

];


//addRoom, removeRoom, getRoom, getRoomsInRoom

const addRoom = ({
  id,
  roomname,
  maxUser
}) => {
  //clean the data
  roomname = roomname.trim().toLowerCase();

  //Validate the data
  if (!roomname) {
    return {
      error: 'Room is required!'
    }
  }

  //check for existing room
  const existingRoom = rooms.find((room) => room.roomname === roomname);

  //validate Roomname
  if (existingRoom) {
    return {
      error: 'Room is in use!'
    }
  }

  //store rooms
  const room = {
    id,
    roomname,
    maxUser
  };
  rooms.push(room);
  return room;

}

const removeRoom = (id) => {
  const index = rooms.findIndex((room) => room.id === id);
  if (index !== -1) {
    return rooms.splice(index, 1)[0];
  }

}

const getRoom = (id) => {
  return rooms.find((room) => room.id === id);
}

const getRooms = () => {
  return rooms;
}

module.exports = {
  addRoom,
  removeRoom,
  getRoom,
  getRooms
}