
import './Header_islogin.css';

import axios from 'axios';
import React,{useState,useEffect} from 'react';
import Modal from './Modal';
import Friend from './Friend';
import UserCard from './UserCard';
// eslint-disable-next-line no-restricted-globals
export const Header_islogin =(props)=>{
    const [selectCounter,setSelectCounter]=useState(0);
    const [signup, setSignup] = useState(false);
    const [showSchedule, setShowSchedule] = useState(false);
    const [scheduleList,setScheduleList]=useState([]);

    //일정생성을 위한 변수선언
    const [scheduleName,setScheduleName]=useState('');
    const [startDate,setStartDate]=useState('');
    const [endDate,setEndDate]=useState('');
    
    const [member2Name,setMember2Name]=useState('');
    const [member2Tel,setMember2Tel]=useState('');
    const [member3Name,setMember3Name]=useState('');
    const [member3Tel,setMember3Tel]=useState('');
    const [member4Name,setMember4Name]=useState('');
    const [member4Tel,setMember4Tel]=useState('');
    
    const name=props.name;
    const tel=props.tel;
    const [member1Name,setMember1Name]=useState(name);
    const [member1Tel,setMember1Tel]=useState(tel);
    console.log(name,tel);
   
    const goToSchedule = () => {
        setShowSchedule(true);
        getScheduleList();
        getFriends();
        /*navigate('/Schedule',{state : {tel:tel,name:name}});*/
      };
    const goToFriend = () => {
        setSignup(true);
      };
    
    const createSchedule=()=>{     //api명세서1번 scheduleList테이블조회
        axios.post('http://3.38.231.37:3002/scheduleslist/',{
          
          scheduleName:scheduleName,
          startDate:startDate,
          endDate:endDate,
          member1Tel:member1Tel,
          member1Name:member1Name,
          member2Tel:member2Tel,
          member2Name:member2Name,
          member3Tel:member3Tel,
          member3Name:member3Name,
          member4Tel:member4Tel,
          member4Name:member4Name
        })
        .then((response) => {
            alert('일정이 생성되었습니다.');
            axios.get(`http://3.38.231.37:3002/scheduleslist/${tel}`).then((res)=>{
             
              setScheduleList(res.data);
              console.log('axios요청완료');
           })
           
          .catch((error) => {
            // 응답데이터가 없어서 404받았을 때 예외 처리
          })
         })
         .catch((error) => {
           alert('일정을 생성하지 못했습니다.')
         })
         //console.log(scheduleName,startDate,endDate,member1Name,member1Tel,member2Name,member2Tel,member3Name,member3Tel,member4Name,member4Tel);
        
       }
    const getScheduleList=()=>{     //api명세서1번 scheduleList테이블조회
        axios.get(`http://3.38.231.37:3002/scheduleslist/${tel}`).then((res)=>{
             
             setScheduleList(res.data);
             console.log(res.data);
          })
          
         .catch((error) => {
           // 응답데이터가 없어서 404받았을 때 예외 처리
         })
         //setScheduleList(tempdata); //임시용 api완성되면 .then안으로 옮김
       }
   //getScheduleList();
    const handleEndDate=(e)=>{
      setEndDate(e.target.value);
    }
    const handleStartDate=(e)=>{
      setStartDate(e.target.value);
    }
    const handleScheduleName=(e)=>{
      setScheduleName(e.target.value);
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

      useEffect(() => {
        getScheduleList();
        getFriends();
      }, [scheduleList.length]);
    
     
      //친구선택해서 member1,member2세팅하는 기능
      const[friend,setFriend]=useState([]);
      const selectMember=(tel,name)=>{
        return () => {
          if(selectCounter==0){
            setMember2Tel(tel);
            setMember2Name(name);
            setSelectCounter(1);
            alert("한명선택하셨습니다.");
            console.log('2member',name,tel);
          }
          if(selectCounter==1){
            setMember3Tel(tel);
            setMember3Name(name);
            setSelectCounter(2);
            alert("두명선택하셨습니다.");
            console.log('3member',name,tel);
          }
          if(selectCounter==2){
            setMember4Tel(tel);
            setMember4Name(name);
            setSelectCounter(3);
            alert("세명선택하셨습니다.");
            console.log('4member',name,tel);
        }
/*
          if(selectCounter==0){
            setMember2Tel(tel);
            setMember2Name(name);
            console.log('2member',name,tel);
          }
          if(selectCounter==1){
            setMember3Tel(tel);
            setMember3Name(name);
            console.log('3member',name,tel);
          }
          if(selectCounter==2){
            setMember4Tel(tel);
            setMember4Name(name);
            console.log('4member',name,tel);
          }*/
          }
      }
    return(
        

        <header className="header">
         
            <div className='headergrid'>
                <div className='div1'>
                    TRIP CRAFTER
                </div>
                <div className='div2'>
                    <button onClick={goToSchedule} className="scheduleButton">일정 보러가기</button>
                </div>
                <div className='div3'>
                    <button onClick={goToFriend} className="scheduleButton">친구관리</button>
                </div>
                <div className='div4'>
                    <button className='scheduleButton'>{props.name}님 안녕하세요.</button>
                </div>
                
                {signup && (
                        <Modal closeModal={() => setSignup(!signup)}>
                          <Friend tel={tel}/>
                        </Modal>
                      )}
                <div className='height'>
                {showSchedule && (
                        
                        <Modal closeModal={() => setShowSchedule(!showSchedule)}>
                           
                           
                           <div className='container1'>
                                    <div className='content2'>
                                    <br></br><br></br>
                                    <div className='boxtop'>여행 일정명</div>
                                  <br></br>
                                  <input 
                                    type="text" 
                                    name="tel" 
                                    placeholder="" 
                                    className="inputbox2" 
                                    value={scheduleName}
                                    onChange={handleScheduleName}>
                                    </input>
                                    <br></br>
                                    <br></br>
                                  <div className='boxtop'>여행 시작하는날</div>
                                  <input 
                                    type="date" 
                                    name="visitdate" 
                                    placeholder="방문일자" 
                                    className="inputbox2" 
                                    value={startDate}
                                    onChange={handleStartDate}
                                    >
                                    </input>
                                    <br></br>
                                    <br></br>
                                    <div className='boxtop'>여행 끝나는날</div>
                                  <input 
                                    type="date" 
                                    name="visitdate" 
                                    placeholder="방문일자" 
                                    className="inputbox2" 
                                    value={endDate}
                                    onChange={handleEndDate}
                                    ></input>
                                      </div>

                                      <div className='content2'>
                                          <br></br><br></br>
                                          <div className='box'>
                                              친구목록
                                              <br></br>
                                          </div>
                                          {friend.map((friend)=>(
                                           friend.tel&& 
                                         <div className='friendbox'>
                                          {friend.name}님
                                          <br></br>
                                          {friend.tel}
                                          <br></br>
                                          <button className="bottomButton2" onClick={selectMember(friend.tel, friend.name)}>선택</button>
                                          </div>
                                          
                                         ))}

                                      </div>
             
                           </div>


                           
                           
                          
                           <button className="bottomButton2" onClick={createSchedule}>일정 만들기</button>
                           {scheduleList.map((scheduleList)=>(<UserCard
                            
                            name={scheduleList.scheduleName}
                            toUserTel={scheduleList.startDate+'~'+scheduleList.endDate}
                            startDate={scheduleList.startDate}
                            endDate={scheduleList.endDate}
                            scheduleFunc={true}         
                            realname={name}                      //접속자이름
                            scheduleId={scheduleList.scheduleId} //스케쥴아이디
                            member1Tel={scheduleList.member1Tel}
                            member1Name={scheduleList.member1Name}
                            member2Tel={scheduleList.member2Tel}
                            member2Name={scheduleList.member2Name}
                            member3Tel={scheduleList.member3Tel}
                            member3Name={scheduleList.member3Name}
                            member4Tel={scheduleList.member4Tel}
                            member4Name={scheduleList.member4Name}
                            />))}
                            
                        </Modal>
                      )}
                </div>

            </div>
           
    
        </header>
    )
}
export default Header_islogin;