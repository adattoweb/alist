import './Task.css'
import {useState, useEffect} from 'react';
import edit from '../assets/images/edit.png'
import deletei from '../assets/images/delete.png'

export default function Task(props){
    console.log('Task render')
    const {background, backgroundFunc,
         burger, burgerFunc,
         color, colorFunc,
         mainFunc, mainBackground,
         isChange, setChange,
         isEn, borderColor,
         borderColorFunc
        } = props;

    const [taskBackground, setTaskBackground] = useState(localStorage.getItem('taskBackground'))
    localStorage.setItem('taskBackground', taskBackground)
    useEffect(() => {
        let tasksbg = document.querySelectorAll('.backgroundtwo')
        tasksbg.forEach(el => {
            el.style.backgroundColor=localStorage.getItem('taskBackground')
        })
      })
      
    const [isSettingClicked, setSettingClicked] = useState(false)
    const TaskItem = (props) => {
        console.log('TaskItem render')
        const {day} = props;
        const [isInput, setInput] = useState(false)
        const [nameValue, setNameValue] = useState('')
        const [descValue, setDescValue] = useState('')
        const [change, setChange] = useState(false)

        // ТУТ Я ВІДДІЛЯЮ ЧИСЛО ВІД БУКВОЧОК НАПРИКЛАД ПОНЕДІЛОК, 24 ЛИСТОПАДА ===> 24;
        let numberDay = '';
        for(let i = 0; i < day.length; i++){
            if(day[i] == +day[i]) numberDay += day[i]
        }

        const deleteTask = (titleTask) => {
            localStorage.removeItem(`a-task${numberDay.trim()}${titleTask}`)
            setChange(!change)
        }

        // Знак оклику тут і подалі виступає як роздільник
        const addTask = () => {
            if(nameValue.length < 2 === false){
                if(!descValue.length){
                    localStorage.setItem(`a-task${numberDay.trim()}${nameValue.trim()}`, `${nameValue}! `)
                } else {
                    localStorage.setItem(`a-task${numberDay.trim()}${nameValue.trim()}`, `${nameValue}!${descValue}`)
                }
                setNameValue('');
                setDescValue('')
        }}


        
        const TaskListItem = (props) => {
            console.log('TaskListItem render')
            const {title, desc, active = false, id} = props;
            const [isActive, setActive] = useState(active)
            const [isEditing, setEditing] = useState(false)
            const [titleEdit, setTitleEdit] = useState(title)
            const [descEdit, setDescEdit] = useState(desc)

            const editTask = () => {
                setEditing(false)
                localStorage.removeItem(`a-task${numberDay.trim()}${title}`)
                localStorage.setItem(`a-task${numberDay.trim()}${titleEdit}`, `${titleEdit}!${descEdit}!${isActive}`) // НАФІГА ТІТЛ ТАСК???
            }

            const changeActive = () => {
                setActive(!isActive)
                let result = !isActive + "";
                console.log(result)
                localStorage.removeItem(`a-task${numberDay.trim()}${titleEdit}`)
                localStorage.setItem(`a-task${numberDay.trim()}${titleEdit}`, `${titleEdit}!${descEdit}!${result}`)
                console.log(localStorage.getItem(`a-task${numberDay.trim()}${titleEdit}`))
            }

            return (
            <li className='task-list-item border'>
                <div className={isActive ? 'circle active' : 'circle'} onClick={() => changeActive()}></div>
                {isEditing ? 
                <div className="edit-list">
                    <div className="input-list">
                        <input type="text" value = {titleEdit} onChange={(e) => setTitleEdit(e.target.value)}/>
                        <input type="text" value={descEdit} onChange={(e) => setDescEdit(e.target.value)}/>
                    </div>
                    <div className="task-buttontwo background color border" onClick={() => editTask()}>+</div>
                </div>
                :
                <><h5>{titleEdit}</h5>
                <p>{descEdit}</p></>
                }
                <div className="list-images">
                    <img src={edit} onClick={() => setEditing(true)}/>
                    <img src={deletei} onClick={() => deleteTask(title)}/>
                </div>
            </li>
            )
        }


        let counterTasks = 0;

        const newDay = day.replace('ю', 'я').replace('у,', 'а')
        return (
        <div className="border backgroundtwo task-item">
            <h3 className='background color'>{newDay}</h3>
            <div className="task-content">
                <ul className="task-list">
                    {Object.keys(localStorage).map(el =>{ // КАПЄЦ ТУТ КАША
                            if(el.includes(`a-task`)){ // КОРОЧЕ ЛОГІКА В ЧОМУ
                                // КОЛИ Я ПЕРЕВІРЯВ ЧИ ВКЛЮЧАЄ ЕЛЕМЕНТ a-task(дата) - то іноді воно працювало не правильно
                                // Наприклад якщо буде число 30, то умова буде дійсна для 30 і 3 умова (el.includes(`a-task{numberDay.trim()}`))
                                // Для вирішення проблеми була розроблена мною певна логіка
                                // Вдалого розібрання цієї шедевро логіки
                                if(numberDay.trim().length === 1 && el[6] == numberDay.trim()[0] && +el[7] != el[7]){
                                    counterTasks++;
                                    let arrValues = localStorage[el].split('!')
                                return <TaskListItem active={arrValues[2] == "true" ? true : false} key={arrValues[0]} title={arrValues[0]} desc={arrValues[1]}></TaskListItem>
                                }
                                if(numberDay.trim().length === 2 && el[6] == numberDay.trim()[0] && +el[7] == numberDay.trim()[1]){
                                    counterTasks++
                                    let arrValues = localStorage[el].split('!')
                                return <TaskListItem active={arrValues[2] == "true" ? true : false} key={arrValues[0]} title={arrValues[0]} desc={arrValues[1]}></TaskListItem>
                                }
                            }
                        })
                    }
                    {counterTasks === 0 && <p className="task-info">{isEn ? 'Create your first task!' : 'Створіть першу свою задачу!'}</p>}
                </ul>
    {isInput && (<li className='task-input border active'>
                    <div className="task-inputs">
                        <input value={nameValue} onChange={(e) => setNameValue(e.target.value)} type="text" placeholder='Назва'/>
                        <input value={descValue} onChange={(e) => setDescValue(e.target.value)}  type="text" placeholder="Опис"/>
                    </div>
                    <div className="task-buttontwo background color border" onClick={() => addTask()}>+</div>
                </li>)}
            </div>
            <div className="task-button background color border" onClick={() => setInput(!isInput)}>+</div>
        </div>
        )




    }

    if(localStorage.getItem('days') === null) localStorage.setItem('days', 7) // Стандартне значення days якщо нема
    const [days, setDays] = useState(localStorage.getItem('days'))
    const arrDays = []
    const dateNow = new Date()

    useEffect(() => { 
        localStorage.setItem('days', days)
    }, [days]) // оновлюємо дані коли змінюється days

    for(let i = 0; i <= days-1; i++){
        let date = new Date(dateNow.getTime() + (86400000 * i))
        if(!isEn) arrDays.push(date.toLocaleDateString('uk-UA', { weekday: 'long', month: 'long', day: 'numeric' }))
        if(isEn) arrDays.push(date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }))
    }

    const settingsClear = () => {
        let arrDefaults = [
            ['background', '#000'],
            ['burger', '#fff'],
            ['color', '#fff'],
            ['mainBackground', '#fff'],
            ['taskBackground', '#fff'],
            ['borderColor', '#000']
          ]
          for(let i = 0; i < arrDefaults.length; i++){
            localStorage.removeItem(arrDefaults[i][0])
            localStorage.setItem(arrDefaults[i][0], arrDefaults[i][1])
          }
          backgroundFunc('#000')
          burgerFunc('#fff')
          colorFunc('#fff')
          mainFunc('#fff')
          setTaskBackground('#fff')
          borderColorFunc('#000')
          console.log(localStorage)
    }
    return (
        <div className="task">
            <div className="button task-btn background border" onClick={() => {
                setSettingClicked(!isSettingClicked); 
                setChange(!isChange)}
                }>{isEn ? 'Settings' : 'Налаштування'}</div>
            {isSettingClicked && (            <div className="task-header background">
                <div className="task-header-item">
                    <label className='color'>{isEn ? 'Number of days' : 'Кількість днів'}</label>
                    <input type="number" value={days} onChange={(e) => setDays(e.target.value)}/>
                </div>
                <div className="task-header-item">
                    <label className='color'>{isEn ? 'Text color (HEX)' : 'Колір тексту (HEX)'}</label>
                    <input type="text" value={color} onChange={(e) => colorFunc(e.target.value)}/>
                </div>
                <div className="task-header-item">
                    <label className='color'>{isEn ? 'Background color' : 'Колір фону'}</label>
                    <input type="text" value={background} onChange={(e) => backgroundFunc(e.target.value)}/>
                </div>
                <div className="task-header-item">
                    <label className='color'>{isEn ? 'Main background color' : 'Колір головного фону'}</label>
                    <input type="text" value={mainBackground} onChange={(e) => mainFunc(e.target.value)}/>
                </div>
                <div className="task-header-item">
                    <label className='color'>{isEn ? 'Burger color' : 'Колір бургеру'}</label>
                    <input type="text" value={burger} onChange={(e) => burgerFunc(e.target.value)}/>
                </div>
                <div className="task-header-item">
                    <label className='color'>{isEn ? 'Day background color' : 'Колір фону дня'}</label>
                    <input type="text" value={taskBackground} onChange={(e) => setTaskBackground(e.target.value)}/>
                </div>
                <div className="task-header-item">
                    <label className='color'>{isEn ? 'Border color' : 'Колір кордонів'}</label>
                    <input type="text" value={borderColor} onChange={(e) => borderColorFunc(e.target.value)}/>
                </div>
                <p className="color hinfo">{isEn ? 'You can select colors using the search query Color Picker.' : 'Кольори можна обирати за допомогою пошукового запиту Color Picker'}</p>
                <div className="button-reset" onClick={() => settingsClear()}>{isEn ? 'Reset styles' : 'Обнулити стилі'}</div>
            </div>)}
            <div className="task-child">
                {arrDays.map((el, index) => {
                    return <TaskItem key={`task${index}`} day={el}></TaskItem>
                })
                }
            </div>
        </div>
    )
}