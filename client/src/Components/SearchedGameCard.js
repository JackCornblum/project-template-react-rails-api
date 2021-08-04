import {Card, Button} from 'react-bootstrap'
import {useHistory} from 'react-router-dom'

function SearchedGameCard({name, image, genre, currentGamer, userGames, setUserGames, interestedGames, setInterestedGames}) {

    const history = useHistory()

    const imgSrc = `https://images.igdb.com/igdb/image/upload/t_cover_big/${image}.jpg`

    async function handleClick(e) {
        const gameObj = {
            gamer_id: currentGamer.id,
            image: imgSrc,
            name, 
            genre,
            time_played: 0,
            completed: false
        }
        const interestedObj = {
            gamer_id: currentGamer.id,
            image: imgSrc,
            name,
            genre
        }
        console.log(gameObj)
        if (e.target.innerText === 'Add to Interested In Games') {
            const res = await fetch('/interested_games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(interestedObj)
            })
            const gameData = await res.json()
            if (gameData.id) {
                setInterestedGames([...interestedGames, gameData])
                history.push("/mygames")
            }
        } else { 
            const res = await fetch('/games', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(gameObj)
            })
           const gameData = await res.json()
           if (gameData.id) {
               setUserGames([...userGames, gameData])
               history.push("/mygames")
           }
            
        }
    }
        
    
    
    return (
            <Card>
                <Card.Body>
                <Card.Title> {name} </Card.Title> 
                <Card.Img variant="top" src={imgSrc} style={{height: "200px", width: "200px", margin: "auto"}}/>
                    <Card.Subtitle> Game Genre: {genre} </Card.Subtitle>
                    {currentGamer.id? <Button onClick={handleClick} className="gameButton">Add to My Games</Button> : null}
                    {currentGamer.id? <Button onClick={handleClick} className="gameButton">Add to Interested In Games</Button> : null}
                </Card.Body>
            </Card>
        )
}

export default SearchedGameCard