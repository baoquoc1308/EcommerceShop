export const fetchApi = async (methodCallApi, urlApiDomain, pathName, handleResponse, handleError, variables) => {
    // const token = localStorage.getItem('data?.token')
    const token = localStorage.getItem('token')
    try {
      const response = await fetch(`${urlApiDomain}/${pathName}`, {
        method: `${methodCallApi}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(variables),
      })
  
      const data = await response.json()
      if (response.ok) {
        handleResponse(data)
      }  else {
        handleError(data)
      }
    } catch (error) {
      handleError(error)
      if (error.response) {
        if (error.response.status === 401) {
          console.error('Lỗi 401 Unauthorized: Mã token không hợp lệ hoặc đã hết hạn.');
        } else {
          console.error('Lỗi HTTP:', error.response.status, error.response.statusText);
        }
      } else if (error.request) {
        console.error('Không thể kết nối đến máy chủ.');
      } else {
        console.error('Lỗi gửi yêu cầu:', error.message);
      }
    }
  }
  
//   export const isAccessTokenValid = () => {
//     const accessToken = localStorage.getItem('accessToken')
//     if (!accessToken) {
//       return false
//     }
  
//     const accessTokenData = JSON.parse(atob(accessToken.split('.')[1]))
//     return accessTokenData.exp * 1000 > Date.now()
//   }