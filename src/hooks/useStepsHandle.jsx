import { useState } from "react";

const useStepsHandle = ({ steps = [] }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const stepsLength = steps.length;

  function next() {
    setCurrentStepIndex(i => {
      if (i >= stepsLength - 1) return i;
      return i + 1
    })
  }
  function back() {
    setCurrentStepIndex(i => {
      if (i <= 0) return i;
      return i - 1;
    })
  }
  function goto(index) {
    if (index < 0) {
      setCurrentStepIndex(0);
    } else if (index >= stepsLength) {
      setCurrentStepIndex(stepsLength - 1);
    } else {
      setCurrentStepIndex(index);
    }
  }

  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    isFirstStep: currentStepIndex === 0,
    isLastStep: currentStepIndex === stepsLength - 1,
    next,
    back,
    goto,
  };
}

export default useStepsHandle;