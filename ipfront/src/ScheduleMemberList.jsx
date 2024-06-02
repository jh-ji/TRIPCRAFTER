
import './Friend.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';

// eslint-disable-next-line no-restricted-globals
const ScheduleMemberList=(props)=>{
    const location = useLocation();
    const member1Name=props.member1Name;
    const member2Name=props.member2Name;
    const member3Name=props.member3Name;
    const member4Name=props.member4Name;
    const member1Tel=props.member1Tel;
    const member2Tel=props.member2Tel;
    const member3Tel=props.member3Tel;
    const member4Tel=props.member4Tel;
    console.log(member1Name+"in memberlistpage")

   
    const[friend,setFriend]=useState([]);

    let tempdata2=[{tel:'01052815555',name:'친구1'},
                      {tel:'010321111',name: '친구2'},
                      {tel:'010321111',name: '친구3'},
                      {tel:'010321111',name: '친구4'},]
    const getFriends=()=>{
         axios.get('/api/schedule/showmember/${scheduleId}').then((res)=>{
            setFriend(res.data);

         })
         .then((response) => {

        })
        .catch((error) => {
          // 응답데이터가 없어서 404받았을 때 예외 처리
        })
        console.log('getfriend');
        setFriend(tempdata2); //임시용 api완성되면 .then안으로 옮김
      }
    
    useEffect(()=>{
        //getFriends();
      },[]);
    
    return(
        <div className='ScheduleMemberList'>
           
            

             
                <br></br><br></br>
                <div className='box'>
                    여행일정 참여자 목록
                    <br></br>
                </div>
                {member1Name&&
                <UserCard
                  name={member1Name}
                  toUserTel={member1Tel}
                  memberListUp={true}
                />
                } 
                {member2Name&&
                 <UserCard
                  name={member2Name}
                  toUserTel={member2Tel}
                  memberListUp={true}
                />
                  }
                  {member3Name&&
                 <UserCard
                  name={member3Name}
                  toUserTel={member3Tel}
                  memberListUp={true}
                />}
                {member4Name&&
                 <UserCard
                  name={member4Name}
                  toUserTel={member4Tel}
                  memberListUp={true}
                />
}

             
             
            
        
        </div>
    )
  }
export default ScheduleMemberList;