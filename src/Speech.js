export default class Speech {
  constructor() {}

  doSomething() {
    const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
    const recognition = new SpeechRecognition();
    const SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
    const speechRecognitionList = new SpeechGrammarList();
    const airlines = [
      "Delta",
      "JetBlue",
      "American",
      "Care",
      "Southwest",
      "UPS",
      "FedX",
      "Spirit",
    ];
    const grammar =
      "#JSGF V1.0; grammar airlines; public <airlines> = " +
      airlines.join(" | ") +
      " ;";
    let finalTranscript = "";

    speechRecognitionList.addFromString(grammar, 1);
    recognition.grammars = speechRecognitionList;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = true;
    
    recognition.onresult = (event) => {
      // confidence color coding
      // confidence "say again" prompt
      let transcript = event.results[0][0].transcript;
      
      const newCommand = document.createElement('LI');
      newCommand.innerText = transcript;
      document.querySelector(".commands").prepend(newCommand);
      
      transcript = '';
    };

    window.onkeydown = function (e) {
      if (e.keyCode == 16) {
        recognition.start();
      }
    };

    window.onkeyup = function (e) {
      if (e.keyCode == 16) {
        recognition.stop();
      }
    };
  }

  somethingElse() {}
}
