let inputAvgMember;
let inputWins;
let outputTicketRequirement;
let outputWinrate;
let outputContainer;

document.addEventListener("DOMContentLoaded", function () {
    inputAvgMember = document.querySelector('#input-avgMembers');
    inputWins = document.querySelector('#input-wins');
    outputTicketRequirement = document.querySelector('#output-newRequirement');
    outputWinrate = document.querySelector('#output-winrate');
    outputContainer = document.querySelector('#outputContainer');

    const avgMembersValue = document.getElementById('avgMembersValue');
    inputAvgMember.addEventListener("input", function () {
        avgMembersValue.textContent = inputAvgMember.value;
    });
})

function calculate() {
    const avgMember = Number(inputAvgMember.value);
    const wins = Number(inputWins.value);

    if (avgMember < 0 || wins < 0) {
        throw new Error("Invalid input values. `avgMember` and `wins` must be non-negative.");
    }
    const MIN_TICKET_WINS_FOR_FULL = 250;
    const USABLE_TICKETS = 18;

    const winrate = avgMember !== 0 ? wins / avgMember : 0;
    const maxTicketWins = avgMember * USABLE_TICKETS;
    const percentageOfWins = maxTicketWins !== 0 ? (wins / maxTicketWins) * 100 : 0;
    const minPercentageOfWinsForFull = (MIN_TICKET_WINS_FOR_FULL / maxTicketWins) * 100;
    const percentageDiff = percentageOfWins - minPercentageOfWinsForFull;
    const freeTickets = (percentageDiff / 100) * USABLE_TICKETS;

    let ticketRequirement = USABLE_TICKETS - freeTickets;
    if (ticketRequirement > 18) {
        ticketRequirement = 'Impossible';
    }

    if (wins > maxTicketWins) {
        ticketRequirement = 'Wrong number of submitted wins!';
    }

    outputTicketRequirement.innerText = ticketRequirement;
    outputWinrate.innerText = winrate;
    outputContainer.style.display = 'block';
}
