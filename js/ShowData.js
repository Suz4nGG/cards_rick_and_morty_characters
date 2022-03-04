const episodesBox = document.getElementById('episodes-box')
const nextCharacter = document.getElementById('next-character')
const previousCharacter = document.getElementById('previous-character')

var counter = 1
const URL = "https://rickandmortyapi.com/api/character/"

const messagePromise = (string) => {
  const failure = `
    <h1>${string}</h1>
  `
  episodesBox.innerHTML = failure
}

const showInfo = (response) => {
  const {id, name, status, species, gender, image, origin} = response
  const origin_name = origin.name
  const cardCharacter = `
    <h2 class="sub-title">${name}</h2>
    <p style="display: none">ID: ${id}</p>
    <p>Status: <span>${status}</span></p>
    <p>Species: <span>${species}</span></p>
    <p>Gender: <span>${gender}</span></p>
    <p>Origin: <span>${origin_name}</span></p>
    <img src="${image}" class="image">
  `
  episodesBox.innerHTML = cardCharacter
}

const getAllCharacteresInfo = (counter) => {
  const URLID = `${URL}${counter}`

  return fetch(URLID)
    .then(response => response.json())
    .then(response => showInfo(response))
    .catch(messagePromise("Loading..."))
}

if (counter === 1) {
  getAllCharacteresInfo(1)
}

previousCharacter.addEventListener('click', () => {
  let menos = counter--
  menos--
  counter < 1 ? counter++ : getAllCharacteresInfo(menos--)
})

nextCharacter.addEventListener('click', () => {
  counter++
  getAllCharacteresInfo(counter)
})
