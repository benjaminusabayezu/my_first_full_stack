const EmailSettings = ({ settings, handleChange }) => {
  return (
    <div className="bg-zinc-900 p-6 rounded-lg">
      <h2 className="text-yellow-500 font-bold mb-4">Email Settings</h2>

      <input
        name="support_email"
        value={settings.support_email || ""}
        onChange={handleChange}
        placeholder="Support email"
        className="input"
      />

      <input
        name="smtp_host"
        value={settings.smtp_host || ""}
        onChange={handleChange}
        placeholder="SMTP host"
        className="input mt-3"
      />

      <input
        name="smtp_port"
        value={settings.smtp_port || ""}
        onChange={handleChange}
        placeholder="SMTP port"
        className="input mt-3"
      />
    </div>
  );
};

export default EmailSettings;
