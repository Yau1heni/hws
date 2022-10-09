import React, {ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, useState} from 'react'
import Greeting from './Greeting'
import {UserType} from './HW3'

type addUserCallbackPropsType = (name: string) => void

type GreetingContainerPropsType = {
    users: Array<UserType>
    addUserCallback: addUserCallbackPropsType
}

export const pureAddUser = (name: string, setError: Dispatch<SetStateAction<string>>, setName: Dispatch<SetStateAction<string>>, addUserCallback: addUserCallbackPropsType) => {
    if (!name.trim()) {
        setError('Ошибка! Введите имя!')
    } else {
        addUserCallback(name.trim())
        setName('')
    }
}
export const pureOnBlur = (name: string, setError: Dispatch<SetStateAction<string>>) => { // если имя пустое - показать ошибку
    if (!name.trim()) setError('Ошибка! Введите имя!')
}
export const pureOnEnter = (e: KeyboardEvent<HTMLInputElement>, addUser: () => void) => {
    e.key === 'Enter' && addUser()
}

const GreetingContainer: React.FC<GreetingContainerPropsType> = ({users, addUserCallback}) => {
    const [name, setName] = useState<string>('')
    const [error, setError] = useState<string>('')

    const setNameCallback = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
        error && setError('')
    }
    const addUser = () => {
        pureAddUser(name, setError, setName, addUserCallback)
    }

    const onBlur = () => {
        pureOnBlur(name, setError)
    }

    const onEnter = (e: KeyboardEvent<HTMLInputElement>) => {
        pureOnEnter(e, addUser)
    }

    const totalUsers = users.length
    const lastUserName = users.length !== 0 ? users[users.length - 1].name : ''

    return (
        <Greeting
            name={name}
            setNameCallback={setNameCallback}
            addUser={addUser}
            onBlur={onBlur}
            onEnter={onEnter}
            error={error}
            totalUsers={totalUsers}
            lastUserName={lastUserName}
        />
    )
}

export default GreetingContainer
