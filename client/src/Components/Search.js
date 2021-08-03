
import { useState } from "react"
import {Button} from "react-bootstrap"


function Search({currentGamer}) {

    const [searchedGames, setSearchedGames] = useState("")
    const [resultsArray, setResultsArray] = useState([])

    function handleChange(e){
        setSearchedGames(e.target.value)
    }

    // console.log(resultsArray)

    function handleClick(e) {
        e.preventDefault()
        fetch(`/search?term=zelda`)
        .then(res => res.json())
        .then(console.log)
    }

    // let searchCards = searchedGames.map(game => {
    //     return(
    //     <SearchedGameCards image={game.image} name={game.name} genre={game.genre} currentGamer={currentGamer} /> )}
    // )

    return (
        <>
        <h3> Search Page </h3>
        <form onClick={handleClick}>
            <input type='text' value={searchedGames} onChange={handleChange}/>
            <br/>
            <Button type='submit'>Submit Search</Button>
        </form>
        
        {/* {searchCards} */}
        </>
    )
   }
   export default Search