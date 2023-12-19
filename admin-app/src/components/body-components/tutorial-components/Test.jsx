import React from 'react'
import './Tutorials.css'
import './AddEditTutorial.css'
import {Card, Text, Spacer, Button, Badge} from '@nextui-org/react'
import {useState} from 'react'
import axios from 'axios'
import { Icon } from '@iconify/react';
import ReactModal from 'react-modal'

import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/theme-monokai'; // Import a theme
import 'ace-builds/src-noconflict/theme-xcode'; // Import a theme


export default function Test({isDark}) {

    const initialCode = `public class HelloWorld {
        public static void main(String[] args) {
          System.out.println("Hello, World!");
        }
      }`

    const[isPreviewFullscreen, setIsPreviewFullscreen] = useState(false)

    const[tutorialTitle, setTutorialTitle] = useState('')
    const[tutorialAbout, setTutorialAbout] = useState('')
    const[tutorialCategory, setTutorialCategory] = useState('')

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


    const [rows, setRows] = useState(1);
  
    const handleAboutChange = (event) => {
      const textarea = event.target;
      const lineHeight = parseInt(getComputedStyle(textarea).lineHeight, 10);
      const previousRows = textarea.rows;
  
      textarea.rows = 1; // Reset the rows to 1 to calculate the scrollHeight
  
      const currentRows = Math.ceil(textarea.scrollHeight / lineHeight)-1;
  
      if (currentRows === previousRows) {
        textarea.rows = currentRows;
      }
  
      setTutorialAbout(textarea.value);
      setRows(currentRows-1);
    };




    //sub section adding
    const [sections, setSections] = useState([{ title: '', paragraphs: [{ text: '', example: []}] }]);


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

    //form submission
    const onsubmit = () => {
        const data = {
            tutorial_title:tutorialTitle,
            tutorial_category:inputCategory,
            tutorial_about:tutorialAbout,
            tutorial_sections_count:sections.length,
            tutorial_section:sections,
        }
        axios.post("http://localhost:5000/admin/tutorials/addNewTutorial", data).then((res)=>{
            if(res.data.success){
                setTutorialTitle('')
                setTutorialAbout('')
                setTutorialCategory('')
                setInputCategory('Select a Category')
                setSections([{ title: '', paragraphs: [{ text: '', example: []}] }]);
            }
        }).catch((error)=>{
            console.error(error)
        })
    }

    return (
    <div>
        <section>
            <div 
                className={`default-card ${isDark?'default-card-dark':'default-card-light'}`} 
                style={{padding:'10px 15px', display:'flex', justifyContent:'space-between', alignContent:'center'}}
            >
            <Text size={20} css={{fontWeight:'$bold'}}>
                Add New Tutorial
            </Text>
            <span style={{cursor:'pointer'}} onClick={()=>setIsPreviewFullscreen(true)} title='Tutorial Preview'>
                <Icon height={30} icon="fluent:preview-link-20-filled" />
            </span>
            </div>
        </section> 
        <Spacer y={1}/>
        <section style={{display:'block', justifyContent:'space-between', alignItems:''}}>
            <div 
                className={`default-card ${isDark?'default-card-dark':'default-card-light'}`}
                style={{display:'flex',justifyContent:'space-between'}}
            >
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
                <Spacer y={1.5}/>
                <div className="input-container" style={{marginTop:"0px", width:'25%'}}>
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
                    <div className={`dropdown-content ${isDark? 'dropdown-content-dark':'dropdown-content-light'}`} style={{width:'100%',zIndex:'999'}}>
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
            </div>
            <Spacer/>
            <div className={`default-card ${isDark?'default-card-dark':'default-card-light'}`}>
                
                <section style={{padding:'0 40px'}}>
                    <div style={{textAlign:'center'}}>
                        <h2>
                            {tutorialTitle && <div>{tutorialTitle}</div>}
                            {!tutorialTitle && <div>Untitled Tutorial</div>}
                        </h2>
                    </div>
                </section>
                <Spacer y={1.5}/>
                <div className="input-container" style={{marginTop:"0px"}}>
                    <textarea
                        className='tutorial-description'
                        type="text"
                        id="tutorialAbout"
                        name="tutorialAbout"
                        rows={rows}
                        value={tutorialAbout}
                        onChange={handleAboutChange}
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        placeholder='Tutorial About'
                        required
                    />{rows}
                </div>
                <Spacer y={1.5}/>
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
                                <hr style={{marginBottom:'20px', border:'solid 1px'}}/>
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
                                            <Button 
                                                onPress={() => removeExample(sectionIndex, paragraphIndex, exampleIndex)} 
                                                css={{width:'100%', marginTop:'10px'}}
                                                color={'error'}
                                            >
                                                Remove Example {exampleIndex+1}
                                            </Button>
                                        )}
                                    
                                    </div>
                                    
                                ))}
                                <Spacer/>
                                <Button 
                                    onPress={() => addExample(sectionIndex, paragraphIndex)} 
                                    css={{width:'100%'}}
                                >
                                    Add an Example
                                </Button>
                                {paragraphIndex > 0 && (
                                    <Button 
                                        onPress={() => removeParagraph(sectionIndex, paragraphIndex)} 
                                        css={{width:'100%', marginTop:'20px'}}
                                        color={'error'}
                                    >
                                        Remove Paragraph
                                    </Button>
                                )}
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
                            <div>
                                <Spacer/>
                                <Button onClick={() => removeSection(sectionIndex)} color={'error'}>
                                    Remove Section
                                </Button>
                            </div>
                            
                        )}
                    </div>
                
                ))}

                <Spacer y={1}/>

                <Button onPress={addSection}>Add a Sub-Section</Button>
                
                
                <Spacer y={1.5}/>
                
                <section  className='center' style={{justifyContent:'center'}}>
                    <div className='center'>
                        <Button auto color={'warning'} css={{color:'black', zIndex:'0'}}>Reset</Button>
                        <Spacer/>
                        <Button auto css={{zIndex:'0'}} onClick={onsubmit}>Add</Button>
                    </div>
                </section> 
            </div>
            <Card css={{padding:'10px 20px', minHeight:'70vh', width:'64%',display:'none'}}>
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
                        </section>
                </div>
            }
            
            
        </ReactModal>
    </div>
    )
}
