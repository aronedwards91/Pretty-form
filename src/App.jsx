import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
    // In a real app, you'd send this data to a server
    console.log('Form submitted:', formData)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      message: ''
    })
    setSubmitted(false)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <main>
      <div className="container">
        <header>
          <h1>Pretty Form</h1>
          <p>A lightweight React webpage</p>
        </header>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input 
                id="name"
                name="name"
                type="text" 
                value={formData.name}
                onChange={handleInputChange}
                required 
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                id="email"
                name="email"
                type="email" 
                value={formData.email}
                onChange={handleInputChange}
                required 
                placeholder="Enter your email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required 
                placeholder="Enter your message"
                rows="4"
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Submit</button>
          </form>
        ) : (
          <div className="success">
            <h2>Thank you!</h2>
            <p>Your message has been submitted successfully.</p>
            <button onClick={resetForm} className="reset-btn">Send Another Message</button>
          </div>
        )}
      </div>
    </main>
  )
}

export default App 