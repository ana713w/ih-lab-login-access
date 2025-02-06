import { useEffect, useState } from "react";
import { profile,} from "../../services/api-service";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    profile()
      .then(setUser)
      .catch(() => {
        navigate("/login");
    });
      
  }, []);


  return (
    <div>
      <p>Hola {user?.name}</p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
