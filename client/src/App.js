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

function App() {
  const [currentGamer, setCurrentGamer] = useState([])
  const [userGames, setUserGames] = useState([])
  const [interestedGames, setInterestedGames] = useState([])

  console.log(currentGamer)
  console.log(userGames)
 



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
          <MyGames userGames={userGames} setUserGames={setUserGames} interestedGames={interestedGames}/>
        </Route>
        <Route exact path="/search">
          <Search setInterestedGames={setInterestedGames} interestedGames={interestedGames} userGames={userGames} setUserGames={setUserGames} currentGamer={currentGamer}/>
        </Route>
        <Route exact path="/signup">
          <Signup setCurrentGamer={setCurrentGamer} />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
