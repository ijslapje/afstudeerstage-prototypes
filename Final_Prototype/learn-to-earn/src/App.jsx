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
      <div className="background">
            <img src="./src/assets/banner.png" alt="" />
      </div>
      <div className="container">
        <div className="portfolio-small">
          <div className="boven">
            <div className="profile-img">
                  <img src="./src/assets/templateIMG.png" />
              </div>
              <div className="stats">    {/* Puur voor de stijl */}
                  <ul>
                    <li><span className='box-int'>1</span> <span className='box-text'>Certification Earned</span></li>
                    <li><span className='box-int'>1</span> <span className='box-text'> Courses Completed</span></li>
                    <li><span className='box-int'>1</span> <span className='box-text'> Hours Spend Studying</span></li>
                  </ul>
              </div>
          </div>
          <div className="onder">
            <div className="tokens">
             <img className='hpt' src="./src/assets/hpt.png"/> 
             {token && <p>{token}</p> }
            </div>
          </div>
        </div>
        <div className="certificaten">
          <h2>Certificaten</h2>
          <div className="NFTs">
            {img && <img src={img}></img> }
            <img src="./src/assets/placeholder.png" alt="" />
            <img src="./src/assets/placeholder.png" alt="" />
            <img src="./src/assets/placeholder.png" alt="" />
          </div>

        </div>
      </div>


    </div>
  )
}

export default App
