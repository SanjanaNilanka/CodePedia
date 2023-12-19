import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import AceEditor from 'react-ace';
import {Avatar, Button, Loading, Spacer} from '@nextui-org/react'
import { Icon } from '@iconify/react';
import jwt from 'jwt-decode'
import { GetUserById } from "../login-register-components/apiCalls/users";



import 'ace-builds/src-noconflict/theme-monokai'; // Import a theme
import 'ace-builds/src-noconflict/theme-xcode'; // Import a theme
import ToastMsg from '../ToastMsg';
import {message} from 'antd';
import TutorialExercises from './TutorialExercises';

export default function SelectedTutorial({isDark}) {
    const pathname = window.location.pathname
    const pathnameParts = pathname.split('/')
    const tutorialCategory = pathnameParts[pathnameParts.length-2]
    const tutorialID = pathnameParts[pathnameParts.length-1]
    
    const [tutorials, setTutorials] = useState([])

    const [selectedTutorial, setSelectedTutorial] = useState([])
    const [selectedTutorialSections, setSelectedTutorialSections] = useState([])
    const [selectedTutorialReviews, setSelectedTutorialReviews] = useState([])
    const [selectedTutorialExercises, setSelectedTutorialExercises] = useState([])

    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)
    const [tempRating, setTempRating] = useState(0)
    const token = localStorage.getItem('AuthToken')
    const userId = localStorage.getItem('userID')

    const [user, setUser] = useState(null);

    const validateUserToken = async () => {
      try {
        let userId = null;
      
      const token = localStorage.getItem('AuthToken');
      const jwtToken = jwt(token);
      
      console.log("tokentokentokentoken",jwtToken)
       
      // const decoded = jwt.verify(token, process.env.jwt_secret);
      if (jwtToken.userId) {
        userId = jwtToken.userId;
      }
        const response = await GetUserById(userId);
        if (response.success) {
          setUser(response.data);
        } else {
          // localStorage.removeItem("AuthToken");
          message.error(response.message);
        }
      } catch (error) {
        // localStorage.removeItem("AuthToken");
        message.error(error.message);
      }
    };

    useEffect(() => {
        validateUserToken()
    }, []);

    const handleMouseEnter = (starNumber) => {
        setTempRating(starNumber);
    }
    
    const handleMouseLeave = () => {
        setTempRating(0);
    }
    
    const handleStarClick = (starNumber) => {
        setRating(starNumber);
    }

    useEffect(()=>{
        axios.get(`http://localhost:5000/admin/tutorials/getSelectedTutorials/category?category=${tutorialCategory}`).then((res)=>{
            if(res.data.success){
                setTutorials(res.data.tutorials)
            }
        })
    },[])
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/admin/tutorials/getSelectedTutorial/${tutorialID}`).then((res)=>{
            if(res.data.success){
                setSelectedTutorial(res.data.tutorials)
                setSelectedTutorialSections(res.data.tutorials.tutorial_section)
                setSelectedTutorialReviews(res.data.tutorials.tutorial_reviews)
                setSelectedTutorialExercises(res.data.tutorials.tutorial_exercises)
            }
        })
    },[])
    /*useEffect(() => {
        axios
          .get(`http://localhost:5000/admin/tutorials/getSelectedTutorial/${tutorialID}`)
          .then((res) => {
            if (res.data.success) {
              setSelectedTutorial(res.data.tutorials);
              setSelectedTutorialSections(res.data.tutorials.tutorial_section);
            }
          })
          .catch((error) => {
            // Handle the error here, for example, by logging it or showing an error message.
            console.error("Axios request error:", error);
          });
      }, []);*/

    const[reviewErr, setReviewErr] = useState('')
    const[isReviewErr, setIsReviewErr] = useState(false)

    const currentDateTime = new Date()

    const submitReview = () => {
        if(rating===0){
            //setIsReviewErr(true)
            //setReviewErr('Rate should be 1 to 5 value')
            message.error("Rate should be 1 to 5 value")
            /*setTimeout(function(){
                setIsReviewErr(false);
                setReviewErr('')
            }, 6000)*/
        }else{
            const documentId = selectedTutorial._id
            const newReview = {comment:review, rating:rating, user_id:`${user.firstName} ${user.lastName}`, postedDate:currentDateTime} 
            axios.post('http://localhost:5000/admin/tutorials/addReview', { documentId, newReview }).then((response) => {
                if (response.data.success) {
                    console.log('Value added successfully')
                    message.success("Review added successfully")
                } else {
                    console.error('Failed to add value')
                    message.error("Failed to add review, server error occured")
                }
            }).catch((error) => {
                console.error('Error:', error)
            })
        }
    }
      
    const handleInputFocus = (e) => {
        e.target.parentNode.classList.add('active-label')
    }
    
    const handleInputBlur = (e) => {
        if (e.target.value === '') {
          e.target.parentNode.classList.remove('active-label')
        }
    }


    const[isShowingTutorialMenu, setIsShowingTutorialMenu] = useState(false)

    const text=`public class MyClass {
        public static void main(String[] args) {
            _._._("Hello World");
        }
    }`

   /* const lines = text.split('\n')
    const linesWithUnderscores = []

    for (const line of lines) {
        if (line.includes('_')) {
          linesWithUnderscores.push(line);
        }
    }*/

    const [inputValues, setInputValues] = useState(Array(text.split('_').length-1).fill(''));

    const handleInputChange = (index, value) => {
        const newInputValues = [...inputValues];
        newInputValues[index] = value;
        setInputValues(newInputValues);
    };

    const renderTextWithInputs = () => {
        const textParts = text.split('_');
        
        return textParts.map((part, index) => (
        <React.Fragment key={index}>
            {part}
            {index < textParts.length-1 && (
            <input
                type="text"
                value={inputValues[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
            />
            )}
        </React.Fragment>
        ));
    };
  
    const submitExercises = () => {
        
    }


    return (
        <div className='selected-tutorial'>
            <div 
                className='tutorial-menu'
                onMouseEnter={()=>{
                    setIsShowingTutorialMenu(true)
                }}
                onMouseLeave={() => {
                    setIsShowingTutorialMenu(false)
                }}
            >
                <i style={{fontSize:'26px', cursor:'pointer'}} class="fa-solid fa-bars"></i>
            </div>
            {isShowingTutorialMenu && 
                <div
                    className='tutorial-menu-items'
                    onMouseEnter={()=>{
                        setIsShowingTutorialMenu(true)
                    }}
                    onMouseLeave={() => {
                        setIsShowingTutorialMenu(false)
                    }}
                >
                    <h3 style={{fontWeight:'bolder'}}>{tutorialCategory} Tutorials</h3>
                    {tutorials.length === 0? (
                        <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'70vh'}}>
                            <Loading size="xl" />
                        </div>
                    ):(
                        <div>
                            {tutorials.map((tutorial, tutorialIndex) => (
                                <div className='tutorial-menu-item'>
                                    {tutorial.tutorial_title}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            }
            
            {selectedTutorial? (
                <section style={{ width:'100%'}}>
                    <section style={{textAlign:'center', marginBottom:'50px'}}>
                        <h1 style={{fontSize:'40px'}}>
                            {selectedTutorial.tutorial_title}
                        </h1>
                        <h4 style={{fontFamily:'Play'}}>
                            {selectedTutorial.tutorial_about}
                        </h4>
                    </section>
                    <section>
                        {selectedTutorialSections.length === 0 ? (
                            <div style={{display:'flex', justifyContent:'center', alignItems:'center', height:'70vh'}}>
                                <Loading size="xl" />
                            </div>
                        ):(
                            <div>
                                {selectedTutorialSections.length === 1 ? (
                                    <div>
                                    <h3 style={{fontSize:'30px', marginTop:'30px'}}>
                                        {selectedTutorialSections[0].title}
                                    </h3>
                                    {selectedTutorialSections[0].paragraphs.length === 1 ? (
                                        <div>
                                            <p>
                                                {selectedTutorialSections[0].paragraphs[0].text}
                                            </p>
                                            {selectedTutorialSections[0].paragraphs[0].example.length > 0 &&
                                            <div>
                                                {selectedTutorialSections[0].paragraphs[0].example.length === 1?(
                                                    <div>
                                                        <div className={` ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
                                                            <div className='center' style={{padding:'8px 10px', borderBottom:`1px solid ${isDark? '#555651':'#e8e8e8'}`}}>
                                                                <span style={{fontWeight:'bold'}}>Example</span>
                                                                <span>
                                                                    <Button auto css={{height:'25px'}}>
                                                                        Try Code
                                                                    </Button>
                                                                </span>
                                                            </div>
                                                            <AceEditor
                                                                mode="java" // Set the mode to Java
                                                                theme={`${isDark? 'monokai':'xcode'}`} // Set the theme
                                                                name="code-editor"
                                                                editorProps={{ $blockScrolling: true }}
                                                                value={selectedTutorialSections[0].paragraphs[0].example[0]}
                                                                readOnly
                                                                
                                                                style={{ width: '100%', height: '150px', backgroundColor:'transparent'}} // Set the editor's dimensions
                                                                
                                                            />
                                                        </div>
                                                    </div>
                                                ):(
                                                    <div>
                                                        {selectedTutorialSections[0].paragraphs[0].example.map((ex, exampleIndex)=>(
                                                            <div key={exampleIndex}>
                                                                <div className={` ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
                                                                    <div className='center' style={{padding:'8px 10px', borderBottom:`1px solid ${isDark? '#555651':'#e8e8e8'}`}}>
                                                                        <span style={{fontWeight:'bold'}}>Example</span>
                                                                        <span>
                                                                            <Button auto css={{height:'25px'}}>
                                                                                Try Code
                                                                            </Button>
                                                                        </span>
                                                                    </div>
                                                                    <AceEditor
                                                                        mode="java" // Set the mode to Java
                                                                        theme={`${isDark? 'monokai':'xcode'}`} // Set the theme
                                                                        name="code-editor"
                                                                        editorProps={{ $blockScrolling: true }}
                                                                        value={ex}
                                                                        readOnly
                                                                        
                                                                        style={{ width: '100%', height: '150px', backgroundColor:'transparent'}} // Set the editor's dimensions
                                                                        
                                                                    />
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            }

                                        </div>
                                    ):(
                                        <div>
                                            <p>
                                                {selectedTutorialSections[0].paragraphs.map((paragraph, index)=>(
                                                    <div key={index}>
                                                        <p>
                                                            {paragraph.text}
                                                        </p>
                                                        {paragraph.example.length > 0 &&
                                                        <div>
                                                            {paragraph.example.length === 1?(
                                                                <div>
                                                                    <div className={` ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
                                                                        <div className='center' style={{padding:'8px 10px', borderBottom:`1px solid ${isDark? '#555651':'#e8e8e8'}`}}>
                                                                            <span style={{fontWeight:'bold'}}>Example</span>
                                                                            <span>
                                                                                <Button auto css={{height:'25px'}}>
                                                                                    Try Code
                                                                                </Button>
                                                                            </span>
                                                                        </div>
                                                                        <AceEditor
                                                                            mode="java" // Set the mode to Java
                                                                            theme={`${isDark? 'monokai':'xcode'}`} // Set the theme
                                                                            name="code-editor"
                                                                            editorProps={{ $blockScrolling: true }}
                                                                            value={paragraph.example[0]}
                                                                            readOnly
                                                                            
                                                                            style={{ width: '100%', height: '150px', backgroundColor:'transparent'}} // Set the editor's dimensions
                                                                            
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ):(
                                                                <div>
                                                                    {paragraph.example.map((ex, exampleIndex)=>(
                                                                        <div key={exampleIndex}>
                                                                            <div className={` ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
                                                                                <div className='center' style={{padding:'8px 10px', borderBottom:`1px solid ${isDark? '#555651':'#e8e8e8'}`}}>
                                                                                    <span style={{fontWeight:'bold'}}>Example</span>
                                                                                    <span>
                                                                                        <Button auto css={{height:'25px'}}>
                                                                                            Try Code
                                                                                        </Button>
                                                                                    </span>
                                                                                </div>
                                                                                <AceEditor
                                                                                    mode="java" // Set the mode to Java
                                                                                    theme={`${isDark? 'monokai':'xcode'}`} // Set the theme
                                                                                    name="code-editor"
                                                                                    editorProps={{ $blockScrolling: true }}
                                                                                    value={ex}
                                                                                    readOnly
                                                                                    
                                                                                    style={{ width: '100%', height: '150px', backgroundColor:'transparent'}} // Set the editor's dimensions
                                                                                    
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                        }
                                                    </div>
                                                ))}
                                            </p>
                                            
                                            
                                        </div>
                                    )}
                                </div>
                                ):(
                                    <div>
                                        {selectedTutorialSections.map((section, sectionIndex)=>(
                                            <div>
                                                <h3 style={{fontSize:'30px', marginTop:'30px'}}>
                                                    {section.title}
                                                </h3>
                                                {section.paragraphs.length === 1 ? (
                                                    <div>
                                                        <p>
                                                            {section.paragraphs[0].text}
                                                        </p>
                                                        {section.paragraphs[0].example.length > 0 &&
                                                        <div>
                                                            {section.paragraphs[0].example.length === 1?(
                                                                <div>
                                                                    <div className={` ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
                                                                        <div className='center' style={{padding:'8px 10px', borderBottom:`1px solid ${isDark? '#555651':'#e8e8e8'}`}}>
                                                                            <span style={{fontWeight:'bold'}}>Example</span>
                                                                            <span>
                                                                                <Button auto css={{height:'25px'}}>
                                                                                    Try Code
                                                                                </Button>
                                                                            </span>
                                                                        </div>
                                                                        <AceEditor
                                                                            mode="java" // Set the mode to Java
                                                                            theme={`${isDark? 'monokai':'xcode'}`} // Set the theme
                                                                            name="code-editor"
                                                                            editorProps={{ $blockScrolling: true }}
                                                                            value={section.paragraphs[0].example[0]}
                                                                            readOnly
                                                                            
                                                                            style={{ width: '100%', height: '150px', backgroundColor:'transparent'}} // Set the editor's dimensions
                                                                            
                                                                        />
                                                                    </div>
                                                                </div>
                                                            ):(
                                                                <div>
                                                                    {section.paragraphs[0].example.map((ex, exampleIndex)=>(
                                                                        <div key={exampleIndex}>
                                                                            <div className={` ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
                                                                                <div className='center' style={{padding:'8px 10px', borderBottom:`1px solid ${isDark? '#555651':'#e8e8e8'}`}}>
                                                                                    <span style={{fontWeight:'bold'}}>Example</span>
                                                                                    <span>
                                                                                        <Button auto css={{height:'25px'}}>
                                                                                            Try Code
                                                                                        </Button>
                                                                                    </span>
                                                                                </div>
                                                                                <AceEditor
                                                                                    mode="java" // Set the mode to Java
                                                                                    theme={`${isDark? 'monokai':'xcode'}`} // Set the theme
                                                                                    name="code-editor"
                                                                                    editorProps={{ $blockScrolling: true }}
                                                                                    value={ex}
                                                                                    readOnly
                                                                                    
                                                                                    style={{ width: '100%', height: '150px', backgroundColor:'transparent'}} // Set the editor's dimensions
                                                                                    
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                        }

                                                    </div>
                                                ):(
                                                    <div> 
                                                        <p>
                                                            {section.paragraphs.map((paragraph, index)=>(
                                                                <div key={index}>
                                                                    <p style={{marginTop:'5px'}}>
                                                                        {paragraph.text}
                                                                    </p>
                                                                    {paragraph.example.length > 0 &&
                                                                    <div>
                                                                        {paragraph.example.length === 1?(
                                                                            <div>
                                                                                <div className={` ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
                                                                                    <div className='center' style={{padding:'8px 10px', borderBottom:`1px solid ${isDark? '#555651':'#e8e8e8'}`}}>
                                                                                        <span style={{fontWeight:'bold'}}>Example</span>
                                                                                        <span>
                                                                                            <Button auto css={{height:'25px'}}>
                                                                                                Try Code
                                                                                            </Button>
                                                                                        </span>
                                                                                    </div>
                                                                                    <AceEditor
                                                                                        mode="java" // Set the mode to Java
                                                                                        theme={`${isDark? 'monokai':'xcode'}`} // Set the theme
                                                                                        name="code-editor"
                                                                                        editorProps={{ $blockScrolling: true }}
                                                                                        value={paragraph.example[0]}
                                                                                        readOnly
                                                                                        
                                                                                        style={{ width: '100%', height: '150px', backgroundColor:'transparent'}} // Set the editor's dimensions
                                                                                        
                                                                                    />
                                                                                </div>
                                                                            </div>
                                                                        ):(
                                                                            <div>
                                                                                {paragraph.example.map((ex, exampleIndex)=>(
                                                                                    <div key={exampleIndex}>
                                                                                        <div className={` ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
                                                                                            <div className='center' style={{padding:'8px 10px', borderBottom:`1px solid ${isDark? '#555651':'#e8e8e8'}`}}>
                                                                                                <span style={{fontWeight:'bold'}}>Example {exampleIndex+1}</span>
                                                                                                <span>
                                                                                                    <Button auto css={{height:'25px'}}>
                                                                                                        Try Code
                                                                                                    </Button>
                                                                                                </span>
                                                                                            </div>
                                                                                            <AceEditor
                                                                                                mode="java" // Set the mode to Java
                                                                                                theme={`${isDark? 'monokai':'xcode'}`} // Set the theme
                                                                                                name="code-editor"
                                                                                                editorProps={{ $blockScrolling: true }}
                                                                                                value={ex}
                                                                                                readOnly
                                                                                                
                                                                                                style={{ width: '100%', height: '150px', backgroundColor:'transparent'}} // Set the editor's dimensions
                                                                                                
                                                                                            />
                                                                                        </div>
                                                                                        
                                                                                    </div>
                                                                                ))}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    }
                                                                </div>
                                                            ))}
                                                        </p>
                                                        
                                                        
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                    <section
                        style={{
                            width:'100%', 
                            backgroundColor:'rgba(0, 114, 245, 0.15)',
                            marginTop:'50px',
                            padding:'10px 20px',
                            borderRadius:'20px'
                        }}
                    >
                        <h1 style={{fontSize:'30px'}}>
                            Exercises
                        </h1>
                        {selectedTutorialExercises.length === 0?(
                            <div>
                                No Exercises Available 
                            </div>
                        ):(
                            <div>
                                {selectedTutorialExercises.map((exercise, exerciseIndex) => (
                                    <div>
                                        <div style={{fontSize:'18px'}}>
                                            {exerciseIndex+1}. {exercise.question}
                                        </div>
                                        {/*<div>
                                            {exercise.answering_section}
                                            <AceEditor
                                                mode="java" // Set the mode to Java
                                                theme={`${isDark? 'monokai':'xcode'}`} // Set the theme
                                                name="code-editor"
                                                editorProps={{ $blockScrolling: true }}
                                                value={exercise.answering_section}
                                                showGutter={false}
                                                highlightActiveLine={false}
                                                showPrintMargin={false}
                                                readOnly
                                                
                                                style={{ width: '100%', height: '150px', backgroundColor:'transparent'}} // Set the editor's dimensions
                                                
                                            />
                                        </div>*/}
                                        <TutorialExercises 
                                            answeringSection={exercise.answering_section} 
                                            answer={exercise.answer} 
                                            isDark={isDark}
                                        />
                                    </div>
                                ))}
                               
                            </div>
                        )}                       
                        
                    </section>
                    <section
                        style={{
                            width:'100%', 
                            backgroundColor:'rgba(0, 114, 245, 0.15)',
                            marginTop:'50px',
                            padding:'10px 20px',
                            borderRadius:'20px'
                        }}
                    >
                        <h1 style={{fontSize:'30px'}}>
                            Reviews
                        </h1>
                        {selectedTutorialReviews.length === 0?(
                            <div>
                                No Reviews Available 
                            </div>
                        ):(
                            <div>
                                
                                {selectedTutorialReviews.map((review, reviewIndex)=>(
                                    <div>
                                        <div style={{display:'flex', alignItems:'center'}}>
                                            <Avatar
                                                src="data:image/png;base64,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"
                                                bordered
                                                color="primary"

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
                        <h4>Add Review:</h4>
                        <div className="input-container" style={{marginTop:"0px"}}>
                        <textarea
                            className='primary-form-element'
                            type="text"
                            id="review"
                            name="review"
                            value={review}
                            onChange={(e)=>{setReview(e.target.value)}}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                        />
                        <label 
                            className={`primary-form-element ${isDark? 'dark':'light'}`} 
                            style={{backgroundColor:`${isDark?'#001125':'#d9eafe'}`}} 
                            htmlFor="review"
                        >
                            Review
                        </label>
                        </div>
                        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center',padding:'10px 0'}}>
                            <div>
                                {[1, 2, 3, 4, 5].map((starNumber) => (
                                    <span
                                    key={starNumber}
                                    onMouseEnter={() => handleMouseEnter(starNumber)}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={() => handleStarClick(starNumber)}
                                    style={{cursor:'pointer'}}
                                    >
                                    {starNumber <= rating ? (
                                        <Icon width={28} icon="material-symbols:star" />
                                    ) : (
                                        <Icon width={28} icon="material-symbols:star-outline" />
                                    )}
                                    </span>
                                ))}
                            </div>
                            <Button auto size='sm' onPress={submitReview}>Publish Review</Button>
                        </div>
                    </section>
                </section>
            ):(
            <p>Loading...</p>
            )}
            {isReviewErr&&
            <div>
                <ToastMsg isDark={isDark} toastMsg={reviewErr} />
            </div>
            }
            
        </div>
    )
}
