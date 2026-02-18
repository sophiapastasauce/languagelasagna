// script.js

// Language definitions (add more languages as needed)
const languages = {
    english: {
        greetings: ["Hello", "How are you?", "Nice to meet you!"],
        vocabulary: {
            fruits: ["Apple", "Banana", "Cherry"],
            colors: ["Red", "Blue", "Green"]
        }
    },
    spanish: {
        greetings: ["Hola", "¿Cómo estás?", "¡Mucho gusto!"],
        vocabulary: {
            fruits: ["Manzana", "Banano", "Cereza"],
            colors: ["Rojo", "Azul", "Verde"]
        }
    }
};

// Initialize Web Speech API
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

// Function to start recognition
function startRecognition() {
    recognition.start();
    console.log("Voice recognition started. Speak into the microphone.");
}

// Function to handle recognized speech
recognition.onresult = function(event) {
    const transcript = event.results[event.results.length - 1][0].transcript;
    console.log("You said: ", transcript);
    // Process the speech input
    processSpeech(transcript);
};

// Function to process speech input
function processSpeech(input) {
    // Example: If the input matches a greeting, respond accordingly
    for (const lang in languages) {
        if (languages[lang].greetings.some(greeting => input.includes(greeting.toLowerCase()))) {
            respondInLanguage(lang);
            return;
        }
    }
    console.log("I don't understand that.");
}

// Function to respond in the detected language
function respondInLanguage(lang) {
    const response = languages[lang].greetings[Math.floor(Math.random() * languages[lang].greetings.length)];
    speak(response);
}

// Function to speak a response using Web Speech API
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
}

// UI interactions (input buttons for starting recognition)
document.getElementById("start").onclick = startRecognition;