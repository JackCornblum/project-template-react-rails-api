import {Container, Row} from 'react-bootstrap'
import GameCard from './GameCard'
import Col from 'react-bootstrap/Col'



function MyGames({userGames, interestedGames, setUserGames}) {

    
    let interestedGameCards = interestedGames.map(game => {
            return(
                <Col key={game.name} xs={6} md={4}>
            <GameCard image={game.image} name={game.name} genre={game.genre} completed={game.completed}/>
            </Col> )}
        )


    let inProgressGameCards = userGames.map(game => { if (!game.completed) {
        return(
            <Col key={game.name} xs={6} md={4}>
        <GameCard userGames={userGames} setUserGames={setUserGames} image={game.image} name={game.name} genre={game.genre} timePlayed={game.timePlayed} id={game.id} completed={game.completed}/>
        </Col> )}}
    )

    let completedGameCards = userGames.map(game => { if (game.completed) {
        return(
            <Col key={game.name} xs={6} md={4}>
        <GameCard image={game.image} name={game.name} genre={game.genre} completed={game.completed} timePlayed={game.timePlayed} />
        </Col> )}}
    )



    return (
        <>
        <h3> My Games Page </h3>
            <div>
        <h2>My Interested Games</h2>
            <Container fluid="md">
                <Row md={4}>
                    {interestedGameCards}
                </Row>
            </Container>

        <h2>My In-progress Games</h2>
            <Container fluid="md">
                <Row md={4}>
                    {inProgressGameCards}
                </Row>
            </Container>

        <h2>My Completed Games</h2>
            <Container fluid="md">
                <Row md={4}>
                    {completedGameCards}
                </Row>
            </Container>

        </div>
        </>
    )
   }
   export default MyGames