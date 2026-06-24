const SecuritySettings = ({ settings, handleChange }) => {
  return (
    <div className="bg-zinc-900 p-6 rounded-lg">
      <h2 className="text-yellow-500 font-bold">Security Settings</h2>

      <input
        type="number"
        name="session_timeout"
        value={settings.session_timeout || ""}
        onChange={handleChange}
        placeholder="Session timeout"
        className="input mt-4"
      />

      <input
        type="number"
        name="password_min_length"
        value={settings.password_min_length || ""}
        onChange={handleChange}
        placeholder="Minimum password length"
        className="input mt-4"
      />
    </div>
  );
};

export default SecuritySettings;
