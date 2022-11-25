import React, { useState } from 'react';
import getWallet from './getWallet'

function App() {
  const [tokens, nfts, getUserWallet] = useState([])
  return (
    <>
      <getWallet userTokens = {tokens} />
      <button>Connect Wallet</button>
      <div>0 Handpicked Tokens</div>
      <div>Images</div>
    </>
  )
}

export default App;
