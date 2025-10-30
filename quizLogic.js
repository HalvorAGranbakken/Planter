let quizScore = 0;
let quizProgress = 0;
let totalQuestions = 5;
let artsnavn = "";
let questions = [];

    const quizzes = {
        somePlants: [
        { image: "Planter/Bitterbergknapp.PNG", name: "Bitterbergknapp", photo: "", pub: "NIBIO", cc:"3.0" },
        { image: "Planter/Bleikmyrklegg.PNG", name: "Bleikmyrklegg", photo: "Åslaug Viken", cc:"4.0" },
        { image: "Planter/Greplyng.PNG", name: "Greplyng", photo: "Nils Valland", cc:"4.0" },
        { image: "Planter/Gulsildre.PNG", name: "Gulsildre", photo:"Rigmor Wang",cc:"4.0" },
        { image: "Planter/Hanekam.PNG", name: "Hanekam", photo: "Bolette Bele",cc:"3.0" }
        /*{ image: "", name: "", cc: ""}*/
    ],
    trees: [
        { image: "Planter/Furu.PNG", name: "Furu", photo: "Anna Elven", cc:"4.0" },
        { image: "Planter/Gran.PNG", name: "Gran", photo: "Eli Fremstad", cc:"4.0" },
        { image: "Planter/Bjørk.PNG", name: "Bjørk", photo: "Hauk Liebe", cc:"4.0" },
    ],
    ferns: [
        { image: "Planter/Sisselrot.PNG", name: "Sisselrot", photo: "Heidi Solstad", cc:"4.0" },
        { image: "Planter/Bjørnekam.PNG", name: "Bjørnekam", photo: "Heidi Solstad", cc:"4.0" },
        { image: "Planter/Strutseving.PNG", name: "Strutseving", photo: "Tiril Myhre Pedersen", cc:"4.0" },
    ]
};

/*Fant denne på nett, veldig kjekk*/ 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

window.onload = function() {
    const selectedQuiz = sessionStorage.getItem("selectedQuiz");
    if (selectedQuiz && quizzes[selectedQuiz]) {
        questions = [...quizzes[selectedQuiz]];
        totalQuestions = questions.length;
        shuffleArray(questions);
        showQuestion();
    } else {
document.getElementById("quizView").innerHTML = 
`<p>Ingen quiz valgt! Gå tilbake og velg en quiz.</p>
<button onclick="location.href='quizSelect.html'">Velg quiz</button>`;
    }
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
    document.getElementById('answerFeedback').textContent = "";
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

