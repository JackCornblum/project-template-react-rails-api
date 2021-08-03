import Card from 'react-bootstrap/Card'

function SearchedGameCard({name, image, genre, currentGamer}) {
        
    
    
    return (
            <Card>
                <Card.Body>
                    <h3> Game Card  </h3>
                    <h2> {name} </h2> 
                    <img style={{width:"200px", height:"200px"}} src={`https://images.igdb.com/igdb/image/upload/t_cover_big/${image}.jpg`}/>
                    <h3> {genre} </h3>
                </Card.Body>
            </Card>
        )
}

export default SearchedGameCard