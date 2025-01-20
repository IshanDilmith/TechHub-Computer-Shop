import React, { useState } from 'react'
import toast, { Toaster } from "react-hot-toast";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const ContactUs = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message
        }

        const xhr = new XMLHttpRequest()
        xhr.open('POST', 'http://localhost:3000/contactUs/', true)
        xhr.setRequestHeader('Content-Type', 'application/json')
        xhr.onload = () => {
            console.log(xhr.responseText)

            if(xhr.status === 200){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Email Sent Successfully!!",
                    showConfirmButton: false,
                    timer: 1500
                });
                setName('')
                setEmail('')
                setSubject('')
                setMessage('')

            } else {
                toast.error('Failed to send message')
            }
        }

        xhr.send(JSON.stringify(formData))
        
    }

    return (
        <div>
            <Toaster />
            <h1>Contact Us</h1>
            
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" className="form-control" id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required/>
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" className="form-control" id="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required/>
                </div>
                <div className="form-group">
                    <label>Subject:</label>
                    <input type="text" className="form-control" id="subject" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required/>
                </div>
                <div className="form-group">
                    <label>Message:</label>
                    <textarea className="form-control" id="message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )

}
export default ContactUs