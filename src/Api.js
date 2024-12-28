import React, { useEffect, useState } from 'react'

function useApi(url){
    const [data,setData]=useState();
    useEffect(()=>{
       getData(); 
    },[]);

  async function getData(){
    try {
        const response = await fetch(url);
      
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const res = await response.json();
        setData(res);
        // return res;
       
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
  }
 
  return data;
}



export default useApi
