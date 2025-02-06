import { useState } from "react";
import { register, login } from "../../services/api-service";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleSubmit = (event) => {
    event.preventDefault();
    register({ name, email, password })
      .then(() => {
        login({ email, password })
          .then(() => {
            navigate("/"); 
          })
          .catch(() => {
            alert("Credenciales incorrectas");
          });
      })
      .catch(() => {
        alert("Error al registrar el usuario");
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="name"
          />
        </div>
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
