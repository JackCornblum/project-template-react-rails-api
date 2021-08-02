import Card from 'react-bootstrap/Card'


function GameCard({name, image, genre, timePlayed, completed}) {
    return (
        <Card>
            <Card.Body>
                <h2> {name} </h2> 
                <img style={{width:"200px", height:"200px"}} src={image}/>
                <h3> {genre} </h3>
                <h4> Time Played: {timePlayed} </h4>
                <h4> Completed: {completed? 'Yes' : 'No'} </h4> 
            </Card.Body>
        </Card>
    )
   }
   export default GameCard