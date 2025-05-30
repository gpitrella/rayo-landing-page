'use client'

import { useEffect, useState } from "react";

export const AnimatedNumbers = () => {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);

  useEffect(() => {
    const interval1 = setInterval(() => {
      setNumber1((prev) => (prev < 1500 ? prev + 5 : prev));
    }, 3000);

    const interval2 = setInterval(() => {
      setNumber2((prev) => (prev < 1600 ? prev + 5 : prev));
    }, 2000);

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, []);

  return (
    <div style={{ textAlign: "center", fontFamily: "Arial, sans-serif" }}>
      <h1>Números en Crecimiento</h1>
      <div style={{ display: "flex", justifyContent: "center", gap: "50px" }}>
        <div>
          <h2>{number1}</h2>
          <p>Primer número animado</p>
        </div>
        <div>
          <h2>{number2}</h2>
          <p>Segundo número animado</p>
        </div>
      </div>
    </div>
  );
}