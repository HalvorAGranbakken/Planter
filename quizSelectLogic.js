function startQuiz(quizName){ 
    sessionStorage.setItem("selectedQuiz", quizName); 
    window.location.replace("quiz.html"); }