/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './component/Login';
import Landing from "./component/Landing";
import CreateCourse from './component/CreateCourse';
import Register from './component/Register';
import ShowCourses from './component/ShowCourses';
import Appbar from './component/Appbar'
import  Course from './component/course';
import {RecoilRoot, useSetRecoilState} from 'recoil';
import { useEffect ,   } from 'react';
import { userState } from './store/atoms/user';
import axios from 'axios';

function App() {
    return (
      <RecoilRoot>
        <div>
            
        <Router>
        <Appbar/>
        <InitUser/>
            <Routes>

                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/Register" element={<RegisterPage />} />
                <Route path="/course/:courseId" element={<Course /> } />
                <Route path="/courses" element={<ShowCourses />} />
                <Route path={"/CreateCourse"} element = {<CreateCourse />} />
            </Routes>
        </Router>
        </div>
        </RecoilRoot>
    );
}

function RegisterPage() {
    return (
      <div style={{ backgroundColor: '#eeeeee'  }}>
        <Register />
      </div>
    );
  }

  function InitUser() {
    const setUser = useSetRecoilState(userState);
    const init = async() => {
        try {
            const response = await axios.get(`http://localhost:3000/admin/me`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })

            if (response.data.username) {
                setUser({
                    isLoading: false,
                    userEmail: response.data.username
                })
            } else {
                setUser({
                    isLoading: false,
                    userEmail: null
                })
            }
        } catch (e) {

            setUser({
                isLoading: false,
                userEmail: null
            })
        }
    };

    useEffect(() => {
        init();
    });

    return <></>
}


 

export default App;