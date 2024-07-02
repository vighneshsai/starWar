
function MakeGetCharacterRequest ( url,contentType = 'application/json')  {
    const FetchData = async() => {
        try {
            let response = await fetch(url, {
                method: "GET",
                
                headers: {
                    'Content-Type': contentType,
                    
                }
            })
            if (response.status === 401 || response.status === 403) {
                return { response }
            }
            let result
            if (response.status == 201 || response.status == 200) {
                result = await response.json();
                return {result, response}
            }
        } catch (error) {
            console.log(error)
            return {
                error,
                response: null
            }
        }
    }
    return FetchData()
    
}

export default MakeGetCharacterRequest