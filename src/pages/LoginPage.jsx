// 1. Importera in useState
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginPage() {
    // 2. definiera state variabler: email och password
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    // 3. Skapa en funktion som triggas när formuläret submittas
    function handleOnSubmit(e) {
        e.preventDefault()
        const url = "https://lab.willandskill.eu/api/v1/auth/api-token-auth/"
        const payload = {email, password}
        fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            const token = data.token
            localStorage.setItem("webb21-lesson5", token)
            navigate('/posts')
        })
    }

    return (
        <div>
            Login
            {/* 4. Skapa formulär, funktion ovan ska triggas när man skickar in formuläret */}
            <form onSubmit={handleOnSubmit}>
                {/* 5. Skapa två inputs kopplade till våra state variabler */}
                <input 
                    type="text" 
                    value={email}  
                    onChange={e => setEmail(e.target.value)} 
                    placeholder="Email"
                />
                <input 
                    type="password" 
                    value={password}  
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Password"
                />
                {/* 6. Skapa en knapp som submittar formuläret */}
                <button type="submit">Login</button>
            </form>
        </div>
    )
}
