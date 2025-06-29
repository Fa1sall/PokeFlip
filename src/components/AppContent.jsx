import { useState } from "react";
import pokemonLogo from "../assets/pokemon_logo.png";
import { PokeCards } from "./PokeCards";
import pokeball from "../assets/pokeball.png";

export function AppContent({ appStatus, setAppStatus }) {
  const [difficulty, setDifficulty] = useState("easy");

  function renderGame(appStatus) {
    switch (appStatus) {
      case "home":
        return (
          <div>
            <div
              className="flex flex-col items-center justify-center min-h-[80vh] gap-8
          font-body text-2xl sm:text-4xl"
            >
              <div className="font-retro1 text-4xl sm:text-7xl">
                <div className="flex justify-center">
                  <img
                    src={`${pokemonLogo}`}
                    alt="Pokemon Logo"
                    className="h-[50%] w-[90%] sm:w-[40%]"
                  />
                </div>
              </div>

              <div
                role="button"
                className="font-title text-off-yellow text-2xl px-6 py-3 rounded-lg
            bg-off-blue border-3 border-off-yellow shadow-lg hover:bg-off-yellow
            hover:text-off-blue hover:border-off-blue cursor-pointer"
                onClick={() => setAppStatus("playing")}
              >
                <span className="animate-pulse text-nowrap">Start Game</span>
              </div>

              <div
                className="flex flex-col gap-5 items-center text-nowrap font-retro2
            bg-gradient-to-br from-slate-700 to-blue-800 p-5 rounded-xl border-4
            border-off-yellow scale-85 sm:scale-100"
              >
                <div className="text-xl font-title">SELECT DIFFICULTY</div>
                <div className="flex flex-row gap-5 text-2xl font-retro2">
                  <div>
                    <input
                      type="radio"
                      id="easy"
                      name="options"
                      value="easy"
                      className="peer hidden"
                      checked={difficulty === "easy"}
                      onChange={(e) => setDifficulty(e.target.value)}
                    />
                    <label
                      htmlFor="easy"
                      className="cursor-pointer font-bold peer-checked:text-accent peer-checked:animate-blink"
                    >
                      Easy
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="medium"
                      name="options"
                      value="medium"
                      className="peer hidden"
                      checked={difficulty === "medium"}
                      onChange={(e) => setDifficulty(e.target.value)}
                    />
                    <label
                      htmlFor="medium"
                      className="cursor-pointer font-bold peer-checked:text-accent peer-checked:animate-blink"
                    >
                      Medium
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="hard"
                      name="options"
                      value="hard"
                      className="peer hidden"
                      checked={difficulty === "hard"}
                      onChange={(e) => setDifficulty(e.target.value)}
                    />
                    <label
                      htmlFor="hard"
                      className="cursor-pointer font-bold peer-checked:text-accent peer-checked:animate-blink"
                    >
                      Hard
                    </label>
                  </div>
                </div>
              </div>
              <div
                className="text-3xl sm:text-4xl text-center font-retro1 font-bold text-off-yellow
                bg-stone-700 px-4 py-2 rounded-md border border-off-yellow shadow-md"
              >
                Don’t press the same card twice!
              </div>
            </div>
          </div>
        );

      case "playing":
        return (
          <div>
            <PokeCards setAppStatus={setAppStatus} difficulty={difficulty} />
          </div>
        );

      default:
        return (
          <div className="flex gap-4 justify-center items-center min-h-[70vh]">
            <div className="text-3xl font-title animate-pulse">Loading</div>
            <img
              src={`${pokeball}`}
              alt="Pokeball"
              className="w-20 h-20 animate-spin"
            />
          </div>
        );
    }
  }

  return <div>{renderGame(appStatus)}</div>;
}
