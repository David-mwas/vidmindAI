import React, { useState, useEffect, useRef } from "react";

const useTypingEffect = (textToType, interKeyStrokeDuration) => {
  const [currentPosition, setCurrentPosition] = useState(0);
  const currentPositionRef = useRef(0);
  useEffect(() => {
    const unSubscribe = setInterval(
      () => {
        setCurrentPosition((value) => value + 1);
        currentPositionRef.current += 1;
        if (currentPositionRef.current > textToType?.length) {
          clearInterval(unSubscribe);
        }
      },
      interKeyStrokeDuration,
      textToType
    );
    return () => {
      clearInterval(unSubscribe);
      currentPositionRef.current = 0;
      setCurrentPosition(0);
    };
  }, [interKeyStrokeDuration, textToType]);
  return textToType?.substring(0, currentPosition);
};

export default useTypingEffect;
