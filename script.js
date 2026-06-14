// Вопросы и ответы
const questions = [
    {
        question: "❓ Когда мы познакомились?",
        answers: ["2023", "2024", "2025", "Недавно"],
        correctAnswer: 2 // 2025
    },
    {
        question: "📍 Где мы в первый раз увидели друг друга?",
        answers: ["В школе", "На подземной парковке перед поездкой в Карелию", "Через интернет", "В кофейне"],
        correctAnswer: 1 // Подземная парковка
    },
    {
        question: "💜 Какой твой любимый цвет?",
        answers: ["Красный", "Синий", "Фиолетовый", "Розовый"],
        correctAnswer: 2 // Фиолетовый
    },
    {
        question: "🎂 Когда твой день рождения?",
        answers: ["1 ноября", "15 марта", "20 июля", "10 декабря"],
        correctAnswer: 0 // 1 ноября
    },
    {
        question: "🎵 Какой жанр музыки ты предпочитаешь?",
        answers: ["Только поп", "Только рок", "Разный", "Только классика"],
        correctAnswer: 2 // Разный
    },
    {
        question: "💍 Когда я сделал тебе предложение?",
        answers: ["07.01.2026", "08.01.2026", "09.01.2026", "10.01.2026"],
        correctAnswer: 1 // 08.01.2026
    },
    {
        question: "📍 В какое место мы пошли на первое свидание?",
        answers: ["Крестовский остров", "Ново-голандия", "Кофейня", "Набережная"],
        correctAnswer: 1 // Ново-голандия
    },
    {
        question: "🤝 Какой первый компромис был между нами?",
        answers: ["О наших встречах", "Мой камушек и твой камушек", "Как мы будем вести себя на людях", "Как мы будем называть друг друга"],
        correctAnswer: 1 // Мой камушек и твой камушек
    }
];

// Переменные состояния
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Инициализация
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    
    document.getElementById('startPage').classList.remove('active');
    document.getElementById('quizPage').classList.add('active');
    
    loadQuestion();
}

function loadQuestion() {
    const question = questions[currentQuestion];
    
    // Обновляем прогресс-бар
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    document.getElementById('progressFill').style.width = progress + '%';
    
    // Обновляем текст вопроса
    document.getElementById('questionTitle').textContent = question.question;
    
    // Генерируем кнопки ответов
    const answersContainer = document.getElementById('answersContainer');
    answersContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-option';
        button.textContent = answer;
        
        // Если уже выбран ответ, показываем выделение
        if (userAnswers[currentQuestion] === index) {
            button.classList.add('selected');
        }
        
        button.onclick = () => selectAnswer(index);
        answersContainer.appendChild(button);
    });
    
    // Обновляем видимость кнопок навигации
    document.getElementById('prevBtn').style.display = currentQuestion > 0 ? 'block' : 'none';
    document.getElementById('nextBtn').textContent = currentQuestion === questions.length - 1 ? 'Завершить ✓' : 'Далее →';
}

function selectAnswer(index) {
    userAnswers[currentQuestion] = index;
    
    // Проверяем, правильный ли ответ
    if (index === questions[currentQuestion].correctAnswer) {
        score++;
    }
    
    // Обновляем UI
    const buttons = document.querySelectorAll('.answer-option');
    buttons.forEach((btn, i) => {
        btn.classList.remove('selected');
        if (i === index) {
            btn.classList.add('selected');
        }
    });
}

function nextQuestion() {
    if (userAnswers[currentQuestion] === undefined) {
        alert('Пожалуйста, выберите ответ!');
        return;
    }
    
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        showFinalPage();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

function showFinalPage() {
    document.getElementById('quizPage').classList.remove('active');
    document.getElementById('finalPage').classList.add('active');
    
    // Ссылка на фотографию из репозитория
    const photoUrl = 'https://raw.githubusercontent.com/Qudlo/LubimayDahsa-/main/IMG_20260108_145356_1.jpg';
    document.getElementById('finalPhoto').src = photoUrl;
    
    // Персональное сообщение о любви
    const loveMessage = `Моя любимая! 💕\n\nТы ответила на ${score} из ${questions.length} вопросов правильно!\n\nТы - моя вселенная, моя р[...]
    document.getElementById('customMessage').textContent = loveMessage;
}

function restartQuiz() {
    document.getElementById('finalPage').classList.remove('active');
    document.getElementById('startPage').classList.add('active');
    startQuiz();
}
