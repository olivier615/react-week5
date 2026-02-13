type QuantityControlProps = {
  quantity: number
  onIncrease: () => void
  onDecrease: () => void
  waiting: boolean
}

export const QuantityControl = ({
  quantity,
  onIncrease,
  onDecrease,
  waiting
}: QuantityControlProps) => {
  const isMin = quantity === 1

  const decreaseDisabled = isMin || waiting
  const increaseDisabled = waiting

  return (
    <div className="d-flex justify-content-end fs-3">
      <i
        className={`bi bi-dash-circle-fill ${
          decreaseDisabled ? 'text-secondary' : 'text-primary'
        }`}
        onClick={decreaseDisabled ? undefined : onDecrease}
        style={{ cursor: decreaseDisabled ? 'not-allowed' : 'pointer' }}
      ></i>

      <p className="mb-0 mx-3">{quantity}</p>

      <i
        className={`bi bi-plus-circle-fill ${
          increaseDisabled ? 'text-secondary' : 'text-primary'
        }`}
        onClick={increaseDisabled ? undefined : onIncrease}
        style={{ cursor: increaseDisabled ? 'not-allowed' : 'pointer' }}
      ></i>
    </div>
  )
}
