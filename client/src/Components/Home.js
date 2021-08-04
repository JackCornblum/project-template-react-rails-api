import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Container, Nav } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import Carousel from 'react-multi-carousel'
import { useHistory } from "react-router-dom"
import CarouselCard from "./CarouselCard"

function Home({currentGamer}) {

    const [randomGames, setRandomGames] = useState([])
    const history = useHistory()

    useEffect(() => {
        fetch('/gamesbeingplayed')
        .then(res => res.json())
        .then(data => setRandomGames(data))
    },[])

    const renderGames = randomGames.map(game => {
        return <CarouselCard name={game.name} image={game.image} genre={game.genre} />
    })
    
    
    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
      
      function loginRedirect() {
        history.push('/login')
      }
      
      function signupRedirect() {
        history.push('/signup')
      }

    return (
        <>
        <h3> Home </h3>
        {currentGamer.id ? null
        : 
        <>
        <Button onClick={loginRedirect} className="gameButton" >Log In</Button>
        <br/>
        <Button onClick={signupRedirect} className="gameButton">Sign Up</Button>
        </>
        }

        <h4>Games other users are playing</h4>
        <Carousel responsive={responsive}>
            {renderGames}
        </Carousel>
        </>
    )
   }
   export default Home