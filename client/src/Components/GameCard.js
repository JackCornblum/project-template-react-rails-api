import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Popup from 'reactjs-popup'
import { useEffect, useState } from "react"
import {useHistory} from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion'

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
        .then(data => {
            setUserGames(data)
            e.target.reset()
        })
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
        .then(data => {
            setComments([...comments, data])
            e.target.reset()})
     
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
        <Card className="game-card" style={{ width: '35rem', maxHeight: '400px' ,overflowY: "scroll", marginBottom: '25px', fontFamily: 'Goldman', color: '#14FFEC' }}>
            
            <Card.Body>
            <Card.Title> {name} </Card.Title> 
            <Card.Img variant="top" src={image} style={{height: "200px", width: "200px", margin: "auto"}}/> 
            <Card.Subtitle> Game Genre: {genre} </Card.Subtitle>
                
                {(inProgress === true || completed === true )? <Card.Text> Time Played: {timePlayed} hours </Card.Text> 
                : null}

                {(inProgress === true || completed === true )? 

                <Accordion>
                <Accordion.Toggle as={Card.Header} eventKey="0">
                    Click To Update Time Played
                </Accordion.Toggle>
                <Accordion.Collapse eventKey="0">

                <form onSubmit={updateTimePlayed}>
                <input name="input" type="number" step="0.1"></input>
                <br/>
                <Button type="submit" className="gameButton" >Update Time Played</Button>
                </form> 
                </Accordion.Collapse>
                        </Accordion>
                : null}
                
               
                {interestedIn ? <Button onClick={handleInProgress} className="gameButton">I'm Playing This Game Now</Button> : null }
                {interestedIn ?  <Button onClick={showDeals} className="gameButton">Find Deals</Button> : null }
                
                {(inProgress === true || completed === true )? 

                    <Accordion>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                        Click To Leave Review
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                <form onSubmit={commentSubmit}>
                    <br/>
                <textarea name="comment" type="textarea" rows='3' cols='50'></textarea>
                <br/>
                <Button type="submit" className="gameButton" >Leave Review</Button>
                </form> 

                </Accordion.Collapse>
                        </Accordion>
                : null}
                {(inProgress === true && comments.length > 0)? 
                 
                    
                        <Accordion>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                Click To See My Reviews
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <ul style={{listStyle: 'none', paddingLeft: '0px', color: '#14FFEC'}}>
                                {comments.map(item => {
                                return <li style={{listStyle: 'none', border: '1px solid', margin: '5px'}} id={item.id} key={item.id}>
                                {item.comment}
                                <br/>
                                <Button style={{marginBottom: '10px'}} variant='secondary' size="sm" onClick={deleteComment}>Remove Review</Button>
                                </li>}
                                )}
                                </ul> 
                            </Accordion.Collapse>
                        </Accordion>
   
                : null }
                  {(completed === true && comments.length > 0)? 
                 
                    
                 <Accordion>
                     <Accordion.Toggle as={Card.Header} eventKey="0">
                         Click To See My Reviews
                     </Accordion.Toggle>
                     <Accordion.Collapse eventKey="0">
                         <ul style={{listStyle: 'none', paddingLeft: '0px', color: '#14FFEC'}}>
                         {comments.map(item => {
                         return <li style={{listStyle: 'none', border: '1px solid', margin: '5px'}} id={item.id} key={item.id}>
                         {item.comment}
                         <br/>
                         <Button style={{marginBottom: '10px'}} variant='secondary' size="sm" onClick={deleteComment}>Remove Review</Button>
                         </li>}
                         )}
                         </ul> 
                     </Accordion.Collapse>
                 </Accordion>

         : null }
                
            {(inProgress === true || completed === true )? <>
            <h2> . . .</h2>
            <Card.Text> Am I done playing this one? {completed ? 'Yes' : 'No'} </Card.Text>
            </> : null }
            {inProgress ? <Button onClick={handleClick} className="gameButton">I've Finished Playing This Game</Button> : null}
            </Card.Body>
        </Card>
    )
   }
   export default GameCard