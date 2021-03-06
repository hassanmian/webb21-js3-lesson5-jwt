// Importera in funktionen som vi använder 
// för att trigga en funktion när komponenten laddas in.
// Importera även in useState
import React, {useState, useEffect} from 'react'
import PrivateRoute from '../components/PrivateRoute'

export default function MyPage() {
    // Skapa en state variabel som vi sparar responsen från
    // API:et i
    const [myData, setMyData] = useState(null)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")

    // Skriv en funktion som triggas när komponenten laddas in.
    // Glöm inte "tom array" som andra parameter.
    // Anropa api:t -> https://lab.willandskill.eu/api/v1/me
    // Glöm inte skicka med headers för Content-Type och Authorization
    // Authorization ska se ut så här: `Bearer {token}`.
    // Spara responsen i en state variabel
    useEffect(() => {
        const url = "https://lab.willandskill.eu/api/v1/me/"
        const token = localStorage.getItem("webb21-lesson5")
        const headers = {
            // Vi skickar data i JSON format, så vi behöver tala
            // om det för API:t
            'Content-Type': 'application/json',
            // För att API:t ska veta vilken användare vi är
            // så måste vi skicka med vår token.
            // API:t har bestämt att token ska ligga i en header
            // som heter Authorization.
            // Utöver det så vill API:t att vi prepender
            // "Bearer" innan token.
            'Authorization': `Bearer ${token}`
        }
        fetch(url, {
            // Vi använder för fördefinierade headers
            // (i variabeln "headers") och skickar med de.
            headers: headers,
        })
        .then(res => res.json())
        .then(data => {
            setMyData(data)
            setFirstName(data.firstName)
            setLastName(data.lastName)
        })

    }, [])

    function handleOnSubmit(e) {
        e.preventDefault()
        const url = "https://lab.willandskill.eu/api/v1/me/"
        const token = localStorage.getItem("webb21-lesson5")
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        const payload = {firstName, lastName}
        fetch(url, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(data => {
            setMyData(data)
            setFirstName(data.firstName)
            setLastName(data.lastName)
        })

    }

    return (
        <PrivateRoute>
            <div>
                My Information
                {/* Rendera innehållet från state variabeln */}
                {/* Bekräfta att myData inte är null (vi satte start värdet
                till null på state variabeln) */}
                {myData && (
                    <>
                    <form onSubmit={handleOnSubmit}>
                        <input 
                            value={firstName} 
                            onChange={e => setFirstName(e.target.value)}
                        />
                        <input 
                            value={lastName} 
                            onChange={e => setLastName(e.target.value)}
                        />
                        <button type="submit">Update Information</button>
                    </form>
                        <p>{myData.firstName}</p>
                        <p>{myData.lastName}</p>
                        <p>{myData.email}</p>
                    </>
                )}
            </div>
        </PrivateRoute>
    )
}
