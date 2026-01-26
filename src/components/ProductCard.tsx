import { Link } from 'react-router'
import type { ProductData } from "../types/product"
type ProductCardProps = {
  product: ProductData
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="card">
      <img src={product.imageUrl} className="card-img-top" alt={product.title} />
      <div className="card-body">
        <h5 className="card-title">
          {product.title}
          <span className="badge bg-primary ms-2">{product.category}</span>
        </h5>
        <p className="card-text">{product.content}</p>
        <div className="d-flex justify-content-end">
          <div className="btn-group">
            <Link to={`/product/${product.id}`} className="btn btn-outline-primary">查看商品細節</Link>
            <a href="#" className="btn btn-outline-primary" aria-current="page">加入購物車</a>
          </div>
        </div>
      </div>
    </div>
  )
}