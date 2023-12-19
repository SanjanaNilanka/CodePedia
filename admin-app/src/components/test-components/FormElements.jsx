import {Card} from '@nextui-org/react'
import React, {useState, useEffect} from 'react'

export default function FormElements({isDark}) {

    //Test-Input
    const handleInputFocus = (e) => {
      e.target.parentNode.classList.add('active-label')
    }
  
    const handleInputBlur = (e) => {
      if (e.target.value === '') {
        e.target.parentNode.classList.remove('active-label')
      }
    }

    //Dropdown
    const[isTestListDisplay, setIsTestListDisplay] = useState(false)

    const testList = ['Test1', 'Test2', 'Test3', 'Test4', 'Test5', 'Test6']

    const[inputTest, setInputTest] = useState('Select Test Item')
    const[inputTestSearch, setInputTestSearch] = useState('')
    
    const filteredTestList = testList.filter((testItem) =>
      testItem.toLowerCase().includes(inputTestSearch.toLowerCase())
    );
    
    const handleTestSuggestionClick = (testItem) => {
      setInputTest(testItem)
      setIsTestListDisplay(false)
    }

  return (
    <div>
        <Card css={{padding:'15px 15px',height:'800px'}}>
          <form className='primary-form'>

            {/*Text-Input*/}
            <h4 style={{margin:'0px 0 20px 0'}}>Text Input</h4>
            <div className="input-container" style={{marginTop:"0px"}}>
              <input
                  className='primary-form-element'
                  type="text"
                  id="fullName"
                  name="fullName"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
              />
              <label className={`primary-form-element ${isDark? 'dark':'light'}`} htmlFor="username">Full Name</label>
            </div>

            {/*Textarea*/}
            <h4 style={{margin:'30px 0 20px 0'}}>Textarea</h4>
            <div className="input-container" style={{marginTop:"0px"}}>
              <textarea
                  className='primary-form-element'
                  type="text"
                  id="fullName"
                  name="fullName"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
              />
              <label className={`primary-form-element ${isDark? 'dark':'light'}`} htmlFor="username">Full Name</label>
            </div>

            {/*Dropdown*/}
            <h4 style={{margin:'30px 0 20px 0'}}>Dropdown</h4>
            <div className="input-container" style={{marginTop:"0px", width:'200px'}}>
              <a onClick={()=>{setIsTestListDisplay(!isTestListDisplay)}}>
                <input
                    className='primary-form-element'
                    style={{cursor:'default'}}
                    type="text"
                    id="videoQuality"
                    name="videoQuality"
                    value={inputTest}
                    readOnly
                    required
                />
                {isTestListDisplay && <span>
                    <i class="fa-solid fa-sort-up drop-up"></i>
                </span>}
                {!isTestListDisplay && <span>
                    <i class="fa-solid fa-caret-down drop-down"></i>
                </span>}
              </a>
              <label className={`active-primary-form-lable `}>Video Quality</label>
              {isTestListDisplay &&
              <div className={`dropdown-content ${isDark? 'dropdown-content-dark':'dropdown-content-light'}`}>
                <div className=''>
                  <input 
                    type='text' 
                    className='dropdown-content'
                    placeholder='Search...' 
                    value={inputTestSearch} 
                    onChange={(e) => setInputTestSearch(e.target.value)}
                  />
                </div>
                {isTestListDisplay && filteredTestList.map((testItem, index) => (
                  <div 
                    className={`dropdown-content-item ${isDark? 'dropdown-content-item-dark' : 'dropdown-content-item-light'}`} 
                    key={index} 
                    onClick={() => handleTestSuggestionClick(testItem)}
                  >
                    {testItem}
                  </div>
                ))}
              </div>
              } 
            </div>
                
            </form>
        </Card>
    </div>
  )
}
