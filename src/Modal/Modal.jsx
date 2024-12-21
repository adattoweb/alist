import './Modal.css'

import github from '../assets/images/github.png'
import telegram from '../assets/images/telegram.png'
import discord from '../assets/images/discord.png'
import polygon from '../assets/images/polygon.png'

export default function Modal(props){
    const {isNeed, onBurgerClick, changePage, currentPage, changeLang, isEn} = props;
    if(isNeed === true){
    const NavModal = (props) => {
        const {isActive = false, children, onClick} = props;
        const isCopy = false;
        return (
            <li onClick={onClick}><p>{isActive && <img src={polygon}/>}{children}</p></li>
        )
    }
    return (
        <div className="modal">
            <div className="modal-contact">
                <a href="https://github.com/adattoweb" target="_blank" className="modal-citem github">
                    <div className="modal-citem-container">
                        <h3>GitHub</h3>
                        <img src={github} alt="github" />
                    </div>
                </a>
                <a href="https://t.me/adattoweb" target="_blank" className="modal-citem telegram">
                    <div className="modal-citem-container">
                        <h3>Telegram</h3>
                        <img src={telegram} alt="telegram" />
                    </div>
                </a>
                <a onClick={() => {
                    navigator.clipboard.writeText('@adattoweb')
                }} href="#" className="modal-citem discord">
                    <div className="modal-citem-container">
                        <h3>Discord</h3>
                        <img src={discord} alt="discord" />
                    </div>
                </a>
            </div>
            <div className="modal-parent">
                <div className="modal-close">
                    <div className="burger-menu active" onClick={onBurgerClick}>
                        <div className="line"></div>
                        <div className="line"></div>
                        <div className="line"></div>
                    </div>
                </div>
                <div className="modal-list">
                    <ul>
                        <NavModal onClick={changePage} isActive = {currentPage==="Main"}>{isEn ? 'MAIN' : 'ГОЛОВНА'}</NavModal>
                        <NavModal onClick={changePage} isActive={currentPage === 'Tasks'}>{isEn ? 'TASKS' : 'ЗАДАЧІ'}</NavModal>
                        <NavModal onClick={changeLang}>{isEn ? 'UA' : 'EN'}</NavModal>
                    </ul>
                </div>
            </div>
        </div>
    )
}
}