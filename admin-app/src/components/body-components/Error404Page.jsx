import {Button, Spacer} from '@nextui-org/react'
import React from 'react'

export default function Error404Page() {
  return (
    <div style={{display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100%'}}>
        <h1 >
            <div style={{fontSize:'90px',textAlign:'center'}}>OOPS!</div>
            Error 404 : Page Not Found
        </h1>
        <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <Button  color="primary"  >
                Go Dashboard
            </Button>
            <Spacer/>
            <Button bordered color="primary"  >
                Report Problem
            </Button>
        </div>
        
    </div>
  )
}
