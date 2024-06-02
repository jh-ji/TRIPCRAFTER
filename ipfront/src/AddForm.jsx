import React from 'react';
import './AddForm.css';
import axios from 'axios';

const AddForm=(props)=>{
    const fromUserTel=props.fromUserTel;
    const toUserTel=props.toUserTel;
    
    
    const addFriend=()=>{
       
        axios.post('/api/users/addfriend', {
            
            fromUserTel:fromUserTel,  //친추거는사람 전번
            toUserTel:toUserTel         //친추받는사람 전번
          })
          .then((response) => {
          })
          .catch((error) => {
            // 예외 처리
          })
        
        }
    
    return(
                   <div className="AddForm" >
                        
                  </div>
    )
  };
  export default AddForm;