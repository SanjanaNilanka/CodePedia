import React, {useEffect, useState} from 'react'
import './Tutorials.css';
import {Card, Text, Button, Spacer, Link} from '@nextui-org/react';
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import ReactModal from 'react-modal'


export default function Tutorials({isDark}) {

  const[isReportOpen, setIsReportOpen] = useState(false)
  const [backgroundColor, setBackgroundColor] = useState('')

  useEffect(()=>{
    if(isDark==='true'){
      setBackgroundColor('#16181a')
    }else if(isDark==='false'){
      setBackgroundColor('#fff')
    }
  },[backgroundColor])

  const handleInputFocus = (e) => {
    e.target.parentNode.classList.add('active-label')
  }

  const handleInputBlur = (e) => {
    if (e.target.value === '') {
      e.target.parentNode.classList.remove('active-label')
    }
  }

  const [foundationTutorials, setFoundationTutorials] = useState([])
  const [intermediateTutorials, setIntermediateTutorials] = useState([])
  const [advancedTutorials, setAdvancedTutorials] = useState([])
  const [allTutorials, setAllTutorials] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:5000/admin/tutorials/getAllTutorials").then((res)=>{
            if(res.data.success){
                setAllTutorials(res.data.tutorials)
            }
        })
    },[])


  useEffect(()=>{
    axios.get(`http://localhost:5000/admin/tutorials/getSelectedTutorials/category?category=Foundation`).then((res)=>{
        if(res.data.success){
          setFoundationTutorials(res.data.tutorials)
        }
    })
    
    axios.get(`http://localhost:5000/admin/tutorials/getSelectedTutorials/category?category=Intermediate`).then((res)=>{
        if(res.data.success){
          setIntermediateTutorials(res.data.tutorials)
        }
    })
    
    axios.get(`http://localhost:5000/admin/tutorials/getSelectedTutorials/category?category=Advanced`).then((res)=>{
        if(res.data.success){
          setAdvancedTutorials(res.data.tutorials)
        }
    })
  },[])

  

  const generateReport = () => {
    const pdf = new jsPDF()
    const columns = [];
    for (let i = 0; i < 4; i++) {
      columns.push({ header: `Column ${i+1}`, dataKey: `col${i}` });
    }
    
    pdf.setFontSize("20")
    pdf.setTextColor("black")
    pdf.text("CodePedia Learning Platform",64, 20)
    pdf.setFontSize("15")
    pdf.setTextColor("black")
    pdf.text("Current Details of TutorialHub",76, 26)
    
    pdf.setFontSize("12")
    pdf.setTextColor("black")
    pdf.text("Currently Available Tutorials Count",14, 36)

    pdf.setFontSize("10")
    pdf.setTextColor("black")
    pdf.text(`All Tutorial: ${allTutorials.length}`,14, 42)
    pdf.text(`Foundation Tutorial: ${foundationTutorials.length}`,14, 46)
    pdf.text(`Intermediate Tutorial: ${intermediateTutorials.length}`,14, 50)
    pdf.text(`Advanced Tutorial: ${advancedTutorials.length}`,14, 54)
    
    pdf.setFontSize("12")
    pdf.setTextColor("black")
    pdf.text("Currently Available Tutorials",14, 60)

    const conPenTable = document.getElementById('tutorials')
    const {height, width} = conPenTable.getBoundingClientRect()
    const scaleFactor1 = pdf.internal.pageSize.width / width
    pdf.autoTable({
      html: '#tutorials',
      startY: 62,
      theme: 'grid',
      margin: { top: 20, bottom: 20,  },
      tableWidth: 540 * scaleFactor1,
      columnStyles: {
      0: { fontStyle: 'bold' },
      },
      scaleFactor: scaleFactor1,
      
  })
    


    pdf.save("Current Report of Tutorial Hub.pdf")
  }

  return (
    <div>
      <section>
        <Card css={{padding:'10px 15px' }}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <Text size={20} css={{fontWeight:'$bold'}}>
              Tutorials Management System
            </Text>
            <a onClick={()=>{setIsReportOpen(true)}}>
              Current Report
            </a>
          </div>
        </Card>
      </section>

      <section className='tutorials-section1'>
        <Card className='card' css={{fontSize:'$2xl', fontWeight:'$bold', color:'rgb(0, 114, 245)',textAlign:'center'}}>
          All Tutorails
          <br/>
          {allTutorials.length}
        </Card>
        <Card className='card' css={{fontSize:'$2xl', fontWeight:'$bold' }}>
          <div style={{display:'flex',alignItems:'center',padding:'0px 10px'}}>
            <span style={{color:'rgb(0, 114, 245)'}}>Foundational Tutorails</span>
            <span>{foundationTutorials.length}</span>
          </div>
        </Card>
        <Card className='card' css={{fontSize:'$2xl', fontWeight:'$bold' }}>
          <div style={{display:'flex',alignItems:'center',padding:'0px 10px'}}>
            <span style={{color:'rgb(0, 114, 245)'}}>Intermediate Tutorails</span>
            <span>{intermediateTutorials.length}</span>
          </div>
        </Card>
        <Card className='card' css={{fontSize:'$2xl', fontWeight:'$bold' }}>
          <div style={{display:'flex',alignItems:'center',padding:'0px 10px'}}>
            <span style={{color:'rgb(0, 114, 245)'}}>Advanced Tutorails</span>
            <span>{advancedTutorials.length}</span>
          </div>
        </Card>
        
        
      </section>

      <section className='tutorials-section2'>
        <section style={{width:'60.35vw', height:'50vh'}}>
          <Card css={{padding:'15px 15px',height:'100%'}}>
            <Text h4>Recently Added Tutorials</Text>
            <Spacer y={0.5}/>
            <section className='tutorials-section1' style={{marginTop:'0'}}>
              {allTutorials.map((tute, index)=>(
                <div style={{height:'100%'}}>
                  <Card style={{width:'180px', height:'90%', padding:'20px', backgroundColor:'rgb(0, 114, 245,0.15)'}}>
                    <Text h5 css={{textAlign:'center'}}>{tute.tutorial_title}</Text>
                   
                    <Spacer/>
                    {tute.tutorial_about.substring(0, 92)}...
                  </Card>
                <Spacer/>
                </div>
              ))}
            </section>
            
            
          </Card>
        </section>
        <section style={{width:'19vw', height:'50vh'}}>
          <Card css={{padding:'15px 15px',height:'100%'}}>
            <a href='/tutorials/add-new' >
              <Button bordered color="primary" css={{width:'100%'}}>
                Add New Tutorial
              </Button>
            </a>
            <Spacer y={1}/>
            <a href='/tutorials/display/all' >
              <Button bordered color="primary" css={{width:'100%'}}>
                Display All Tutorials
              </Button>
            </a>
            <Spacer y={1}/>
            <Button bordered color="primary" disabled >
              Disabled
            </Button>
            <Spacer/>
            <Button bordered color="primary" disabled >
            Disabled
            </Button>
            <Spacer/>
            <Button bordered color="primary"  disabled>
            Disabled
            </Button>
          </Card>
        </section>
      </section>
      <ReactModal 
        isOpen={isReportOpen}
        onRequestClose={()=>{setIsReportOpen(false)}}
        style={{
          content:{
            width:'50%',
            height:'70%',
            zIndex:'6',
            margin:'auto',
            backgroundColor:`${isDark?'#1f1f1f':'#f0f2f5'}`,
            borderRadius:'20px',
            padding:'20px 20px',
            border:'none',
            animation:'zoom-in 0.3s ease-out'
          }, 
          overlay:{
            zIndex:'5'
          }
        }}
      >
        <div style={{textAlign:'center'}}>
        <h2>CodePedia Learning Platform</h2>
        <h3>Current Details of TutorialHub</h3>
        <Spacer y={1.5}/>
        <div style={{textAlign:'left'}}>
        <h4>Currently Available Tutorials Counts</h4>
          All tutorials: {allTutorials.length}<br/>
          Foundation tutorials: {foundationTutorials.length}<br/>
          Intermediate tutorials: {intermediateTutorials.length}<br/>
          Advanced tutorials: {advancedTutorials.length}<br/><br/>
          <h4>Currently Available Tutorials</h4>
        </div>
        
        
          <table id='tutorials' style={{textAlign:'left'}}>
            <thead>
              <tr >
              <th style={{ backgroundColor:'#1abd9c', border:'solid 0.5px #1abd9c'}}>Title</th>
              <th style={{ backgroundColor:'#1abd9c', border:'solid 0.5px #1abd9c'}}>Category</th>
              <th style={{ backgroundColor:'#1abd9c', border:'solid 0.5px #1abd9c'}}>Section Count</th>
              <th style={{ backgroundColor:'#1abd9c', border:'solid 0.5px #1abd9c'}}>Estimated Time</th>
            </tr>
            </thead>
            <tbody>
              {allTutorials.map((tute, index)=>(
                <tr>
                  <td>{tute.tutorial_title}</td>
                  <td>{tute.tutorial_category}</td>
                  <td>{tute.tutorial_sections_count}</td>
                  <td>{tute.tutorial_estimated_time}</td>
                </tr>
              ))}
            </tbody>
            
          </table>
          <div style={{display:"flex",alignItems:'center', justifyContent:'center'}}>
            <Button onClick={generateReport}>Download</Button>
          </div>
          
          </div>
      </ReactModal>
      
      
    </div>
  )
}
