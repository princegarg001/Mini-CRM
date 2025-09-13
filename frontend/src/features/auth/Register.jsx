import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json().catch(() => ({ message: "Unknown error" }));

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
    <div className="crm-register-bg">
      <div className="crm-register-card">
        <img
          src="/images/OIP (1).jpeg"
          alt="Logo"
          className="crm-register-logo"
        />
        <h2 className="crm-register-title">Create your Mini CRM account</h2>
        <p className="crm-register-sub">Manage your customers and leads in one place.</p>
        <form onSubmit={handleSubmit(onSubmit)} className="crm-register-form">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Enter your name"
            {...register("name", { required: "Name is required" })}
            className={errors.name ? "crm-register-input error" : "crm-register-input"}
          />
          {errors.name && <span className="crm-register-error">{errors.name.message}</span>}

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            {...register("email", { required: "Email is required" })}
            className={errors.email ? "crm-register-input error" : "crm-register-input"}
          />
          {errors.email && <span className="crm-register-error">{errors.email.message}</span>}

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
            className={errors.password ? "crm-register-input error" : "crm-register-input"}
          />
          {errors.password && <span className="crm-register-error">{errors.password.message}</span>}

          <label htmlFor="role">Role</label>
          <select
            id="role"
            defaultValue=""
            {...register("role", { required: "Role is required" })}
            className={errors.role ? "crm-register-input error" : "crm-register-input"}
          >
            <option value="" disabled>
              Select role
            </option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && <span className="crm-register-error">{errors.role.message}</span>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="crm-register-btn"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="crm-register-login-link">
          Already have an account?{' '}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
