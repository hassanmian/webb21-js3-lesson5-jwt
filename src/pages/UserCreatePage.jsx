import React, {useState} from 'react'

export default function UserCreatePage() {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")

    const [response, setResponse] = useState(null)


    function renderInput(type, value, setValue, placeholder) {
        return (
            <input 
                type={type}
                value={value}
                onChange={e => setValue(e.target.value)}
                placeholder={placeholder}
            />
        )
    }

    function handleOnSubmit(e) {
        e.preventDefault()
        const url = "https://lab.willandskill.eu/api/v1/auth/users/"
        const payload = {
            firstName,
            lastName,
            email,
            password
        }
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload),
        })
        .then(res => res.json())
        .then(data => setResponse(data))
    }

    return (
        <div>
            <form onSubmit={handleOnSubmit}>
                {renderInput("text", email, setEmail, "Email")}
                {renderInput("text", firstName, setFirstName, "First Name")}
                {renderInput("text", lastName, setLastName, "Last Name")}
                {renderInput("password", password, setPassword, "Password")}
                <button type="submit">Create User</button>
            </form>
            {response && (
                <p>{response.email[0]}</p>
            )}
        </div>
    )
}
