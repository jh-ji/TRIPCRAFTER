
import './ScheduleAddCard.css';
import axios from 'axios';
import React, { useState, useEffect,useCallback } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import Modal from './Modal';
import AddForm from './AddForm';
const ScheduleAddCard=(props)=>{
    const scheduleId=props.scheduleId;
    const startDate=props.startDate;
    const endDate=props.endDate;
    const address=props.address;
    const phoneNumber=props.phoneNumber;
    const placeName=props.placeName;
    const rating=props.rating;
    const openingHours=props.openingHours;
    const reviews=props.reviews;
    const[date,setDate]=useState('');
    const[startTime,setStartTime]=useState('');
    const[endTime,setEndTime]=useState('');
    
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

    const addSchedule=()=>{              //일정에 장소추가POST요청 3번API
        if(startDate<=new Date(date).toLocaleDateString('en-CA')&&endDate>=new Date(date).toLocaleDateString('en-CA')){
            axios.post(`http://3.38.231.37:3002/schedules/scheduleDetail`, {
                scheduleId:scheduleId,
                date:date,
                startTime:startTime,
                endTime:endTime,
                placeName:placeName,
                address:address,
                phoneNumber:phoneNumber,
                //rating:rating,
                //openingHours:openingHours,
                //reviews:reviews,
              })
              .then((response) => {
                alert('추가되었습니다.');
              })
              .catch((error) => {
                // 예외 처리
                
                alert('POST요청에러');
              })



            
        }
        else{
            alert('여행기간을 벗어났습니다.\n수정하십시오.');
        }
    }
    return(
            <div className="ScheduleAddCard" >
                <br></br>
                <div className='placeName'>
                    {placeName}
                    <br></br>
                </div>
                <br></br>
                <div className='address'>
                    {address}
                </div>
                <br></br>
                <div className='rating'>
                     ☎ {phoneNumber}   
                </div>
                <br></br>
                <div className='rating'>
                ★{rating}
                </div>
                <br></br>
                <div className='openingHours'>
                    영업시간
                    <br></br>
                    {openingHours}
                </div>
                <br></br>
                <div className='placeName'>
                    Reviews
                    <br></br>
                </div>
                <div className='reviews'>
                {reviews?reviews.map((reviews)=>(
                    <div className='reviews'>
                    
                    <br></br>
                    ★{reviews.rating}
                    <br></br>
                    {reviews.text}
                    <br></br>
                    -{reviews.relative_time_description}-
                    <br></br>
                    작성자 : {reviews.author_name}
                    <br></br>
                    </div>

                )):""}
                </div>
                <div inputSchedule>
                <br></br>
                방문일자
                <br></br>
                <br></br>
             <input 
             type="date" 
             name="visitdate" 
             placeholder="방문일자" 
             className="inputbox" 
             value={date}
             onChange={handleDate}>
             </input>
            <br></br>
             <br></br>
             방문시작시간
             <br></br>
            <br></br>
             <input 
             type="time" 
             name="starttime" 
             placeholder="방문시작시간" 
             className="inputbox" 
             value={startTime}
             onChange={handleStartTime}>
             </input>
             <br></br>
             <br></br>
             방문종료시간
             <br></br>
             <br></br>
             <input 
             type="time" 
             name="endtime" 
             placeholder="방문종료시간" 
             className="inputbox" 
             value={endTime}
             onChange={handleEndTime}>
             </input>

             <br></br>
                </div>
                <br></br>
                <button className="bottomButton2"onClick={addSchedule}>일정에 방문장소추가하기</button>
                
            </div>
            
    )
  };
  export default ScheduleAddCard;