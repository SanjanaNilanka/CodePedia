import React, {useState, useEffect} from 'react'
import './NavBar.css'
import {Avatar, Button, Popover, Spacer} from '@nextui-org/react'
import { Icon } from '@iconify/react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom';
export default function NavBar({onThemeToggle, isDark}) {
  const [isLog, setIsLog] = useState(false)

  const handleTheme = () => {
    if(isDark === true){
      localStorage.setItem('isDark','false')
    }
    else if(isDark === false){
      localStorage.setItem('isDark','true')
    }
  }

  const location = useLocation()
  const [activeTab, setActiveTab] = useState('')

  const token = localStorage.getItem('token')


  useEffect(() => {
    const pathname = location.pathname
    if(pathname.startsWith('/textEditor') ){
      setActiveTab('textEditor')
    }else if(pathname.startsWith('/tutorial')){
      setActiveTab('tutorial')
    }else if(pathname.startsWith('/quiz')){
      setActiveTab('quiz')
    }else if(pathname.startsWith('/challenges')){
      setActiveTab('challenges')
    }
  }, [location])

  return (
    <div className='navbar'>
      <div style={{paddingLeft:'25px'}}>
        <h1 className='logo-text'>CodePedia</h1>
      </div>
      <div className='navigation-tabs' > 
        <div className='navigation-tabs-container' >
          <a href='/textEditor'><span className={`navigation-tab ${activeTab === 'textEditor'? 'active-navigation-tab' : ''}`}>Online Compiler</span></a>
          <a href='/tutorial/home'><span className={`navigation-tab ${activeTab === 'tutorial'? 'active-navigation-tab' : ''}`}>Tutorials</span></a>
          <a href='/quiz/home'><span className={`navigation-tab ${activeTab === 'quiz'? 'active-navigation-tab' : ''}`}>Quizzes</span></a>
          <a href='/challenges/home'><span className={`navigation-tab ${activeTab === 'challenges'? 'active-navigation-tab' : ''}`}>Challenges</span></a>
        </div>
        <div>
          {isDark &&
            <a onClick={onThemeToggle} >
              <Icon onClick={handleTheme} style={{marginTop:'8px'}} height={25} icon="ph:sun-fill" />
            </a>
          }

          {!isDark &&
            <a onClick={onThemeToggle}>
              <Icon onClick={handleTheme} style={{marginTop:'8px'}} height={25} icon="ph:moon-fill" />
            </a>
          }
        </div>
        <div>
        <Link to="/profile">
          
        </Link>
        <Popover>
          <Popover.Trigger>
            <Avatar
              size="lg"
              src="data:image/png;base64,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"
              color="primary"
              bordered
              css={{cursor:'pointer'}}
            />
          </Popover.Trigger>
          <Popover.Content css={{backgroundColor:`${isDark?'':'#f0f2f5'}`}}>
            {(token === null || token === '') &&
            <div style={{padding:'20px'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <Avatar
                  size="md"
                  src="data:image/png;base64,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"
                  color="primary"
                  bordered
                />
                <div>
                  &nbsp;
                  &nbsp;
                </div>
                <div>
                  <span>Full Name</span>
                  <br/>
                  <span>fullname@gmail.com</span>
                </div>
              </div>
              
              <Spacer/>
              <Button css={{width:'100%'}}>Log in</Button>
              <Spacer/>
              <Button css={{width:'100%'}}>Register</Button>
            </div>
            }
            {(token !== null || token !== '') &&
            <div style={{padding:'20px'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <Avatar
                  size="md"
                  src="data:image/png;base64,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"
                  color="primary"
                  bordered
                />
                <div>
                  &nbsp;
                  &nbsp;
                </div>
                <div>
                  <span>Full Name</span>
                  <br/>
                  <span>fullname@gmail.com</span>
                </div>
              </div>
              
              <Spacer/>
              <Button css={{width:'100%'}}>Dashboard</Button>
            </div>
            }

          </Popover.Content>
        </Popover>
        
        </div>
      </div>
    </div>
  )
}
