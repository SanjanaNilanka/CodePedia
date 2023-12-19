import React, {useState} from 'react'
import { Icon } from '@iconify/react';
import '../tutorial-components/Tutorial.css'
import {Button, Card} from '@nextui-org/react'
import ReactModal from 'react-modal'

export default function TutorialHome({isDark}) {
  const [isStartLearningPopup, setIsStartLearningPopup] = useState(false)

  const [isFoundationsSelection, setIsFoundationsSelection] = useState(true)
  const [isIntermediateSelection, setIsIntermediateSelection] = useState(false)
  const [isAdvancedSelection, setIsAdvancedSelection] = useState(false)
  const [currentSection, setCurrentSection] = useState('Foundation')

  const searchKeys = [
    'Foundation Tutorial',
    'Intermediate Tutorial',
    'Advanced Tutorial',
    ''
  ]

  const toggleSelection = (section) => {
    if(section === 'foundations'){
      setIsFoundationsSelection(true)
      setIsIntermediateSelection(false)
      setIsAdvancedSelection(false)
      setCurrentSection('Foundation')
    }else if(section === 'intermediate'){
      setIsFoundationsSelection(false)
      setIsIntermediateSelection(true)
      setIsAdvancedSelection(false)
      setCurrentSection('Intermediate')
    }else if(section === 'advanced'){
      setIsFoundationsSelection(false)
      setIsIntermediateSelection(false)
      setIsAdvancedSelection(true)
      setCurrentSection('Advanced')
    }
  }

  return (
    <div className='tutorial-home'>
        <h1 style={{textAlign:'center', fontWeight:'900', fontSize:'70px', marginTop:'50px'}}>Learn Java in Easy Way</h1>

        <div className='search-container'>
          <input className='search' placeholder='Search Java Tutorials...' />
          <button className='search'><i class="fa-solid fa-magnifying-glass"></i></button>
        </div>

        <div className='code-example-container'>
          <div className={`code-ex-code ${isDark? 'dark' : 'light'}`}>
            <span style={{color:'#4a9cd6'}}>public class</span><span style={{color:'#3bc9b0'}}> Main</span> &#123; <br/>
            &emsp;&emsp;<span style={{color:'#4a9cd6'}}>public static</span><span style={{color:'#3bc9b0'}}> void</span><span style={{color:'#dcb862'}}> main</span>(<span style={{color:'#3bc9b0'}}>String</span>[] <span style={{color:'#95d1f1'}}>args</span>) &#123; <br/>
            &emsp;&emsp;&emsp;&emsp;<span style={{color:'#3bc9b0'}}>System</span>.<span style={{color:'#4a9cd6'}}>out</span>.<span style={{color:'#dcb862'}}>println</span>(<span style={{color:'#c3602d'}}>"Welcome to CodePedia's TutorialHub"</span>); <br/>
            &emsp;&emsp; &#125; <br/>
            &#125;
          </div>
          <div className='code-ex-output'>
            
          </div>
        </div>
        <div style={{marginTop:'50px'}}>
          <Button onClick={() => setIsStartLearningPopup(true)} css={{zIndex:'0'}}>
            Start Learning
          </Button>
        </div>
        <ReactModal className={`popup ${isDark? 'dark-popup' : 'light-popup'}`} isOpen={isStartLearningPopup} onRequestClose={() => setIsStartLearningPopup(false)}>
          <div className='popup-title'>What are You Looking for?<i onClick={() => setIsStartLearningPopup(false)} class="fa-solid fa-xmark close"></i></div>
          <div style={{}} className='center'>
            <div 
              style={{width:'33%'}} 
              className={`section-selection-tab ${isFoundationsSelection? 'section-selection-tab-active' : ''}`} 
              onClick={() => toggleSelection('foundations')}
            >
              Foundations
            </div>
            <div 
              style={{width:'33%'}}
              className={`section-selection-tab ${isIntermediateSelection? 'section-selection-tab-active' : ''}`} 
              onClick={() => toggleSelection('intermediate')}
            >
              Intermediate
            </div>
            <div 
              style={{width:'33%'}}
              className={`section-selection-tab ${isAdvancedSelection? 'section-selection-tab-active' : ''}`} 
              onClick={() => toggleSelection('advanced')}
            >
              Advanced
            </div>
          </div>
          {isFoundationsSelection &&
            <div className='section-selection-tab-container' style={{borderTopLeftRadius:'0'}}>
              test Foundations
            </div>
          }
          {isIntermediateSelection &&
            <div className='section-selection-tab-container'>
              test Intermediate
            </div> 
          }
          {isAdvancedSelection &&
            <div className='section-selection-tab-container' style={{borderTopRightRadius:'0'}}>
              test Advanced
            </div>
          }
          
          <div className='center' style={{justifyContent:'center', marginTop:'20px'}}>
            <a href={`/tutorial/learn/${currentSection}`}>
              <Button>Start</Button>
            </a>
            
          </div>
          
          
        </ReactModal>
    </div>
  )
}
