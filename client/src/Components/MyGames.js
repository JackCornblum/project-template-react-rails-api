import {Container, Row} from 'react-bootstrap'
import GameCard from './GameCard'
import Col from 'react-bootstrap/Col'



function MyGames({currentGamer, userGames, interestedGames, setUserGames, setInterestedGames, setGameDeals, gameDeals}) {

    
    let interestedGameCards = interestedGames.map(game => {
            return(
                <Col key={game.name} xs={6} md={6}>
                <GameCard gameDeals={gameDeals} setGameDeals={setGameDeals} interestedGames={interestedGames} setInterestedGames={setInterestedGames} userGames={userGames} setUserGames={setUserGames} currentGamer={currentGamer} id={game.id} image={game.image} name={game.name} genre={game.genre} completed={game.completed} interestedIn={true}/>
                </Col> 
            )}
        )


    let inProgressGameCards = userGames.map(game => { if (!game.completed) {
        return(
            <Col key={game.name} xs={6} md={6}>
            <GameCard inProgress={true} userGames={userGames} currentGamer={currentGamer} setUserGames={setUserGames} image={game.image} name={game.name} genre={game.genre} timePlayed={game.time_played} id={game.id} completed={game.completed}/>
            </Col> 
        )}}
    )

    let completedGameCards = userGames.map(game => { if (game.completed) {
        return(
            <Col key={game.name} xs={6} md={6}>
            <GameCard userGames={userGames} setUserGames={setUserGames} currentGamer={currentGamer} id={game.id} completed={true} image={game.image} name={game.name} genre={game.genre} completed={game.completed} timePlayed={game.time_played} />
            </Col> 
        )}}
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
                <Row md={6}>
                    {completedGameCards}
                </Row>
            </Container>

        </div>
        </>
    )
   }
   export default MyGames