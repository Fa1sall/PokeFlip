export function AppHeader() {
  return (
    <>
      <div className="appHeader">
        <a
          href="https://github.com/Fa1sall/PokeFlip"
          target="_blank"
          rel="noopener noreferrer"
          className="border-none outline-none no-underline font-title
            inline-flex flex-row items-center space-x-2 text-base"
        >
          <img
            src="src/assets/pokeball.png"
            alt="PokeBall Logo"
            className="h-12 w-12"
          />
          <span>PokeFlip</span>
        </a>
      </div>
    </>
  );
}
