
const apiURL = 'http://localhost:8000/'
export const submitForm = async (data) => {
    const body = JSON.stringify(data)
    // debugger
    const headers = {
        'Accept': "application/json, text/plain, */*",
        // 'X-CSRFToken': csrfTokenCookie,
        // 'Authorization': `Bearer ${token}`,
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": '*',
    }
    const response = await fetch(`${apiURL}api/v1/calculator/`, {
        method: "POST",
        headers: headers,
        // credentials: 'include',
        body,
    });
    return response.json();
}
