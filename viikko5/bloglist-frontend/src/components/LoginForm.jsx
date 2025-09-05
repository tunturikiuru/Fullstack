const LoginForm = ({ username, setUsername, password, setPassword, handleLogin }) => {

  return (
    <>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>
            username
            <input type='text' value={username} onChange={({ target }) => setUsername(target.value)}/>
          </label>
        </div>
        <div>
          <label>
            password
            <input type='password' value={password} onChange={({ target }) => setPassword(target.value)}/>
          </label>
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm