"use client";//marca componente como client component

//import de herramientas
import React, {useState, useEffect} from 'react'; 
import axios from 'axios';

//datos básicos de un Pokémon
type PokemonDetails = {
    id: number;
    weight: number;
    base_experience: number;
    abilities: {
        ability: {
            name: string;
        }
    }[];
    types: {
        type: {
            name: string;
        }
    }[];
}

//Datos completos de un pokemon
type Pokemon = {
    name: string;
    url: string;
    details?: PokemonDetails;
}

//componente que combina pokemon, estructura y funcion de click
type PokemonItemProps = {
    pokemon: Pokemon;
    pokemonPresionable: (pokemonName: string) => void; 
}

//estructura de la respuesta de la API (contiene el array de resultados)
type PokeApiResponse = {
    results: Pokemon[];
}

//componente que renderiza un elemento de la lista y maneja la funcionalidad para que sea presionable
const PokemonItem = ({pokemon, pokemonPresionable}: PokemonItemProps) => { 
    return (
        <button //renderiza como boton
            onClick = {() => pokemonPresionable(pokemon.name)}//para que cada pokemon sea presioneble
            style={{
                display: 'block',
                margin: '10px 0',
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                cursor: 'pointer',
                textAlign: 'left',
                width: '300px'
            }}
            key={pokemon.name}//clave de cada pokemon
        >
            <strong>{pokemon.name.toUpperCase()}</strong>
            <br />
            <small>URL: {pokemon.url}</small>
            {/* muestra detalles del pokemon */}
            {pokemon.details && (
                <div>
                    <hr style={{ margin: '5px 0' }} />
                    <p>ID: {pokemon.details.id}</p>{/**muestra propiedades */}
                    <p>Peso: {pokemon.details.weight}</p>
                    <p>Experiencia Base: {pokemon.details.base_experience}</p>
                    <p>Tipos: {pokemon.details.types.map(t => t.type.name).join(', ')}</p>{/**muestra tipo y habilidades */}
                    <p>Habilidades: {pokemon.details.abilities.map(a => a.ability.name).join(', ')}</p>
                </div>
            )}
        </button>
    );
};

//Componente con la logica de estados y carga de datos
export default function PokemonList() {
    //Defino estados
    const [pokemons, setPokemons] = useState<Pokemon[]>([]); 
    const [contClick, setContCLick] = useState<Record<string, number>>({}); 
    const eventoClick = (pokemonName: string) => { //funcion manejo de evento
        setContCLick(prevCounts => ({
            ...prevCounts,
            [pokemonName]: (prevCounts[pokemonName] || 0) + 1
        }))
    };

    //Hook useEffect, efecto secundario de la llamada a la API
    useEffect(() => {
        const buscaPokemon = async () => { 
        try {
            //obtiene lista de nombres y urls
            const listResponse = await axios.get<PokeApiResponse>('https://pokeapi.co/api/v2/pokemon?limit=20');//obtiene lista inicial
            const initialPokemons = listResponse.data.results; //extrae array de pokemon
            
            //obtiene detalles para cada pokemon y guarda en un array de promesas
            const detailPromises = initialPokemons.map(pokemon => 
                // La URL de detalle es la propiedad 'url' del objeto pokemon
                axios.get<PokemonDetails>(pokemon.url)
            );
            
            // Espera a que todas las peticiones de detalle terminen
            const detailResponses = await Promise.all(detailPromises);
            
            //arma datos
            const pokemonsWithDetails: Pokemon[] = initialPokemons.map((pokemon, index) => {
                // Obtiene los detalles de la respuesta correspondiente
                const details = detailResponses[index].data;
                
                // Devuelve el Pokémon con sus detalles completos anidados
                return {
                    ...pokemon,
                    details: details 
                };
            });

            setPokemons(pokemonsWithDetails);//Actualiza el estado principal con el array de Pokémon que ahora contiene los datos detallado. renderizado
        } catch (error){
            console.log("Todo mal en la llamada a la API", error instanceof Error ? error.message : error);
        }
    }

        buscaPokemon();
    }, [])

    return (
        <div>
            {/* Titulo */}
            <h1>Listado de Pokemons (Primeros 20)</h1>
        
            <p>
                <strong>Veces que se ha interactuado: </strong> {/**contador total */}
                {Object.values(contClick).reduce((total, current) => total + current, 0)}
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {pokemons.length === 0 ? (
                    <p>Cargando Pokemons...</p>
                ) : (
                    pokemons.map((pokemon) => (
                        <div key={pokemon.name} style={{ width: '300px', borderBottom: '1px dotted #ccc', paddingBottom: '5px' }}>
                            <PokemonItem 
                                pokemon = {pokemon} 
                                pokemonPresionable = {eventoClick} 
                            />
                            {/* Mostrar el contador de clics para el Pokémon específico */}
                            <p style={{ margin: '0 0 10px 10px', fontSize: '0.9em' }}>
                                Clicks: <strong>{contClick[pokemon.name] || 0}</strong>
                            </p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}