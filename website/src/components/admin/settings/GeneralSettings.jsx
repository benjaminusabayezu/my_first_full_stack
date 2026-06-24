const GeneralSettings = ({ settings, handleChange }) => {
  return (
    <div className="bg-zinc-900 p-6 rounded-md">
      <h2 className="text-yellow-500 font-bold mb-4">General Settings</h2>

      <input
        name="platform_name"
        value={settings.platform_name || ""}
        onChange={handleChange}
        placeholder="Platform name"
        className="input"
      />

      <input
        name="company_name"
        value={settings.company_name || ""}
        onChange={handleChange}
        placeholder="Brand name"
        className="input mt-3"
      />

      <textarea
        name="platform_description"
        value={settings.platform_description || ""}
        onChange={handleChange}
        placeholder="Description"
        className="input mt-3"
      />
    </div>
  );
};

export default GeneralSettings;
