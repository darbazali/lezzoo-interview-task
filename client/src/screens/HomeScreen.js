import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { listStores } from '../actions/storeActions'
import axios from 'axios'

import { createStore } from '../actions/storeActions'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [image, setImage] = useState('')
  const [message, setMessage] = useState('')

  const { loading, stores, error } = useSelector((state) => state.storeList)
  const { success } = useSelector((state) => state.storeCreate)

  useEffect(() => {
    dispatch(listStores())
  }, [dispatch, success])

  // file uploader hander
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    // setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)
      setImage(data)
      // setUploading(false)
    } catch (error) {
      console.error(error)
      // setUploading(false)
    }
  }

  // submit hander
  const submitHandler = (e) => {
    e.preventDefault()
    if (!name || !image) {
      setMessage('Please fill all the fields')
    } else {
      dispatch(
        createStore({
          name,
          logo: image,
        })
      )
      setName('')
      setImage('')
    }
  }

  return (
    <div>
      <h1>Stores</h1>

      <form onSubmit={submitHandler}>
        <div className='input-field'>
          <label htmlFor='name'>Name:</label>
          <input
            type='text'
            name='name'
            id='name'
            placeholder='Store name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='input-field'>
          <input
            type='file'
            name='logo'
            // value={image}
            onChange={uploadFileHandler}
          />
        </div>
        <button className='btn primary' type='submit'>
          Create
        </button>
      </form>
      {message && <h4 style={{ color: 'red' }}>{message}</h4>}
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2 style={{ color: 'red' }}>{error}</h2>
      ) : (
        stores.map((store) => (
          <div key={store.id}>
            <h2>{store.name}</h2>
            <img src={store.logo} alt={store.name} />
          </div>
        ))
      )}
    </div>
  )
}

export default HomeScreen
