import { useState } from "react";
import { login } from "../../services/api-service";
import { useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("juan.perez58@email.com");
  const [password, setPassword] = useState("SecurePassword123");
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault(); 
    login({ email, password })
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        alert("Credenciales incorrectas"); 
      });
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="name@example.com"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password" 
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar
        </button>
      </form>
    </div>
  );
}
