let quizScore = 0;
let quizProgress = 0;
let totalQuestions = 5;


let artsnavn = "Bitterbergknapp";

    const questions = [
        { image: "Planter/Bitterbergknapp.PNG", name: "Bitterbergknapp" },
        { image: "Planter/Bleikmyrklegg.PNG", name: "Bleikmyrklegg" },
        { image: "Planter/Greplyng.PNG", name: "Greplyng" },
        { image: "Planter/Gulsildre.PNG", name: "Gulsildre" },
        { image: "Planter/Hanekam.PNG", name: "Hanekam" }
    ];

/*Fant denne på nett, veldig kjekk*/ 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

window.onload = function() {
    shuffleArray(questions);
    showQuestion();
};

function showQuestion(){
     const current = questions[quizProgress];
     document.getElementById("quizImage").src = current.image;
     artsnavn = current.name;
}

function quizFinished(){
    return quizProgress === totalQuestions;
}

function setButton(){
    if (quizFinished()){
    document.getElementById('answerButton').textContent = "Fullfør";
    }
    else{
    document.getElementById('answerButton').textContent = "Neste";}
}

function buttonCheck(){
    const inputValue = document.getElementById("answer").value;
    const buttonText = document.getElementById('answerButton').textContent;
        if (inputValue === "") return;

        if (buttonText === "Svar"){
            scoreTracker();
        } else if (buttonText === "Neste"){
            nextPicture();
        } else if (buttonText === "Fullfør"){
            displayResult();
        }
}

function scoreTracker(){
    const inputValue = document.getElementById("answer").value;
    const feedbackElement = document.getElementById("answerFeedback");
    
    if (inputValue === "") return;

    if (inputValue.toLowerCase() === artsnavn.toLowerCase()){
        quizScore++;
        feedbackElement.textContent = artsnavn+" er riktig!"
    } else{
        feedbackElement.textContent = "Feil, riktig svar var " + artsnavn;
    }
    quizProgress++;
    setButton();
    document.getElementById('score').textContent = `${quizScore} / ${totalQuestions}`;
    console.log("Score:", quizScore);
    console.log("Progress:", quizProgress);
}

function nextPicture(){
    document.getElementById('answerButton').textContent = "Svar";
    document.getElementById('answer').value = "";
    showQuestion();
}

function displayResult(){
    sessionStorage.setItem("quizScore", quizScore);
    sessionStorage.setItem("totalQuestions", totalQuestions);

    window.location.replace("result.html");
}

const input = document.getElementById("answer");

input.addEventListener('keydown', (event) => {
    if(document.getElementById('answerButton').textContent === "Neste"){
        nextPicture();
    }
    else if(document.getElementById('answerButton').textContent === "Fullfør"){
        displayResult();
    }
    else if (event.key === 'Enter') {
        scoreTracker();
    }
});

