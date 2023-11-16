import { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import Card from './components/Card/Card';
import Navbar from './components/Navbar/Navbar';

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextURL(res.next);
      setPrevURL(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecode = getPokemon(pokemon.url)
        return pokemonRecode;
      })
    );
    setPokemonData(_pokemonData)
  };

  const handlePrevPage = async () => {
    if(prevURL){
      setLoading(true);
      let data = await getAllPokemon(prevURL);
      await loadPokemon(data.results);
      setNextURL(data.next);
      setPrevURL(data.previous);
      setLoading(false);
    }
  };
  const handleNextPage = async () => {
    if(nextURL){
      setLoading(true);
      let data = await getAllPokemon(nextURL);
      await loadPokemon(data.results);
      setNextURL(data.next);
      setPrevURL(data.previous);
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar/>
      <div className="App">
        {loading ? (
          <h1>ロード中・・・</h1>
        ) : (
          <>
            <div className='pokemonCardContainer'>
              {pokemonData.map((pokemon, i) => {
                return <Card key={i} pokemon={pokemon} />
              })}
            </div>
            <div className='btn'>
              <button onClick={handlePrevPage}>前へ</button>
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
