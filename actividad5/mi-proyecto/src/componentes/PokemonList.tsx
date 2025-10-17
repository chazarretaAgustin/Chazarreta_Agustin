"use client"; // Mantiene como Client Component por uso de useState y useEffect

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonListItem from './PokemonListItem';
import LoadingSkeleton from './LoadingSkeleton'; 

//Datos básicos de un Pokémon (solo nombre y URL en la lista)
type Pokemon = {
    name: string;
    url: string;
}

//Estructura de la respuesta de la API (contiene el array de resultados)
type PokeApiResponse = {
    results: Pokemon[];
}


// Componente con la logica de estados y carga de datos
export default function PokemonList() {
    // Defino estados
    const [pokemons, setPokemons] = useState<Pokemon[]>([]); 
    const [isLoading, setIsLoading] = useState(true); // Nuevo estado de carga

    // Hook useEffect, efecto secundario de la llamada a la API
    useEffect(() => {
        const buscaPokemon = async () => { 
            try {
                setIsLoading(true);
                const listResponse = await axios.get<PokeApiResponse>('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');// Obtiene solo la lista de nombres y urls 
                setPokemons(listResponse.data.results);//Actualiza el estado principal solo con la lista de nombres/URLs
                
            } catch (error) {
                console.error("Error al obtener la lista de Pokémons:", error instanceof Error ? error.message : error);
            } finally {
                setIsLoading(false);//Se detiene la carga al finalizar, incluso si hay error
            }
        }

        buscaPokemon();
    }, []) // Array vacío: se ejecuta solo al montar.

    return (
        <div>
            {/* Titulo */}
            <h1>Listado de Pokémons (Primeros 20)</h1>
            
            {}

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {isLoading ? (
                    //Implementación del Skeleton mientras carga
                    <>
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <LoadingSkeleton />
                        <p style={{ marginTop: '15px' }}>Obteniendo datos de la API...</p>
                    </>
                ) : (
                    //Renderizado de la lista
                    pokemons.map((pokemon) => (
                        // Usamos el nuevo PokemonListItem que es un <Link>
                        <PokemonListItem 
                            key={pokemon.name} //key
                            name={pokemon.name} 
                            url={pokemon.url} 
                        />
                    ))
                )}
            </div>
        </div>
    );
}