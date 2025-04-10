
const apiURL = 'http://localhost:8000/'
export const submitForm = async (data) => {
    const body = JSON.stringify(data)
    const headers = {
        'Accept': "application/json, text/plain, */*",
        "Content-Type": "application/json",
    }
    try {
        const response = await fetch(`${apiURL}api/v1/calculator/`, {
            method: "POST",
            headers: headers,
            body,
        });
        const json = await response.json()
        return json
    } catch (error) {
        console.log(error)
    }
    
}
