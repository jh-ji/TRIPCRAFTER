import React, { useState, useEffect,useCallback } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import axios from 'axios';
import './Menu.css';
import Header_islogin from './Header_islogin';
import Exchange from './Exchange';
function Menu(){
    const location = useLocation();
    const tel = location.state.tel;
    const name = location.state.name;
    const navigate = useNavigate();
    console.log(tel,name);
    const [posts,setPosts]=useState([]);
  const getPosts=()=>{
  
  }
  useEffect(()=>{
    getPosts();
  },[]);
  const[searchText,setSearchText]=useState('');
  const onSearch=()=>{
    getPosts();
  }
  const [regionset, setRegion] = useState('');
  const handleSelect2 = (e) => {
    setRegion(e.target.value);
  };
  const [,updateState]=useState();
  const forceUpdate=useCallback(()=>updateState({}),[]);
  
  const [signup, setSignup] = useState(false);

    return(
        <div className='Menu'>
            <Header_islogin name={name} tel={tel}>
            </Header_islogin>
            <div className='content'>
                <br></br><br></br>
                    <input 
                    onKeyDown={(e)=>setSearchText(e.target.value)}
                    onKeyUp={getPosts}
                    className="search" type="text" placeholder="원하시는 키워드로 검색해보세요 (입력후 엔터)"/>
                    <br></br><br></br><br></br>
                    <div className="gridtop">
                <select onChange={handleSelect2} value={regionset} id="region" className="inputgenderset">
                        <option  value='' >전국</option>
                        <option  value='서울' >서울</option>
                        <option  value='경기'>경기</option>
                        <option  value='인천'>인천</option>
                        <option  value='강원'>강원</option>
                        <option  value='대전' >대전</option>
                        <option  value='대구' >대구</option>
                        <option  value='울산' >울산</option>
                        <option  value='부산' >부산</option>
                        <option  value='광주' >광주</option>
                        <option  value='충청'>충청</option>
                        <option  value='전라'>전라</option>
                        <option  value='경상'>경상</option>
                        <option  value='제주'>제주</option>
                    </select>
                    <button className="submit" onClick={getPosts}>적용</button>
                    </div>
                    <Exchange/>
                    
            </div>
        </div>

    );
  }

export default Menu;