import Card from 'react-bootstrap/Card'

function CarouselCard({name, image, genre}) {
    return(

        <Card className="game-card" style={{ width: '25rem', maxHeight: '300px' ,overflowY: "scroll", marginBottom: '25px', fontFamily: 'Goldman', color: '#14FFEC', marginLeft: '2%' }}>
            <Card.Body>
                <Card.Img variant="top" src={image} style={{height: "200px", width: "200px", margin: "auto"}}/> 
                <Card.Title> {name} </Card.Title> 
                <Card.Subtitle> Game Genre: {genre} </Card.Subtitle>
            </Card.Body>
        </Card>

    )
}

export default CarouselCard