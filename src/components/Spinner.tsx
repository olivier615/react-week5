export const BorderSpinner = () => {
  return (<div className="d-flex justify-content-center">
    <div className="spinner-border" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>)
}

export const GrowingSpinnerButton = () => {
  return (<button className="btn btn-primary" type="button" disabled>
    <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
    <span role="status">請稍後...</span>
  </button>)
}