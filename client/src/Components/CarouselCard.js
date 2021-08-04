import Card from 'react-bootstrap/Card'

function CarouselCard({name, image, genre}) {
    return(

        <Card style={{ width: '25rem', maxHeight: '300px' ,overflowY: "auto", marginBottom: '25px' }}>
            <Card.Body>
                <Card.Img variant="top" src={image} style={{height: "200px", width: "200px", margin: "auto"}}/> 
                <Card.Title> {name} </Card.Title> 
                <Card.Subtitle> Game Genre: {genre} </Card.Subtitle>
            </Card.Body>
        </Card>

    )
}

export default CarouselCard