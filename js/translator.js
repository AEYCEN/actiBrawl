const saved_language = localStorage.getItem("language");

let text_title;
let text_description;
let text_input1label;
let text_input2label;
let text_input2placeholder;
let text_submitButton;

let trans;

document.addEventListener("DOMContentLoaded", function () {
    text_title = document.querySelector('#title');
    text_description = document.querySelector('#description');
    text_input1label = document.querySelector('#input1label');
    text_input2label = document.querySelector('#input2label');
    text_input2placeholder = document.querySelector('#input-wins');
    text_submitButton = document.querySelector('#submitButtonText');

    let selected_language;
    if (saved_language) {
        selected_language = saved_language;
    } else {
        selected_language = 'en_GB';
    }

    setTranslations(selected_language);
})

function setTranslations(language) {
    switch (language) {
        case 'de_DE':
            trans = de_DE;
            break;
        case 'en_GB':
            trans = en_GB;
            break;
        case 'es_ES':
            trans = es_ES;
            break;
        case 'fr_FR':
            trans = fr_FR;
            break;
        case 'pl_PL':
            trans = pl_PL;
            break;
        case 'it_IT':
            trans = it_IT;
            break;
        case 'el_GR':
            trans = el_GR;
            break;
        default:
            console.warn('Unknown language ID: ' + language);
            return;
    }

    text_title.textContent = trans[0].title;
    text_description.textContent = trans[0].description;
    text_input1label.textContent = trans[0].input1label;
    text_input2label.textContent = trans[0].input2label;
    text_input2placeholder.placeholder = trans[0].input2placeholder;
    text_submitButton.textContent = trans[0].submitButton;
}