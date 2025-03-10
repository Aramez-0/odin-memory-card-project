import { useState, useEffect } from "react";
import './card.css';


function Card({click, clickedPokemon, array}) {
    
    const [sprite, setSprite] = useState(null);
    const [name, setName] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    let pokemonList = [
        'mankey', 
        'dreepy', 
        'spoink', 
        'glastrier ', 
        'bounsweet', 
        'torkoal', 
        'wailord', 
        'swablu', 
        'iron-treads', 
        'arboliva', 
        'bewear', 
        'nickit'
    ]

    function randomNum() {
        return Math.floor(Math.random() * 12)
    }

    function handleClick() {
        click((previous) => previous + 1)
        clickedPokemon.push(name)
        let similar = clickedPokemon.filter((word) => word === name)
        if (similar.length > 1) {
            click(0);
            array([])
        }
    }

    function handleKeyDown(event) {
        if (event.keyCode == 32 || event.keyCode == 13) handleClick();
    }

    useEffect(() => {
        async function getPikachu(pokemon) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`, { mode: 'cors' });
                const data = await response.json();
                setSprite(data.sprites.front_default);
                setName(data.name);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching Pokemon data:", error);
                setIsLoading(false);
            }
        }

        getPikachu(pokemonList[randomNum()]);
    }, []);

    return (
        <div className="card" onClick={handleClick} tabIndex={0} onKeyDown={handleKeyDown}>
            {!isLoading ? <img src={sprite} alt={name}/> : <div>Loading...</div>}
            <h3>{name}</h3>
        </div>
    );
}

export default Card