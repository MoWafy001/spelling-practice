let speech = new SpeechSynthesisUtterance();
speech.lang = "en";

var setTextToSound = text => {
    speech.text = text;
    window.speechSynthesis.speak(speech);
}