
import './Friend.css';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import UserCard from './UserCard';
// eslint-disable-next-line no-restricted-globals
function Friend (){
    const location = useLocation();
    const name=location.state.name;
    const tel=location.state.tel;
   const[getcheck,setGetCheck]=useState(false);
    const[searchUser,setSearchUser]=useState('');
    const[user,setUser]=useState('');
    const[friend,setFriend]=useState([]);
    const[search,setSearch]=useState(false);
    
    console.log(tel,name);
    //let tempdata={tel:searchUser,name:'지정현'}
    const getUsers=()=>{          //친구검색
         axios.get(`http://3.38.231.37:3002/users/${searchUser}`).then((res)=>{
            
            setUser(res.data);
            
         })
         .then((response) => {
            
        })
        .catch((error) => {
          // 응답데이터가 없어서 404받았을 때 예외 처리
        })
         console.log('input'+searchUser);
         setSearch(true);  //임시용 api완성되면 .then안으로 옮김
         //setUser(tempdata); //임시용 api완성되면 .then안으로 옮김
       }
       let tempdata2=[{tel:'01052815555',name:'친구1'},
                      {tel:'010321111',name: '친구2'},
                      {tel:'010321111',name: '친구3'},
                      {tel:'010321111',name: '친구4'},]
    const getFriends=()=>{
       axios.get(`http://3.38.231.37:3002/users/getfriends/${tel}`).then((res)=>{
            setFriend(res.data);

         })
         .then((response) => {

        })
        .catch((error) => {
          // 응답데이터가 없어서 404받았을 때 예외 처리
        })
        //console.log('getfriend');
        //setFriend(tempdata2); //임시용 api완성되면 .then안으로 옮김
      }
    
    useEffect(()=>{
        getFriends();
      },[]);
    
    const activeEnter = (e) => {
        if(e.key === "Enter") {
          getUsers();
          //getFriends();
        }
      }
    
    return(
        <div className='Frined'>
           
            <div className='container1'>
             <div className='content2'>
                <br></br><br></br>
                    <input 
                    onChange={(e)=>setSearchUser(e.target.value)}
                    onKeyDown={(e)=>activeEnter(e)}
                    className="search2" type="text" placeholder="전화번호로 찾아보세요 (입력후 엔터)"/>
                    {search && (
                        <UserCard
                        fromUserTel={tel}
                        toUserTel={user.tel}
                        name={user.name}
                        addfunction={true}
                        />

                        
                      )}
             </div>

             <div className='content2'>
                <br></br><br></br>
                <div className='box'>
                    친구목록
                    <br></br>
                    <button className="re"onClick={getFriends}>새로고침</button>
                </div>
                {friend.map((friend)=>(<UserCard
                  name={friend.name}
                  toUserTel={friend.tel}
                />))}

             </div>
             
            </div>
        
        </div>
    )
  }
export default Friend;