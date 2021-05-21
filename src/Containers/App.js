import React from 'react'
import Header from '../Components/Header'
import BottomNav from '../Components/BottomNav'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import Trending from '../Pages/Trending'
import Search from '../Pages/Search'
import Movies from '../Pages/Movies'
import Tvseries from '../Pages/Tvseries'
import ERROR from '../Pages/ERROR'
import MyWishList from '../Pages/MyWishList'
import {ThemeProvider} from '@material-ui/core/styles'
import theme from '../theme' 
import {WishlistProvider} from '../Context/Context'
function App() {
  return (
    <WishlistProvider>
    <ThemeProvider theme = {theme}>
      
  <div style={{scrollBehavior:"smooth",backgroundColor:"#333",minHeight:"100vh"}}>
      <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={Trending}/>
        <Route path="/trending" component={Trending}/>
        <Route path="/search" component = {Search}/>
        <Route path="/movies" component = {Movies}/>
        <Route path="/tv-series" component = {Tvseries}/>
        <Route path="/my-wishlist" component={MyWishList}/>
        <Route path="*" component = {ERROR}/>
      </Switch>
      <BottomNav/>
      </Router>

    </div>
    
    </ThemeProvider>
    </WishlistProvider>
  )
}

export default App
