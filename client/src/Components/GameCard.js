import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

function GameCard({name, image, genre, timePlayed, completed, id, userGames, setUserGames}) {

    function handleClick (e) {
        console.log(id)
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

    
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={image} style={{height: "200px", width: "200px", margin: "auto"}}/>
            <Card.Body>
                <Card.Title> {name} </Card.Title> 
                <Card.Subtitle> {genre} </Card.Subtitle>
                <Card.Text> Time Played: {timePlayed} </Card.Text>
                <Card.Text> Completed: {completed ? 'Yes' : 'No'} </Card.Text> 
                {id ? <Button onClick={handleClick} className="gameButton">I've Completed This Game</Button> : null}
            </Card.Body>
        </Card>
    )
   }
   export default GameCard