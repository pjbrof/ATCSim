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
    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;

    recognition.onresult = (event) => {
      let interimTranscript = "";
      for (
        let i = event.resultIndex, len = event.results.length;
        i < len;
        i++
      ) {
        let transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      document.querySelector(".output").innerHTML =
        finalTranscript + '<i style="color:#ccc;">' + interimTranscript + "</>";

      console.log(speechRecognitionList[0].src); // should return the same as the contents of the grammar variable
      console.log(speechRecognitionList[0].weight);
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
