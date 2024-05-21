import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './component/userSignup';
import Signin from './component/userSignin';
import Appbar from './component/Appbar';
import LandingPage from './component/Landingpage';
import SearchResultPage from './component/searchResults';
import ShowProduct from './component/product';
import ShowProducts from './component/cart';




function App () {
return (
  <div>
    <Router>
      <Appbar></Appbar>
      <Routes>
        <Route path = "/userSignup" element={<Signup/>}></Route>
        <Route path = "/userSignin" element={<Signin/>}></Route>
        <Route path='/' element = {<LandingPage/>} ></Route>
        <Route path = '/product' element={ <ShowProduct /> } ></Route>
        <Route path = '/cart' element= {<ShowProducts />} > </Route>
        <Route path="/search-results" element = {<SearchResultPage />}  />
        
      </Routes>
    </Router>
  </div>
)
}


export default App;