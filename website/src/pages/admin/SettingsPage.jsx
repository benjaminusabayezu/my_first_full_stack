import { useEffect, useState } from "react";
import AdminLayout from "../../layouts/AdminLayout";

import { getSettings, updateSettings } from "../../api/settingsApi";

import GeneralSettings from "../../components/admin/settings/GeneralSettings";
import EmailSettings from "../../components/admin/settings/EmailSettings";
import UserSettings from "../../components/admin/settings/UserSettings";
import CourseSettings from "../../components/admin/settings/CourseSettings";
import SecuritySettings from "../../components/admin/settings/SecuriySettings";

const SettingsPage = () => {
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await getSettings();

      setSettings(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const saveSettings = async () => {
    try {
      await updateSettings(settings);

      alert("Settings updated");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        {" "}
        <div className="bg-zinc-900/50 rounded-md flex items-center justify-center gap-1.5 text-xl font-bold">
          <div className="w-8 h-8 border-4 border-t-transparent rounded-full border-l-lime-600 border-r-yellow-500 animate-spin" />
          Wait...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-black text-yellow-500">Settings</h1>

          <p className="text-zinc-400">Manage platform configuration</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-modal">
          <GeneralSettings settings={settings} handleChange={handleChange} />

          <EmailSettings settings={settings} handleChange={handleChange} />

          <UserSettings settings={settings} handleChange={handleChange} />

          <CourseSettings settings={settings} handleChange={handleChange} />

          <SecuritySettings settings={settings} handleChange={handleChange} />
        </div>

        <button
          onClick={saveSettings}
          className="
          bg-yellow-500 
          px-6 py-3 
          rounded-lg 
          text-zinc-900 
          font-bold
          "
        >
          Save Settings
        </button>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;
