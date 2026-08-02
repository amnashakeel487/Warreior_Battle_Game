import { useEffect } from 'react';

export default function FloatingNumber({ text, cls, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 900);
    return () => clearTimeout(timer);
  }, [onDone]);

  return <span className={`dmg-float ${cls}`}>{text}</span>;
}
