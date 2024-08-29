'use strict'

const inputElem = document.querySelector('input')
const btnSearch = document.querySelector('.search')
const color = document.querySelector('.color_item')
const word = document.querySelector('.word')
const wordAccent = document.querySelector('.word_accent')
const svgElem = document.querySelector('svg')
const sentence = document.querySelector('.sentence')
const audioElem = document.querySelector('audio')
const colorElem = document.querySelector('.color')
const section = document.querySelector('.section')

// قرار دادن صوت، کلمه، تلفظ و تعریف در سر جای خودش
function showWord(data) {

    // console.log(deta)

    if (inputElem.value) {
        word.innerHTML = data.word //کلمه

        // ایجاد آرایه شامل صوت و تلفظ 
        let audioAccent = data.phonetics.filter(i => {
            return i.audio && i.text
        });

        // console.log(audioAccent)

        wordAccent.innerHTML = `${data.meanings[0].partOfSpeech} ${audioAccent[0].text}` //تلفظ
        sentence.innerHTML = data.meanings[0].definitions[0].definition //تعریف

        audioElem.setAttribute('src', audioAccent[0].audio) //صوت


        // پخش صوت
        svgElem.addEventListener('click', () => {

            audioElem.setAttribute('src', audioAccent[0].audio)
            audioElem.setAttribute('autoplay', '')

            setInterval(() => {
                audioElem.removeAttribute('autoplay')
            }, 3000)

            inputElem.focus()
        })
    }

    inputElem.value = ''
    inputElem.focus()

}


// مورد نظر api از read درخواست  
function searchWord() {

    // console.log(inputElem.value.toLowerCase())
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputElem.value.toLowerCase()}`)
        .then(res => res.json())
        .then(data => {

            showWord(data[0])
            section.classList.remove('hidden')

        })
        .catch(() => {

            if (inputElem.value) {
                section.classList.add('hidden')
                alert('این کلمه موجود نیست')
                inputElem.value = ''
            }
            inputElem.focus()

        })

}

//تغییر و ذخیره رنگ انتخاب شده پیش زمینه      
function changeColor(e) {

    
    if (e.target.classList[2].includes('#')) {

        localStorage.setItem('bgc', e.target.classList[2])

        document.documentElement.style.setProperty("--color" ,e.target.classList[2])
    }
    inputElem.focus()

}

window.addEventListener('load', () => {
    document.documentElement.style.setProperty('--color', localStorage.getItem('bgc'))
    inputElem.focus()
})


btnSearch.addEventListener('click', searchWord)
colorElem.addEventListener('click', changeColor)