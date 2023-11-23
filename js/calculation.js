const savedAvgMember = parseInt(localStorage.getItem("avgMember"));

let inputAvgMember;
let spanAvgMember;
let inputWins;
let outputTicketRequirement;
let outputWinrate;
let outputContainer;
let outputDiv1;
let outputDiv2;
let outputDiv3;
let outputDiv4;
let outputDiv5;

const MIN_TICKET_WINS_FOR_FULL = 250;
const USABLE_TICKETS = 18;

document.addEventListener("DOMContentLoaded", function () {
    inputAvgMember = document.querySelector('#input-avgMembers');
    spanAvgMember = document.querySelector('#avgMembersValue');
    inputWins = document.querySelector('#input-wins');
    outputTicketRequirement = document.querySelector('#output-newRequirement');
    outputWinrate = document.querySelector('#output-winrate');
    outputContainer = document.querySelector('#outputContainer');
    outputDiv1 = document.querySelector('.output-1');
    outputDiv2 = document.querySelector('.output-2');
    outputDiv3 = document.querySelector('.output-3');
    outputDiv4 = document.querySelector('.output-4');
    outputDiv5 = document.querySelector('.output-5');

    const avgMembersValue = document.getElementById('avgMembersValue');
    inputAvgMember.addEventListener("input", function () {
        avgMembersValue.textContent = inputAvgMember.value;
        inputWins.max = Number(inputAvgMember.value) * USABLE_TICKETS;
    });

    if (savedAvgMember) {
        spanAvgMember.textContent = String(savedAvgMember);
        inputAvgMember.value = savedAvgMember;
    } else {
        spanAvgMember.textContent = '24';
        console.log(spanAvgMember);
        inputAvgMember.value = 24;
    }

    console.info('ActiBrawl © 2023 by AEYCEN | ' + app_version)
})

function calculate() {
    const avgMember = Number(inputAvgMember.value);
    const wins = Number(inputWins.value);

    if (wins !== 0) {
        if (avgMember < 0 || wins < 0) {
            alert(trans[0].alertInvalidInput);
            return;
        }

        const winRate = Math.round((avgMember !== 0 ? wins / avgMember : 0) * 10 ** 2) / 10 ** 2;
        const maxTicketWins = avgMember * USABLE_TICKETS;
        const percentageOfWins = maxTicketWins !== 0 ? (wins / maxTicketWins) * 100 : 0;
        const minPercentageOfWinsForFull = (MIN_TICKET_WINS_FOR_FULL / maxTicketWins) * 100;
        const percentageDiff = percentageOfWins - minPercentageOfWinsForFull;
        const freeTickets = (percentageDiff / 100) * USABLE_TICKETS;

        let ticketRequirement = Math.round(USABLE_TICKETS - (freeTickets));

        let outputs = [
            {label: trans[0].output1label, value: ticketRequirement + trans[0].output1valueUnit, type: 'info'},
            {label: trans[0].output2label, value: winRate + trans[0].output2valueUnit, type: 'info'},
            {label: trans[0].output3label, value: Math.round(percentageOfWins) + trans[0].output3valueUnit, type: 'info'},
            {label: trans[0].output4label, value: Math.round(minPercentageOfWinsForFull) + trans[0].output4valueUnit, type: 'info'},
            {label: trans[0].output5label, value: maxTicketWins + trans[0].output5valueUnit, type: 'info'}
        ];

        if (ticketRequirement > 18) {
            outputs = [{label: trans[0].outputError1Label, value: trans[0].outputErrorValue, type: 'error'}];
        }

        if (wins > maxTicketWins) {
            outputs = [{label: trans[0].outputError2Label, value: trans[0].outputErrorValue, type: 'error'}];
        }

        localStorage.setItem("avgMember", inputAvgMember.value);

        createOutput(outputs);
    } else {
        console.warn(trans[0].consoleWarnNoInput);
    }
}


function createOutput(outputs) {
    outputDiv1.style.display = 'none';
    outputDiv2.style.display = 'none';
    outputDiv3.style.display = 'none';
    outputDiv4.style.display = 'none';
    outputDiv5.style.display = 'none';

    for (let i = 0; i < outputs.length; i++) {
        const outputDiv = document.querySelector(`.output-${i + 1}`);
        const outputLabel = outputDiv.querySelector(`.output-${i + 1}-label`);
        const outputValue = outputDiv.querySelector(`.output-${i + 1}-value`);

        if (outputs[i].label !== '') {
            outputDiv.style.display = 'flex';
            outputLabel.textContent = outputs[i].label;
            outputValue.textContent = outputs[i].value;

            switch (outputs[i].type) {
                case 'error':
                    outputValue.style.color = '#ff6854';
                    break;
                case 'info':
                    outputValue.style.color = '#ffb119';
                    break;
            }
        } else {
            outputDiv.style.display = 'none';
        }
    }

    outputContainer.style.display = 'flex';
}

