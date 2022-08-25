import React, { useState, useEffect } from 'react'
import ItemList from './ItemList'
import Loader from './Loader'
import { useParams } from 'react-router-dom'

function ItemListContainer(props) {
  const { categoryId } = useParams(),
    [items, setItems] = useState([]),
    [loading, setLoading] = useState(false),
    categories = [
      'electronics',
      'jewelery',
      "men's clothing",
      "women's clothing"
    ],
    selectedCategory = categories[categoryId - 1]

  useEffect(() => {
    setLoading(true)
    let promiseItems = new Promise((resolve, reject) => {
      resolve(
        fetch('https://fakestoreapi.com/products').then(res => res.json())
      )
    })

    promiseItems.then(respuesta => {
      categoryId
        ? setItems(
            respuesta.filter(product => product.category == selectedCategory)
          )
        : setItems(respuesta)

      setLoading(false)
    })
  }, [categoryId])

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
      <div className="greeting">A comprar perra!</div>
      <div className="cards-container">
        <ItemList data={items} />
      </div>
    </>
  )
}

export default ItemListContainer
