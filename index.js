// script.js
(function () {
  const choices = ["rock", "paper", "scissors"];

  const playerScoreEl = document.getElementById("playerScore");
  const computerScoreEl = document.getElementById("computerScore");
  const resultMessage = document.getElementById("resultMessage");
  const playerChoiceEl = document.getElementById("playerChoice");
  const computerChoiceEl = document.getElementById("computerChoice");
  const choiceButtons = document.querySelectorAll(".choice");
  const resetBtn = document.getElementById("resetBtn");

  let playerScore = 0;
  let computerScore = 0;
  let busy = false; // prevent double clicks while round resolving

  function getComputerChoice() {
    const i = Math.floor(Math.random() * choices.length);
    return choices[i];
  }

  function determineWinner(player, computer) {
    if (player === computer) return "draw";
    // rock beats scissors, scissors beats paper, paper beats rock
    if (
      (player === "rock" && computer === "scissors") ||
      (player === "scissors" && computer === "paper") ||
      (player === "paper" && computer === "rock")
    ) {
      return "win";
    }
    return "lose";
  }

  function humanize(choice) {
    if (choice === "rock") return "Rock ✊";
    if (choice === "paper") return "Paper 🖐️";
    if (choice === "scissors") return "Scissors ✌️";
    return choice;
  }

  function setMessage(text, resultClass) {
    resultMessage.textContent = text;
    resultMessage.classList.remove("result-win", "result-lose", "result-draw");
    if (resultClass) resultMessage.classList.add(resultClass);
  }

  function disableChoices(bool) {
    choiceButtons.forEach((b) => {
      if (bool) b.classList.add("disabled");
      else b.classList.remove("disabled");
    });
  }

  function playRound(playerChoice) {
    if (busy) return;
    busy = true;
    disableChoices(true);

    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);

    // show choices
    playerChoiceEl.textContent = humanize(playerChoice);
    computerChoiceEl.textContent = humanize(computerChoice);

    // small delay to feel responsive
    setTimeout(() => {
      if (result === "win") {
        playerScore++;
        playerScoreEl.textContent = playerScore;
        setMessage("Siz qazandınız! 🎉", "result-win");
      } else if (result === "lose") {
        computerScore++;
        computerScoreEl.textContent = computerScore;
        setMessage("Siz uduzdunuz. 💻 qazandı", "result-lose");
      } else {
        setMessage("Müəffəqiyyət: Berabərə (draw).", "result-draw");
      }

      // short pause then allow next round
      setTimeout(() => {
        busy = false;
        disableChoices(false);
      }, 600);
    }, 300);
  }

  // attach event listeners to choice buttons
  choiceButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const choice = btn.getAttribute("data-choice");
      playRound(choice);
    });
  });

  resetBtn.addEventListener("click", () => {
    playerScore = 0;
    computerScore = 0;
    playerScoreEl.textContent = "0";
    computerScoreEl.textContent = "0";
    playerChoiceEl.textContent = "—";
    computerChoiceEl.textContent = "—";
    setMessage("Oyun sifirlandi . Yenidən başlayín!");
  });

  // initial message
  setMessage("Seçim edin — oyuna başlamaq üçün düymələrdən birini klikləyin.");
})();
