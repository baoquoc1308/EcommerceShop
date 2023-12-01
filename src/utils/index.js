// Chuyển đổi số thành một chuỗi.
/* .replace(): Phương thức chuỗi trong JavaScript, được sử dụng để thay thế các chuỗi con bằng chuỗi khác.
  \B: Ký tự đặc biệt đại diện cho một vị trí không phải là biên giới từ (non-word boundary). Điều này đảm bảo rằng chỉ có các chữ số nằm giữa các biên giới từ mới được thay thế.
  (?=(\d{3})+(?!\d)): Một positive lookahead, đảm bảo rằng sau mỗi ba chữ số, không có chữ số nào khác nằm sau. Điều này giúp áp dụng thay thế chỉ cho các chữ số hàng nghìn.
  \d{3}: Biểu thức chính quy đại diện cho ba chữ số.
  +: Ít nhất một hoặc nhiều lần lặp lại.
  (?!\d): Negative lookahead, đảm bảo rằng không có chữ số nào nằm ngay sau ba chữ số. Điều này giúp ngăn chặn thay thế ở những vị trí không phải là biên giới hàng nghìn cuối cùng.
  '.': Chuỗi con được sử dụng để thay thế các vị trí phù hợp, tức là thêm dấu chấm phân cách hàng nghìn. */
const formatNumber = number => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export { formatNumber }
