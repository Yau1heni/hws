import React, {useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState, saveState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)

    const start = () => {
        stop()
        let timerId = window.setInterval(() => {
            setDate(new Date())
        }, 1000)
        setTimerId(timerId)
    }

    const stop = () => {
        clearInterval(timerId)
        setTimerId(undefined)
        saveState('hw9-date', date)
    }

    const onMouseEnter = () => {
        setShow(true)
    }
    const onMouseLeave = () => {
        setShow(false)
    }

    /*const addZero = (num: number):string => ('0' + num).slice(-2)*/
    /* `${addZero(date.getHours())}:${addZero(date.getMinutes())}`*/
    /*date?.toLocaleTimeString('ru-RU',{hour12: false, timeStyle: 'short'})*/

    const stringTime = new Intl.DateTimeFormat('ru-RU', {hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date) || <br/>
    const stringDate = date?.toLocaleDateString('ru-RU') || <br/>

    const stringDay = new Intl.DateTimeFormat('en-US', {weekday: 'long'}).format(date) || <br/>
    const stringMonth = new Intl.DateTimeFormat('en-US', {month: 'long'}).format(date) || <br/>

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={!!timerId}
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={!timerId}
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
