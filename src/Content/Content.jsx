import './Content.css'
import {useState} from 'react'

export default function Content(props){
    console.log('Main render')
    const {onButtonClick, isEn} = props;
    const ListItem = (props) => {
        const [isActive, setActive] = useState(false)
        const {children} = props
        return (
            <li onClick={() => setActive(!isActive)} className={isActive ? 'active' : ''}>{children}</li>
        )
    }

    return(
        <div className="content">
            <div className="content-child">
                <h3>ALIST</h3>
                <h5>{isEn ? 'Your day planner!' : 'Твій планувальник дня!'}</h5>
                <ul>
                    <ListItem>{isEn ? 'Plan your week' : 'Плануй свій тиждень'}</ListItem>
                    <ListItem>{isEn ? 'Create your theme' : 'Створюй свою тему'}</ListItem>
                    <ListItem>{isEn ? 'Reach your goals' : 'Досягай вершин'}</ListItem>
                </ul>
                <div className="button" onClick={onButtonClick}>
                    {isEn ? 'Start' : 'Почати'}
                </div>

            </div>
        </div>
    )
}