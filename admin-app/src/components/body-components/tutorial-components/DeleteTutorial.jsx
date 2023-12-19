import React, {useState, useEffect} from 'react'
import { Modal, Button } from '@nextui-org/react'
import axios from 'axios'

export default function DeleteTutorial({dbID}) {
    const[isDeleteOpen, setIsDeleteOpen] = useState(false)

    const [selectedTutorial, setSelectedTutorial] = useState([])
    useEffect(()=>{
        axios.get(`http://localhost:5000/admin/tutorials/getSelectedTutorial/${dbID}`).then((res)=>{
            if(res.data.success){
                setSelectedTutorial(res.data.tutorials)
            }
        })
    },[])

    const deleteTutorial = () => {
        axios.delete(`http://localhost:5000/admin/tutorials/deleteTutorial/${dbID}`).then((res)=>{
            if(res.data.success){
                setIsDeleteOpen(false)
            }
        })
    }

    return (
        <div>
            <Button onPress={()=>setIsDeleteOpen(true)} auto color={'error'}>Delete</Button>

            <Modal 
                aria-labelledby='modal-title' 
                open={isDeleteOpen} 
                onClose={()=>setIsDeleteOpen(false)}
                width='40%'
            >
                <Modal.Header>
                <h4 >Do you want to delete the <span style={{fontWeight:'bold', color:'rgb(0, 114, 245)'}}>{selectedTutorial.tutorial_title}</span> tuorial  ?</h4>
                
                </Modal.Header>

                <Modal.Footer css={{display:'flex', justifyContent:'center'}}>
                <Button  color="primary" auto onPress={()=>setIsDeleteOpen(false)}>
                    No
                </Button>
                <Button  color="error" auto onPress={deleteTutorial}>
                    Yes
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
