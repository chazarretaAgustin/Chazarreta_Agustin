import PokemonList from '../componentes/PokemonList';

export default function Home() {
  return (
    <main style={{ padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      
      {/*renderizar el componente*/}
      <PokemonList />
      
    </main>
  );
}
