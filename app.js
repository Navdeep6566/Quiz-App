const quizData = {
    CSS: [
        { question: "What does CSS stand for?", options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"], answer:"Cascading Style Sheets"},
        { question: "Where can you write CSS?", options: ["Inline", "Internal", "External", "All of the above"], answer:"All of the above"},
        { question: "Which HTML tag is used to include internal CSS?", options: ["<style>", "<css>", "<link>", "<script>"], answer:"<style>"},
        { question: "Which property is used to change the text color in CSS?", options: ["font-color", "text-color", "color", "background-color"], answer:"color"},
        { question: "Which CSS property is used to set the background color of an element?", options: ["background-color", "bgcolor", "color", "background"], answer:"background-color"},
        { question: "Which property is used to add space inside an element, but within its border?", options: ["margin", "padding", "spacing", "border"], answer:"padding"},
        { question: "What is the default value of the position property?", options: ["static", "relative", "absolute", "fixed"], answer:"static"},
        { question: "What value of display property makes an element invisible, but it still takes space?", options: ["none", "hidden", "block", "visibility: hidden"], answer:"visibility: hidden"},
        { question: "Which property is used to change the cursor style?", options: ["cursor", "pointer", "hover", "style"], answer:"cursor"},
        { question: "Which property is used to add animation effects?", options: ["animation", "transition", "effect", "move"], answer:"transition"}
       ],
    Html: [
        { question: "Which tag is used to create a line break in HTML?", options: [ "<br>", "<break>", "<lb>", "None"], answer:"<br>"},
        { question: "Which is the largest heading tag in HTML?", options: [ "<h6>", "<h1>", "<head>", "<title>"], answer:"<h1>"},
        { question: "Which tag is used to create a form in HTML?", options: [ "<form>", "<input>", "textarea>", "<button>"], answer:"<form>"},
        { question: "Which tag is used to create an unordered list?", options: [ "<ul>", "<ol>", "<li>", "<list>"], answer:"<ul>"},
        { question: "Which attribute specifies an image source in an <img> tag?", options: [ "href", "src", "alt", "img-src"], answer:"src"},
        { question: "What is the correct input type for entering a password?", options: [ "text", "password", "number", "hidden"], answer:"password"},
        { question: "Which tag is used to embed an image in HTML?", options: [ "<img>", "<image>", "<pic>", "<media>"], answer:"<img>"},
        { question: "What is the purpose of the <canvas> element?", options: [ "To display images", "To draw graphics", "To create animations", "To create forms"], answer:"To draw graphics"},
        { question: "Which tag is used to define an inline frame?", options: [ "<iframe>", "<frame>", "<inline>", "<embed>"], answer:"<iframe>"},
        { question: "How do you merge two or more columns in a table?", options: [ "colspan attribute", "rowspan attribute", "merge attribute", "span attribute"], answer:"colspan attribute"},
        { question: "Which tag is used to group table rows?", options: [ "<tbody>", "<thead>", "<tfoot>", "All of the above"], answer:"All of the above"}  
    ],
    cLanguage: [
        { question: "Which data type is used to declare a character variable in C?", options: ["int", "char", "float", "string"], answer: "char"},
        { question: "What is the range of values for a variable of type int in C (on a 32-bit system)?", options: ["-128 to 127", "0 to 255", "-32,768 to 32,767", "-2,147,483,648 to 2,147,483,647"], answer: "-2,147,483,648 to 2,147,483,647"},
        { question: "Which of the following is NOT a valid variable name in C?", options: ["var1", "_myVar", "1Var", "var_123"], answer: "1Var"},
        { question: "What does the break statement do in a loop?", options: ["Exits the loop immediately", "Skips to the next iteration", "Ends the program", "Restarts the loop"], answer: "Exits the loop immediately"},
        { question: "Which of the following loops is guaranteed to execute at least once?", options: ["for", "while", "do-while", "None of the above"], answer: "do-while"},
        { question: "Which keyword is used to exit a switch statement?", options: ["continue", "break", "return", "exist"], answer: "break"},
        { question: "What is the correct way to declare a function in C?", options: ["function int add(int a, int b)", "int add(a, b)", "int add(int a, int b)", "add(int a, int b)"], answer: "int add(int a, int b)"},
        { question: "What is the index of the first element in an array?", options: ["-1", "0", "1", "None"], answer: "0"},
        { question: "What is a pointer in C?", options: ["A variable that holds a memory address", "A function", "A data type", "A library"], answer: "A variable that holds a memory address"},
        { question: "Which function is used to dynamically allocate memory in C?", options: ["malloc", "calloc", "realloc", "All of the above"], answer: "All of the above"}
    ]
};

let currentSubject = "";
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 100;
let timer;

const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const quizDiv = document.getElementById("quiz");
const subjectSelection = document.getElementById("subject-selection");
const nextBtn = document.getElementById("next-btn");
const timerDisplay = document.getElementById("time-left");

function startQuiz(subject) {
    currentSubject = subject;
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 100;
    
    subjectSelection.style.display = "none";
    quizDiv.style.display = "block";

    loadQuestion();
    startTimer();
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft === 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);
}

function loadQuestion() {
    nextBtn.disabled = true;
    const questionData = quizData[currentSubject][currentQuestionIndex];
    questionContainer.textContent = questionData.question;
    optionsContainer.innerHTML = "";

    questionData.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => selectAnswer(button, questionData.answer);
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(button, correctAnswer) {
    const buttons = optionsContainer.getElementsByTagName("button");
    for (let btn of buttons) {
        btn.disabled = true;
        if (btn.textContent === correctAnswer) {
            btn.style.backgroundColor = "lightgreen";
        } else {
            btn.style.backgroundColor = "lightcoral";
        }
    }

    if (button.textContent === correctAnswer) {
        score++;
    }

    nextBtn.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData[currentSubject].length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    clearInterval(timer);
    quizDiv.innerHTML = `<h2>Quiz Completed!</h2>
                         <p>Your Score: ${score} / ${quizData[currentSubject].length}</p>
                         <button onclick="location.reload()">Restart</button>`;
}