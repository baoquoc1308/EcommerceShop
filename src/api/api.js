// Dòng này định nghĩa một hàm không đồng bộ (asynchronous) tên là fetchApi và xuất nó ra khỏi module. Hàm này nhận vào 6 tham số:
export const fetchApi = async (
  methodCallApi, // Phương thức HTTP sẽ được sử dụng cho cuộc gọi API (ví dụ: 'GET', 'POST', 'PUT').
  urlApiDomain, // Địa chỉ cơ sở của API.
  pathName, // Đường dẫn của điểm cuối API.
  handleResponse, // Một hàm gọi lại để xử lý phản hồi thành công từ API.
  handleError, // Một hàm gọi lại để xử lý lỗi từ API.
  variables // Dữ liệu sẽ được gửi trong phần thân của yêu cầu (cho các phương thức như 'POST' hoặc 'PUT').
) => {
  // const token = localStorage.getItem('data?.token')

  // Lấy giá trị 'token' từ lưu trữ local của trình duyệt.
  const token = localStorage.getItem('token')
  try {
    /* Sử dụng hàm fetch để thực hiện một yêu cầu HTTP không đồng bộ đến điểm cuối API đã được chỉ định.
  - ${urlApiDomain}/${pathName} tạo ra URL đầy đủ.
  - method: ${methodCallApi}`` đặt phương thức HTTP cho yêu cầu.
  - headers bao gồm loại nội dung là JSON và tiêu đề Authorization với token.
  - body: JSON.stringify(variables) gửi phần thân của yêu cầu dưới dạng chuỗi JSON. */
    const response = await fetch(`${urlApiDomain}/${pathName}`, {
      method: `${methodCallApi}`,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(variables),
    })
    // Giải mã phần thân phản hồi thành JSON. Điều này giả định rằng API trả về dữ liệu dưới dạng JSON.
    const data = await response.json()
    // Kiểm tra xem trạng thái phản hồi HTTP có trong khoảng 2xx không (chỉ ra thành công).
    // Gọi hàm gọi lại thích hợp (handleResponse cho thành công, handleError cho lỗi) và truyền dữ liệu đã giải mã.
    if (response.ok) {
      handleResponse(data)
    } else {
      handleError(data)
    }
    // Bắt đầu xử lý ngoại lệ cho mọi lỗi xuất hiện trong khối thử.
  } catch (error) {
    handleError(error)
    // Kiểm tra xem đối tượng error có thuộc tính response hay không. Nếu có, điều này cho thấy lỗi đã xảy ra trong quá trình nhận phản hồi từ API.
    if (error.response) {
      // Nếu mã trạng thái của phản hồi là 401 (Unauthorized), có một thông báo lỗi cụ thể được in ra màn hình console.
      if (error.response.status === 401) {
        console.error(
          'Lỗi 401 Unauthorized: Mã token không hợp lệ hoặc đã hết hạn.'
        )
      } else {
        // Nếu mã trạng thái không phải là 401, có một thông báo lỗi chung được in ra màn hình console.
        // Thông báo này chứa mã trạng thái HTTP và thông điệp trạng thái của phản hồi.
        console.error(
          'Lỗi HTTP:',
          error.response.status,
          error.response.statusText
        )
      }
      // Nếu không có thuộc tính response và có thuộc tính request, điều này chỉ ra rằng yêu cầu tới máy chủ không thành công.
    } else if (error.request) {
      console.error('Không thể kết nối đến máy chủ.')
      // Nếu cả hai điều kiện trước đó không đúng, điều này có thể chỉ ra rằng có một lỗi xảy ra khi gửi yêu cầu.
    } else {
      console.error('Lỗi gửi yêu cầu:', error.message)
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
