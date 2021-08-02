import Container from 'react-bootstrap/Container'



function MyGames({userGames, setUserGames}) {

    // let inProgressGameCards = userGames.map(game => {
    //     <Row key={game.name}>
    //     <GameCard image={game.image} name={game.name} genre={game.genre} timePlayed={game.timePlayed} />
    //     </Row> }
    // )


    return (
        <>
        {/* <h3> My Games Page </h3>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingBottom: "20px", paddingTop: '10px'}}>
        <h2>My Interested Games</h2>
        <br/>
        <h2>My In-progress Games</h2>
        <Container fluid="md">
        {inProgressGameCards}
        </Container>
        <br/>
        <h2>My Completed Games</h2>
        <br/>
        </div> */}
        </>
    )
   }
   export default MyGames