
export const Cart = () => {
  return (
    <>
      <p className="text-center fs-3">購物車列表</p>
      <table className="table">
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">商品名稱</th>
            <th scope="col">價格</th>
            <th scope="col">購買數量</th>
            <th scope="col">金額</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}