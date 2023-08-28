import React, {useState, useEffect} from 'react'
import axios from 'axios'
import { IoMdRainy, IoMdSunny, IoMdThunderstorm, IoMdSnow, IoMdSearch, IoMdCloudy, IoMdCloudyNight } from 'react-icons/io'
import { BsCloudHaze2Fill, BsFillCloudDrizzleFill } from 'react-icons/bs'
import {TbTemperatureCelsius,} from 'react-icons/tb'
import {ImSpinner8} from 'react-icons/im'


const APIkey = 'ac6cf02876786f0e7edfac537346ee65'

const App = () => {
  const [data, setData] = useState(null)
  const [location, setLocation] = useState('Nigeria')
  const [inputvalue, setInputvalue] = useState('')
  const [animate, setAnimate] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
   const [temperatureUnit, setTemperatureUnit] = useState('celsius');
  

  const handleInput = (e) => {
    setInputvalue(e.target.value)
  }
 
    const handlesubmit = (e) =>{
      console.log(inputvalue)
if (inputvalue !==''){
  setLocation(inputvalue)
}

const input = document.querySelector('input')

if (input.value === ''){
  setAnimate(true)

  setTimeout(()=>{
    setAnimate('fasle')
  },500)
}

input.value =''

      e.preventDefault()
    }
  
    const toggleTemperatureUnit = () => {
      setTemperatureUnit(prevUnit => prevUnit === 'celsius' ? 'fahrenheit' : 'celsius');
    }

  useEffect(()=>{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`

    axios.get(url).then(res => {
      setData(res.data)
    }).catch(err => {
      setErrorMsg(err)
    })
  },[location])
useEffect(()=>{
  const timer = setTimeout(()=>{
    setErrorMsg('')
  },2000)
  return()=> clearTimeout(timer)
},[errorMsg])

  console.log(data)

  if(!data){
    return(
      <div>
        <div>
          <ImSpinner8 className='text-5x1 animate-spin'/>
        </div>
      </div>
    )

      }

      let icon
   console.log(data.weather[0].main)

   switch(data.weather[0].main){
    case 'Clouds':
      icon = <IoMdCloudy/>
      break
      case 'Dark':
        icon = <IoMdCloudyNight/>
        break
      case 'Mist':
        icon = <BsCloudHaze2Fill/>
        break
        case 'Rain':
          icon = <IoMdRainy className='text-blue-700'/>
          break
          case 'Clear':
            icon = <IoMdSunny className='text-[#ffde33]'/>
            break
            case 'Drizzle':
              icon = <BsFillCloudDrizzleFill className='text-blue-700'/>
              break
              case 'Snow':
                icon = <IoMdSnow className='text-blue-700'/>
                break
                case 'Thunderstorm':
                  icon = <IoMdThunderstorm/>
                  break
   }

   const temperature = temperatureUnit === 'celsius' ? parseInt(data.main.temp) : (parseInt(data.main.temp) * 9/5) + 32;
const date = new Date()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  bg-[url('./Background1.jpg')] bg-no-repeat bg-cover ">
<div className="w-full md:max-w-lg  bg-slate-400 p-4 md:p-8 rounded-md bg-slate-500  ">
{errorMsg && <div className='text-center capitalize text-[20px] '>{`${errorMsg.response.data.message}`}</div>}
  <form className={`${animate ? 'aniamte-shake' : 'animate-none'}h-16 w-[100%] bg-[#9575CD]`} >
    <div className='h-full relative flex items-center justify-between p-2'>
      <input onChange={(e) => handleInput(e)}
      className='flex-1 bg-transparent outline-none placeholder:text-white text-white text-[20px] font-light pl-6 h-full'
      type='text' placeholder='SEARCH BY CITY OR COUNTRY' />
      <button onClick={(e)=> handlesubmit (e)} 
      className='bg-blue-800 w-20 h-12 rounded-full flex justify-center items-center hover:bg-[#15abdd] transition'>
        <IoMdSearch className='text-2x1 text-white'/>
        </button>
    </div>
  </form>
  <div className='flex gap-4 md:gap-8 mt-4 md:mt-8'>
  <div className=' text-[100px] '>{icon}</div>
  <div className='text-lg  mt-[20px]  '>{data.name}, {data.sys.country}</div>
 
      </div>
      <div className='flex'>
    <div className='capitalize ml-[15px] -mt-[6px] text-[20px]'>{data.weather[0].description}</div>
    <div className='text-[20px] -mt-[6px] ml-[15px]'>{date.getUTCDate()}/{date.getUTCMonth() + 1}/{date.getUTCFullYear()}</div>
    </div>
 
  <div className='flex ml-[30%] text-[100px] sm:text-[20px] lg:text-[100px]'> 
  <div>{temperature}</div> 
        <div 
        >{temperatureUnit === 'celsius' ? <TbTemperatureCelsius /> : <span>&#8457;</span>}</div>
    
    
    </div>

<div className='text-5xl md:text-3xl'>
  <div className='ml-[40%] md:ml-0 text-[20px] md:text-base '>WEATHER INFORMATION </div>
  <div className='flex justify-around mt-[20px]'>
    <div className='text-base md:text-lg'>FEELS LIKE</div>
    <div className='flex items-center text-base md:text-lg'>
  <div>{parseInt(data.main.feels_like)}</div>
  <div className='ml-2'><TbTemperatureCelsius/></div>
  </div>
  </div>
  <div className='flex justify-around mt-[20px]'>
    <div className='text-base md:text-lg'>HUMIDITY</div>
  <div className='text-base md:text-lg'>{data.main.humidity}%</div>
  </div>
  <div className='flex justify-around mt-[20px]'>
    <div className='text-base md:text-lg'>WIND SPEED</div>
  <div className='text-base md:text-lg'>{data.wind.speed}km/h</div>
  </div>
  </div>   
  <button 
  onClick={toggleTemperatureUnit} className='bg-blue-800 w-20 h-12 rounded-full flex justify-center items-center hover:bg-[#15abdd] transition ml-[45%] mt-[20px]'>
        F
      </button>


</div>

       </div>
 
    
  )
 }

export default App

