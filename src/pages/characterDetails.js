import React, { useEffect } from 'react'
import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import MakeGetRequest from '../api/getApi';
import { IMAGE_URL } from '../api/backend';

function CharacterDetails() {
    const {State, dispatch} = useAppContext()
    const { id } = useParams();
    
    const {character} = State;

    useEffect(()=> {
        getCharacter();
      },[]);

      const getCharacter = async () => {
        console.log(id, "Peopleeee")
        const data = await MakeGetRequest(`/people/${id}`);
        if (data?.response?.status != 403) {
          await dispatch({ type: "SET_CHARACTER_ARRAY", payload: data.result });
        }
        
      }
      const data = character?.peopleArr
      let newUrl = IMAGE_URL.replace(/\/\d+\.jpg$/, `/${id}.jpg`);
  return (
    <div>
              {data &&
            <div>
                <img src = {newUrl}/>
                <div>Name : {data.name}</div>
                <div>height : {data.height}</div>
                <div>Gender: {data.gender}</div>
                <div>Birth Year : {data.birth_year}</div>
            </div>
}
    </div>
  )
}

export default CharacterDetails
