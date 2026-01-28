type QuantityControlProps = {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
}

export const QuantityControl = ({
  quantity,
  onIncrease,
  onDecrease,
}: QuantityControlProps) => {

  const isMin = quantity === 1

  return (
    <div className="d-flex justify-content-end fs-3">
      <i
        className={`bi bi-dash-circle-fill ${
          isMin ? 'text-secondary' : 'text-primary'
        }`}
        onClick={isMin ? undefined : onDecrease}
        style={{ cursor: isMin ? 'not-allowed' : 'pointer' }}
      ></i>
      <p className="mb-0 mx-3">{quantity}</p>
      <i
        className="bi bi-plus-circle-fill text-primary"
        onClick={onIncrease}
        style={{ cursor: 'pointer' }}
      ></i>
    </div>
  )
}
