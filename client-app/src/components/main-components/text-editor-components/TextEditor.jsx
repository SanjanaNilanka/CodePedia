import React, {useRef, useEffect, useState} from 'react'
import './TextEditor.css'
import { Icon } from '@iconify/react';
import {Button, Text, Switch, Tooltip, Link, Spacer} from '@nextui-org/react'
import ReactModal from 'react-modal'
import axios from 'axios'

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-java'; // Import the mode for Java
import 'ace-builds/src-noconflict/theme-monokai'; // Import a theme
import 'ace-builds/src-noconflict/theme-chrome'; // Import a theme
import 'ace-builds/src-noconflict/theme-github'; // Import a theme
import 'ace-builds/src-noconflict/theme-github_dark'; // Import a theme
import 'ace-builds/src-noconflict/theme-xcode'; // Import a theme
import 'ace-builds/src-noconflict/theme-gruvbox_dark_hard'; // Import a theme
import 'ace-builds/src-noconflict/theme-gruvbox_light_hard'; // Import a theme
import ToastMsg from '../ToastMsg';


export default function TextEditor({isDark}) {
  const [editor, setEditor] = useState(null);

  const [codeTitle, setCodeTitle] = useState('Untitled')
  const [isTitleEditable, setIsTitleEditable] = useState(false)

  const [output, setOutput] = useState('')

  const [runResult, setRunResult] = useState([])

  const [javaCode, setJavaCode] = useState(`public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`)

  const [isVisualDebugger, setIsVisualDebugger] = useState(false)

  const [isFileCreated, setIsFileCreated] = useState(false)

  const [isOpenAddWatch, setIsOpenAddWatch] = useState(false)

  const [addWatchist, setAddWatchList] = useState([''])
  
  const [isAddWatchList, setIsAddWatchList] = useState(false)

  const handleInputFocus = (e) => {
    e.target.parentNode.classList.add('active-label')
  }

  const handleInputBlur = (e) => {
    if (e.target.value === '') {
        e.target.parentNode.classList.remove('active-label')
    }
  }

  const submitAddWatch = () => {

  }

  // Function to compile Java code
  const compileCode = () => {
    // Send the 'javaCode' to your server for compilation and error checking
    // Handle the compilation result and display error messages
    // You can use Axios or Fetch API to make a POST request to your server
    // Example:
    /*
    axios.post('/compile', { javaCode })
      .then((response) => {
        // Handle the compilation result here
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
    */
  }

  const addVariable = () => {
    setAddWatchList([...addWatchist, '']);
  }

  const removeVariable = (index) => {
    const updatedVariable = addWatchist.filter((_, i) => i !== index);
    setAddWatchList(updatedVariable);
  }

  const updateVariable = (index, value) => {
    const updatedVariable = [...addWatchist];
    updatedVariable[index] = value;
    setAddWatchList(updatedVariable);
  }

  const handleDownload = () => {
    const a = document.createElement('a')
    a.href = runResult.filePath
    a.download = `${className}.java`

    a.click()
    document.body.removeChild(a)
  }

  const [className, setClassName] = useState('')

  const handleSubmitRun = async () => {
    const classNameRegex = /public class (\w+) \{/
    const match = javaCode.match(classNameRegex)
    

    if (match && match.length >= 2) {
      setClassName(match[1])
      setOutput(match[1])
    } else {
      setClassName('No class with a main method found.')
    }

    const data = {
      code:javaCode,
      className:match[1]
    }

    /*await axios.post('http://localhost:5000/compiler/run',data).then((res)=>{
      if(res.data.success){
          setRunResult(res.data)
          setIsFileCreated(false)
          setIsFileCreated(true)
      }
    }).catch((res)=>{
      setRunResult(res.data.error)
    })*/

    try {
      const res = await axios.post('http://localhost:5000/compiler/run', data);
    
      if (res.data.success) {
        setRunResult(res.data);
        setIsFileCreated(false);
        setIsFileCreated(true);
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a non-2xx status code
        console.error('Server responded with an error:', error.response.data);
        setRunResult(error.response.data.error); // Set the error message in state
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received from the server');
      } else {
        // Something happened in setting up the request that triggered an error
        console.error('Request setup error:', error.message);
      }
    }
  }

  return (
    <div style={{overflowY:'hidden'}}>
      <div className='text-editor-header'>
        <div style={{fontSize:'20px', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
        <i class="fa-solid fa-xmark close"></i>
        {isTitleEditable && 
          <span>
            &nbsp;&nbsp;&nbsp;
              <input
                style={{backgroundColor:'transparent', border:'none', minWidth:'100px'}}
              >
                
              </input>
            &nbsp;&nbsp;&nbsp;
          </span>
        }
        {!isTitleEditable&&<span>&nbsp;&nbsp;&nbsp;{codeTitle}&nbsp;&nbsp;&nbsp;</span>}
        <Icon onClick={()=>{setIsTitleEditable(true)}} icon="material-symbols:edit" />
        </div>
        <div style={{fontSize:'20px', display:'flex', justifyContent:'space-between', alignItems:'center', width:'500px'}}>
          <div style={{fontSize:'20px', display:'flex', justifyContent:'space-between', alignItems:'center', width:'150px'}}>
            <Text css={{fontWeight:'$semibold'}}>Visual Debugger</Text>       
            <Switch size={'xs'} onChange={()=>{setIsVisualDebugger(!isVisualDebugger)}}/>
          </div>
          <Button auto>
          <Icon width={20} icon="material-symbols:save-outline" />&nbsp;Save
          </Button>
          <Button auto onPress={handleDownload}>
          <Icon width={20} icon="material-symbols:download" />&nbsp;Download
          </Button>
          <Button auto onPress={handleSubmitRun}>
          <Icon width={20} icon="carbon:run-mirror" />&nbsp;Run
          </Button>
        </div>
      </div>
      <div className={`center ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', height:'77vh'}}>
        <AceEditor
          mode="java" // Set the mode to Java
          theme={`${isDark? 'monokai':'xcode'}`} // Set the theme
          name="code-editor"
          editorProps={{ $blockScrolling: true }}
          value={javaCode}
          onChange={newValue => {
              console.log('Code changed:', newValue);
              setJavaCode(newValue)
              // You can handle code changes here
          }}
          fontSize={15}
          
          style={{ width: '50%', height: '100%', backgroundColor:'transparent'}} // Set the editor's dimensions
        />
        <div style={{width:'50%',height:'100%'}}>
          <div className='compiler' style={isVisualDebugger?{height:'50%'}:{height:'100%'}}>
            <div style={{display:'flex', alignItems:'center', fontSize:'20px',borderBottom:'solid 1px', padding:'3px'}}>
              <Icon width={25} icon="fluent:window-console-20-filled" />&nbsp;Console
            </div>
            <div style={{padding:'5px 10px', fontSize:'13px'}}>
              {output} [JavaApplication] {runResult.filePath}<br/>              
            </div>
            <div style={{padding:'5px 10px'}}>
              {runResult.success&&<pre>{runResult.output}</pre>}
              {runResult.success !== true && <pre>{runResult.stderr}</pre>}
              
            </div>
            
          </div>
          {isVisualDebugger && 
            <div className='visual-debugger-container'>
              <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', fontSize:'20px',borderBottom:'solid 1px', padding:'3px'}}>
                <div style={{display:'flex', alignItems:'center', fontSize:'20px'}}>
                  <Icon width={25} icon="codicon:debug-console" />&nbsp;Visual Debugger
                </div>
                <div style={{display:'flex', alignItems:'center',justifyContent:'space-between', fontSize:'20px'}}>
                  <Tooltip
                    content="Start"
                    placement="bottom"
                  >
                    <Icon style={{cursor:'pointer'}} width={30} icon="mdi:play" />&nbsp;&nbsp;
                  </Tooltip>
                  <Tooltip
                    content="Add Watch"
                    placement="bottom"
                  >
                    <Icon 
                      style={{cursor:'pointer'}} 
                      width={30} 
                      icon="mdi:plus" 
                      onClick={()=>{setIsOpenAddWatch(true)}}
                    />&nbsp;&nbsp;
                  </Tooltip>
                  <Tooltip
                    content="Stop"
                    placement="bottom"
                  >
                    <Icon 
                      style={{cursor:'pointer'}} 
                      width={30} 
                      icon="material-symbols:stop" 
                    />&nbsp;&nbsp;
                  </Tooltip>
                  <Tooltip
                    content="Prev Line"
                    placement="bottom"
                  >
                    <Icon style={{cursor:'pointer'}} width={30} icon="mdi:skip-backward" />&nbsp;&nbsp;
                  </Tooltip>
                  <Tooltip
                    content="Pause"
                    placement="bottom"
                  >
                    <Icon style={{cursor:'pointer'}} width={30} icon="material-symbols:pause" />&nbsp;&nbsp;
                  </Tooltip>
                  <Tooltip
                    content="Next Line"
                    placement="bottom"
                  >
                    <Icon style={{cursor:'pointer'}} width={30} icon="mdi:skip-forward" />&nbsp;&nbsp;
                  </Tooltip>
                </div>
              </div>
              <div style={{display:'flex', justifyContent:'space-between', height:'100%'}}>
                <div style={{width:'74%'}}>a</div>
                <div style={{width:'25%', height:'100%',borderLeft:'1px solid', padding:'5px'}}>
                  {addWatchist.map((variable, index)=>(
                    <div>
                      {variable}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          }
        </div>
        {isFileCreated && <ToastMsg 
          toastMsg={`${className}.java file is created and compile successfully`} 
          isDark={isDark}
        />}
        
      </div>
      <ReactModal 
        isOpen={isOpenAddWatch} 
        shouldCloseOnEsc = {()=>{setIsOpenAddWatch(false); setAddWatchList([''])}}
        onRequestClose={()=>{setIsOpenAddWatch(false); setAddWatchList([''])}}
        style={{
          content:{
            width:'30%',
            height:'70%',
            zIndex:'6',
            margin:'auto',
            backgroundColor:`${isDark?'#1f1f1f':'#f0f2f5'}`,
            borderRadius:'20px',
            padding:'10px 20px',
            border:'none',
            animation:'zoom-in 0.3s ease-out'
          }, 
          overlay:{
            zIndex:'5'
          }
        }}
      >
        <div className='popup-title' >Add Watch<i onClick={() => {setIsOpenAddWatch(false); setAddWatchList([''])}} class="fa-solid fa-xmark close"></i></div>
        <div style={{height:'70%', paddingRight:'5px', marginBottom:'12px'}} className={` scrollable-container ${isDark? 'scrollable-container-dark' : 'scrollable-container-light'}`}>
          {addWatchist.map((variable, variableIndex)=>(
            <div>
              <div className="input-container" style={{marginTop:"0px"}}>
                <input
                    className='primary-form-element'
                    type="text"
                    id={`subSection_${variableIndex}_title`}
                    value={variable}
                    onChange={(e) => updateVariable(variableIndex, e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    required
                />
                <label className={`primary-form-element ${isDark? 'dark':'light'}`} htmlFor={`subSection_${variableIndex}_title`}>Variable {variableIndex+1}</label>
              </div>
              {variableIndex+1 !== addWatchist.length && <Spacer/>}
            </div>
            
          ))}
          <Link 
            css={{display:'flex', alignItems:'center'}}
            onClick={addVariable}
          >
            <Icon width={18} icon="mdi:plus"/> Add Varable
          </Link>
        </div>
        <div>
          <Button onPress={submitAddWatch}>Add</Button>
        </div>
      </ReactModal>
    </div>
  )
}