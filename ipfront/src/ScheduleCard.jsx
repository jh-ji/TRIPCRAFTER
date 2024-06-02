import React, { useState } from 'react';
import './ScheduleCard.css';
import axios from 'axios';
const ScheduleCard=(props)=>{
    const date=props.date;
    const scheduleId=props.scheduleId;
    const startDate=props.startDate;
    const endDate=props.endDate;
    const address=props.address;
    const phoneNumber=props.phoneNumber;
    const placeName=props.placeName;
    const rating=props.rating;
    const openingHours=props.openingHours;
    const startTime=props.startTime;
    const endTime=props.endTime;
    const[deleted,setDelete]=useState(true);
    const deleteSchedule=()=>{              //일정에 삭제DELETE요청 3번API
          axios.delete("http://3.38.231.37:3002/schedules", {
              data:{scheduleId:scheduleId,
              placeName:placeName}
              
            })
            .then((response) => {
              alert('삭제되었습니다.');
              setDelete(false);
            })
            .catch((error) => {
              // 예외 처리
              alert('Delete요청에러');
            })
  }
    return(    
      deleted?(
                   <div className="ScheduleCard" >
                     <div className="dot" ></div>
                        {placeName}<br></br>
                        <div className='cardcontent'>
                        예정시간 : {startTime}~{endTime}
                        {phoneNumber?<div>☎{phoneNumber}</div>:""}<br></br>
                        {address} 
                        <br></br>
                        </div>
                        <button className="bottomButton2"onClick={deleteSchedule}>일정 삭제하기</button>
                  </div>
      ):null
    )
  };
  export default ScheduleCard;  