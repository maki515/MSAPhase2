import React from 'react'
import { Provider } from 'react-redux'
import { store } from './store'
import { CryptoPriceChecker } from './CryptoPriceChecker'

function App() {
  return (
    <Provider store={store}>
      <CryptoPriceChecker />
    </Provider>
  )
}

export default App

