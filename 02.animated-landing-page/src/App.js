import "./App.css";
import React, { useEffect, useCallback } from "react";
import { timeline, stagger, animate } from "motion";
import gif from "./assets/arcademachine.gif";
import { clamp } from "./utils";

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
  const handleScrollAnimations = useCallback(async (event) => {
    const scrolled = window.scrollY;
    const scrollTop = scrolled + 100;
    animate(
      ".arcadeMachine",
      {
        width: [`${Math.max(100 - scrolled / 10, 50)}%`],
        top: `${clamp(scrollTop, 250, 1160)}px`,
      },
      { duration: 0.3, easing: "ease-out" }
    );
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    let observer;

    let options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    observer = new IntersectionObserver((entries) => {
      entries.forEach((section) => {
        if (section.isIntersecting) {
          const theme = section.target.dataset.theme;
          document.body.setAttribute('data-theme', theme);
        }
      });
    }, options);

    [...sections].forEach((section) => {
      observer.observe(section);
    });
  }, []);

  useEffect(() => {
    const entree = timeline([...arcadeSequence, ...titleSequence]);
    entree.finished.then(() => {
      window.addEventListener("scroll", handleScrollAnimations);
    });
  }, [handleScrollAnimations]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
          <nav>
            <div className="logo">Arcade</div>
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
          <div
            className="arcadeMachine"
            style={{ backgroundImage: `url(${gif})` }}
          ></div>
          <section data-theme="primary">
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
          </section>
          <section data-theme="tertiary">
            <div className="intro">
              <p>
                Arcade club, a place for fun and good vibes, diner and a
                collection of vintage games.
              </p>
              <div className="buttonWrap">
                <button>Let's play!</button>
              </div>
            </div>
          </section>
          <section data-theme="secondary">
            <h2>Schedule</h2>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
