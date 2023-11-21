let inputAvgMember;
let inputWins;
let outputTicketRequirement;
let outputWinrate;
let outputContainer;
let outputDiv1;
let outputDiv2;
let outputDiv3;
let outputDiv4;
let outputDiv5;

document.addEventListener("DOMContentLoaded", function () {
    inputAvgMember = document.querySelector('#input-avgMembers');
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
    });
    console.info('ActiBrawl © 2023 by AEYCEN | v0.2-alpha (21.11.23)')
})

function calculate() {
    const avgMember = Number(inputAvgMember.value);
    const wins = Number(inputWins.value);

    if (wins !== 0) {
        if (avgMember < 0 || wins < 0) {
            alert("Invalid input value. The submitted number must be non-negative.");
            return;
        }
        const MIN_TICKET_WINS_FOR_FULL = 250;
        const USABLE_TICKETS = 18;

        const winRate = Math.round((avgMember !== 0 ? wins / avgMember : 0) * 10 ** 2) / 10 ** 2;
        const maxTicketWins = avgMember * USABLE_TICKETS;
        const percentageOfWins = maxTicketWins !== 0 ? (wins / maxTicketWins) * 100 : 0;
        const minPercentageOfWinsForFull = (MIN_TICKET_WINS_FOR_FULL / maxTicketWins) * 100;
        const percentageDiff = percentageOfWins - minPercentageOfWinsForFull;
        const freeTickets = (percentageDiff / 100) * USABLE_TICKETS;

        let ticketRequirement = Math.round(USABLE_TICKETS - (freeTickets));

        let outputs = [
            { label: 'Recommended minimum ticket requirement', value: ticketRequirement + ' Tickets' },
            { label: 'Average win rate', value: winRate + ' Wins' },
            { label: 'Average percentage of wins', value: Math.round(percentageOfWins) + '%' },
            { label: 'Required percentage of wins for a full pig', value: Math.round(minPercentageOfWinsForFull) + '%' },
            { label: 'Maximum possible wins', value: maxTicketWins + ' Wins' }
        ];

        if (ticketRequirement > 18) {
            outputs = [{label: 'Impossible to fill the pig completely', value: 'ERROR'}];
        }

        if (wins > maxTicketWins) {
            outputs = [{label: 'Incorrect number of wins submitted', value: 'ERROR'}];
        }

        createOutput(outputs);
    } else {
        console.warn('No input detected!');
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
        } else {
            outputDiv.style.display = 'none';
        }

        outputLabel.textContent = outputs[i].label;
        outputValue.textContent = outputs[i].value;
    }

    outputContainer.style.display = 'flex';
}

