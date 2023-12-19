import React from 'react'
import {useEffect} from 'react'
import {useState} from 'react'
import axios from 'axios'
import {Button, Loading, Avatar, Spacer} from '@nextui-org/react'
import ReactModal from 'react-modal'
import { Icon } from '@iconify/react';
import '../tutorial-components/Tutorial.css'
import {message} from 'antd'


export default function DisplayTutorials({isDark}) {
    const pathname = window.location.pathname
    const pathnameParts = pathname.split('/')
    const tutorialCategory = pathnameParts[pathnameParts.length-1]

    const token = localStorage.getItem('AuthToken')

    const [tutorials, setTutorials] = useState([])
    const [selectedTutorial, setSelectedTutorial] = useState([])

    const [isTutorialPopup, setIsTutorialPopup] = useState(false)
    const [selectedTutorialID, setSelectedTutorialID] = useState('')
    const [selectedTutorialIndex, setSelectedTutorialIndex] = useState('')

    useEffect(()=>{
        axios.get(`http://localhost:5000/admin/tutorials/getSelectedTutorials/category?category=${tutorialCategory}`).then((res)=>{
            if(res.data.success){
                setTutorials(res.data.tutorials)
            }
        })
    },[])
    
    useEffect(()=>{
        if(selectedTutorialID !== ''){
            axios.get(`http://localhost:5000/admin/tutorials/getSelectedTutorial/${selectedTutorialID}`).then((res)=>{
                if(res.data.success){
                    setSelectedTutorial(res.data.tutorials)
                }
            })
        }
        
    },[])

    const [searchQuery, setSearchQuery] = useState('')

    const search = () => {
        axios.get(`http://localhost:5000/admin/tutorials/getSearchedTutorials/category?category=${tutorialCategory}&key${searchQuery}`).then((res)=>{
            if(res.data.success){
                setTutorials(res.data.tutorials)
            }
        })
    }

    const submitStartTutorial = () => {
        if(token === null || token === ''){
            message.error('Sign in or sign up to start tutorial')
        }else{
            window.location.href = `${tutorialCategory}/${selectedTutorialID}`
        }
    }

    return (
        <div >
            <section>
                <h1 style={{textAlign:'center', fontWeight:'900', fontSize:'', marginTop:'30px'}}>{tutorialCategory} Tutorials</h1>
                <div className='center' style={{justifyContent:'center', marginTop:'20px'}}>
                    <div className='search-container'>
                        <input 
                            className='search'
                            style={{width:''}} 
                            placeholder={`Search ${tutorialCategory} Tutorials...`}
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value)
                                search()
                            }} 
                        />
                        <button className='search'><i class="fa-solid fa-magnifying-glass"></i></button>
                    </div>
                </div>
                
            </section>
            <section >
                {tutorials.length === 0? (
                    <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'70vh'}}>
                        <Loading size="xl" />
                    </div>
                ):(
                    <div className='tutorial-card-container'>
                        {tutorials.map((results, index) => (
                            <div 
                                className={`tutorial-card ${isDark? 'dark':'light'}`}
                                onClick={() => {
                                    setIsTutorialPopup(true)
                                    setSelectedTutorialID(results._id)
                                    setSelectedTutorialIndex(index)
                                }}
                            >
                                <img style={{width:'100px'}} src='/img/tutorial-logo.png' alt='tutorial'/>
                                <h2>{results.tutorial_title}</h2>
                                <h4 style={{fontFamily:'Play'}}>
                                    {results.tutorial_about}
                                </h4>
                                
                            </div>
                        ))}
                    </div>
                ) }
                
            </section>
            <ReactModal 
                isOpen={isTutorialPopup} 
                shouldCloseOnEsc = {()=>{setIsTutorialPopup(false)}}
                onRequestClose={()=>{setIsTutorialPopup(false)}}
                style={{
                content:{
                    width:'50%',
                    height:'80%',
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
                {tutorials[selectedTutorialIndex]? (
                    <div>
                        <div className='popup-title'>
                            {tutorials[selectedTutorialIndex].tutorial_title}
                            <i onClick={() => setIsTutorialPopup(false)} class="fa-solid fa-xmark close"></i>
                        </div>
                        <div 
                            style={{textAlign:'justify', height:'100px', paddingRight:'5px', marginBottom:'12px'}}
                            className={` scrollable-container ${isDark? 'scrollable-container-dark' : 'scrollable-container-light'}`}
                        >
                            <h4 style={{fontFamily:'Play'}}>
                                {tutorials[selectedTutorialIndex].tutorial_about}
                            </h4>
                            
                        </div>
                        <h4 style={{fontFamily:''}}>
                                Estimated Time: <span style={{fontWeight:'lighter'}}>{tutorials[selectedTutorialIndex].tutorial_estimated_time} mins</span>
                            </h4>
                        <h1 style={{fontSize:'30px'}}>
                            Reviews
                        </h1>
                        {tutorials[selectedTutorialIndex].tutorial_reviews.length === 0?(
                            <div
                                style={{height:'24vh', paddingRight:'5px', marginBottom:'12px'}} 
                                className={` scrollable-container ${isDark? 'scrollable-container-dark' : 'scrollable-container-light'}`}
                            >
                                No Reviews Available 
                            </div>
                        ):(
                            <div 
                                style={{height:'24vh', paddingRight:'5px', marginBottom:'12px'}} 
                                className={` scrollable-container ${isDark? 'scrollable-container-dark' : 'scrollable-container-light'}`}
                            >
                                
                                {tutorials[selectedTutorialIndex].tutorial_reviews.map((review, reviewIndex)=>(
                                    <div>
                                        <div style={{display:'flex', alignItems:'center'}}>
                                            <Avatar
                                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                            />
                                            <Spacer x={0.5}/>
                                            <div>
                                                <div>
                                                    {review.user_id}
                                                </div>
                                                <div>
                                                    {[...Array(review.rating)].map((_, index) => (
                                                        <Icon width={15} icon="material-symbols:star" />
                                                    ))}
                                                    {[...Array(5-review.rating)].map((_, index) => (
                                                        <Icon width={15} icon="material-symbols:star-outline" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            {review.comment}
                                        </div>
                                            <Spacer/>
                                    </div>
                                ))}
                            </div>
                        )}
                        <div style={{display:'flex', justifyContent:'center'}}>
                            <Button onClick={submitStartTutorial}>
                                Start Tutorial
                            </Button>
                        </div>
                    </div>
                    
                ):(
                    <div></div>
                )}
            </ReactModal>
        </div>
    )
}
