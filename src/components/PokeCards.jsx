import Tilt from "react-parallax-tilt";
import { getPokemonData } from "../api/data";
import { useEffect, useState } from "react";
import pokeball from "../assets/pokeball.png";

export function PokeCards({ setAppStatus, difficulty }) {
  const [pokemonData, setPokemonData] = useState([]);
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isShuffling, setIsShuffling] = useState(false);
  const [gameStatus, setGameStatus] = useState("");

  function fetchCards() {
    let totalCards = 0;
    if (difficulty === "easy") {
      totalCards = 4;
    } else if (difficulty === "medium") {
      totalCards = 6;
    } else {
      totalCards = 8;
    }

    setIsLoading(true);
    getPokemonData(totalCards).then((res) => {
      setPokemonData(res);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    fetchCards();
  }, []);

  function shuffleCards() {
    setIsShuffling(true);
    setTimeout(() => {
      const shuffled = [...pokemonData].sort(() => Math.random() - 0.5);
      setPokemonData(shuffled);
      setIsShuffling(false);
    }, 400);
  }

  function handlePokemonSelect(name) {
    if (!selectedPokemons.includes(name)) {
      const newScore = score + 1;
      setScore(newScore);
      setHighScore(Math.max(highScore, newScore));
      setSelectedPokemons([...selectedPokemons, name]);
      if (newScore === pokemonData.length) {
        setGameStatus("win");
      }
    } else {
      setGameStatus("lose");
    }
  }

  function handleReset() {
    setSelectedPokemons([]);
    setScore(0);
    setGameStatus("");
    fetchCards();
  }

  function gameHandler(name) {
    shuffleCards();
    handlePokemonSelect(name);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {isLoading ? (
        <div className="flex gap-4 justify-center items-center min-h-[70vh]">
          <div className="text-3xl font-title animate-pulse">Loading Cards</div>
          <img
            src={`${pokeball}`}
            alt="Pokeball"
            className="w-20 h-20 animate-spin"
          />
        </div>
      ) : (
        <div className="w-full max-w-5xl flex flex-col gap-3 sm:gap-5">
          <div
            className="flex justify-center items-center gap-6 sm:gap-10 mb-6
              w-full max-w-3xl mx-auto px-2"
          >
            <div
              className="flex flex-col items-center bg-black/50 px-6 py-4
                rounded-xl border-2 border-neon-green shadow-[0_0_10px_#39FF14]
                text-neon-green font-retro2 w-36 sm:w-44 hover:scale-105
                transition-transform duration-300 ease-in-out"
            >
              <span className="text-base sm:text-lg font-bold tracking-wide">
                CURRENT
              </span>
              <span className="animate-blink text-3xl sm:text-4xl">
                {score}
              </span>
            </div>

            <div
              className="flex flex-col items-center bg-black/50 px-6 py-4
                rounded-xl border-2 border-neon-pink shadow-[0_0_10px_#FF1493]
                text-neon-pink font-retro2 w-36 sm:w-44 hover:scale-105
                transition-transform duration-300 ease-in-out"
            >
              <span className="text-base sm:text-lg font-bold tracking-wide">
                HIGH
              </span>
              <span className="text-3xl sm:text-4xl">{highScore}</span>
            </div>
          </div>

          <div
            className={`grid gap-5 grid-cols-2 place-items-center
              ${pokemonData.length === 6 && "sm:grid-cols-3"}
              ${pokemonData.length === 8 && "sm:grid-cols-4"}`}
          >
            {pokemonData.map((card) => (
              <Tilt
                key={card.id}
                reset={true}
                className={`w-full max-w-[170px] h-full
                  ${isShuffling ? "opacity-0" : "opacity-100"}
                  transition-opacity duration-300 ease-in-out cursor-pointer `}
              >
                <div
                  className="w-full max-w-[170px] h-60 bg-black/20 p-3
                    rounded-xl flex flex-col justify-center items-center
                    border-3 border-black"
                  onClick={() => gameHandler(card.name)}
                >
                  <div
                    className="text-lg font-bold text-center font-body sm:p-2"
                  >
                    {card.name.toUpperCase()}
                  </div>
                  <img
                    src={`${card.image}`}
                    alt={`${card.name}`}
                    className="mt-2 h-full"
                  />
                </div>
              </Tilt>
            ))}
          </div>
        </div>
      )}

      {gameStatus && (
        <div
          className="w-screen h-screen fixed top-0 left-0 bg-black/40 flex
            flex-col items-center justify-center z-50"
        >
          <div
            className={`bg-black text-4xl font-retro2 p-8 rounded-xl border-4 ${
              gameStatus === "win"
                ? "border-neon-green text-neon-green"
                : "border-neon-red text-neon-red"
            }`}
          >
            <div>YOU {gameStatus.toUpperCase()}!</div>
            <div className="flex gap-5 mt-6 text-xl">
              <button
                onClick={() => setAppStatus("home")}
                className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700
                  cursor-pointer"
              >
                HOME
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 rounded bg-gray-800 hover:bg-gray-700
                  cursor-pointer"
              >
                RETRY
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
