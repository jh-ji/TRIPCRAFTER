
import './ScheduleAddCard.css';
import axios from 'axios';
import React, { useState, useEffect,useCallback } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import Modal from './Modal';
import AddForm from './AddForm';
const ScheduleAddCard2=(props)=>{
    const scheduleId=props.scheduleId;
    const startDate=props.startDate;
    const endDate=props.endDate;
   
    const[date,setDate]=useState('');
    const[startTime,setStartTime]=useState('');
    const[endTime,setEndTime]=useState('');
    const[placeName,setPlaceName]=useState('');
    const handleDate=(e)=>{
        console.log(e.target.value);
        console.log(startDate);
        setDate(e.target.value);
        
      }
    const handleStartTime=(e)=>{
        setStartTime(e.target.value);
      }
      const handleEndTime=(e)=>{
        setEndTime(e.target.value);
      }
      const setText=(e)=>{
        setPlaceName(e.target.value);
      }
    const addSchedule=()=>{              //일정에 장소추가POST요청 3번API
        if(startDate<=new Date(date).toLocaleDateString('en-CA')&&endDate>=new Date(date).toLocaleDateString('en-CA')){
            axios.post('http://3.38.231.37:3002/schedules/scheduleDetail', {
                scheduleId:scheduleId,
                date:date,
                startTime:startTime,
                endTime:endTime,
                placeName:placeName
              })
              .then((response) => {
                alert('추가되었습니다.');
                console.log(placeName);
              })
              .catch((error) => {
                // 예외 처리
                alert('POST요청에러');
                console.log(placeName);
              })



            
        }
        else{
            alert('여행기간을 벗어났습니다.\n수정하십시오.');
            console.log(date);
        }
       
    }
    return(
            <div className="ScheduleAddCard2" >
                <br></br>
                
                <div>
                <br></br>
                일정추가하기
                <br></br>
                <br></br>
                <textarea value={placeName} onChange={setText} type='text' name="placeName" placeholder="일정 내용 입력" className='inputText'  ></textarea>
                <br></br>
             <input 
             type="date" 
             name="visitdate" 
             placeholder="일정시작시간" 
             className="inputbox" 
             value={date}
             onChange={handleDate}>
             </input>
            <br></br>
             <br></br>
             일정시작시간
             <br></br>
            
             <input 
             type="time" 
             name="starttime" 
             placeholder="일정시작시간" 
             className="inputbox" 
             value={startTime}
             onChange={handleStartTime}>
             </input>
             <br></br>
             <br></br>
             일정종료시간
             <br></br>
             
             <input 
             type="time" 
             name="endtime" 
             placeholder="일정종료시간" 
             className="inputbox" 
             value={endTime}
             onChange={handleEndTime}>
             </input>

             <br></br>
                </div>
                <br></br>
                <button className="bottomButton2"onClick={addSchedule}>일정에 추가하기</button>
                
            </div>
            
    )
  };
  export default ScheduleAddCard2;