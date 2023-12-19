import React, {useEffect, useState} from 'react'
import './Tutorials.css'
import {Card, Text, Spacer, Button, Modal} from '@nextui-org/react'
import axios from 'axios'
import ReactModal from 'react-modal'
import DeleteTutorial from './DeleteTutorial'


export default function DisplayTutorials({isDark}) {


    const [allTutorials, setAllTutorials] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:5000/admin/tutorials/getAllTutorials").then((res)=>{
            if(res.data.success){
                setAllTutorials(res.data.tutorials)
            }
        })
    },[])

    const[isCategoryListDisplay, setIsCategoryListDisplay] = useState(false)

    const categoryList = ['All', 'Foundation', 'Intermediate', 'Advanced']

    const[inputCategory, setInputCategory] = useState('Select a Category')
    const[inputCategorySearch, setInputCategorySearch] = useState('')
    
    const filteredCategoryList = categoryList.filter((categoryItem) =>
      categoryItem.toLowerCase().includes(inputCategorySearch.toLowerCase())
    );
    
    const handleCategorySuggestionClick = (categoryItem) => {
      setInputCategory(categoryItem)
      setIsCategoryListDisplay(false)
    }

    return (
        <div>
            <section>
                <Card css={{padding:'10px 15px', position:'relative', display:'flex', justifyContent:'space-between', alignItems:'center', flexDirection:'row'}}>
                    <Text size={22} css={{fontWeight:'$bold'}}>
                        All Tutorials
                    </Text>
                    <div className="input-container" style={{marginTop:"0px", width:'200px'}}>
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
                        {isCategoryListDisplay &&
                        <div className={`dropdown-content ${isDark? 'dropdown-content-dark':'dropdown-content-light'}`}>
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
                </Card>
            </section> 
            <Spacer/>
            <section style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                <Card  className='tutorial-card-container'>
                    {allTutorials.map((results, index)=>(
                        <div id={index} className={`tutorial-card ${isDark? 'tutorial-card-dark':'tutorial-card-light'}`}>
                            <div style={{fontWeight:'700', fontSize:'40px'}}>{results.tutorial_title}</div>
                            {results.tutorial_category}
                            <Spacer/>
                            <div className='center' style={{position:'absolute', bottom:'20px', width:'88%'}}>
                                <Button auto>More</Button>
                                <Button 
                                    auto 
                                    color={'warning'} 
                                    onPress={() => {window.location.href = `/tutorials/update/${results._id}`}}
                                >
                                    Edit
                                </Button>
                                <DeleteTutorial dbID={results._id}/>
                            </div>
                        </div>
                    ))}
                </Card>
            </section>
        </div>
    )
}
