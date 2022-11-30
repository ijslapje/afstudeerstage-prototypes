import {useState, useEffect} from 'react'
import './App.css'
import axios from 'axios'
//import UserData from './dummydata.json'
//import AttachMoneyRoundedIcon from '@mui/icons-material/AttachMoneyRounded';


function App() {
  const [img, setImg] = useState('')
  const [token, setToken] = useState('')

  const getData = () =>{
    axios.get('http://localhost:8000/api')
    .then(res => {
      console.log(res.data)
      setImg(res.data.img)
      setToken(res.data.result.tokenContract)
    }).catch(err =>{
      console.log(err)
    })
  }

  useEffect(() => {

    async function run() {

        getData()

    }

    run()
  }, [])

  return (
    <div className="App">
      {token && <p>{token}</p> }
      {img && <img src={img}></img> }
    </div>
  )
}

export default App
