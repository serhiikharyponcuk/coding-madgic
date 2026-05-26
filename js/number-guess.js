const input_number_guess = document.querySelector(".input_number_guess");
const submit_number_guess = document.querySelector(".number_guess_search_btn");
const count_attempts = document.querySelector(".count_attempts");
const text_number_guess = document.querySelector("#text_number_guess");
let attempts = 3;
let computer_choise =  computer_guess();
console.log(computer_choise);
submit_number_guess.addEventListener("click", function() {
    if (attempts > 0) {
        const user_guess = number_guess();
        if (user_win(user_guess, computer_choise)) {
            text_number_guess.textContent = "Congratulations! You've guessed the correct number!";
            text_number_guess.classList.remove("red");
            text_number_guess.classList.add("green");
            attempts = 0; // End the game
             update_attempts(attempts);
        } else if (user_guess < computer_choise) {
            text_number_guess.textContent = "Too low! Try again.";
            text_number_guess.classList.remove("green");
            text_number_guess.classList.add("red");
            attempts--;
             update_attempts(attempts);
        } else {
            text_number_guess.textContent = "Too high! Try again.";
            text_number_guess.classList.remove("green");
            text_number_guess.classList.add("red");
            attempts--;
             update_attempts(attempts);
        }
    } else {
        attempts = 3; 
         update_attempts(attempts);
        // Reset attempts for a new game
        computer_choise = computer_guess(); // Generate a new random number
    //    Game over! Starting a new game.
    console.log(computer_choise);
    }
});

function computer_guess() {
    return Math.floor(Math.random() * 11);
}

function number_guess() {
    const user_guess = parseInt(input_number_guess.value);
    if (isNaN(user_guess) || user_guess < 0 || user_guess > 10) {
        return;//все пропало
    }
    return user_guess;
}  
function user_win(user_guess, computer_number) {
    return user_guess === computer_number;
}
function update_attempts(attempts) {
    console.log(attempts);
    count_attempts.textContent = `${attempts}`;
}
