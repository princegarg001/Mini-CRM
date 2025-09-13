import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "./authSlice";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL; // must be set in frontend/.env

  const onSubmit = async (data) => {
    if (!API_URL) {
      console.error("VITE_API_URL is not defined in .env");
      return;
    }

    try {
  const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        // Save token and user info to Redux
        dispatch(setCredentials(json));

        // Redirect to dashboard
        navigate("/dashboard", { replace: true });
      } else {
        alert(json.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <div className="auth">
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: true })}
        />
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: true })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
