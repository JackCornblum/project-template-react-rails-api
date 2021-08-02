import {Container, Row} from 'react-bootstrap'
import GameCard from './GameCard'



function MyGames({userGames, setUserGames}) {

    let inProgressGameCards = userGames.map(game => {
        return(
        <GameCard image={game.image} name={game.name} genre={game.genre} timePlayed={game.timePlayed} /> )}
    )

console.log(userGames)
    return (
        <>
        <h3> My Games Page </h3>
            <div>
        <h2>My Interested Games</h2>
        <br/>
        <h2>My In-progress Games</h2>
        <Container fluid="md">
        {inProgressGameCards}
        </Container>
        <br/>
        <h2>My Completed Games</h2>
        <br/>
        </div>
        </>
    )
   }
   export default MyGames