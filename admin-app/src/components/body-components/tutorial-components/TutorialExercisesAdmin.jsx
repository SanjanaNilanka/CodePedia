import {Spacer} from '@nextui-org/react';
import {Button, message} from 'antd';
import React, {useState} from 'react'
import { Icon } from '@iconify/react';
import axios from 'axios';

export default function TutorialExercisesAdmin({answeringSection, answer, isDark}) {

    const userId = localStorage.getItem('userID')
    const [inputValues, setInputValues] = useState(Array(answeringSection.split('_').length-1).fill(''))

    const handleInputChange = (index, value) => {
        const newInputValues = [...inputValues]
        newInputValues[index] = value
        setInputValues(newInputValues)
    };

    const renderTextWithInputs = () => {
        const textParts = answeringSection.split('_')
        
        return textParts.map((part, index) => (
        <React.Fragment key={index}>
            {part}
            {index < textParts.length-1 && (
            <input
            style={{width:'150px', height:'30px', backgroundColor:`transparent`}}
                type="text"
                value={inputValues[index]}
                onChange={(e) => handleInputChange(index, e.target.value)}
            />
            )}
        </React.Fragment>
        ))
    }

    const submitCheckAnswer = () => {
        //message.loading('Answer Validating...')
        let index = 0;
        const userAnswer = answeringSection.replace(/_/g, function(){
            const replacement = inputValues[index];
            index = (index + 1) % inputValues.length; // Move to the next element in the array
            return replacement;
        })


        let toastMsg = ''
        if(answer === userAnswer){
            toastMsg = 'Correct Answer'
            setIsCorrect(true)
            message.success(toastMsg)
            updatePoints()
        }else{
            toastMsg = 'Incorrect Answer'
            setIsCorrect(false)
            message.error(toastMsg)
        }



        
        
    }

    const updatePoints = () =>{
        const data = {
            point: 4
        }
        axios.put(`http://localhost:5000/admin/users/updatePoint/${userId}`, data).then((res)=>{
            message.success('+ 4 points')
        }).catch((error)=>{
            console.error(error)
        })
    }

    const [isCorrect, setIsCorrect] = useState(null)

    return (
        <div>
            {isCorrect === null? (
                <div>
                    <div 
                        style={{
                            backgroundColor:`${isDark?'#1f1f1f':'#f0f2f5'}`, 
                            borderRadius:'20px',
                            height:'180px',
                            alignItems:'center',
                            display:'flex',
                            marginTop:'10px',
                            marginBottom:'20px',
                        }}
                    >
                        <pre>
                            {renderTextWithInputs()}
                        </pre>
                    </div>
                    <Button onClick={submitCheckAnswer}>Submit Answer</Button>
                    <Spacer/>
                </div>
            ):(
                <div>
                    {isCorrect? (
                        <div>
                            <div
                                style={{
                                    backgroundColor:`${isDark?'#1f1f1f':'#f0f2f5'}`, 
                                    borderRadius:'20px',
                                    height:'230px',
                                    alignItems:'center',
                                    display:'flex',
                                    marginTop:'10px',
                                    marginBottom:'20px',
                                    justifyContent:'center',
                                    fontSize:'20px',
                                    fontWeight:'bold',
                                    color:'#52c41a'
                                }}
                            >
                                <Icon width={60} icon="teenyicons:tick-circle-solid" /> &nbsp;&nbsp;&nbsp;Correct Answer
                            </div>
                            {/*<Button onClick={submitCheckAnswer}>Submit Answer</Button>
                            <Spacer/>*/}
                        </div>
                        
                    ):(
                        <div>
                            <div
                                style={{
                                    backgroundColor:`${isDark?'#1f1f1f':'#f0f2f5'}`, 
                                    borderRadius:'20px',
                                    height:'230px',
                                    alignItems:'center',
                                    display:'flex',
                                    marginTop:'10px',
                                    marginBottom:'20px',
                                    justifyContent:'center',
                                    fontSize:'20px',
                                    fontWeight:'bold',
                                    color:'#ff4d4f'
                                }}
                            >
                                <Icon width={60} icon="teenyicons:x-circle-solid" /> &nbsp;&nbsp;&nbsp;Incorrect Answer
                            </div>
                            {/*<Button onClick={submitCheckAnswer}>Submit Answer</Button>
                            <Spacer/>*/}
                        </div>
                        
                    )}
                </div>
            )}
            
        </div>
    )
}
