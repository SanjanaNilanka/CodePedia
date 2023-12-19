import React, {useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import LandingPage from './main-components/landing-components/LandingPage'
import './Main.css'
import TextEditor from './main-components/text-editor-components/TextEditor'
import TutorialHome from './main-components/tutorial-components/TutorialHome'
import ChallengesHome from './main-components/challengers-components/ChallengesHome'
import ChallengeDetails from './main-components/challengers-components/ChallengeDetails'
import AttemptChallenge from './main-components/challengers-components/AttemptChallenge'
import Leaderboard from './main-components/challengers-components/Leaderboard'
import Error404Page from './main-components/Error404Page'
import DisplayTutorials from './main-components/tutorial-components/DisplayTutorials'
import SelectedTutorial from './main-components/tutorial-components/SelectedTutorial'
import Dashboard from './main-components/dashboard-components/Dashboard'
import Register from './main-components/login-register-components/Register'
import Login from './main-components/login-register-components/Login'
import ProtectedRoute from './main-components/login-register-components/ProtectedRoute'
import Userprofile from './main-components/user-profile-components/Userprofile'
export default function Main({isDark}) {

  const [isLogin, setIsLogin] = useState(true)

  return (
    <div  className={`main scrollable-container ${isDark? 'scrollable-container-dark' : 'scrollable-container-light'}`}>
      {isLogin &&
        <Routes>
          <Route path='/register' element={<Register isDark={isDark}/>}/>
          <Route path='/login' element={<Login isDark={isDark}/>}/>
          <Route path="/" element={<LandingPage />} />
          {/* Protected Route for Dashboard */}
          <Route path="/dashboard" exact element={<Dashboard isDark={isDark}/> }/>
          {/* <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} /> */}
          <Route path="/userprofile" exact element={ <Userprofile isDark={isDark}/>}/>
          <Route path='/textEditor' element={<TextEditor isDark={isDark}/>}/>
          
          <Route path='/tutorial/home' element={<TutorialHome isDark={isDark}/>}/>
          <Route path='/tutorial/learn/:name' element={<DisplayTutorials isDark={isDark}/>}/>
          <Route path='/tutorial/learn/:name/:id' element={<SelectedTutorial isDark={isDark}/>}/>

          <Route path='/challenges/home' element={<ChallengesHome isDark={isDark}/>}/>
          <Route path='/challenges/details/:challengeId' element={<ChallengeDetails isDark={isDark}/>}/>
          <Route path='/challenges/attemptChallenge/:challengeId/:title/:description/:timerDurationInMinutes' element={<AttemptChallenge isDark={isDark}/>}/>
          <Route path='/challenges/leaderboard/:title' element={<Leaderboard isDark={isDark}/>}/>


          <Route path='/:name' element={<Error404Page/>}/>
          <Route path='/:name/:name' element={<Error404Page/>}/>

        </Routes>
      }
      {!isLogin &&
        <Routes>
          
        </Routes>
      }
    </div>
  )
}
