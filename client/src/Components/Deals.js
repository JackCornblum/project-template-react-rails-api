import {Card, Button, Container, Row} from 'react-bootstrap'

function Deals({gameDeals}) {

    const allDeals = gameDeals.map(deal => {
        console.log(deal)
        return (
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>{deal.external}</Card.Title>
                    <Card.Img variant="top" style={{height: "200px", width: "200px", margin: "auto"}} src={deal.thumb} />
                    <Card.Text>Deal Price: ${deal.cheapest}</Card.Text>
                </Card.Body>
            </Card>
        )
    })
    console.log(allDeals)

    return (
        <>
            <h3>Deals</h3>
            <Container fluid="md">
                <Row md={4}>
                    {allDeals}
                </Row>
            </Container>
        </>
    )
}

export default Deals