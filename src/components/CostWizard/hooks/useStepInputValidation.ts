interface StepInputValidationConfig {
  setValue: (val: number) => void;
  min: number;
  max: number;
  step: number;
}

export default function useStepInputValidation({
  setValue,
  min,
  max,
  step,
}: StepInputValidationConfig) {
  function handleChange(event: { target: { value: string | number } }): void {
    const newValue = parseInt(String(event.target.value), 10);
    if (
      !isNaN(newValue) &&
      newValue % step === 0 &&
      newValue >= min &&
      newValue <= max
    ) {
      setValue(newValue);
    }
  }

  return { handleChange };
}
