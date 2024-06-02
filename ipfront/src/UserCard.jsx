import React, { useState } from 'react';
import './UserCard.css';
import axios from 'axios';
import Schedule from './Schedule';
import { useNavigate } from 'react-router-dom';
const UserCard=(props)=>{
    const fromUserTel=props.fromUserTel;
    const toUserTel=props.toUserTel;
    const name=props.name;
    const realname=props.realname;
    const addfunction=props.addfunction;
    let scheduleFunc=props.scheduleFunc;
    const memberListUp=props.memberListUp;

   const isParty=props.isParty;
    const scheduleId=props.scheduleId;
    const startDate=props.startDate;
    const endDate=props.endDate;
    const member1Tel=props.member1Tel;
    const member1Name=props.member1Name;
    const member2Tel=props.member2Tel;
    const member2Name=props.member2Name;
    const member3Tel=props.member3Tel;
    const member3Name=props.member3Name;
    const member4Tel=props.member4Tel;
    const member4Name=props.member4Name;
    console.log('usercard'+fromUserTel+toUserTel+name);
    const navigate = useNavigate();
    const goToScheduleDetail=()=>{
         navigate('/Schedule',{state : {
          tel:fromUserTel,
          startDate:startDate,
          endDate:endDate,
          name:realname,
          scheduleId:scheduleId,
          member1Tel:member1Tel,
          member1Name:member1Name,
          member2Tel:member2Tel,
          member2Name:member2Name,
           member3Tel:member3Tel,
         member3Name:member3Name,
         member4Tel:member4Tel,
         member4Name:member4Name
        
        }});
    }
    const [visible,setVisible]=useState(true);
    const addFriend=()=>{
        if(name!="없습니다"){       
        axios.put(`http://3.38.231.37:3002/users/addgroupmember`, {
            
            fromUserTel:fromUserTel,  //친추거는사람 전번
            toUserTel:toUserTel         //친추받는사람 전번
          })
          .then((response) => {
            alert("추가완료");
            
          })
          .catch((error) => {
            alert("추가실패");
            // 예외 처리
          })
        }
        else{
          alert("친구추가불가대상");
        }
        }
    
        const delSchedule = (scheduleId) => {
          axios.delete(`http://3.38.231.37:3002/scheduleslist/${scheduleId}`)
            .then((response) => {
              alert("일정 삭제 완료");
              setVisible(false);
            })
            .catch((error) => {
              console.log(scheduleId);
              alert("삭제 실패");
              // 예외 처리
            });
        };
    
    return(
                   <div className="UserCard" >
                    {visible&&
                        <div className='UserCard2'>
                            {scheduleFunc&&
                            <div className='name'> {name}</div>
                            }

                            {!scheduleFunc&&
                            <div className='name'> {name}님 </div>

                            }


                            <div className='tel'>     {toUserTel} </div>
                            
                            {addfunction&&
                            <button className="bottomButton2"onClick={addFriend}>친구추가</button>
                            }
                            {scheduleFunc&&
                               <button className="bottomButton2"onClick={goToScheduleDetail}>일정확인</button>
                               
                            }
                            {scheduleFunc&&
                              <br></br>
                            }
                            {scheduleFunc&&
                               
                               <button className="bottomButton2"onClick={() => delSchedule(scheduleId)}>일정삭제</button>
                            }
                            {isParty&&
                                 <button className="bottomButton2">선택</button>
                            }
                            {!addfunction&&!scheduleFunc&&!memberListUp&&!isParty&&
                            <button className="bottomButton2">친구삭제</button>
                            }
                            {memberListUp&&
                              <br></br>
                            }
                        </div>
                        }
                        
                  </div>
    )
  };
  export default UserCard;