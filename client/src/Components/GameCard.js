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
                setComments(data)
            }
        }
            )
        
    }, [])

//setComments(data.map( obj => obj.comment)

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
        let newSearchTerm = searchTerm.replace(/[,.-:&]/g, '')
        newSearchTerm = newSearchTerm.toUpperCase()
        const res = await fetch(`https://cheapshark-game-deals.p.rapidapi.com/games?title=${newSearchTerm}`, {
            method: 'GET',
            headers: {'x-rapidapi-key': 'fbf5db35d2mshbfc05e0f00a9ee9p1751a4jsn1b64307f1581', 'x-rapidapi-host': 'cheapshark-game-deals.p.rapidapi.com', 'Content-Type': 'application/json'}
        })
        const deals = await res.json()
        const matchingDeal = deals.filter(d => d.internalName === newSearchTerm)
        console.log(matchingDeal)
        setGameDeals(matchingDeal)
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
        .then(data => setComments([...comments, data]))
     
    }

    function deleteComment(e) {
        // console.log(e.target.parentElement.id)
        fetch(`/comments/${e.target.parentElement.id}`, {
            method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        let filtered = comments.filter(item => item.id !== data.id)
        setComments(filtered)
    })}
    //      setComments(comments.map( item => {
    //     if (item.id != data.id)
    //     return item
    // })))}
    
    return (
        <Card style={{ width: '35rem', maxHeight: '300px' ,overflowY: "auto", marginBottom: '25px' }}>
            
            <Card.Body>
            <Card.Title> {name} </Card.Title> 
            <Card.Img variant="top" src={image} style={{height: "200px", width: "200px", margin: "auto"}}/> 
            <Card.Subtitle> Game Genre: {genre} </Card.Subtitle>
                
                {(inProgress === true || completed === true )? <Card.Text> Time Played: {timePlayed} hours </Card.Text> 
                : null}

                {(inProgress === true || completed === true )? 
                <form onSubmit={updateTimePlayed}>
                <input name="input" type="number" step="0.01"></input>
                <Button type="submit" className="gameButton" >Update Time Played</Button>
                </form> 
                : null}
                
                {(inProgress === true || completed === true )? <Card.Text> Completed: {completed ? 'Yes' : 'No'} </Card.Text> : null }
                {inProgress ? <Button onClick={handleClick} className="gameButton">I've Completed This Game</Button> : null}
                {interestedIn ? <Button onClick={handleInProgress} className="gameButton">I'm Playing This Game Now</Button> : null }
                {interestedIn ?  <Button onClick={showDeals} className="gameButton">Find Deals</Button> : null }
                
                {(inProgress === true || completed === true )? 
                <form onSubmit={commentSubmit}>
                <input name="comment" type="textarea" ></input>
                <Button type="submit" className="gameButton" >Comment</Button>
                </form> 
                : null}
                {(inProgress === true || completed === true )? 
                    <>
                        <Card.Text> Comments: </Card.Text>
                        <ul>
                            {comments.map(item => {
                        return <li id={item.id} key={item.id}>
                            {item.comment}
                        <Button variant="secondary" size="sm" onClick={deleteComment}>X</Button>
                        </li>}
                            )}
                        </ul> 
                    </>
                : null }
            </Card.Body>
        </Card>
    )
   }
   export default GameCard