import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext';
import MakeGetRequest from '../api/getApi';
import { IMAGE_URL } from '../api/backend';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const {State, dispatch} = useAppContext()
    const {character} = State;
    const navigate = useNavigate()
    useEffect(()=> {
        getCharacters();
      },[]);

      const getCharacters = async () => {
        const data = await MakeGetRequest(`/people`);
        if (data?.response?.status != 403) {
          await dispatch({ type: "SET_CHARACTERS_ARRAY", payload: data.result });
          console.log(data.result)
        }
        
      }
      const getId = (url) => {
        
        let parts = url.split('/');
        return  parts[parts.length - 2];

      }
      
  return (
    <div style={{display: "flex"}}>
        {character?.characterArr?.results?.map((item)=> {
            const id = getId(item.url)
            let newUrl = IMAGE_URL.replace(/\/\d+\.jpg$/, `/${id}.jpg`);
            return (
                <div onClick={() => navigate(`/details/${id}`)}>
                 <img src = {newUrl} />
                 <div style={{fontWeight:"bold"}}>{item.name}</div>
                 </div>
            )
        })}
    </div>
  )
}

export default HomePage
