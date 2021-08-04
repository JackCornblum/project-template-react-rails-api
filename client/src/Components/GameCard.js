import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Popup from 'reactjs-popup'
import { useEffect, useState } from "react"
import {useHistory} from 'react-router-dom'

function GameCard({interestedGames, setInterestedGames, name, image, genre, timePlayed, completed, id, userGames, setUserGames, interestedIn, inProgress, currentGamer,  gameDeals, setGameDeals}) {

    const history = useHistory()
    const [comments, setComments] = useState([])

    useEffect(() => {
        fetch(`/gamecomments/${id}`)
        .then(res => res.json())
        .then(data => { 
            if (data.length > 0) {
                setComments(data[0].comment)
            }
        }
            )
        
    }, [])

  

    function handleClick (e) {
        fetch(`/games/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
         
        }
        )
        .then(res => res.json())
        .then((data) => {
            setUserGames(data)
        })
    }

    function handleInProgress() { 
        let game = {
            gamer_id: currentGamer.id,
            name,
            image,
            genre,
            "time_played": 0,
            completed: false
                    }

            fetch(`/interested_games/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => setInterestedGames(data))

            fetch('/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(game)
                
            })
            .then(res => res.json())
            .then(data => {
                setUserGames([...userGames, data])
            })
    }

    async function showDeals(e) {
        // console.log('hello?')
        const searchTerm = name.replace(/ /g, "")
        const newSearchTerm = searchTerm.replace(/[,.-:]/g, '')
        const res = await fetch(`https://cheapshark-game-deals.p.rapidapi.com/games?title=${newSearchTerm}`, {
            method: 'GET',
            headers: {'x-rapidapi-key': 'fbf5db35d2mshbfc05e0f00a9ee9p1751a4jsn1b64307f1581', 'x-rapidapi-host': 'cheapshark-game-deals.p.rapidapi.com', 'Content-Type': 'application/json'}
        })
        const deals = await res.json()
        console.log(deals)
        setGameDeals(deals)
        history.push('/deals')
    }
    
    function updateTimePlayed(e){
        e.preventDefault()
        console.log(e.target.input.value)
        fetch(`/updatetimeplayed/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({"time_played": e.target.input.value})
            
        }).then(res => res.json())
        .then(data => setUserGames(data))
        // .then(res => res.json())
        // .then(data => setUserGames([...userGames, data]))
    }

    function commentSubmit(e) {
        e.preventDefault()
        console.log(id)
        let comment = {
            gamer_id: currentGamer.id,
            game_id: id,
            comment: e.target.comment.value
        }
        fetch('/comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(comment)
            
        })
        .then(res => res.json())
        .then(console.log)
    }

    return (
        <Card style={{ width: '18rem' }}>
            
            <Card.Body>
            <Card.Title> {name} </Card.Title> 
            <Card.Img variant="top" src={image} style={{height: "200px", width: "200px", margin: "auto"}}/> 
                <Card.Subtitle> Game Genre: {genre} </Card.Subtitle>
                <Card.Text> Time Played: {timePlayed} hours </Card.Text>
                {(inProgress === true || completed === true )? 
                <>
                <form onSubmit={updateTimePlayed}>
                <input name="input" type="number" step="0.01"></input>
                <Button type="submit" className="gameButton" >Update Time Played</Button>
                </form> 
                </>
                : null}
                <Card.Text> Completed: {completed ? 'Yes' : 'No'} </Card.Text> 
                {inProgress ? <Button onClick={handleClick} className="gameButton">I've Completed This Game</Button> : null}
                {interestedIn ? <Button onClick={handleInProgress} className="gameButton">I'm Playing This Game Now</Button> : null }
                {interestedIn ?  <Button onClick={showDeals} className="gameButton">Find Deals</Button> : null }
               

                {(inProgress === true || completed === true )? 
                
                <form onSubmit={commentSubmit}>
                <input name="comment" type="textarea" ></input>
                <Button type="submit" className="gameButton" >Comment</Button>
                </form> 
                : null}
                <Card.Text> Comments: {comments} </Card.Text> 
            </Card.Body>
        </Card>
    )
   }
   export default GameCard