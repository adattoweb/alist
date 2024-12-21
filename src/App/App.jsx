import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Content from '../Content/Content'
import Task from '../Task/Task'
import './App.css'
import LoadScreen from '../LoadScreen/LoadScreen'
import Modal from '../Modal/Modal'
import React, { useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
// ДОБРО ПОЖАЛОВАТЬ В АД!!
// Головне що працює!
export default function App() {
  console.log('App render')
  let arrDefaults = [
    ['background', '#000'],
    ['burger', '#fff'],
    ['color', '#fff'],
    ['mainBackground', '#fff'],
    ['taskBackground', '#fff'],
    ['borderColor', '#000']
  ]
  for(let i = 0; i < arrDefaults.length; i++){
    if(localStorage.getItem(arrDefaults[i][0]) === null) localStorage.setItem(arrDefaults[i][0], arrDefaults[i][1])
  }
  const [isChange, setChange] = useState(false)
  const [isEn, setIsEn] = useState(false)
  const [isNeed, setIsNeed] = useState(false)
  const [currentPage, setCurrentPage] = useState('Main')
  const [isLoading, setIsLoading] = useState(true)
  const [background, setBackground] = useState(localStorage.getItem('background'))
  const [burger, setBurger] = useState(localStorage.getItem('burger'))
  const [color, setColor] = useState(localStorage.getItem('color'))
  const [mainBackground, setMainBackground] = useState(localStorage.getItem('mainBackground'))
  const [borderColor, setBorderColor] = useState(localStorage.getItem('borderColor'))
  localStorage.setItem('background', background)
  localStorage.setItem('burger', burger)
  localStorage.setItem('color', color)
  localStorage.setItem('mainBackground', mainBackground)
  localStorage.setItem('borderColor', borderColor)
  console.log(localStorage)
  useEffect(() => {
    let borders = document.querySelectorAll('.border')
    borders.forEach(el => {
      el.style.borderColor=localStorage.getItem('borderColor')
    })
  })
  useEffect(() => {
    let lines = document.querySelectorAll('.line')
    lines.forEach(el => {
        el.style.backgroundColor=localStorage.getItem('burger')
    })
  })
  useEffect(() => {
    document.getElementById('root').style.backgroundColor=localStorage.getItem('mainBackground')
  })
  useEffect(() => {
    let colors = document.querySelectorAll('.color')
    colors.forEach(el => {
        el.style.color=localStorage.getItem('color')
    })
  })
  useEffect(() => {
    let backgrounds = document.querySelectorAll('.background')
    backgrounds.forEach(el => {
        el.style.backgroundColor=localStorage.getItem('background')
    })
  })

  useEffect(() => {
    const timer = setTimeout(() => {setIsLoading(false)}, 2000)
    return () => clearTimeout(timer)
  }, [])

  if(isLoading) {
    return <LoadScreen></LoadScreen>
  } else if(isNeed === true){
    return <Modal isEn={isEn} 
    onBurgerClick={() => {
      setIsNeed(!isNeed)
    }} 
    isNeed={isNeed} 
    changePage={() => {
      if(currentPage === 'Main') setCurrentPage('Tasks')
      else setCurrentPage('Main')
      setIsNeed(false)
    }} 
    currentPage={currentPage}
    changeLang = {() => {
      setIsEn(!isEn);
      console.log(isEn)
    }}
    ></Modal>
  } else if(currentPage === "Tasks"){
    return (
      <>
        <Header onBurgerClick={() => {
          setIsNeed(!isNeed)
        }}></Header>
        <Task 
        isEn={isEn} 
        backgroundFunc={(e) => setBackground(e)} background={background}
        burgerFunc={(e) => setBurger(e)} burger={burger}
        colorFunc={(e) => setColor(e)} color={color}
        mainFunc={(e) => setMainBackground(e)} mainBackground={mainBackground}
        setChange={(e) => setChange(e)} isChange={isChange}
        borderColorFunc={(e) => setBorderColor(e)} borderColor={borderColor}
        ></Task> 
        <Footer isEn={isEn}></Footer>
        <Modal isNeed={isNeed}></Modal>
      </>
    )
  } else {
    return (
      <>
      <Header onBurgerClick={() => {
        setIsNeed(!isNeed)
      }}></Header>
      <Content isEn={isEn} onButtonClick={() => setCurrentPage('Tasks')}></Content>
      <Footer isEn={isEn}></Footer>
      <Modal isNeed={isNeed} isEn={isEn}></Modal>
      </>
    )
  }
}
