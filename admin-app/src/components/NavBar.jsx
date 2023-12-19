import {Avatar, Navbar, Popover, Switch, Link} from '@nextui-org/react'
import React, {useEffect, useState} from 'react'
import { Icon } from '@iconify/react';

export default function NavBar({onTroggleTheme, isDark}) {

  const[username, setUsername] = useState('User')

  const handleDarkMode = () => {
    if(isDark){
      localStorage.setItem('isDark', 'false' )
    } else if(!isDark){
      localStorage.setItem('isDark', 'true' )
    }
  }

  const[timeOfDay, setTimeOfDay] = useState('')

  useEffect(() => {
    const currentHour = new Date().getHours()

    if(currentHour >= 5 && currentHour < 12){
      setTimeOfDay('Morning')
    } else if(currentHour >= 12 && currentHour < 17){
      setTimeOfDay('Afternoon')
    } else if(currentHour >= 17 && currentHour < 21){
      setTimeOfDay('Evening')
    } else {
      setTimeOfDay('Night')
    }
  })

  return (
    <div className={`${isDark? 'dark' : ''}`}>
      {/*<Navbar  css={{shadow:'none'}} isBordered >
        <Navbar.Brand css={{fontSize:'20px',fontWeight:'$semibold'}}>
          WelcomeBack! 👋
        </Navbar.Brand>
        <Navbar.Content>
            {isDark===true &&
              <Navbar.Link onClick={handleDarkMode}>
                <Icon onClick={onTroggleTheme} height={25} icon="ri:sun-fill" />
              </Navbar.Link>
            }
            {isDark===false &&
              <Navbar.Link onClick={handleDarkMode}>
                <Icon onClick={onTroggleTheme} height={25} icon="ri:moon-fill" />
              </Navbar.Link>
            }
          
          
          {/*<Popover placement='bottom-right'>
            <Popover.Trigger>
              <Icon height={25} icon="uil:setting" />
            </Popover.Trigger>
            <Popover.Content>
              <div style={{paddingTop:'5px'}}>
                <div className='setting-item'>
                  <span style={{fontWeight:'bold'}}>
                    Dark Mode
                  </span>
                  <span>
                    <Switch checked onChange={onTroggleTheme}/>
                  </span>
                </div>
                <div className='setting-item'>
                  <span style={{fontWeight:'bold'}}>
                    Dark Mode
                  </span>
                  <span>
                    <Switch />
                  </span>
                </div>
              </div>
            </Popover.Content>
          </Popover>}
          <Avatar
            size="lg"
            src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            color="primary"
            bordered
          />
        </Navbar.Content>
      </Navbar>*/}
      <nav className='navbar'>
        <div>
          <h4 style={{marginTop:'3px'}}>Good {timeOfDay}!&nbsp;{username}</h4>
        </div>
        <div className='navbar-content'>
          <div>
            {isDark &&
              <a onClick={handleDarkMode}>
                <Icon onClick={onTroggleTheme} height={25} icon="ri:sun-fill" />
              </a>
            }
            {!isDark  &&
              <a onClick={handleDarkMode}>
                <Icon onClick={onTroggleTheme} height={25} icon="ri:moon-fill" />
              </a>
            }
          </div>
          <div>
            <Avatar
              size="lg"
              src="data:image/png;base64,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"
              color="primary"
              bordered
              css={{zIndex:'0'}}
            />
          </div>
        </div>
        
      </nav>
    </div>
  )
}
