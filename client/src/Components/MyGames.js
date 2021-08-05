import {Container, Row, Button} from 'react-bootstrap'
import GameCard from './GameCard'
import Col from 'react-bootstrap/Col'
import {useState, useEffect} from 'react'


function MyGames({currentGamer, userGames, interestedGames, setUserGames, setInterestedGames, setGameDeals, gameDeals}) {

    const[interested, setInterested] = useState(false)
    const [inProgress, setInProgress] = useState(false)
    const [completed, setCompleted] = useState(false)

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

    let renderInterested = (
        <>
            <h2 className="color-header">My Interested Games</h2>
            <Container fluid="md">
                <Row md={4}>
                    {interestedGameCards}
                </Row>
            </Container>
        </>
    )

    let renderInProgress = (
        <>
            <h2 className="color-header">My In-progress Games</h2>
            <Container fluid="md">
                <Row md={4}>
                    {inProgressGameCards}
                </Row>
            </Container>
        </>
    )

    let renderCompleted = (
        <>
            <h2 className="color-header">My Completed Games</h2>
            <Container fluid="md">
                <Row md={6}>
                    {completedGameCards}
                </Row>
            </Container>
        </>
    )


    return (
        <>
        <h3 className="color-header" > My Games Page </h3>
            <div>
        
        <Button className="gameButton" onClick={e =>{ 
            setInterested(!interested)
            setInProgress(false)
            setCompleted(false)
            }}> Interested Games </Button>
        <Button className="gameButton" onClick={e => {
            setInProgress(!inProgress)
            setInterested(false)
            setCompleted(false)}}> In-Progress Games</Button>
        <Button className="gameButton" onClick={e => {
            setCompleted(!completed)
            setInterested(false)
            setInProgress(false)
            }}> Completed Games</Button>
        

       
            {interested ? renderInterested : null}
            
            {inProgress ? renderInProgress : null}

            {completed ? renderCompleted : null}
        

        </div>
        </>
    )
   }
   export default MyGames