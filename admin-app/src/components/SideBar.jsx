import React, {useEffect, useState} from 'react'
import './Components.css';
import { Icon } from '@iconify/react';
import {Badge, Button, Modal, Text} from '@nextui-org/react';
import {useLocation} from 'react-router-dom';

export default function SideBar({isDark}) {

  const[isLogoutOpen, setIsLogoutOpen] = useState(false)

  const location = useLocation()
  const [activeTab, setActiveTab] = useState('dashboard')

  useEffect(() => {
    const pathname = location.pathname
    if(pathname === '/dashboard' || pathname === '/'){
      setActiveTab('dashboard')
    }else if(pathname.startsWith('/tutorials')){
      setActiveTab('tutorials')
    }else if(pathname === '/quizzes'){
      setActiveTab('quizzes')
    }else if(pathname.startsWith('/challenges')){
      setActiveTab('challenges')
    }
  }, [location])

  return (
    <div className={`${isDark? 'dark' : ''}`}>
      <div className='sidebar-container'>
        <div className='logo-container'>
          <Badge disableOutline color='primary' content="Admin" size="xs" css={{zIndex:'0'}}>
            <h1 className='logo-text'>CodePedia</h1>
          </Badge>
        </div>
        <div className='navigation-tabs'>

          <a href='/dashboard'>
            <div 
              className={`tab ${activeTab === 'dashboard' ? 'active-tab' : ''}`}
              onClick={()=>setActiveTab('dashboard')}
            >
              <Icon height={20} icon="material-symbols:dashboard" />&nbsp; Dashboard
            </div>
          </a>

          <a href='/tutorials'>
            <div 
              className={`tab ${activeTab === 'tutorials' ? 'active-tab' : ''}`}
              onClick={()=>setActiveTab('tutorials')}
            >
              <Icon height={20} icon="fluent:learning-app-24-filled" />&nbsp; Tutorials
            </div>
          </a>
          
          <a href='/quizzes'>
            <div 
              className={`tab ${activeTab === 'quizzes' ? 'active-tab' : ''}`}
              onClick={()=>setActiveTab('quizzes')}
            >
              <Icon height={20} icon="material-symbols:quiz" />&nbsp; Quizzes
            </div>
          </a>
         
          <a href='/challenges'>
            <div 
              className={`tab ${activeTab === 'challenges' ? 'active-tab' : ''}`}
              onClick={()=>setActiveTab('challenges')}
            >
              <Icon height={20} icon="carbon:share-knowledge" />&nbsp; Challenges
            </div>
          </a>
          
          
        </div>
        
        <div style={{padding:'5px 15px'}}>
          <hr style={{marginBottom:'10px'}}/>
          <div className='tab'>
            <Icon height={20} icon="material-symbols:settings" />&nbsp; Settings
          </div>
           <div className='tab-danger' onClick={()=>setIsLogoutOpen(true)}>
            <Icon height={20} icon="material-symbols:logout" />&nbsp; Logout
          </div>
        </div>
        
      </div>
      <div className='icon-sidebar-container'>

      </div>
      
      <Modal 
         
        aria-labelledby='modal-title' 
        open={isLogoutOpen} 
        onClose={()=>setIsLogoutOpen(false)}
      >
        <Modal.Header>
          <h4 >Do you want to logout from the system?</h4>
          
        </Modal.Header>
        <Modal.Footer css={{display:'flex', justifyContent:'center'}}>
          <Button  color="primary" auto >
            No
          </Button>
          <Button  color="error" auto >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}
