import { useRef } from 'react';
import { StepInputDomRef } from '@ui5/webcomponents-react';

interface StepInputValidationConfig {
  value: number;
  setValue: (val: number) => void;
  min: number;
  max: number;
  step: number;
}

export default function useStepInputValidation({
  value,
  setValue,
  min,
  max,
  step,
}: StepInputValidationConfig) {
  const stepInputRef = useRef<StepInputDomRef>(null);

  function handleChange(event: { target: { value: string | number } }): void {
    const newValue = parseInt(String(event.target.value), 10);
    if (
      !isNaN(newValue) &&
      newValue % step === 0 &&
      newValue >= min &&
      newValue <= max
    ) {
      setValue(newValue);
    } else if (stepInputRef.current) {
      // Reset via the inner input to avoid triggering onChange again
      const input = stepInputRef.current.shadowRoot?.querySelector('ui5-input');
      input?.setAttribute('value', String(value));
    }
  }

  return { stepInputRef, handleChange };
}
