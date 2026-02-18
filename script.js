const languages = {
    english: {
        name: 'English',
        code: 'en-US',
        greetings: ['Hello!', 'How are you?', 'Nice to meet you!'],
        responses: ['That sounds great!', 'I love that!', 'That\'s awesome!']
    },
    spanish: {
        name: 'Spanish',
        code: 'es-ES',
        greetings: ['¡Hola!', '¿Cómo estás?', '¡Mucho gusto!'],
        responses: ['¡Qué bueno!', '¡Me encanta!', '¡Qué increíble!']
    },
    french: {
        name: 'French',
        code: 'fr-FR',
        greetings: ['Bonjour!', 'Comment allez-vous?', 'Enchanté!'],
        responses: ['C\'est super!', 'J\'adore!', 'C\'est génial!']
    },
    mandarin: {
        name: 'Mandarin',
        code: 'zh-CN',
        greetings: ['你好!', '你好吗?', '很高兴认识你!'],
        responses: ['太好了!', '我喜欢!', '太棒了!']
    },
    arabic: {
        name: 'Arabic',
        code: 'ar-SA',
        greetings: ['مرحبا!', 'كيف حالك?', 'سعيد بلقائك!'],
        responses: ['رائع جداً!', 'أحب ذلك!', 'رائع!']
    },
    russian: {
        name: 'Russian',
        code: 'ru-RU',
        greetings: ['Привет!', 'Как дела?', 'Рад познакомиться!'],
        responses: ['Замечательно!', 'Мне это нравится!', 'Отлично!']
    }
};

let currentLanguage = null;
let currentLevel = null;
let streak = 0;
let wordsLearned = 0;
let score = 0;

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const synth = window.speechSynthesis;

recognition.continuous = false;
recognition.interimResults = false;

recognition.onstart = () => {
    document.getElementById('listeningStatus').textContent = '👂 Listening...';
    document.getElementById('micBtn').classList.add('recording');
};

recognition.onresult = (event) => {
    let transcript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
    }
    handleUserInput(transcript);
};

recognition.onend = () => {
    document.getElementById('listeningStatus').textContent = '';
    document.getElementById('micBtn').classList.remove('recording');
};

function selectLanguage(lang) {
    currentLanguage = lang;
    document.querySelectorAll('.lang-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.lang-btn').classList.add('active');
    recognition.lang = languages[lang].code;
    synth.cancel();
    speakText(languages[lang].greetings[0]);
    addMessage('ai', `Welcome to ${languages[lang].name}! ${languages[lang].greetings[0]}`);
    document.getElementById('welcomeMessage').textContent = `🎉 Learning ${languages[lang].name}!`;
}

function selectLevel(level) {
    currentLevel = level;
    document.querySelectorAll('.level-btn').forEach(btn => btn.classList.remove('active'));
    event.target.closest('.level-btn').classList.add('active');
    const levelNames = { beginner: '🌱 Beginner', intermediate: '🌿 Intermediate', advanced: '🌳 Advanced' };
    addMessage('ai', `You chose ${levelNames[level]}!`);
    speakText(`You're at ${levelNames[level]} level.`);
}

function toggleMicrophone() {
    if (!currentLanguage) {
        alert('Please select a language first! 🌍');
        return;
    }
    recognition.start();
}

function handleUserInput(transcript) {
    addMessage('user', transcript);
    const response = languages[currentLanguage].responses[Math.floor(Math.random() * languages[currentLanguage].responses.length)];
    addMessage('ai', response);
    speakText(response);
    wordsLearned += transcript.split(' ').length;
    score += 25;
    streak++;
    updateStats();
}

function addMessage(role, content) {
    const chatBox = document.getElementById('chatBox');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${role}`;
    messageDiv.textContent = content;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function speakText(text) {
    if (synth.speaking) synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = languages[currentLanguage].code;
    utterance.rate = 0.9;
    synth.speak(utterance);
}

function updateStats() {
    document.getElementById('streakCount').textContent = streak;
    document.getElementById('wordCount').textContent = wordsLearned;
    document.getElementById('scoreCount').textContent = score;
}

document.addEventListener('DOMContentLoaded', () => {
    updateStats();
});
