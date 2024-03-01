import { useState, useEffect } from "react";
let recognition = null;
if ("webkitSpeechRecognition" in window) {
  recognition = new window.webkitSpeechRecognition();
  recognition.continous = true;
  recognition.lang = "en-US";
}
const useSpeechRecognition = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (!recognition) return;

    const unSunbscribe = (recognition.onresult = (event) => {
      // console.log(event);
      setText(event?.results[0][0]?.transcript);
      setIsListening(false);
      recognition.stop();
      stopListening();
    });
    return unSunbscribe;
  }, []);
  const startListening = () => {
    setText("");
    setIsListening(true);
    recognition.start();
  };
  const stopListening = () => {
    setIsListening(false);
    recognition.stop();
  };
  const toggleClick = () => {
    setToogle((prevState) => !prevState);
  };
  return {
    text,
    setText,
    isListening,
    startListening,
    stopListening,
    toggleClick,
    hasRecognitionSupport: !!recognition,
  };
};
export default useSpeechRecognition;
