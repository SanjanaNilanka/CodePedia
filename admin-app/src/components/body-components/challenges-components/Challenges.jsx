import React, { useState, useEffect } from 'react';
import { Button, Card, Link } from '@nextui-org/react';
import axios from 'axios';
import ReactModal from 'react-modal';

const Challenges = ({ isDark }) => {

    const [challenges, setChallenges] = useState([]);
    const [editChallenge, setEditChallenge] = useState(null);
    const [isStartLearningPopup, setIsStartLearningPopup] = useState(false);

    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [editedCriteria, setEditedCriteria] = useState(['']);
    const [editedTimerDurationInMinutes, setEditedTimerDuration] = useState(0);
    const [editedDifficultyLevel, setEditedDifficultyLevel] = useState('');

    // Get all challenges
    const getAllChallenges = async () => {
        try {
            const response = await axios.get('http://localhost:5000/adminApp/challengesRoutes/getAll');
            const data = response.data;
            setChallenges(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getAllChallenges();
    }, []);

    // Open the edit modal
    const openEditModal = (challenge) => {
        setEditChallenge(challenge);
        setEditedTitle(challenge.title);
        setEditedDescription(challenge.description);
        setEditedCriteria(challenge.criteria);
        setEditedTimerDuration(challenge.timerDurationInMinutes);
        setEditedDifficultyLevel(challenge.difficultyLevel);
        setIsStartLearningPopup(true);
    };

    // Close the edit modal
    const closeEditModal = () => {
        setEditChallenge(null);
        setIsStartLearningPopup(false);
    };

    // Update challenges
    const updateChallenge = async () => {

        if (!editedTitle || !editedDescription || !editedCriteria || !editedTimerDurationInMinutes || editedDifficultyLevel === 'Select Difficulty Level') {
            alert('Please fill in all required fields.');
            return;
        }

        try {
            // Create an updatedChallenge object with the edited data
            const updatedChallenge = {
                _id: editChallenge._id,
                title: editedTitle,
                description: editedDescription,
                criteria: editedCriteria,
                timerDurationInMinutes: editedTimerDurationInMinutes,
                difficultyLevel: editedDifficultyLevel,
            };
            const response = await axios.put(`http://localhost:5000/adminApp/challengesRoutes/${editChallenge._id}`, updatedChallenge);

            if (response.status === 200) {
                getAllChallenges();
                closeEditModal();
                alert('Challenge updated successfully!');
            } else {
                console.error('Failed to update challenge');
                alert('Failed to update challenge!');
            }
        } catch (error) {
            console.error(error);
        }
    }

    // Delete challenges
    const deleteChallenge = async (challengeId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/adminApp/challengesRoutes/${challengeId}`);

            if (response.status === 204) {
                getAllChallenges();
                alert('Challenge deleted successfully!');
            } else {
                console.error('Failed to delete challenge');
                alert('Failed to delete challenge!');
            }
        } catch (error) {
            console.error(error);
        }
    };

    // Handle adding a new criteria field
    const handleAddCriteria = () => {
        const lastCriteria = editedCriteria[editedCriteria.length - 1];
        if (lastCriteria.trim() !== '') {
            setEditedCriteria([...editedCriteria, '']);
        }
    };

    // Handle changing a criteria value
    const handleCriteriaChange = (index, value) => {
        const updatedCriteria = [...editedCriteria];
        updatedCriteria[index] = value;
        setEditedCriteria(updatedCriteria);
    };

    // Handle deleting a criteria field
    const handleDeleteCriteria = (index) => {
        if (editedCriteria.length === 1) {
            alert('You must have at least one criteria field.');
            return;
        }
        const updatedCriteria = [...editedCriteria];
        updatedCriteria.splice(index, 1);
        setEditedCriteria(updatedCriteria);
    };

    // Input field functions
    const handleInputFocus = (e) => {
        e.target.parentNode.classList.add('active-label');
    };

    const handleInputBlur = (e) => {
        if (e.target.value === '') {
            e.target.parentNode.classList.remove('active-label');
        }
    };

    // Drop down functions
    const [isDifficultyLevelListDisplay, setIsDifficultyLevelListDisplay] = useState(false);

    const difficultyLevelList = ['Easy', 'Medium', 'Hard'];

    const [inputDifficultyLevelSearch, setInputDifficultyLevelSearch] = useState('');

    const filteredDifficultyLevelList = difficultyLevelList.filter((Item) =>
        Item.toLowerCase().includes(inputDifficultyLevelSearch.toLowerCase())
    );

    const handleDifficultyLevelSuggestionClick = (Item) => {
        setEditedDifficultyLevel(Item);
        setIsDifficultyLevelListDisplay(false);
    };

    return (

        <div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Link href="/challenges/addNewChallenge">
                    <Button style={{ zIndex: '0' }}>Add New Challenge</Button>
                </Link>
            </div><br />

            {challenges.length === 0 ? (
                <center><p>No challenges in the database</p></center>
            ) : (

                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>

                    {challenges.map((challenge) => (

                        <Card key={challenge._id} style={{ marginBottom: '16px', padding: '16px', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', borderRadius: '8px', textAlign: 'center', width: '75vh', display: 'flex', flexDirection: 'column' }}>

                            <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{challenge.title}</h4>

                            <p style={{ fontSize: '16px', marginBottom: '10px', textAlign: 'justify' }}>{challenge.description}</p>

                            <div style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold' }}>Criteria</div>

                            <ul style={{ listStyleType: 'number', paddingLeft: '20px' }}>

                                {challenge.criteria.map((criterion, index) => (
                                    <li key={index} style={{ fontSize: '16px', marginBottom: '5px', textAlign: 'justify' }}>{criterion}</li>
                                ))}

                            </ul>

                            <p style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold' }}>Timer (min)</p>
                            <p style={{ fontSize: '16px', marginBottom: '10px' }}>{challenge.timerDurationInMinutes}</p>

                            <p style={{ fontSize: '16px', marginBottom: '5px', fontWeight: 'bold' }}>Difficulty</p>
                            <p style={{ fontSize: '16px', marginBottom: '10px' }}>{challenge.difficultyLevel}</p>

                            <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between' }}>

                                <Button style={{ width: '10px', margin: '0 auto', backgroundColor: '#007BFF', color: isDark ? '#ffffff' : '#ffffff' }} onPress={() => openEditModal(challenge)}>Edit</Button>
                                <br />
                                <Button style={{ width: '10px', margin: '0 auto', backgroundColor: '#007BFF', color: isDark ? '#ffffff' : '#ffffff' }} onPress={() => deleteChallenge(challenge._id)}>Delete</Button>
                            
                            </div>

                        </Card>
                    ))}

                </div>
            )}

            <ReactModal
                className={`popup ${isDark ? 'dark-popup' : 'light-popup'}`}
                isOpen={isStartLearningPopup}
                onRequestClose={closeEditModal}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        width: '85vh',
                        height: '85vh',
                        margin: 'auto',
                        outline: 'none',
                        borderRadius: '20px',
                        padding: '10px 20px',
                        backgroundColor: isDark ? '#1f1f1f' : '#fff',
                    },
                }}
            >
                <div className="popup-title" style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontWeight: 'bold',
                    fontSize: '30px',
                    marginBottom: '15px',
                    paddingBottom: '5px',
                    borderBottom: '1px solid',
                }}>
                    Edit Challenge
                    <i onClick={closeEditModal} className="fa-solid fa-xmark close"></i>
                </div>

                <div className={`input-container ${editedTitle ? 'active-label' : ''}`}>
                    <input
                        className='primary-form-element'
                        type="text"
                        id="challengeTitle"
                        name="challengeTitle"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        value={editedTitle}
                        onChange={(event) => setEditedTitle(event.target.value)}
                        required
                    />
                    <label className={`primary-form-element ${isDark ? 'dark' : 'light'} ${editedTitle ? 'active-primary-form-label' : ''}`} htmlFor="challengeTitle">Challenge Title</label>
                </div><br />

                <div className={`input-container ${editedDescription ? 'active-label' : ''}`}>
                    <input
                        className='primary-form-element'
                        type="text"
                        id="challengeDescription"
                        name="challengeDescription"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        value={editedDescription}
                        onChange={(event) => setEditedDescription(event.target.value)}
                        required
                    />
                    <label className={`primary-form-element ${isDark ? 'dark' : 'light'} ${editedDescription ? 'active-primary-form-label' : ''}`} htmlFor="challengeDescription">Description</label>
                </div><br />

                {/* <div className={`input-container ${editedCriteria ? 'active-label' : ''}`}>
                    <input
                        className="primary-form-element"
                        type="text"
                        id="challengeCriteria"
                        name="challengeCriteria"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        value={editedCriteria}
                        onChange={(event) => setEditedCriteria(event.target.value)}
                        required
                    />
                    <label className={`primary-form-element ${isDark ? 'dark' : 'light'} ${editedCriteria ? 'active-primary-form-label' : ''}`} htmlFor="challengeCriteria">Criteria</label>
                </div><br /> */}

                <div className={`input-container ${editedCriteria ? 'active-label' : ''}`}>
                    
                    <label className={`primary-form-element ${isDark ? 'dark' : 'light'} ${editedCriteria ? 'active-primary-form-label' : ''}`}>Criteria</label>
                    
                    {editedCriteria.map((criterion, index) => (
                        <div key={index} className="criteria-input">
                            <input
                                className='primary-form-element'
                                type="text"
                                value={criterion}
                                onChange={(event) => handleCriteriaChange(index, event.target.value)}
                                required
                            />

                            <center>
                                <Button auto onClick={() => handleDeleteCriteria(index)} style={{ marginTop: '10px', marginBottom: '10px' }}>Delete Criteria</Button>
                            </center>

                        </div>

                    ))}
                    
                    <center>
                        <Button auto onPress={handleAddCriteria} style={{ zIndex: '0', backgroundColor: '#007BFF', color: isDark ? '#ffffff' : '#ffffff', marginTop: '10px', marginBottom: '10px' }}> Add Criteria </Button>
                    </center>                
                    
                </div>

                <div className={`input-container ${editedTimerDurationInMinutes ? 'active-label' : ''}`}>
                    <input
                        className='primary-form-element'
                        type="number"
                        id="challengeTime"
                        name="challengeTime"
                        onFocus={handleInputFocus}
                        onBlur={handleInputBlur}
                        value={editedTimerDurationInMinutes}
                        onChange={(event) => {
                            const parsedValue = parseFloat(event.target.value);
                            if (!isNaN(parsedValue)) {
                                setEditedTimerDuration(parsedValue < 0 ? 0 : parsedValue);
                            } else {
                                setEditedTimerDuration(0);
                            }
                        }}
                        min={0}
                        step={1}
                        required
                    />
                    <label className={`primary-form-element ${isDark ? 'dark' : 'light'} ${editedTimerDurationInMinutes ? 'active-primary-form-label' : ''}`}>Time (mins)</label>
                </div><br />

                <div className="input-container" style={{ marginTop: "0px" }}>
                    <a onClick={() => { setIsDifficultyLevelListDisplay(!isDifficultyLevelListDisplay) }}>
                        <input
                            className='primary-form-element'
                            style={{ cursor: 'default' }}
                            type="text"
                            id="challengeDifficulty"
                            name="challengeDifficulty"
                            value={editedDifficultyLevel}
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

                <div className="center" style={{ justifyContent: 'center', marginTop: '20px' }}>
                    <Button style={{ zIndex: '0' }} onPress={updateChallenge}>Update Challenge</Button>
                </div>

            </ReactModal>

        </div>
    )
}

export default Challenges;