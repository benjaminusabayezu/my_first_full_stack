import { useState } from "react";
import api from '../../api/axios'

const CreateAdmin = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/create-admin/", form);

      setMessage(response.data.message);

      setForm({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error.response?.data);

      setMessage("Failed to create admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="p-6 shadow-lg rounded-lg w-96">
        <h2 className="text-2xl mb-4">Create Admin</h2>

        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="border p-2 w-full mb-3"
        />

        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="border p-2 w-full mb-3"
        />

        <input
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          className="border p-2 w-full mb-3"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Admin
        </button>

        <p className="mt-3">{message}</p>
      </form>
    </div>
  );
};

export default CreateAdmin;
