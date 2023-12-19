import {NextUIProvider, createTheme} from "@nextui-org/react";

import './App.css';
import {useState, useEffect} from "react";
import NavBar from "./components/NavBar";
import Main from "./components/Main";

const lightTheme = createTheme({
  type: 'light',
  theme: {
   colors:{
    error:'#dc3545',
    secondary:'#f0f2f5',
   }
  },
  
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors:{
      error:'#dc3545',
      secondary:'#171818',
    }
  }
})

function App() {
  const [isDark, setIsDark] = useState()

  useEffect(() => {
    const getIsDark = localStorage.getItem('isDark')
    
    if(getIsDark===null){
      setIsDark(false)
    }else if(getIsDark==='true'){
      setIsDark(true)
    }else if(getIsDark==='false'){
      setIsDark(false)
    }
    
    
  })

  return (
    <NextUIProvider theme={isDark === true ? darkTheme : lightTheme}>
      <div className="app">
        <header className="app-header">
          <NavBar isDark={isDark} onThemeToggle={()=>setIsDark(!isDark)}/>
        </header>
        <main className='app-body'>
          <Main isDark={isDark}/>
        </main>
        <footer className='app-footer'>

        </footer>
      </div>
    </NextUIProvider>
    
  );
}

export default App;
