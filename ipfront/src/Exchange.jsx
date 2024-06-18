
import './Exchange.css';
import axios from 'axios';
import React, { useState, useEffect,useCallback } from 'react';
import japan from './japan.png';
import usa from './usa.png';
import eu from './eu.png';
import china from './china.png';
const Exchange=(props)=>{
    const [buyprice,setBuyPrice]=useState('');
    const [sellprice,setSellPrice]=useState('');
    const [ttbuyprice,setttBuyPrice]=useState('');
    const [ttsellprice,setttSellPrice]=useState('');
    const [buyprice_usa,setBuyPrice_usa]=useState('');
    const [sellprice_usa,setSellPrice_usa]=useState('');
    const [ttbuyprice_usa,setttBuyPrice_usa]=useState('');
    const [ttsellprice_usa,setttSellPrice_usa]=useState('');
    const [buyprice_eu,setBuyPrice_eu]=useState('');
    const [sellprice_eu,setSellPrice_eu]=useState('');
    const [ttbuyprice_eu,setttBuyPrice_eu]=useState('');
    const [ttsellprice_eu,setttSellPrice_eu]=useState('');
    const [buyprice_china,setBuyPrice_china]=useState('');
    const [sellprice_china,setSellPrice_china]=useState('');
    const [ttbuyprice_china,setttBuyPrice_china]=useState('');
    const [ttsellprice_china,setttSellPrice_china]=useState('');
            axios.get('https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWJPY', {
              })
              .then((response) => {
                setBuyPrice(+response.data[0].cashBuyingPrice);
                setSellPrice(response.data[0].cashSellingPrice);
                setttBuyPrice(response.data[0].ttSellingPrice);
                setttSellPrice(response.data[0].ttBuyingPrice);
              })
              .catch((error) => {
                console.log(error);
              })
              axios.get('https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD', {
              })
              .then((response) => {
                
                console.log('살떄='+response.data[0].cashBuyingPrice);
                setBuyPrice_usa(+response.data[0].cashBuyingPrice);
                console.log('팔때='+response.data[0].cashSellingPrice);
                setSellPrice_usa(response.data[0].cashSellingPrice);
                console.log('송금보낼때='+response.data[0].ttSellingPrice);
                setttBuyPrice_usa(response.data[0].ttSellingPrice);
                console.log('송금받을때='+response.data[0].ttBuyingPrice);
                setttSellPrice_usa(response.data[0].ttBuyingPrice);
              })
              .catch((error) => {
                // 예외 처리
                
                console.log(error);
              })
              axios.get('https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWEUR', {
              })
              .then((response) => {
                
                console.log('살떄='+response.data[0].cashBuyingPrice);
                setBuyPrice_eu(+response.data[0].cashBuyingPrice);
                console.log('팔때='+response.data[0].cashSellingPrice);
                setSellPrice_eu(response.data[0].cashSellingPrice);
                console.log('송금보낼때='+response.data[0].ttSellingPrice);
                setttBuyPrice_eu(response.data[0].ttSellingPrice);
                console.log('송금받을때='+response.data[0].ttBuyingPrice);
                setttSellPrice_eu(response.data[0].ttBuyingPrice);
              })
              .catch((error) => {
                // 예외 처리
                
                console.log(error);
              })
              axios.get('https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWUSD', {
              })
              .then((response) => {
                
                console.log('살떄='+response.data[0].cashBuyingPrice);
                setBuyPrice_usa(+response.data[0].cashBuyingPrice);
                console.log('팔때='+response.data[0].cashSellingPrice);
                setSellPrice_usa(response.data[0].cashSellingPrice);
                console.log('송금보낼때='+response.data[0].ttSellingPrice);
                setttBuyPrice_usa(response.data[0].ttSellingPrice);
                console.log('송금받을때='+response.data[0].ttBuyingPrice);
                setttSellPrice_usa(response.data[0].ttBuyingPrice);
              })
              .catch((error) => {
                // 예외 처리
                
                console.log(error);
              })
              axios.get('https://quotation-api-cdn.dunamu.com/v1/forex/recent?codes=FRX.KRWCNY', {
              })
              .then((response) => {
                
                console.log('살떄='+response.data[0].cashBuyingPrice);
                setBuyPrice_china(+response.data[0].cashBuyingPrice);
                console.log('팔때='+response.data[0].cashSellingPrice);
                setSellPrice_china(response.data[0].cashSellingPrice);
                console.log('송금보낼때='+response.data[0].ttSellingPrice);
                setttBuyPrice_china(response.data[0].ttSellingPrice);
                console.log('송금받을때='+response.data[0].ttBuyingPrice);
                setttSellPrice_china(response.data[0].ttBuyingPrice);
              })
              .catch((error) => {
                // 예외 처리
                
                console.log(error);
              })



            
       
    
    return(
            <div className="Exchange" >
               <div className='Exchange2'>
                            <div className='name3'>현재 환율</div>
                            <div className='name4'>제공: KEB하나은행 모든단위는 KRW</div>
                            <br></br>

                            <div className="horizontal-container">
                              <img src={usa} alt="usa" />
                              <div className='name2'> 달러 USD</div>
                            </div>
                            <br></br>
                            <div > 현찰 살 때: {buyprice_usa} 현찰 팔 때: {sellprice_usa} 송금 보낼 때: {ttbuyprice_usa} 송금 받을 때: {ttsellprice_usa}</div>
                            <br></br>

                            <div className="horizontal-container">
                              <img src={japan} alt="jp" />
                              <div className='name2'> 엔화 JPY</div>
                            </div>
                            <br></br>
                            <div > 현찰 살 때: {buyprice} 현찰 팔 때: {sellprice} 송금 보낼 때: {ttbuyprice} 송금 받을 때: {ttsellprice}</div>
                            <br></br>

                            <div className="horizontal-container">
                              <img src={eu} alt="eu" />
                              <div className='name2'> 유로 EUR</div>
                            </div>
                            <br></br>
                            <div > 현찰 살 때: {buyprice_eu} 현찰 팔 때: {sellprice_eu} 송금 보낼 때: {ttbuyprice_eu} 송금 받을 때: {ttsellprice_eu}</div>
                            <br></br>
                            
                            <div className="horizontal-container">
                              <img src={china} alt="china" />
                              <div className='name2'> 위안 CNY</div>
                            </div>
                            <br></br>
                            <div > 현찰 살 때: {buyprice_china} 현찰 팔 때: {sellprice_china} 송금 보낼 때: {ttbuyprice_china} 송금 받을 때: {ttsellprice_china}</div>
                            <br></br>
                    
                        </div>
                
            </div>
            
    )
  };
  export default Exchange;