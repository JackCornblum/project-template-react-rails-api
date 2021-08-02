// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from "react-router"
import { useEffect, useState } from "react"
import NavBar from './Components/NavBar';
import Login from './Components/Login';
import MyGames from './Components/MyGames';
import { Navbar, Container, Nav } from "react-bootstrap"

function App() {
  const [currentGamer, setCurrentGamer] = useState([])
  const [userGames, setUserGames] = useState([])


// useEffect(() => {
//  fetch(`/getgames/${currentGamer.id}`)
//  .then(res => res.json())
//  .then(data => setUserGames(data))
// }, [currentGamer])

// useEffect(() => {

// }, [])

  return (
    <div className="App">
      <NavBar currentGamer={currentGamer}/>
    
      <Switch>
        <Route exact path="/login">
          <Login setCurrentGamer={setCurrentGamer} />
        </Route>
        <Route exact path="/mygames">
          <MyGames userGames={userGames} setUserGames={setUserGames}/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
