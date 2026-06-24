const CourseSettings = ({ settings, handleChange }) => {
  return (
    <div className="bg-zinc-900 p-6 rounded-lg">
      <h2 className="text-yellow-500 font-bold">Course Settings</h2>

      <label className="flex gap-3 mt-4 text-sm font-medium text-zinc-500">
        <input
          type="checkbox"
          name="auto_publish_courses"
          checked={settings.auto_publish_courses || false}
          onChange={handleChange}
          className="w-5 h-5"
        />
        Auto publish courses
      </label>

      <label className="flex gap-3 mt-4 text-sm text-zinc-500 font-medium">
        <input
          type="checkbox"
          name="require_course_approval"
          checked={settings.require_course_approval || false}
          onChange={handleChange}
          className="w-5 h-5"
        />
        Require approval
      </label>
    </div>
  );
};

export default CourseSettings;
