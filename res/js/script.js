var spell_input = document.querySelector('#spell-input')
var display_input = document.querySelector('#display-input')
var listen_button = document.querySelector('#listen-btn')
var skip_button = document.querySelector('#skip-btn')
const select_voices = document.querySelector('select')
const voices_not_found = document.querySelector('#voices-not-found')

var currentWord = ''
var voices = []

const getVoices = () => {
    clearTimeout(t)
    voices = window.speechSynthesis.getVoices();

    console.log(voices);

    if (voices.length === 0)
        voices_not_found.style.display = 'flex'
    else
        voices_not_found.style.display = 'none'

    speech.voice = voices[0];

    select_voices.innerHTML = ''
    for (let i = 0; i < voices.length; i++) {
        const o = document.createElement('option')
        o.value = i
        o.textContent = voices[i].name
        select_voices.append(o)
    }
}
const t = setTimeout(getVoices, 1000) // wait a second to let the voices load if they exist

var getWord = () => {
    const randomIndex = Math.round(Math.random() * words.length)
    currentWord = words[randomIndex].trim()
    return currentWord
}
var soundWord = () => {
    setTextToSound(currentWord)
}

const nextWord = () => {
    getWord()
    spell_input.value = ''
    display_input.textContent = ''
    soundWord()
}


spell_input.addEventListener('keyup', () => {
    let g = false
    let text = spell_input.value
    let c = spell_input.value.length - 1
    text = text.split('').map(letter => {
        const i = spell_input.value.length - 1
        g = currentWord[i - c] === letter
        c--;
        return `<span style="color:${g ? "#0f0" : "#f00"}">${letter}</span>`
    }).join('')

    let diff = currentWord.length - spell_input.value.length
    if (diff < 0) diff = 0

    display_input.innerHTML = text + "_ ".repeat(diff)

    if (spell_input.value === currentWord) nextWord()
})

listen_button.addEventListener('click', () => {
    if (!currentWord) getWord()
    console.log(currentWord);
    soundWord()
})

skip_button.addEventListener('click', nextWord)

select_voices.onchange = () => {
    const i = select_voices.value;
    speech.voice = voices[i];
    soundWord()
}

window.speechSynthesis.onvoiceschanged = getVoices