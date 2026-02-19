import { useEffect, useState } from 'react';
import type { CharacterT } from "../../types";
import { api } from "../../api/api";
import "./style.css";

export const Character = (params:{id?:number, character?: CharacterT}) =>{

      const id = params.id;
    
      const [personaje, setPersonaje] = useState<CharacterT | null>(params.character ? params.character : null);
    
      useEffect(() => {
        !params.character && id && api.get(`/people${id}`).then((e) => setPersonaje(e.data));
      }, [id]);

    return(
        <>
            {personaje ? <div className="mainContainer"> 
                <h2>{personaje?.name}</h2>
                <div className="characterDataContainer">
                    <p><strong>Altura:</strong> {personaje.height}</p>
                    <p><strong>Peso:</strong> {personaje.mass}</p>
                    <p><strong>Color de pelo:</strong> {personaje.hair_color}</p>
                    <p><strong>Color de piel:</strong> {personaje.skin_color}</p>
                    <p><strong>Color del ojo:</strong> {personaje.eye_color}</p>
                    <p><strong>Año de nacimiento:</strong> {personaje.birth_year}</p>
                    <p><strong>Genero:</strong> {personaje.gender}</p>
                </div>
            </div>: <h1>Cargando...</h1>}
        </>
    )
}