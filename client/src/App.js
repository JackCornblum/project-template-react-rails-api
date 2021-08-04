// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from "react-router"
import { useEffect, useState } from "react"
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import MyGames from './Components/MyGames';
import { Navbar, Container, Nav } from "react-bootstrap"
import Search from './Components/Search';
import Signup from './Components/Signup';
import { trackPromise } from 'react-promise-tracker';
import Deals from './Components/Deals';
import Home from './Components/Home';


function App() {
  const [currentGamer, setCurrentGamer] = useState([])
  const [userGames, setUserGames] = useState([])
  const [interestedGames, setInterestedGames] = useState([])
  const [gameDeals, setGameDeals] = useState([])


useEffect(() => {
  if (currentGamer.id) {
    fetch(`/getgames/${currentGamer.id}`)
    .then(res => res.json())
    .then(data =>{
      if (data.length > 0){
        setUserGames(data)
      }
    })
  } else {
    setUserGames([])
  }
}, [currentGamer])


useEffect(() => {
  if (currentGamer.id) {
    fetch(`/getinterests/${currentGamer.id}`)
    .then(res => res.json())
    .then(data =>{
      if (data.length > 0){
        setInterestedGames(data)
      }
    })
  } else {
    setInterestedGames([])
  }
}, [currentGamer])

useEffect(() => {
fetch(`/me`)
.then(res => res.json())
.then(data => {
  if (data.id) {
    setCurrentGamer(data)
  } 
})
}, [])

  return (
    <div className="App">
      <NavBar currentGamer={currentGamer}/>
    
      <Switch>
        <Route exact path="/login">
          <Login setCurrentGamer={setCurrentGamer} />
        </Route>
        <Route exact path="/mygames">
          <MyGames setGameDeals={setGameDeals} gameDeals={gameDeals} setInterestedGames={setInterestedGames} userGames={userGames} setUserGames={setUserGames} interestedGames={interestedGames} currentGamer={currentGamer}/>
        </Route>
        <Route exact path="/search">
          <Search setInterestedGames={setInterestedGames} interestedGames={interestedGames} userGames={userGames} setUserGames={setUserGames} currentGamer={currentGamer}/>
        </Route>
        <Route exact path="/signup">
          <Signup setCurrentGamer={setCurrentGamer} />
        </Route>
        <Route exact path="/deals">
          <Deals setGameDeals={setGameDeals} gameDeals={gameDeals} />
        </Route>
        <Route exact path="/">
          <Home currentGamer={currentGamer} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
