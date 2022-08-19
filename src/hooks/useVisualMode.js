import { useState } from 'react';

// Managing mode
export default function useVisualMode(initial) {
  const [history, setHistory] = useState([initial]);

  //Transition to new mode
  function transition(newMode, replace = false) {
    setHistory(prev => replace ? [...prev.slice(0, prev.length - 1), newMode] : [...prev, newMode]);
  }

  //For going back a mode
  function back() {
    if (history.length > 1) {
      setHistory(prev => [...prev.slice(0, history.length - 1)])
    }
  }

  return { mode: history[history.length - 1], transition, back };
}
