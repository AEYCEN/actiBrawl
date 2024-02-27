const saved_language = localStorage.getItem("language");

let text_title;
let text_description;
let text_input1label;
let text_input2label;
let text_input2placeholder;
let text_submitButton;
let languageSelectors;

let trans;

document.addEventListener("DOMContentLoaded", function () {
    const versionElement = document.querySelector('#app-version');
    versionElement.textContent = app_version;

    text_title = document.querySelector('#title');
    text_description = document.querySelector('#description');
    text_input1label = document.querySelector('#input1label');
    text_input2label = document.querySelector('#input2label');
    text_input2placeholder = document.querySelector('#input-wins');
    text_submitButton = document.querySelector('#submitButtonText');
    languageSelectors = document.querySelectorAll('.languageSelector');

    let selected_language;
    if (saved_language) {
        selected_language = saved_language;

        languageSelectors.forEach(function(element) {
            if (element.getAttribute('data-language') === selected_language) {
                element.classList.add('languageSelected');
            }
        });
    } else {
        selected_language = 'en_GB';
    }

    setTranslations(selected_language);
})

function setTranslations(language) {
    if (languageMap.has(language)) {
        trans = languageMap.get(language);
    } else {
        console.warn('Unknown language ID: ' + language);
        trans = en_GB;
    }

    languageSelectors.forEach(function(element) {
        if (element.getAttribute('data-language') === language) {
            element.classList.add('languageSelected');
        } else {
            element.classList.remove('languageSelected');
        }
    });

    localStorage.setItem("language", language);

    text_title.textContent = trans[0].title;
    text_description.textContent = trans[0].description;
    text_input1label.textContent = trans[0].input1label;
    text_input2label.textContent = trans[0].input2label;
    text_input2placeholder.placeholder = trans[0].input2placeholder;
    text_submitButton.textContent = trans[0].submitButton;
}