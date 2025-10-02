const quizScore = sessionStorage.getItem("quizScore");
const totalQuestions = sessionStorage.getItem("totalQuestions");

window.onload = function() {
    showScore();
};

function showScore(){
    document.getElementById('score').textContent = `${quizScore} / ${totalQuestions}`;}