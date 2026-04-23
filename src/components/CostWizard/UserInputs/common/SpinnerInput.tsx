import { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from 'react';
import './SpinnerInput.css';

export interface SpinnerInputProps {
  value: number;
  setValue: (v: number) => void;
  min: number;
  max: number;
  step: number;
  unit?: string;
  /** Number of decimal places (0 = integers only) */
  decimals?: number;
  /** Optional prefix label rendered inside the pill before the − button */
  label?: string;
  id?: string;
}

export default function SpinnerInput({
  value,
  setValue,
  min,
  max,
  step,
  unit = '',
  decimals = 0,
  label,
  id,
}: SpinnerInputProps) {
  const fmt = (n: number) => (decimals > 0 ? n.toFixed(decimals) : String(n));
  const parse = (s: string) => (decimals > 0 ? parseFloat(s) : parseInt(s, 10));
  const round = (n: number) => {
    const factor = Math.pow(10, decimals);
    return Math.round(n * factor) / factor;
  };

  const [inputValue, setInputValue] = useState(fmt(value));
  const isFocused = useRef(false);

  useEffect(() => {
    if (!isFocused.current) {
      setInputValue(fmt(value));
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  function handleFocus(): void {
    isFocused.current = true;
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>): void {
    const allowed = [
      'Backspace',
      'Delete',
      'Tab',
      'Escape',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
    ];
    if (allowed.includes(e.key)) return;
    if (
      (e.ctrlKey || e.metaKey) &&
      ['a', 'c', 'v', 'x'].includes(e.key.toLowerCase())
    )
      return;
    if (decimals > 0 && e.key === '.') {
      if (inputValue.includes('.')) e.preventDefault();
      return;
    }
    if (!/^\d$/.test(e.key)) {
      e.preventDefault();
    }
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    const raw =
      decimals > 0
        ? e.target.value.replace(/[^\d.]/g, '').replace(/^(\d*\.?\d*).*$/, '$1')
        : e.target.value.replace(/\D/g, '');
    const val = parse(raw);
    if (!isNaN(val) && val > max) {
      setInputValue(fmt(max));
      setValue(max);
    } else {
      setInputValue(raw);
      if (!isNaN(val) && val >= min) {
        setValue(round(val));
      }
    }
  }

  function handleBlur(): void {
    isFocused.current = false;
    const val = parse(inputValue);
    if (isNaN(val) || val < min) {
      setInputValue(fmt(min));
      setValue(min);
    } else {
      const clamped = round(Math.min(Math.max(val, min), max));
      setValue(clamped);
      setInputValue(fmt(clamped));
    }
  }

  function decrement(): void {
    const next = round(Math.max(value - step, min));
    setValue(next);
  }

  function increment(): void {
    const next = round(Math.min(value + step, max));
    setValue(next);
  }

  return (
    <div className={`spinner${!unit ? ' spinner--no-unit' : ''}`}>
      {label && <span className="spinner-label">{label}</span>}
      <button
        className="spinner-btn"
        onClick={decrement}
        disabled={value <= min}
        aria-label="Decrease"
        type="button"
      >
        −
      </button>
      <input
        id={id}
        className="spinner-input"
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <button
        className="spinner-btn"
        onClick={increment}
        disabled={value >= max}
        aria-label="Increase"
        type="button"
      >
        +
      </button>
      {unit && <span className="spinner-unit">{unit}</span>}
    </div>
  );
}
