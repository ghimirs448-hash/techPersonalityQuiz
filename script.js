
console.log("script.js connected!");

// Store the user's selected answers
let selectedAnswers = {};

// Select all question blocks
const questionBlocks = document.querySelectorAll(".question-block");

// Add click events to answer buttons
questionBlocks.forEach((block, questionIndex) => {

    const buttons = block.querySelectorAll(".answer-btn");

    buttons.forEach((button) => {

        button.addEventListener("click", function () {

            // Remove selection from other buttons
            buttons.forEach((btn) => {
                btn.classList.remove("selected");
                btn.classList.remove("active");
                btn.setAttribute("aria-pressed", "false");
            });

            // Highlight the selected answer
            button.classList.add("selected");
            button.classList.add("active");
            button.setAttribute("aria-pressed", "true");

            // Store the answer using its data attribute
            selectedAnswers[questionIndex] =
                Number(button.dataset.answer);

            console.log("Selected answers:", selectedAnswers);

            // Clear old result if an answer changes
            document.getElementById("result-container").textContent = "";
        });
    });
});

// Calculate and display personality result
function displayResult() {

    const resultContainer = document.getElementById("result-container");

    // Make sure all questions are answered
    if (Object.keys(selectedAnswers).length !== questionBlocks.length) {
        resultContainer.textContent = "Please answer all four questions!";
        return;
    }

    // Count the answers for each personality type
    let programmerScore = 0;
    let designerScore = 0;
    let leaderScore = 0;

    Object.values(selectedAnswers).forEach((answer) => {

        if (answer === 1) {
            programmerScore++;
        } else if (answer === 2) {
            designerScore++;
        } else if (answer === 3) {
            leaderScore++;
        }
    });

    let personality = "";
    let description = "";

    // Determine the personality with the highest score
    // Ties are resolved in the order below
    if (programmerScore >= designerScore &&
        programmerScore >= leaderScore) {

        personality = "Logical Programmer";
        description = "You enjoy coding, solving problems, and thinking logically.";

    } else if (designerScore >= programmerScore &&
               designerScore >= leaderScore) {

        personality = "Creative Designer";
        description = "You enjoy creativity, designing websites, and building user-friendly applications.";

    } else {

        personality = "Tech Leader";
        description = "You enjoy planning, organizing projects, and leading teams.";
    }

    // Display the result in the DOM
    resultContainer.innerHTML = "";

    const heading = document.createElement("h2");
    heading.textContent = "You are a " + personality + "!";

    const paragraph = document.createElement("p");
    paragraph.textContent = description;

    resultContainer.appendChild(heading);
    resultContainer.appendChild(paragraph);

    console.log("Final result:", personality);
}

// Run displayResult when the button is clicked
document.getElementById("show-result").addEventListener("click", displayResult);
