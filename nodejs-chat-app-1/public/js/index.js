const socket = io();
const listTemplate = document.querySelector('#list-template').innerHTML
const $room = document.querySelector('#rooms');
const $roomInput = document.querySelector('#room-input');
const $joinForm = document.querySelector('#join-form');

$room.addEventListener('change', (event) => {
  console.log(event.target.value);
  if (event.target.value === 'Create New') {
    $roomInput.style.display = 'block';
    $roomInput.setAttribute('required', 'required');
  } else {
    $roomInput.style.display = 'none';
    $roomInput.removeAttribute('required');
  }
});



$joinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  let $elements = e.target.elements;
  let room = ($elements.roominput.value) ? $elements.roominput.value : $elements.room.value;
  let username = $elements.username.value;
  location.href = '/view/chat.html?username=' + username + '&room=' + room;
  setTimeout(() => {
    $roomInput.style.display = 'none';
    $roomInput.removeAttribute('required');
    $joinForm.reset();
  }, 500)

});

socket.emit('getRooms', (rooms) => {
  const html = Mustache.render(listTemplate, {
    rooms
  });
  $room.insertAdjacentHTML('beforeend', html);
});