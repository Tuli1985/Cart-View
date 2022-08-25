import React, { useState, useEffect } from 'react'
import ItemDetail from './ItemDetail'
import Loader from './Loader'
import { useParams } from 'react-router-dom'

function ItemDetailContainer() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const params = useParams()
  const itemIndex = Number(params.id) - 1

  useEffect(() => {
    setLoading(true)

    let promiseItems = new Promise((resolve, reject) => {
      resolve(
        fetch('https://fakestoreapi.com/products').then(res => res.json())
      )
    })

    promiseItems.then(respuesta => {
      setItems(respuesta)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <>
        <div className="detail-container" style={{ height: '100vh' }}>
          <Loader />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="detail-container">
        <ItemDetail data={items[itemIndex]} />
      </div>
    </>
  )
}
export default ItemDetailContainer
