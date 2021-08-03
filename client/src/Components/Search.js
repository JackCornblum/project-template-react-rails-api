
import { useState } from "react"
import {Button} from "react-bootstrap"
import SearchedGameCard from "./SearchedGameCard"


function Search({currentGamer, userGames, setUserGames, interestedGames, setInterestedGames}) {

    const [searchedGames, setSearchedGames] = useState("")
    const [resultsArray, setResultsArray] = useState([])

    function handleChange(e){
        setSearchedGames(e.target.value)
    }

    // console.log(resultsArray)

    function handleClick(e) {
        e.preventDefault()
        // console.log(searchedGames)
        fetch(`/search?term=${searchedGames}`)
        .then(res => res.json())
        .then(data => setResultsArray(data))
    }

    let searchCards = resultsArray.map(game => {
        return(
        <SearchedGameCard interestedGames={interestedGames} setInterestedGames={setInterestedGames} setUserGames={setUserGames} userGames={userGames} currentGamer={currentGamer} image={game.image_id} name={game.name} genre={game.genre_name} currentGamer={currentGamer} /> )}
    )

    return (
        <>
        <h3> Search Page </h3>
        <form onSubmit={handleClick}>
            <input type='text' value={searchedGames} onChange={handleChange}/>
            <br/>
            <Button type='submit' className="gameButton">Submit Search</Button>
        </form>
        
        {searchCards}
        </>
    )
   }
   export default Search