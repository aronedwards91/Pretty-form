<script>
  let name = '';
  let email = '';
  let message = '';
  let submitted = false;

  function handleSubmit() {
    submitted = true;
    // In a real app, you'd send this data to a server
    console.log('Form submitted:', { name, email, message });
  }

  function resetForm() {
    name = '';
    email = '';
    message = '';
    submitted = false;
  }
</script>

<main>
  <div class="container">
    <header>
      <h1>Pretty Form</h1>
      <p>A lightweight Svelte webpage</p>
    </header>

    {#if !submitted}
      <form on:submit|preventDefault={handleSubmit} class="form">
        <div class="form-group">
          <label for="name">Name</label>
          <input 
            id="name"
            type="text" 
            bind:value={name} 
            required 
            placeholder="Enter your name"
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input 
            id="email"
            type="email" 
            bind:value={email} 
            required 
            placeholder="Enter your email"
          />
        </div>

        <div class="form-group">
          <label for="message">Message</label>
          <textarea 
            id="message"
            bind:value={message} 
            required 
            placeholder="Enter your message"
            rows="4"
          ></textarea>
        </div>

        <button type="submit" class="submit-btn">Submit</button>
      </form>
    {:else}
      <div class="success">
        <h2>Thank you!</h2>
        <p>Your message has been submitted successfully.</p>
        <button on:click={resetForm} class="reset-btn">Send Another Message</button>
      </div>
    {/if}
  </div>
</main>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  main {
    width: 100%;
    max-width: 500px;
    padding: 2rem;
  }

  .container {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }

  header {
    text-align: center;
    margin-bottom: 2rem;
  }

  h1 {
    color: #333;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }

  p {
    color: #666;
    font-size: 1.1rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    font-weight: 600;
    color: #333;
    font-size: 0.9rem;
  }

  input, textarea {
    padding: 0.75rem;
    border: 2px solid #e1e5e9;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.2s ease;
  }

  input:focus, textarea:focus {
    outline: none;
    border-color: #667eea;
  }

  .submit-btn, .reset-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .submit-btn:hover, .reset-btn:hover {
    transform: translateY(-2px);
  }

  .success {
    text-align: center;
    padding: 2rem 0;
  }

  .success h2 {
    color: #333;
    margin-bottom: 1rem;
  }

  .success p {
    color: #666;
    margin-bottom: 2rem;
  }

  .reset-btn {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }

  @media (max-width: 600px) {
    main {
      padding: 1rem;
    }
    
    .container {
      padding: 1.5rem;
    }
    
    h1 {
      font-size: 2rem;
    }
  }
</style> 