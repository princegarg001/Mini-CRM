import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      let json = {};
      try {
        json = await res.json();
      } catch (e) {
        // If not JSON, fallback
        json = { message: "Unknown error" };
      }

      if (res.ok) {
        alert("Registered! Please login.");
        navigate("/login", { replace: true });
      } else {
        alert(json.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  return (
    <div className="auth">
      <h2>Register</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && <span style={{ color: 'red' }}>{errors.name.message}</span>}
        <input
          type="email"
          placeholder="Email"
          {...register("email", { required: "Email is required" })}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email.message}</span>}
        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <span style={{ color: 'red' }}>{errors.password.message}</span>}
        <select defaultValue="" {...register("role", { required: "Role is required" })}>
          <option value="" disabled>Select role</option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        {errors.role && <span style={{ color: 'red' }}>{errors.role.message}</span>}
        <button type="submit" disabled={isSubmitting}>Register</button>
      </form>
    </div>
  );
}
