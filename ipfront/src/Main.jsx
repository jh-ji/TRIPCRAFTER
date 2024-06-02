import React, { useState} from 'react';
import { useNavigate} from 'react-router-dom';
import './Main.css';
import './Menu';
import axios from 'axios';
function Main(){
    const navigate=useNavigate();
    const[tel,setTel]=useState('');
    const[name,setName]=useState('');
    
    const handleId=(e)=>{
        setTel(e.target.value);
      }
    const handleName=(e)=>{
        setName(e.target.value);
      }
    
    const goToMenu = () => {
        //console.log(tel,name,'1');
        axios.post('http://3.38.231.37:3002/users/usercheckin',{
          name:name,
          tel:tel
        })
        .then(response => {
          
          //console.log('응답 데이터:', response.data);
          /*
          if(response.data.tel.includes(tel)){
            
          }
          else{
            const data={
              tel:tel,
              name:name
            }
            axios.post('/api/users',data)
            .then(response=>{
              console.log(response.data);
            })
            .catch(error=>{
              console.error(error);
            })
          }
          */
        })
        .catch(error => {
          
          console.error('에러 발생:', error);
        });
        navigate('/Menu',{state : {tel:tel,name:name}});
      };
    return(
        <div className='Main'>
            <div className="title">
                <h1>TRIP CRAFTER 시작하기</h1>
            </div>
            <div className='subtitle'>
                <h3>TRIP CRAFTER로 친구, 가족들과 여행일정을 함께 만들고 공유하세요!</h3>
            </div>
            <br></br>
             <input 
             type="text" 
             name="tel" 
             placeholder="전화번호" 
             className="inputbox" 
             value={tel}
             onChange={handleId}>
             </input>

             <br></br>

             <input 
             type="text" 
             name="name" 
             placeholder="성명" 
             className="inputbox" 
             value={name}
             onChange={handleName}>
             </input>

             <br></br>
             <button className="bottomButton"onClick={goToMenu}>확인</button>
        </div>

    );
}
export default Main;