import React from 'react'
import './Tutorials.css'
import {Card, Text, Spacer, Button, Badge} from '@nextui-org/react'
import {useState, useEffect} from 'react'
import axios from 'axios'
import { Icon } from '@iconify/react';
import ReactModal from 'react-modal'

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-monokai'; // Import a theme
import 'ace-builds/src-noconflict/theme-xcode'; // Import a theme
import TutorialExercisesAdmin from './TutorialExercisesAdmin'


export default function UpdateTutorial({isDark}) {
    const pathname = window.location.pathname
    const pathnameParts = pathname.split('/')
    const tutorialID = pathnameParts[pathnameParts.length-1]

    const[isPreviewFullscreen, setIsPreviewFullscreen] = useState(false)


    const [selectedTutorial, setSelectedTutorial] = useState([])
    const [sections, setSections] = useState([])

    const[tutorialTitle, setTutorialTitle] = useState('')
    const[tutorialAbout, setTutorialAbout] = useState('')
    const[tutorialCategory, setTutorialCategory] = useState('')
    const[tutorialEstimatedTime, setTutorialEstimatedTime] = useState('')


    const handleInputFocus = (e) => {
        e.target.parentNode.classList.add('active-label')
    }

    const handleInputBlur = (e) => {
        if (e.target.value === '') {
            e.target.parentNode.classList.remove('active-label')
        }
    }


    const[isCategoryListDisplay, setIsCategoryListDisplay] = useState(false)

    const categoryList = ['Foundation', 'Intermediate', 'Advanced']

    const[inputCategory, setInputCategory] = useState('Select a Category')
    const[inputCategorySearch, setInputCategorySearch] = useState('')
    
    const filteredCategoryList = categoryList.filter((categoryItem) =>
      categoryItem.toLowerCase().includes(inputCategorySearch.toLowerCase())
    );
    
    const handleCategorySuggestionClick = (categoryItem) => {
      setInputCategory(categoryItem)
      setIsCategoryListDisplay(false)
    }

    const [exercises, setExercises] = useState([])



    useEffect(()=>{
        axios.get(`http://localhost:5000/admin/tutorials/getSelectedTutorial/${tutorialID}`).then((res)=>{
            if(res.data.success){
                setSelectedTutorial(res.data.tutorials)
                setTutorialTitle(res.data.tutorials.tutorial_title)
                setTutorialAbout(res.data.tutorials.tutorial_about)
                setInputCategory(res.data.tutorials.tutorial_category)
                setTutorialEstimatedTime(res.data.tutorials.tutorial_estimated_time)
                setSections(res.data.tutorials.tutorial_section)
                setExercises(res.data.tutorials.tutorial_exercises)
            }
        })
    },[])

    const addExercise = () => {
        setExercises([...exercises, { question: '', answering_section: '', answer: '' }]);
    }

    const removeExercise = (index) => {
        const updateExercises = exercises.filter((_, i) => i !== index);
        setExercises(updateExercises);
    }

    const updateExerciseQuestions = (index, value) => {
        const updateExercises = [...exercises];
        updateExercises[index].question = value;
        setExercises(updateExercises);
    }
    
    const updateExerciseAnsweringSections = (index, value) => {
        const updateExercises = [...exercises];
        updateExercises[index].answering_section = value;
        setExercises(updateExercises);
    }
    
    const updateExerciseAnswers = (index, value) => {
        const updateExercises = [...exercises];
        updateExercises[index].answer = value;
        setExercises(updateExercises);
    }

    const addSection = () => {
        setSections([...sections, { title: '', paragraphs: [{ text: '', example: []}] }]);
    }

    const removeSection = (index) => {
        const updatedSections = sections.filter((_, i) => i !== index);
        setSections(updatedSections);
    }

    const updateSectionTitle = (index, value) => {
        const updatedSections = [...sections];
        updatedSections[index].title = value;
        setSections(updatedSections);
    }

    const addParagraph = (sectionIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].paragraphs.push({ text: '', example: []});
        setSections(updatedSections);
    }

    const removeParagraph = (sectionIndex, paragraphIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].paragraphs.splice(paragraphIndex, 1);
        setSections(updatedSections);
    }

    const updateParagraph = (sectionIndex, paragraphIndex, value) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].paragraphs[paragraphIndex].text = value;
        setSections(updatedSections);
    }

    const addExample = (sectionIndex, paragraphIndex) => {
        const updatedSections = [...sections]
        updatedSections[sectionIndex].paragraphs[paragraphIndex].example.push('')
        setSections(updatedSections)
    }

    const removeExample = (sectionIndex, paragraphIndex, exampleIndex) => {
        const updatedSections = [...sections]
        updatedSections[sectionIndex].paragraphs[paragraphIndex].example.splice(exampleIndex, 1)
        setSections(updatedSections)
    }

    const updateExample = (sectionIndex, paragraphIndex, exampleIndex, value) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].paragraphs[paragraphIndex].example[exampleIndex] = value;

    }

    const onsubmit = () => {
        const data = {
            tutorial_title:tutorialTitle,
            tutorial_category:inputCategory,
            tutorial_about:tutorialAbout,
            tutorial_sections_count:sections.length,
            tutorial_section:sections,
            tutorial_exercises:exercises,
            tutorial_estimated_time:tutorialEstimatedTime
        }
        axios.put(`http://localhost:5000/admin/tutorials/updateTutorial/${tutorialID}`, data).then((res)=>{
            window.location.href = `/tutorials/display/all`
        }).catch((error)=>{
            console.error(error)
        })
    }

    return (
        <div>
            <section>
            <Card css={{padding:'10px 15px'}}>
            <Text size={20} css={{fontWeight:'$bold'}}>
                Add New Tutorial
            </Text>
            </Card>
        </section> 
        <Spacer y={1}/>
        <section style={{display:'flex', justifyContent:'space-between', alignItems:''}}>
            <Card css={{padding:'30px 15px', minHeight:'70vh', width:'35%'}}>
                <div className="input-container" style={{marginTop:"0px"}}>
                    <input
                        className='primary-form-element'
                        type="text"
                        id="tutorialTitle"
                        name="tutorialTitle"
                        value={tutorialTitle}
                        onChange={(e) => setTutorialTitle(e.target.value)}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        required
                    />
                    <label 
                        className={`primary-form-element ${isDark? 'dark':'light'}`} 
                        htmlFor="tutorialTitle"
                    >
                        Tutorial Title
                    </label>
                </div>
                <Spacer y={1}/>
                <div className="input-container" style={{marginTop:"0px"}}>
                    <textarea
                        className='primary-form-element'
                        type="text"
                        id="tutorialAbout"
                        name="tutorialAbout"
                        style={{minHeight:'80px'}}
                        value={tutorialAbout}
                        onChange={(e)=>setTutorialAbout(e.target.value)}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        required
                    />
                    <label className={`primary-form-element ${isDark? 'dark':'light'}`} htmlFor="tutorialAbout">Tutorial About</label>
                </div>
                <Spacer y={0.7}/>
                <div className="input-container" style={{marginTop:"0px", width:'100%'}}>
                    <a onClick={()=>{setIsCategoryListDisplay(!isCategoryListDisplay)}}>
                        <input
                            className='primary-form-element'
                            style={{cursor:'default'}}
                            type="text"
                            id="videoQuality"
                            name="videoQuality"
                            value={inputCategory}
                            readOnly
                            required
                        />
                        {isCategoryListDisplay && <span>
                            <i class="fa-solid fa-sort-up drop-up"></i>
                        </span>}
                        {!isCategoryListDisplay && <span>
                            <i class="fa-solid fa-caret-down drop-down"></i>
                        </span>}
                    </a>
                    <label className={`active-primary-form-lable ${isDark? 'dark':'light'}`}>Tutorial Category</label>
                    {isCategoryListDisplay &&
                    <div className={`dropdown-content ${isDark? 'dropdown-content-dark':'dropdown-content-light'}`} style={{width:'100%'}}>
                        <div className=''>
                        <input 
                            type='text' 
                            className='dropdown-content'
                            placeholder='Search...' 
                            value={inputCategorySearch} 
                            onChange={(e) => setInputCategorySearch(e.target.value)}
                        />
                        </div>
                        {isCategoryListDisplay && filteredCategoryList.map((categoryItem, index) => (
                        <div 
                            className={`dropdown-content-item ${isDark? 'dropdown-content-item-dark' : 'dropdown-content-item-light'}`} 
                            key={index} 
                            onClick={() => handleCategorySuggestionClick(categoryItem)}
                        >
                            {categoryItem}
                        </div>
                        ))}
                    </div>
                    } 
                </div>
                <Spacer y={1}/>
                <div className="input-container" style={{marginTop:"0px"}}>
                    <input
                        className='primary-form-element'
                        type="text"
                        id="tutorialEstimatedTime"
                        name="tutorialEstimatedTime"
                        value={tutorialEstimatedTime}
                        onChange={(e) => setTutorialEstimatedTime(e.target.value)}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        required
                    />
                    <label 
                        className={`primary-form-element ${isDark? 'dark':'light'}`} 
                        htmlFor="tutorialTitle"
                    >
                        Tutorial Estimated Time
                    </label>
                </div>
                <Spacer y={1}/>
                <div style={{fontWeight:'bold', textDecoration:'underline'}}>Add Sub Sections</div>
                
                {sections.map((section, sectionIndex) => (

                    <div className='sub-component-adding-container' key={sectionIndex}>
                        <div className="input-container" style={{marginTop:"0px"}}>
                            <input
                                className='primary-form-element'
                                type="text"
                                id={`subSection_${sectionIndex}_title`}
                                value={section.title}
                                onChange={(e) => updateSectionTitle(sectionIndex, e.target.value)}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                required
                            />
                            <label className={`primary-form-element ${isDark? 'dark':'light'}`} htmlFor={`subSection_${sectionIndex}_title`}>Title</label>
                        </div>
                        
                        {section.paragraphs.map((paragraph,paragraphIndex) => (
                            <div key={paragraphIndex}>
                                
                                <Spacer y={1}/>
                                <hr style={{marginBottom:`${paragraphIndex === 0? '20px':''}`, border:'solid 1px'}}/>
                                
                                {paragraphIndex > 0 && (
                                    <Card 
                                        css={{
                                            backgroundColor:'$error', 
                                            padding:'2px', 
                                            alignItems:'center', 
                                            display:'flex', 
                                            color:'white',
                                            cursor:'pointer',position:'relative', top:'-12px', left:'93%',
                                            width:'25px'
                                        }}
                                    >
                                        <Icon  onClick={() => removeParagraph(sectionIndex, paragraphIndex)}  width={20} icon="material-symbols:close" />
                                    </Card>
                                )}
                                
                                
                                <div className="input-container" style={{marginTop:"0px"}}>
                                
                                    <textarea
                                        className='primary-form-element'
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        style={{minHeight:'80px'}}
                                        value={paragraph.text}
                                        onChange={(e) => updateParagraph(sectionIndex, paragraphIndex, e.target.value)}
                                        onFocus={handleInputFocus}
                                        onBlur={handleInputBlur}
                                        required
                                    />
                                    <label className={`primary-form-element ${isDark? 'dark':'light'}`} htmlFor={`subSection_${paragraphIndex}_title`}>Paragraph {paragraphIndex + 1}</label>
                                </div>
                                {paragraph.example.map((ex, exampleIndex) => (
                                    <div>
                                        <div className={`text-editor ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
                                            <AceEditor
                                                mode="java" // Set the mode to Java
                                                theme={`${isDark? 'monokai':'xcode'}`} // Set the theme
                                                name="code-editor"
                                                editorProps={{ $blockScrolling: true }}
                                                value={ex}
                                                onChange={newValue => {
                                                    updateExample(sectionIndex, paragraphIndex, exampleIndex, newValue)
                                                }}
                                                placeholder={`Example ${exampleIndex+1}`}
                                                
                                                style={{ width: '100%', height: '80px', backgroundColor:'transparent'}} // Set the editor's dimensions
                                                
                                            />
                                        </div>
                                        {exampleIndex >= 0 && (
                                            <Card 
                                                css={{
                                                    backgroundColor:'$error', 
                                                    padding:'2px', 
                                                    alignItems:'center', 
                                                    display:'flex', 
                                                    color:'white',
                                                    cursor:'pointer',position:'relative', top:'-95px', left:'95.5%',
                                                    width:'25px'
                                                }}
                                            >
                                                <Icon  onClick={() => removeExample(sectionIndex, paragraphIndex, exampleIndex)}  width={20} icon="material-symbols:close" />
                                            </Card>
                                        )}
                                    </div>
                                    
                                ))}
                                
                                {paragraph.example.length===0&&<Spacer/>}
                                <Button 
                                    onPress={() => addExample(sectionIndex, paragraphIndex)} 
                                    css={{width:'100%'}}
                                >
                                    Add an Example
                                </Button>
                                
                            </div>
                        ))}
                        <label className={`active-primary-form-lable ${isDark? 'dark':'light'}`}>Sub Sections {sectionIndex+1}</label>
                        <Spacer/>
                        <hr style={{border:'1px solid'}}/>
                        <Spacer/>
                        <Button 
                            onPress={() => addParagraph(sectionIndex)} 
                            css={{width:'100%'}}
                        >
                            Add a Paragraph
                        </Button>
                        {sectionIndex > 0 && (
                            <div style={{position:'absolute', top:'-35px', right:'-10px'}}>
                                <Spacer/>
                                <Card 
                                    css={{
                                        backgroundColor:'$error', 
                                        padding:'2px', 
                                        alignItems:'center', 
                                        display:'flex', 
                                        color:'white',
                                        cursor:'pointer'
                                    }}
                                >
                                    <Icon onClick={() => removeSection(sectionIndex)} width={20} icon="material-symbols:close" />
                                </Card>
                            </div>
                            
                        )}
                    </div>
                
                ))}

                <Spacer y={1}/>

                <Button onPress={addSection}>Add a Sub-Section</Button>
                
                
                <Spacer y={1}/>
                
                <div style={{fontWeight:'bold', textDecoration:'underline'}}>Add Exercises</div>
                {exercises.map((exercise, exerciseIndex) => (
                    <div className='sub-component-adding-container' key={exerciseIndex}>

                        <div className="input-container" style={{marginTop:"0px"}}>
                            <input
                                className='primary-form-element'
                                type="text"
                                id={`subSection_${exerciseIndex}_title`}
                                value={exercise.question}
                                onChange={(e) => updateExerciseQuestions(exerciseIndex, e.target.value)}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                required
                            />
                            <label className={`primary-form-element ${isDark? 'dark':'light'}`} htmlFor={`subSection_${exerciseIndex}_title`}>Question</label>
                        </div>
                        <Spacer y={1}/>
                        <div className="input-container" style={{marginTop:"0px"}}>
                            <input
                                className='primary-form-element'
                                type="text"
                                id={`subSection_${exerciseIndex}_title`}
                                value={exercise.answering_section}
                                onChange={(e) => updateExerciseAnsweringSections(exerciseIndex, e.target.value)}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                required
                            />
                            <label className={`primary-form-element ${isDark? 'dark':'light'}`} htmlFor={`subSection_${exerciseIndex}_title`}>Answering Field</label>
                        </div>
                        <Spacer y={1}/>
                        <div className="input-container" style={{marginTop:"0px"}}>
                            <input
                                className='primary-form-element'
                                type="text"
                                id={`subSection_${exerciseIndex}_title`}
                                value={exercise.answer}
                                onChange={(e) => updateExerciseAnswers(exerciseIndex, e.target.value)}
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                required
                            />
                            <label className={`primary-form-element ${isDark? 'dark':'light'}`} htmlFor={`subSection_${exerciseIndex}_title`}>Answer</label>
                        </div>
                        
                        <label className={`active-primary-form-lable ${isDark? 'dark':'light'}`}>Exercise {exerciseIndex+1}</label>

                        {exerciseIndex > 0 && (
                            <div style={{position:'absolute', top:'-35px', right:'-10px'}}>
                                <Spacer/>
                                <Card 
                                    css={{
                                        backgroundColor:'$error', 
                                        padding:'2px', 
                                        alignItems:'center', 
                                        display:'flex', 
                                        color:'white',
                                        cursor:'pointer'
                                    }}
                                >
                                    <Icon onClick={() => removeExercise(exerciseIndex)} width={20} icon="material-symbols:close" />
                                </Card>
                            </div>
                            
                        )}
                    </div>
                ))}

                <Spacer y={1}/>

                <Button onPress={addExercise}>Add an Exercise</Button>

                <Spacer y={1}/>


                <section  className='center' style={{justifyContent:'center'}}>
                    <div className='center'>
                        <Button auto color={'warning'} css={{color:'black', zIndex:'0'}}>Reset</Button>
                        <Spacer/>
                        <Button auto css={{zIndex:'0'}} onClick={onsubmit}>Update</Button>
                    </div>
                </section> 
            </Card>
            <Card css={{padding:'10px 20px', minHeight:'70vh', width:'64%',}}>
                <span className='fullscreen-open-btn' onClick={()=>setIsPreviewFullscreen(true)} title='Full Screen'>
                    <Icon height={30} icon="material-symbols:fullscreen" />
                </span>

                {tutorialTitle === '' &&
                    <div className='center' style={{justifyContent:'center', height:'55vh', color:'#858585', fontStyle:'italic'}}>
                        <h3>Tutorial Preview will Display Here</h3>
                    </div>
                }
                
                {tutorialTitle !== '' &&
                    <div >
                        <section style={{padding:'0 40px'}}>
                            <div style={{textAlign:'center'}}>
                                <h2>{tutorialTitle}</h2>
                                <h4 style={{fontFamily:'Play', fontWeight:'400'}}>{tutorialAbout}</h4>
                            </div>
                        </section>
                        <section>
                        {sections.length === 0 ? (
                            <p>No sections available.</p>
                        ) : (
                            <div>
                                {sections.length === 1 ?(
                                    <div>
                                        <h2 >
                                            {sections[0].title}
                                        </h2>
                                        {sections[0].paragraphs.length === 1 ? (
                                            <div>
                                                <p>
                                                    {sections[0].paragraphs[0].text}
                                                </p>
                                                {sections[0].paragraphs[0].example.length > 0 &&
                                                <div>
                                                    {sections[0].paragraphs[0].example.length === 1?(
                                                        <div>
                                                            <div className={` ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
                                                                <AceEditor
                                                                    mode="java" // Set the mode to Java
                                                                    theme={`${isDark? 'monokai':'xcode'}`} // Set the theme
                                                                    name="code-editor"
                                                                    editorProps={{ $blockScrolling: true }}
                                                                    value={sections[0].paragraphs[0].example[0]}
                                                                    readOnly
                                                                    
                                                                    style={{ width: '100%', height: '150px', backgroundColor:'transparent'}} // Set the editor's dimensions
                                                                    
                                                                />
                                                            </div>
                                                        </div>
                                                    ):(
                                                        <div>
                                                            {sections[0].paragraphs[0].example.map((ex, exampleIndex)=>(
                                                                <div key={exampleIndex}>
                                                                    <div className={` ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
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
                                                    {sections[0].paragraphs.map((paragraph, index)=>(
                                                        <div key={index}>
                                                            <p>
                                                                {paragraph.text}
                                                            </p>
                                                            {paragraph.example.length > 0 &&
                                                            <div>
                                                                {paragraph.example.length === 1?(
                                                                    <div>
                                                                        <div className={` ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
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
                                        {sections.map((section, sectionIndex)=>(
                                            <div>
                                                <h2 >
                                                    {section.title}
                                                </h2>
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
                                                                    <p>
                                                                        {paragraph.text}
                                                                    </p>
                                                                    {paragraph.example.length > 0 &&
                                                                    <div>
                                                                        {paragraph.example.length === 1?(
                                                                            <div>
                                                                                <div className={` ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
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
                    </div>
                }
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
                        {exercises.length === 0?(
                            <div>
                                No Exercises Available 
                            </div>
                        ):(
                            <div>
                                {exercises.map((exercise, exerciseIndex) => (
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
                                        <TutorialExercisesAdmin
                                            answeringSection={exercise.answering_section} 
                                            answer={exercise.answer} 
                                            isDark={isDark}
                                        />
                                    </div>
                                ))}
                               
                            </div>
                        )}                       
                        
                    </section>
            </Card>
        </section>
        <ReactModal className={`preview-fullscreen-popup ${isDark? 'dark-preview-fullscreen-popup' : 'light-preview-fullscreen-popup'}`} isOpen={isPreviewFullscreen}>
            
            
            {tutorialTitle === '' &&
                <div className='center' style={{justifyContent:'center', height:'100%', fontStyle:'italic'}}>
                    <h3 style={{color:'#858585'}}>Tutorial Preview will Display Here</h3>
                    <div onClick={()=>setIsPreviewFullscreen(false)} title='Exit Full Screen' style={{cursor:'pointer', position:'absolute',right:'20px', top:'25px'}}>
                        <Icon height={30} icon="material-symbols:fullscreen-exit" />
                    </div>
                </div>
            }

            {tutorialTitle !== '' &&
                <div >
                    <div className={`preview-navbar ${isDark? 'preview-navbar-dark':'preview-navbar-light'}`}>
                        <div className=''>
                            <Badge disableOutline color='primary' content="Website Preview" size="xs" css={{zIndex:'0'}}>
                                <h1 className='logo-text'>CodePedia</h1>
                            </Badge>
                        </div>
                        <div>This is a preview of the tutorial currently being created. So, Don't reload page.</div>
                        <div onClick={()=>setIsPreviewFullscreen(false)} title='Exit Full Screen' style={{cursor:'pointer'}}>
                            <Icon height={30} icon="material-symbols:fullscreen-exit" />

                        </div>
                    </div>
                    <section style={{padding:'100px 250px 50px 250px'}}>
                        <div style={{textAlign:'center'}}>
                            <h1 style={{fontSize:'40px'}}>{tutorialTitle}</h1>
                            <h4 style={{fontFamily:'Play'}}>{tutorialAbout}</h4>
                        </div>
                        
                            
                       
                        
                    </section>
                    <section style={{padding:'0 250px'}}>
                        {sections.length === 0 ? (
                            <p>No sections available.</p>
                        ) : (
                            <div>
                                {sections.length === 1 ?(
                                    <div>
                                        <h2 >
                                            {sections[0].title}
                                        </h2>
                                        {sections[0].paragraphs.length === 1 ? (
                                            <div>
                                                <p>
                                                    {sections[0].paragraphs[0].text}
                                                </p>
                                                {sections[0].paragraphs[0].example.length > 0 &&
                                                <div>
                                                    {sections[0].paragraphs[0].example.length === 1?(
                                                        <div>
                                                            <div className={` ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
                                                                <AceEditor
                                                                    mode="java" // Set the mode to Java
                                                                    theme={`${isDark? 'monokai':'xcode'}`} // Set the theme
                                                                    name="code-editor"
                                                                    editorProps={{ $blockScrolling: true }}
                                                                    value={sections[0].paragraphs[0].example[0]}
                                                                    readOnly
                                                                    
                                                                    style={{ width: '100%', height: '150px', backgroundColor:'transparent'}} // Set the editor's dimensions
                                                                    
                                                                />
                                                            </div>
                                                        </div>
                                                    ):(
                                                        <div>
                                                            {sections[0].paragraphs[0].example.map((ex, exampleIndex)=>(
                                                                <div key={exampleIndex}>
                                                                    <div className={` ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
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
                                                    {sections[0].paragraphs.map((paragraph, index)=>(
                                                        <div key={index}>
                                                            <p>
                                                                {paragraph.text}
                                                            </p>
                                                            {paragraph.example.length > 0 &&
                                                            <div>
                                                                {paragraph.example.length === 1?(
                                                                    <div>
                                                                        <div className={` ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
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
                                        {sections.map((section, sectionIndex)=>(
                                            <div>
                                                <h2 >
                                                    {section.title}
                                                </h2>
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
                                                                    <p>
                                                                        {paragraph.text}
                                                                    </p>
                                                                    {paragraph.example.length > 0 &&
                                                                    <div>
                                                                        {paragraph.example.length === 1?(
                                                                            <div>
                                                                                <div className={` ${isDark? 'text-editor-dark':'text-editor-light'}`} style={{alignItems:'flex-start', marginTop:'10px'}}>
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
                        {exercises.length === 0?(
                            <div>
                                No Exercises Available 
                            </div>
                        ):(
                            <div>
                                {exercises.map((exercise, exerciseIndex) => (
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
                                        <TutorialExercisesAdmin
                                            answeringSection={exercise.answering_section} 
                                            answer={exercise.answer} 
                                            isDark={isDark}
                                        />
                                    </div>
                                ))}
                               
                            </div>
                        )}                       
                        
                    </section>
                        </section>
                        
                </div>
            }
            
            
        </ReactModal>
        </div>
    )
}
