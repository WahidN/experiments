import "./App.css";
import React, { useEffect } from "react";
import { timeline, stagger, animate } from "motion";
import gif from "./assets/arcademachine.gif";

// animations
const arcadeSequence = [
  [
    ".arcadeMachine",
    {
      transform: ["scale(1)"],
      backgroundSize: ["800px"],
      backgroundRepeat: ["no-repeat"],
    },
    { duration: 0.5, delay: 0.8, easing: "ease-in-out" },
  ],
];

const titleSequence = [
  [
    ".title span",
    { transform: ["translateY(0)"] },
    { at: 1.2, duration: 0.2, delay: stagger(0.05) },
  ],
];

function App() {
  useEffect(() => {
    const entree = timeline([...arcadeSequence, ...titleSequence]);
    entree.finished.then(() => {
      window.addEventListener("scroll", handleScrollAnimations);
    });
  }, []);

  const handleScrollAnimations = async (event) => {
    const scrolled = window.scrollY;

    const arcadeAnimation = animate(
      ".arcadeMachine",
      {
        transform: [`scale(${Math.max((1000 - (scrolled )) / 1000, 0.5) })`],
      },
      { duration: 0.5 }
    );


    if (scrolled > 300) {
      animate(
        "body",
        { backgroundColor: "var(--color-tertiary)" },
        { duration: 0.5 }
      );
    } else {
      animate(
        "body",
        { backgroundColor: "var(--color-primary)" },
        { duration: 0.5 }
      );
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <nav>
            <div>Arcade</div>
            <ul>
              <li>About</li>
              <li>Schedule</li>
              <li>Games</li>
              <li>Shop</li>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <div className="container">
          <h1 className="title">
            <span>A</span>
            <span>r</span>
            <span>c</span>
            <span>a</span>
            <span>d</span>
            <span>e</span>
            <span>&nbsp; </span>
            <span>C</span>
            <span>l</span>
            <span>u</span>
            <span>b</span>
          </h1>
          <div
            className="arcadeMachine"
            style={{ backgroundImage: `url(${gif})` }}
          ></div>
          <section>
            <h2>Arcade club, a place for fun and good vibes, diner and a collection of vintage games.</h2>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
