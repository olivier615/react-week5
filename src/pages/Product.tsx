import { useParams } from 'react-router'

export const Product = () => {
  const { id } = useParams()
  return (
    <>{id}</>
  )
}