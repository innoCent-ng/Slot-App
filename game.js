const main = document.getElementById(`main`);

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
  A: 4,
  B: 6,
  C: 8,
  D: 8,
};

const SYMBOLS_VALUES = {
  A: 10,
  B: 40,
  c: 30,
  D: 20,
};

const h1 = document.createElement(`h2`);
h1.innerText = `Slot Machine`;
main.appendChild(h1);

let button = document.createElement(`button`);
button.classList.add(`playbutton`);
button.innerHTML = `PLAY `;
main.appendChild(button);

button.addEventListener(`click`, () => {
  const h2 = document.createElement(`h2`);
  h2.innerText = `Deposit Amount to start Playing`;

  const deposit = document.createElement(`input`);
  const depositAmount = deposit.value;
  deposit.classList.add(`input`);
  deposit.type = `number`;
  deposit.value = depositAmount;
  deposit.id = `amount`;

  const submit = document.createElement(`input`);
  submit.classList.add(`submit`);
  submit.type = `submit`;
  submit.value = `DEPOSIT`;
  submit.id = `deposit`;

  submit.addEventListener(`click`, () => {
    const amountDeposited = parseFloat(deposit.value);
    if (isNaN(amountDeposited) || amountDeposited <= 0) {
      alert(`Invalid Deposit try again`);
      deposit.value = ``;
      return deposit;
    } else if (amountDeposited > 0) {
      alert(`Deposited Succesfully`);

      const h3 = document.createElement(`h2`);
      h3.innerText = `Enter Number of Lines to Bet On (1 - 3)`;

      const getNumberOfLines = document.createElement(`input`);
      const numberoflines = getNumberOfLines.value;
      getNumberOfLines.classList.add(`input`);
      getNumberOfLines.type = `number`;
      getNumberOfLines.value = numberoflines;
      getNumberOfLines.id = `lines`;

      main.removeChild(submit);
      main.removeChild(deposit);
      main.removeChild(h2);

      main.appendChild(h3);
      main.appendChild(getNumberOfLines);

      const bet = document.createElement(`input`);
      bet.classList.add(`submit`);
      bet.type = `submit`;
      bet.value = `BET`;
      bet.id = `bet`;

      main.appendChild(bet);

      bet.addEventListener(`click`, () => {
        const linesbet = parseFloat(getNumberOfLines.value);
        if (isNaN(linesbet) || linesbet <= 0 || linesbet > 3) {
          getNumberOfLines.value = ``;
          alert(`Invalid Number of lines try again`);

          return getNumberOfLines;
        } else if (linesbet > 0 || linesbet < 3) {
          alert(`Lines Registered`);

          let balance = deposit.value;
          const h4 = document.createElement(`h2`);
          h4.innerText = `Enter Bet Per Line`;

          const h5 = document.createElement(`h5`);

          let balanceColor = document.createElement(`p`);
          balanceColor.innerText = `${balance}`;
          h5.innerText = `Your Balance is `;

          balanceColor.classList.add(`balance`);
          h5.appendChild(balanceColor);

          const getBet = (balance, linesbet) => {
            const amountBet = document.createElement(`input`);
            const numberbet = amountBet.value;
            amountBet.classList.add(`input`);
            amountBet.type = `number`;
            amountBet.value = numberbet;
            amountBet.id = `amountBet`;

            main.removeChild(bet);
            main.removeChild(h3);
            main.removeChild(getNumberOfLines);
            main.appendChild(h4);
            main.appendChild(h5);
            main.appendChild(amountBet);
          };
          getBet(balance, linesbet);

          const betbutton = document.createElement(`input`);
          betbutton.classList.add(`submit`);
          betbutton.type = `submit`;
          betbutton.value = `USE`;
          betbutton.id = `betbutton`;

          main.appendChild(betbutton);

          betbutton.addEventListener(`click`, () => {
            const betamount = parseFloat(amountBet.value);
            if (
              isNaN(betamount) ||
              betamount <= 0 ||
              betamount > balance / linesbet
            ) {
              alert(`Invalid Bet Amount try again`);
              amountBet.value = ``;
              return getBet(balance, linesbet);
            } else if (betamount > 0 || betamount < balance / linesbet) {
              alert(`You can Spin`);

              const spinButton = document.createElement(`input`);
              spinButton.classList.add(`spinbutton`);
              spinButton.type = `submit`;
              spinButton.value = `SPIN`;
              spinButton.id = `spin`;

              main.removeChild(betbutton);
              main.removeChild(amountBet);
              main.removeChild(h5);
              main.removeChild(h4);

              const p = document.createElement(`h2`);
              p.innerText = `Let the games Begin`;

              main.appendChild(p);
              main.appendChild(spinButton);
              spinButton.addEventListener(`click`, () => {
                const spin = () => {
                  const symbols = [];
                  for (const [symbol, count] of Object.entries(SYMBOLS_COUNT)) {
                    for (let i = 0; i < count; i++) {
                      symbols.push(symbol);
                    }
                  }
                  const reels = [];
                  for (let i = 0; i < COLS; i++) {
                    reels.push([]);
                    const reelSymbols = [...symbols];
                    for (let j = 0; j < ROWS; j++) {
                      const randomIndex = Math.floor(
                        Math.random() * reelSymbols.length
                      );
                      const selectedSymbol = reelSymbols[randomIndex];
                      reels[i].push(selectedSymbol);
                      reelSymbols.splice(randomIndex, 1);
                    }

                    return reels;
                  }
                };

                const transpose = (reels) => {
                  const rows = [];
                  for (let i = 0; i < ROWS; i++) {
                    rows.push([]);
                    for (let j = 0; j < COLS; j++) {
                      rows[i].push(reels[j][i]);
                    }
                  }
                  return rows;
                };
                const printRows = (rows) => {
                  for (const row of rows) {
                    let rowString = `A`;
                    for (const [i, symbol] of row.entries()) {
                      rowString += symbol;
                      if (i != row.length - 1) {
                        rowString += `|`;
                      }
                    }
                    console.log(rowString);
                  }
                };

                const getWinnings = (rows, betamount, linesbet) => {
                  let winnings = 0;
                  for (let row = 0; row < linesbet; row++) {
                    const symbols = rows[row];
                    let allSame = true;

                    for (const symbol of symbols) {
                      if (symbol != symbols[0]) {
                        allSame = false;
                        break;
                      }
                    }
                    if (allSame) {
                      winnings += betamount * SYMBOLS_VALUES[symbols[0]];
                    }
                  }
                  return winnings;
                };

                balance -= betamount * linesbet;

                const reels = spin();
                const rows = transpose(reels);
                const winnings = getWinnings(rows, betamount, linesbet);

                // const values = document.createElement()
                console.log(reels);
                console.log(rows);
                printRows(rows);
                balance += winnings;
                console.log(`You won, $ ${winnings}`);
                if ((balance = 0)) {
                  console.log(`You ran Out of Money`);
                }
                const plaAgain = prompt(`Do you want to play Again (y/n)`);
                if (plaAgain != `y`) {
                  return deposit;
                }
              });
            }
          });
        }
      });
    }
  });

  main.appendChild(h2);
  main.appendChild(deposit);
  main.removeChild(button);
  main.removeChild(h1);
  main.appendChild(submit);
});
