import React, {useState} from 'react'

export default function PostCreate(props) {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")

    function handleOnSubmit(e){
        e.preventDefault()
        const url = "https://lab.willandskill.eu/api/v1/forum/posts/"
        const payload = {title, content}
        const token = localStorage.getItem("webb21-lesson5")
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
        fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(payload)
        })
        .then( res => res.json())
        .then(data => props.onSuccess())
    }

    return (
        <div>
            Post Create
            <form onSubmit={handleOnSubmit}>
                <input 
                    placeholder="Title"
                    value={title} 
                    onChange={e => setTitle(e.target.value)} 
                />
                <input 
                    placeholder="Content"
                    value={content} 
                    onChange={e => setContent(e.target.value)} 
                />
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}
