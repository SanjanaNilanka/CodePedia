import React, { useState } from 'react';
import { Button, Card, Notification } from '@nextui-org/react';
import axios from 'axios';

const AddNewChallenge = ({ isDark }) => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [criteria, setCriteria] = useState(['']);
    const [timerDurationInMinutes, setTimerDuration] = useState('');
    const [difficultyLevel, setDifficultyLevel] = useState('Select Difficulty Level')

    //Add challenge function
    const handleAddChallenge = async () => {

        if (!title || !description || !criteria || !timerDurationInMinutes || difficultyLevel === 'Select Difficulty Level') {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/adminApp/challengesRoutes/create', {
                title: title,
                description: description,
                criteria: criteria,
                timerDurationInMinutes: timerDurationInMinutes,
                difficultyLevel: difficultyLevel,
            });

            if (response.status === 201) {
                const createdChallenge = response.data;
                setTitle('');
                setDescription('');
                setCriteria(['']);
                setTimerDuration('');
                setDifficultyLevel('');
                alert('Challenge created successfully!');
            } else {
                console.error('Failed to create challenge');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Handle adding a new criteria field
    const handleAddCriteria = () => {
        const lastCriteria = criteria[criteria.length - 1];
        if (lastCriteria.trim() !== '') {
            setCriteria([...criteria, '']); 
        }
    };

    // Handle changing a criteria value
    const handleCriteriaChange = (index, value) => {
        const updatedCriteria = [...criteria];
        updatedCriteria[index] = value;
        setCriteria(updatedCriteria);
    };

    // Handle deleting a criteria field
    const handleDeleteCriteria = (index) => {
        if (criteria.length === 1) {
            alert('You must have at least one criteria field.');
            return;
        }
        const updatedCriteria = [...criteria];
        updatedCriteria.splice(index, 1);
        setCriteria(updatedCriteria);
    };

    //Input field functions
    const handleInputFocus = (e) => {
        e.target.parentNode.classList.add('active-label')
    }

    const handleInputBlur = (e) => {
        if (e.target.value === '') {
            e.target.parentNode.classList.remove('active-label')
        }
    }

    //Drop down functions
    const [isDifficultyLevelListDisplay, setIsDifficultyLevelListDisplay] = useState(false)

    const difficultyLevelList = ['Easy', 'Medium', 'Hard']

    const [inputDifficultyLevelSearch, setInputDifficultyLevelSearch] = useState('')

    const filteredDifficultyLevelList = difficultyLevelList.filter((Item) =>
        Item.toLowerCase().includes(inputDifficultyLevelSearch.toLowerCase())
    );

    const handleDifficultyLevelSuggestionClick = (Item) => {
        setDifficultyLevel(Item)
        setIsDifficultyLevelListDisplay(false)
    }

    return (

        <Card style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 'auto' }}>

            <div>

                <h3 style={{ marginTop: '20px' }}><b>Add New Challenges</b></h3>

                <div className="input-container" style={{ marginTop: "0px" }}>

                    <input
                        className='primary-form-element'
                        type="text"
                        id="challengeTitle"
                        name="challengeTitle"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                    <label className={`primary-form-element ${isDark ? 'dark' : 'light'}`} htmlFor="challengeTitle">Challenge Title</label>

                </div><br />

                <div className="input-container" style={{ marginTop: "0px" }}>

                    <input
                        className='primary-form-element'
                        type="text"
                        id="challengeDescription"
                        name="challengeDescription"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                        required
                    />
                    <label className={`primary-form-element ${isDark ? 'dark' : 'light'}`} htmlFor="challchallengeDescription">Description</label>

                </div><br />

                {criteria.map((criteriaValue, index) => (
                    <div key={index} className="input-container" style={{ marginTop: "0px" }}>
                        <input
                            className='primary-form-element'
                            type="text"
                            // placeholder={`Criteria ${index + 1}`}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            value={criteriaValue}
                            onChange={(event) => handleCriteriaChange(index, event.target.value)}
                            required
                        />

                        <center>
                            <Button auto onClick={() => handleDeleteCriteria(index)} style={{ marginTop: '10px', marginBottom: '10px' }}>Delete Criteria</Button>
                        </center>

                        <label className={`primary-form-element ${isDark ? 'dark' : 'light'}`} htmlFor="challengeCriteria">{`Criteria ${index + 1}`}</label>

                    </div>
                ))}

                <center>
                    <Button auto onPress={handleAddCriteria} style={{ zIndex: '0', backgroundColor: '#007BFF', color: isDark ? '#ffffff' : '#ffffff', marginTop: '10px', marginBottom: '10px' }}> Add Criteria </Button>
                </center>

                {/* <div className="input-container" style={{ marginTop: "0px" }}>

                    <input
                        className='primary-form-element'
                        type="text"
                        id="challengeCriteria"
                        name="challengeCriteria"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        value={criteria}
                        onChange={(event) => setCriteria(event.target.value)}
                        required
                    />
                    <label className={`primary-form-element ${isDark ? 'dark' : 'light'}`} htmlFor="challengeCriteria">Criteria</label>

                </div><br /> */}

                <div className="input-container" style={{ marginTop: "0px" }}>

                    <input
                        className='primary-form-element'
                        type="number"
                        id="challengeTime"
                        name="challengeTime"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        value={timerDurationInMinutes}
                        onChange={(event) => {
                            const parsedValue = parseFloat(event.target.value);
                            if (!isNaN(parsedValue)) {
                                setTimerDuration(parsedValue < 0 ? 0 : parsedValue);
                            } else {
                                setTimerDuration(0);
                            }
                        }}
                        min={0}
                        step={1}
                        required
                    />
                    <label className={`primary-form-element ${isDark ? 'dark' : 'light'}`} htmlFor="challengeTime">Time (mins)</label>

                </div><br />

                <div className="input-container" style={{ marginTop: "0px" }}>
                    <a onClick={() => { setIsDifficultyLevelListDisplay(!isDifficultyLevelListDisplay) }}>
                        <input
                            className='primary-form-element'
                            style={{ cursor: 'default' }}
                            type="text"
                            id="challengeDifficulty"
                            name="challengeDifficulty"
                            value={difficultyLevel}
                            readOnly
                            required
                        />
                        {isDifficultyLevelListDisplay && <span>
                            <i className="fa-solid fa-sort-up drop-up"></i>
                        </span>}
                        {!isDifficultyLevelListDisplay && <span>
                            <i className="fa-solid fa-caret-down drop-down"></i>
                        </span>}
                    </a>
                    <label className={`active-primary-form-lable ${isDark ? 'dark' : 'light'}`}>Difficulty Level</label>
                    {isDifficultyLevelListDisplay &&
                        <div className={`dropdown-content ${isDark ? 'dropdown-content-dark' : 'dropdown-content-light'}`}>
                            <div className=''>
                                <input
                                    type='text'
                                    className='dropdown-content'
                                    placeholder='Search...'
                                    value={inputDifficultyLevelSearch}
                                    onChange={(e) => setInputDifficultyLevelSearch(e.target.value)}
                                />
                            </div>
                            {isDifficultyLevelListDisplay && filteredDifficultyLevelList.map((Item, index) => (
                                <div
                                    className={`dropdown-content-item ${isDark ? 'dropdown-content-item-dark' : 'dropdown-content-item-light'}`}
                                    key={index}
                                    onClick={() => handleDifficultyLevelSuggestionClick(Item)}
                                >
                                    {Item}
                                </div>
                            ))}
                        </div>
                    }

                </div><br />

                <center><Button auto onPress={handleAddChallenge} style={{ zIndex: '0', backgroundColor: '#007BFF', color: isDark ? '#ffffff' : '#ffffff', marginBottom: '70px' }}> Add </Button></center>

            </div>

        </Card>

    );
};

export default AddNewChallenge;
