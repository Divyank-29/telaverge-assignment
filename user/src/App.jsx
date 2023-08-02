import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './component/userSignup';
import Signin from './component/userSignin';
import Appbar from './component/Appbar';
import LandingPage from './component/Landingpage';
import ShowCourse from './component/courses';
import ShowCourses from './component/coursespage';
import Content from './component/content';




function App () {
return (
  <div>
    <Router>
      <Appbar></Appbar>
      <Routes>
        <Route path = "/userSignup" element={<Signup/>}></Route>
        <Route path = "/userSignin" element={<Signin/>}></Route>
        <Route path='/' element = {<LandingPage/>} ></Route>
        <Route path = '/courses' element={ <ShowCourse /> } ></Route>
        <Route path = '/Boughtcourse' element= {<ShowCourses />} > </Route>
        <Route path = '/content/courseId' element={<Content/>} ></Route>
      </Routes>
    </Router>
  </div>
)
}


export default App;