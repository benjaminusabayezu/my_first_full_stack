const UserSettings = ({ settings, handleChange }) => {
  return (
    <div className="bg-zinc-900 p-6 rounded-lg">
      <h2 className="text-yellow-500 font-bold">User Settings</h2>

      <label className="flex gap-3 mt-4 text-zinc-500 text-sm font-medium">
        <input
          type="checkbox"
          name="allow_registration"
          checked={settings.allow_registration || false}
          onChange={handleChange}
          className="w-5 h-5"
          
        />
        Allow Registration
      </label>

      <select
        name="default_role"
        value={settings.default_role || ""}
        onChange={handleChange}
        className="input mt-4"
      >
        <option value="student">Student</option>

        <option value="instructor">Instructor</option>
      </select>
    </div>
  );
};

export default UserSettings;
