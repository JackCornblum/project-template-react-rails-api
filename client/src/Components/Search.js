
import { useState } from "react"
import {Button} from "react-bootstrap"
import SearchedGameCard from "./SearchedGameCard"
import { trackPromise } from 'react-promise-tracker'
import Col from 'react-bootstrap/Col'
import {Container, Row} from 'react-bootstrap'

function Search({currentGamer, userGames, setUserGames, interestedGames, setInterestedGames}) {

    const [searchedGames, setSearchedGames] = useState("")
    const [resultsArray, setResultsArray] = useState([])
    const [errors, setErrors] = useState("")

    function handleChange(e){
        setSearchedGames(e.target.value)
        setResultsArray([])
        setErrors("")
    }

    // console.log(resultsArray)

    function handleClick(e) {
        e.preventDefault()
        setErrors("")
        // console.log(searchedGames)
        trackPromise(
            fetch(`/search?term=${searchedGames}`)
            .then(res => res.json())
            .then(data => {
                if (data.length > 0) {
                    setResultsArray(data)
                } else {
                    setErrors("No Results")
                }
            })
        )
    }

    let searchCards = resultsArray.map(game => {
        return(
            <Col key={game.name} xs={6} md={4}>
        <SearchedGameCard interestedGames={interestedGames} setInterestedGames={setInterestedGames} setUserGames={setUserGames} userGames={userGames} currentGamer={currentGamer} image={game.image_id} name={game.name} genre={game.genre_name} currentGamer={currentGamer} /> 
        </Col>)}
  
        )

    return (
        <>
        <h3> Search Page </h3>
        <form onSubmit={handleClick}>
            <input type='text' value={searchedGames} onChange={handleChange}/>
            <br/>
            <Button type='submit' className="gameButton">Submit Search</Button>
        </form>
        
       
        <Container fluid="md">
                <Row md={4}>
                {searchCards}
                </Row>
                {errors ? <h3>{errors}</h3> : null}
            </Container>
        </>
    )
   }
   export default Search