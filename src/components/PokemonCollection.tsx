import React from "react";
import { Pokemon, PokemonDetail } from "../interface";
import PokemonList from "./PokemonList";
import "./pokemon.css";
import { viewDetail } from "../App";

interface Props {
  pokemons: PokemonDetail[];
  viewDetail: viewDetail;
  setViewDetail: React.Dispatch<React.SetStateAction<viewDetail>>;
}


const PokemonCollection: React.FC<Props> = (props) => {
  const { pokemons,viewDetail, setViewDetail } = props;
  const handleSelect =  (id : number)=>{
    console.log("vô then này rồi")
    if (!viewDetail.isSelected){
        setViewDetail({
            id: id,
            isSelected : true
        })
    }
    
}
  return (
    <div>
      <section className="collection-container">
        {pokemons.map((pokemon: PokemonDetail) => {
          return (
            <div className="" onClick={() =>handleSelect(pokemon.id)} key={Math.random()}>
              <PokemonList
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.sprites.front_default}
                abilities={pokemon.abilities}
                viewDetail={viewDetail}
                setViewDetail={setViewDetail}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default PokemonCollection;
