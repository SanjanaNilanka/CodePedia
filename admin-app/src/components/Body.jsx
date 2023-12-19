import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from './body-components/Dashboard'
import Challenges from './body-components/challenges-components/Challenges'
import Tutorials from './body-components/tutorial-components/Tutorials'
import Error404Page from './body-components/Error404Page'
import FormElements from './test-components/FormElements'
import AddNewChallenge from './body-components/challenges-components/AddNewChallenge'
import AddTutorial from './body-components/tutorial-components/AddTutorial'
import DisplayTutorials from './body-components/tutorial-components/DisplayTutorials'
import Test from './body-components/tutorial-components/Test'
import UpdateTutorial from './body-components/tutorial-components/UpdateTutorial'
import Register from './body-components/login-register-components/Register'
import Login from './body-components/login-register-components/Login'
import ViewUsers from './body-components/Admin-dashboard-components/ViewUsers'


export default function Body({ isDark }) {
  return (
    <div className={`scrollable-container ${isDark? 'scrollable-container-dark' : 'scrollable-container-light light'}`}>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
     

          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/viewusers' element={<ViewUsers/>}/>
          <Route path='/tutorials' element={<Tutorials isDark={isDark}/>}/>
          <Route path='/challenges' element={<Challenges isDark={isDark}/>}/>
          <Route path='/challenges/addNewChallenge' element={<AddNewChallenge isDark={isDark}/>}/>
          <Route path='/tutorials/add-new' element={<AddTutorial isDark={isDark}/>}/>
          <Route path='/tutorials/display/all' element={<DisplayTutorials isDark={isDark}/>}/>
          <Route path='/tutorials/update/:id' element={<UpdateTutorial isDark={isDark}/>}/>
          <Route path='/:name' element={<Error404Page/>}/>
          <Route path='/formElements' element={<FormElements isDark={isDark}/>}/>
          <Route path='/test' element={<Test isDark={isDark}/>}/>
        </Routes>
    </div>
  );

}
 