import React, { useEffect, useState } from "react";
import { Pokemon } from "../interface";
import "./pokemon.css";
import { viewDetail } from "../App";

interface Props {
  id: number;
  name: string;
  image: string;
  abilities: string[] | undefined;
  viewDetail: viewDetail;
  setViewDetail: React.Dispatch<React.SetStateAction<viewDetail>>;
}
const PokemonList: React.FC<Props> = (props) => {
  const { id, name, image, abilities, viewDetail, setViewDetail } = props;
  const [isSelected, setSelected] = useState<boolean>(false);
  useEffect(() => {
    // console.log(viewDetail);
    setSelected(id === viewDetail?.id);
  }, [viewDetail]);

  const handleClose =  ()=>{
    setViewDetail({
        id: 0,
        isSelected : false
    })
}

  console.log(viewDetail)
  return (
    <div>
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <p className="detail-close" onClick={handleClose}>
            X
          </p>
          <div className="detail-skill">
            {abilities?.map((ab: any) => {
              return (
                <span key={ab.ability.url}>
                  {ab.ability.name} - {id}
                </span>
              );
            })}
          </div>
        </section>
      ) : (
        <div></div>
      )}

      <section className="pokemon-list-container">
        <p className="pokemon-name">
          {name} - {id}
        </p>
        <img src={image} alt="image" />
      </section>
    </div>
  );
};

export default PokemonList;
