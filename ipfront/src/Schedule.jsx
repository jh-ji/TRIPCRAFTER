import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Schedule.css';
import ScheduleCard from './ScheduleCard';
import ScheduleAddCard2 from './ScheduleAddCard2';
import Modal from './Modal';
import ScheduleMemberList from './ScheduleMemberList';
import ScheduleAddCard from './ScheduleAddCard';
function Schedule(){
  
    const location = useLocation();
    const tel = location.state.tel;
    const name = location.state.name;
    //const scheduleId=location.state.scheduleId; //전달받은 스케쥴아이디
    const scheduleId=location.state.scheduleId;
    const startDate=location.state.startDate;
    const endDate=location.state.endDate;
    const member1Tel=location.state.member1Tel;
    const member2Tel=location.state.member2Tel;
    const member3Tel=location.state.member3Tel;
    const member4Tel=location.state.member4Tel;
    const member1Name=location.state.member1Name;
    const member2Name=location.state.member2Name;
    const member3Name=location.state.member3Name;
    const member4Name=location.state.member4Name;
    const [menustate, setMenuState] = useState(false); // 초기 width 값
    const [calenderstate, setCalenderState] = useState(false);
    //해당 일정의 detail들을 가져오기 위함
    const[schedules,setSchedules]=useState([]);
    

   

    const getSchedules=(scheduleId)=>{          //<API2번> 스케쥴detail테이블조회
      axios.get(`http://3.38.231.37:3002/schedules/${scheduleId}`)
      .then((res)=>{
         console.log(res.data);
         setSchedules(res.data);
        
      })
     .catch((error) => {
       console.log('no data');
     })
      
    }
  

  //여기부터 장소검색시 추가기능을할 카드에 띄울 변수들 선언
  const [newAddress,setNewAddress]=useState('');
  const [newPhoneNumber,setNewPhoneNumber]=useState('');
  const [newPlaceName,setNewPlaceName]=useState('');
  const [newRating,setNewRating]=useState('');
  const [newOpeningHours,setNewOpeningHours]=useState('');
  const [newReviews,setNewReviews]=useState([]);
  //여기까지 장소검색시 추가하기 기능을할 카드에 띄울 변수를 선언

    const [InputText, setInputText] = useState('')
    const [Place, setPlace] = useState('명지대 자연캠퍼스')

    const [searchcount,setSearchCount]=useState(1);
  let map;
  let service;
  let infowindow;
  

  
  function initMap() {
    const mju = new window.google.maps.LatLng(37.224650469991, 127.18758354347);
  
    infowindow = new window.google.maps.InfoWindow();
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: mju,
      zoom: 17,
    });
  
    var request = {
      query: Place,
      fields: ["name", "geometry","place_id"],
    };
    
    service = new window.google.maps.places.PlacesService(map);
    service.findPlaceFromQuery(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length>0) {
        for (let i = 0; i < results.length; i++) {
          createMarker(results[i]);
          console.log(results[0].name);
          console.log(results[0].place_id)
        }
        
        map.setCenter(results[0].geometry.location);
      //}
      
      
      request = {
        placeId: results[0].place_id,
        fields: ['name','formatted_address', 'rating', 'formatted_phone_number', 'geometry','opening_hours','reviews']
      
      };
      
      service = new window.google.maps.places.PlacesService(map);
      service.getDetails(request, callback);
      
      function callback(place, status) {
        if (status == window.google.maps.places.PlacesServiceStatus.OK) {
          //createMarker(place);  //지도에 마커찍음
          //여기부터 추가기능으로 일정추가할 카드컴포넌트에 띄울 변수세팅
          console.log(place.reviews);
          setNewReviews(place.reviews);

          console.log(place.formatted_address);
          setNewAddress(place.formatted_address);

          console.log(place.formatted_phone_number);
          setNewPhoneNumber(place.formatted_phone_number);

          console.log(place.name);
          setNewPlaceName(place.name);

          if(place.opening_hours){
            let opening_hours='';
              for(let i=0;i<place.opening_hours.weekday_text.length;i++){
                opening_hours+=(place.opening_hours.weekday_text[i]+'\n');
              }
            console.log(String(opening_hours));
            setNewOpeningHours(String(opening_hours));
          }
          else{
            setNewOpeningHours('정보없음');
            console.log(newOpeningHours);
          }

          console.log('평점'+place.rating);
          setNewRating(place.rating);

          //여기까지 변수세팅완료
          setSearchCount(4);
          if(searchcount>3){
          setAddState(true);
          }
        }
      }

    }
    else{alert("검색결과가 없습니다.")}

    });



     
  }
  
  function createMarker(place) {
    if (!place.geometry || !place.geometry.location) return;
  
    const marker = new window.google.maps.Marker({
      map,
      position: place.geometry.location,
    });
  
    window.google.maps.event.addListener(marker, "click", () => {
      infowindow.setContent(place.name || "");
      infowindow.open(map);
    });

  }
  
  
  window.initMap = initMap;
  let count=1;
 
  useEffect(() => {
    getSchedules(scheduleId);
    initMap();
    //setSettingDate(startDate);
    
  }, [Place]);    //Place가 바뀔 때 실행됨



  
  const activeEnter = (e) => {   //검색창에 장소적고 엔터치면 검색
    if(e.key === "Enter") {
      setInputText(e.target.value)
      setPlace(e.target.value);
      console.log(e.target.value)
      //initMap();
      console.log(count);
    }
  }
    const [memberListUp,setMemberListUp]=useState(false); //참여자목록팝업띄우기
    const goToMemberList=()=>{
      setMemberListUp(true);
      getSchedules(scheduleId);
      setDate(false);
    }


    //여기부터 화면비율조절 기능구현
    const [width, setWidth] = useState(97); // 초기 width 값
    const [width2, setWidth2] = useState(3); // 초기 width 값
   
    const handleWidthChange = () => {
      // width 값을 변경하는 함수
        if(menustate==false){
        setWidth(50); // 변경할 width 값으로 설정
        setWidth2(48);
        setMenuState(true);
        setCalenderState(false);
        getSchedules(scheduleId);
        setDate(false);
        }
        else{
        setWidth(97); // 변경할 width 값으로 설정
        setWidth2(3);
        setMenuState(false);
        setAddState(false);
        setCalenderState(false);
        getSchedules(scheduleId);
        setDate(false);
        }
      
    };
    //여기까지 화면비율 조절 기능구현끝
    const handleWidthChange2 = () => {
      // width 값을 변경하는 함수
        if(calenderstate==false){
        setWidth(50); // 변경할 width 값으로 설정
        setWidth2(48);
        setCalenderState(true);
        setMenuState(false);
        setAddState(false);
        getSchedules(scheduleId);
        setDate(false);
        }
        else{
        setWidth(97); // 변경할 width 값으로 설정
        setWidth2(3);
        setMenuState(false);
        setCalenderState(false);
        setAddState(false);
        getSchedules(scheduleId);
        setDate(false);
        }
      
    };
    const handleWidthChange3 = () => {
      // width 값을 변경하는 함수
        if(menustate==false){
        setWidth(50); // 변경할 width 값으로 설정
        setWidth2(48);
        setMenuState(true);
        setCalenderState(false);
        }
        else{
        setWidth(97); // 변경할 width 값으로 설정
        setWidth2(3);
        setMenuState(false);
        setAddState(false);
        setCalenderState(false);
        }
      
    };
    const [datecheck,setDate]=useState(false);
    const [settingDate,setSettingDate]=useState('');
    const handleDate=(e)=>{                //인풋받아서 몇일일정표시할지결정
      console.log(e.target.value);
      
      setSettingDate(new Date(e.target.value));      //입력받은날짜로세팅
      getSchedules(scheduleId);
      setDate(true);
    }
    //여기부터 최초장소검색시 장소시간추가할 카드 띄우는기능 구현시작
    const [addState, setAddState] = useState(false);
    return(
        <div className='Schedule'>
            
            <div className='container'>
                
              <div className='content3-1'>
              <div id="map"
                className="map"
                style={{  height: "100%", width: `${width}vw`, transition: 'width 1s ease-in-out' }}
                /*ref={mapRef}*/
                
                ></div>
                
              </div>

              <div className='content3-2'
              style={{width: `${width2}vw`, transition: 'width 0.7s ease-in-out' }}>
                <div className='widthbuttondiv'>
                  
                  <button className='widthbutton' onClick={handleWidthChange}>
                  <div className='menu' alt='메뉴'/>
                  </button>
                   
                  </div>
                <br></br>
                <br></br>
                
                <div className='widthbuttondiv'>
                  
                  <button className='widthbutton' onClick={goToMemberList}>
                  <div className='menu_friend' alt='친구'/>
                  </button>
                   
                  </div>
                  <br></br>
                  <br></br>
                  <div className='widthbuttondiv'>
                  
                  <button className='widthbutton' onClick={handleWidthChange2}>
                  <div className='menu_calender' alt='일정'/>
                  </button>
                   
                  </div>
                  <br></br>
                  <br></br>
                  
                {
                menustate&&
                <input className="searchSchedule" placeholder="검색어를 입력하세요"
                onKeyDown={(e)=>activeEnter(e)}
                >
                
                </input>
                
                }
                
                  

                {
                addState&&
                <ScheduleAddCard
                  scheduleId={scheduleId}
                  reviews={newReviews}
                  address={newAddress}
                  phoneNumber={newPhoneNumber}
                  placeName={newPlaceName}
                  rating={newRating}
                  openingHours={newOpeningHours}
                  startDate={startDate}
                  endDate={endDate}
                />
                }
                {menustate&&
                <div className='ment'> 여행 일정 조회하기
                  </div>
                }
                {menustate&&
                <input 
                  type="date" 
                  name="visitdate" 
                  placeholder="방문일자" 
                  className="inputbox2" 
                  value={settingDate}
                  onChange={handleDate}>
                  </input>
                }
                {menustate&&datecheck&&
                <div className='selectDate'>
                  <br></br>
                  {settingDate.getFullYear()+'년 '+(settingDate.getMonth()+1)+'월 '+settingDate.getDate()+'일'} 일정
                  

                </div>
                
                }
                <br></br>
                
                {menustate&&datecheck&&
                
                schedules.map((data)=>{
                  //console.log(data.date,settingDate);
                  //선택한 날짜랑 scheduleDetail에서 가져온 일정의 날짜랑 일치하는것만 보여주기위함
                  if(data.date==settingDate.toLocaleDateString('en-CA')){  
                    return(
                      <ScheduleCard
                     
                      date={data.date}
                      scheduleId={data.scheduleId}
                      address={data.address}
                      phoneNumber={data.phoneNumber}
                      placeName={data.placeName}
                      rating={data.rating}
                      openingHours={data.openingHours}
                      startDate={startDate} //date객체는 string으로변환해야함
                      endDate={endDate}
                      startTime={data.startTime}
                      endTime={data.endTime}/>
                          );
                   }})}
                
              
                <br></br>
                {calenderstate&&
                <ScheduleAddCard2
                scheduleId={scheduleId}
                
                startDate={startDate}
                endDate={endDate}
              />

                }
                
              </div>
            </div>
            {memberListUp && (
                        <Modal closeModal={() => setMemberListUp(!memberListUp)}>
                          <ScheduleMemberList
                            member1Name={member1Name}
                            member2Name={member2Name}
                            member3Name={member3Name}
                            member4Name={member4Name}
                            member1Tel={member1Tel}
                            member2Tel={member2Tel}
                            member3Tel={member3Tel}
                            member4Tel={member4Tel}
                          />
                        </Modal>
                      )}
              
        </div>

    );
  }

export default Schedule;