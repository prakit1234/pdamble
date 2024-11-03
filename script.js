let pion = 20;
let pdcry = 0;
let currentOption = '';

function updateDisplay() {
    document.getElementById('points').innerText = `Your Pdertioan: ${pion}`;
    document.getElementById('pdcry').innerText = `Your pdcry: ${pdcry}`;
}

function startGame(option) {
    currentOption = option;
    document.getElementById('gamble-input').style.display = 'block';
    document.getElementById('binomo-input').style.display = 'none';
    document.getElementById('heads-input').style.display = 'none';
    document.getElementById('color-input').style.display = 'none';
    document.getElementById('lucky-number-input').style.display = 'none';
    document.getElementById('message').innerText = `You chose: ${option}`;

    if (option === 'Binomo') {
        document.getElementById('binomo-input').style.display = 'block';
    } else if (option === 'Heads or Tails') {
        document.getElementById('heads-input').style.display = 'block';
    } else if (option === 'Color') {
        document.getElementById('color-input').style.display = 'block';
    } else if (option === 'Lucky Number') {
        document.getElementById('lucky-number-input').style.display = 'block';
    }
}

function confirmColorChoice() {
    const colorChoice = document.getElementById('color-choice').value;
    document.getElementById('message').innerText = `You chose: ${colorChoice}`;
}

function gamble() {
    const amount = parseInt(document.getElementById('amount').value);
    
    if (isNaN(amount) || amount <= 0 || amount > pion) {
        alert("Invalid amount to gamble!");
        return;
    }
    
    pion -= amount; // Deduct the wager amount
    let win = false;

    if (currentOption === 'Binomo') {
        const binomoChoice = document.getElementById('binomo-choice').value;
        const outcome = Math.random() < 0.5 ? 'up' : 'down';
        win = binomoChoice === outcome;
    } else if (currentOption === 'Heads or Tails') {
        const headsChoice = document.getElementById('heads-choice').value;
        const outcome = Math.random() < 0.5 ? 'heads' : 'tails';
        win = headsChoice === outcome;
    } else if (currentOption === 'Color') {
        const colorChoice = document.getElementById('color-choice').value;
        const outcome = getRandomColor();
        win = colorChoice === outcome;
    } else if (currentOption === 'Lucky Number') {
        const luckyNumber = parseInt(document.getElementById('lucky-number').value);
        const outcome = Math.floor(Math.random() * 10) + 1;
        win = luckyNumber === outcome;
    }

    if (win) {
        pion += amount * 2; // Win: double the wager
        document.getElementById('message').innerText = `You won! Your new Pdertioan: ${pion}`;
    } else {
        const refund = Math.floor(amount * 0.03); // 3% refund
        pion += refund; // Refund on loss
        document.getElementById('message').innerText = `You lost. You got ${refund} Pdertioan back.`;
    }
    
    updateDisplay();
}

function getRandomColor() {
    const colors = ['red', 'green', 'blue'];
    return colors[Math.floor(Math.random() * colors.length)];
}