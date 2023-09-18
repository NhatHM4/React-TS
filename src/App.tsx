import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import PokemonCollection from "./components/PokemonCollection";
import { Pokemon } from "./interface";

interface Pokemons {
  name: string;
  url: string;
}

export interface viewDetail {
  id: number; 
  isSelected : boolean;
}

const App: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [viewDetail, setViewDetail] = useState<viewDetail>({
    id : 0,
    isSelected : false
  })
  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setNextUrl(res.data.next);
      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
        );
        setPokemons((p) => [...p, poke.data]);
        setIsLoading(false);
      });
    };
    getPokemon();
  }, []);

  const handleNext = async () => {
    setIsLoading(true);
    const res = await axios.get(nextUrl);
    setNextUrl(res.data.next);
    res.data.results.forEach(async (pokemon: Pokemons) => {
      const poke = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      );
      setPokemons((p) => [...p, poke.data]);
      setIsLoading(false);
    });
  };
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection pokemons={pokemons} viewDetail = {viewDetail} setViewDetail={setViewDetail} />
      </div>
      <div className="btn">
        <button onClick={handleNext}>{isLoading ? "Loading..." : "Load More"}</button>
      </div>
    </div>
  );
};

export default App;
