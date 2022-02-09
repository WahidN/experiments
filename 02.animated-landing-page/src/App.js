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
              <div className="numbers">
                <div className="number">
                  <h2 className="bigTitle">25</h2>
                  <span>Arcade Machines</span>
                </div>
                <div className="number">
                  <h2 className="bigTitle">15</h2>
                  <span>Pinball Machines</span>
                </div>
              </div>
            </div>
          </section>
          <section data-theme="secondary">
            <ul className="calendar">
              <li>
                <span>Mo</span>
                <span>30.08</span>
              </li>
              <li>
                <span>Tu</span>
                <span>31.08</span>
              </li>
              <li>
                <span>We</span>
                <span>30.08</span>
              </li>
              <li>
                <span>Th</span>
                <span>01.09</span>
              </li>
              <li>
                <span>Fr</span>
                <span>02.09</span>
              </li>
              <li>
                <span>Sa</span>
                <span>03.09</span>
              </li>
              <li>
                <span>Su</span>
                <span>04.09</span>
              </li>
            </ul>
            <h2 className="bigTitle">Schedule</h2>
            <div className="grid">
              <div className="item">
                <div className="itemImage">
                  <img
                    src="https://images.unsplash.com/photo-1511882150382-421056c89033?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2671&q=80"
                    alt=""
                  />
                </div>
                <div className="itemInfo">
                  <div className="date">
                    <span>Mon</span>
                    <span>30</span>
                  </div>
                    <h3 className="itemTitle">Belles & Chimes Women's Pinball Meetup</h3>
                </div>
              </div>
              <div className="item">
                <div className="itemImage">
                  <img
                    src="https://images.unsplash.com/photo-1625805866449-3589fe3f71a3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3987&q=80"
                    alt=""
                  />
                </div>
                <div className="itemInfo">
                  <div className="date">
                    <span>Wed</span>
                    <span>01</span>
                  </div>
                  <h3 className="itemTitle">Vintage Gaming Night</h3>
                </div>
              </div>
              <div className="item">
                <div className="itemImage">
                  <img
                    src="https://images.unsplash.com/photo-1627845885979-1a274684a4ac?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mjd8fGFyY2FkZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60"
                    alt=""
                  />
                </div>
                <div className="itemInfo">
                  <div className="date">
                    <span>Fri</span>
                    <span>03</span>
                  </div>
                  <h3 className="itemTitle">Two Bit Movie Club Arcade</h3>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
