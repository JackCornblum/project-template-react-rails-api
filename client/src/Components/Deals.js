import {Card, Button, Container, Row} from 'react-bootstrap'
import {useState, useEffect} from 'react'

function Deals({gameDeals}) {
    const [gameDealsArray, setGameDealsArray] = useState([])
    const [stores, setStores] = useState([])
    const [renderedDeals, setRenderedDeals] = useState([])

    let allInfo = []
    let renderDeals
    
    useEffect(() => {
        if (gameDeals[0]) {
            const gameId = gameDeals[0].gameID

            fetch(`https://cheapshark-game-deals.p.rapidapi.com/games?id=${gameId}`, {
                method: 'GET',
                headers: {
                    "x-rapidapi-key": "fbf5db35d2mshbfc05e0f00a9ee9p1751a4jsn1b64307f1581",
                    "x-rapidapi-host": "cheapshark-game-deals.p.rapidapi.com",
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data =>{ 
                setGameDealsArray(data.deals)
                fetch('https://cheapshark-game-deals.p.rapidapi.com/stores', {
                    method: 'GET',
                    headers: {
                        "x-rapidapi-key": "fbf5db35d2mshbfc05e0f00a9ee9p1751a4jsn1b64307f1581",
                        "x-rapidapi-host": "cheapshark-game-deals.p.rapidapi.com",
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => setStores(data))
                
            })
        }
        


    }, [])

    useEffect(() => {
        allInfo = gameDealsArray.map(deal => {
            const store = stores.filter(s => {
               if (s.storeID === deal.storeID) {
                   return s
               }
            })
            return [deal, store[0]]
             
        })
        console.log(allInfo)

        renderDeals = allInfo.map(deal => {
            console.log(deal)
            if (deal[1].storeName) {

                if (parseInt(deal[0].savings) === 0) {
                    return null
                } else {
                    return (
                        <Card style={{ width: '15rem' }}>
                            <Card.Body>
                                <Card.Title>On sale for {parseInt(deal[0].savings)}% off from: {deal[1].storeName}</Card.Title>
                                <Card.Img variant="top" style={{height: "100px", width: "100px", margin: "auto"}} src={gameDeals[0].thumb} />
                                <Card.Text>Retail Price: ${deal[0].retailPrice}</Card.Text>
                                <Card.Text>Sale Price: ${deal[0].price}</Card.Text>
                            </Card.Body>
                        </Card>
                    )
                }
            } else {
                return null
            }
            
        })

        setRenderedDeals(renderDeals)
    }, [stores])
    console.log(renderedDeals.length)
    

    
    if (gameDeals[0]) {

        return (
           <>
             
               <h3>Deals for {gameDeals[0].external} </h3>
               <Container fluid="md">
                   <Row md={4}>
                       {renderedDeals}
                   </Row>
               </Container>
           </>
       )
    } else
    return (
        <h3>No Deals Found</h3>
    )


}

export default Deals