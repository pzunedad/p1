import './App.css'
import { api } from "./api/api"
import { useEffect, useState } from 'react';
import type { CharacterT } from './types';
import { Character } from './components/Character';

const App = () => {

  const [page, setPage] = useState<string>("1");
  const [characters, setCharacters] = useState<CharacterT[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [next, setNext] = useState<string | null>(null);

  const fetchCharacters = async (page: string, acumular: boolean) => {
    setLoading(true);
    await api.get(`/people/${page ? "?page=" + page : ""}`)
      .then((e) => {
        // Si debe acumular, solo añade el primer personaje de la nueva página
        if (acumular) {
          setCharacters(prevCharacters => [...prevCharacters, e.data.results[0]]);
        } else {
          setCharacters(e.data.results);
        }
        setNext(e.data.next);
      })
      .catch((e) => {
        setError(`Error al obtener los datos: ${e}`);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleNextPage = () => {
    if (next) {
      const nextPageNumber = (Number(page) + 1).toString();
      setPage(nextPageNumber);
      fetchCharacters(nextPageNumber, true);
    }
  };

  useEffect(() => {
    fetchCharacters(page, false);
  }, []);

  return (
    <>
      <h1>Personajes de Star Wars</h1>
      {loading && <h2>Cargando...</h2>}
      {error && <h3>Error: {error}</h3>}
      {!loading && characters.map((character) => (
        <Character key={`${character.name}`} character={character}/>
      ))}

      {/* Paginación */}
      <div className="pagination">
        <button
          onClick={handleNextPage}
          disabled={!next || loading}
          className="next-button">
          Siguiente Página
        </button>
      </div>

      {/* Mostrar total de personajes cargados */}
      {!loading && characters.length > 0 && (
        <div className="total-count">
          Total de personajes cargados: {characters.length}
        </div>
      )}
    </>
  )
} 

export default App