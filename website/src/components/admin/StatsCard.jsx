const StatsCard = ({ title, value, icon: Icon }) => {
  return (
    <div
      className="bg-zinc-900/60 rounded-lg p-6 shadow-sm hover:shadow2xl
    hover:transform hover:translate-y-2 hover:cursor-pointer backdrop-blur-2xl hover:shadow-yellow-500
    transition-all duration-300 animate-card"
    >
      <div className="flex justify-between">
        <div>
          <p className="text-zinc-400 font-medium">{title}</p>

          <h2 className="text-xl font-bold text-yellow-500 mt-2">{value}</h2>
        </div>

        <Icon className="w-4 h-4 text-2xl font-black text-yellow-500" />
      </div>
      <p className="text-sm text-yellow-400 opacity-0 hover:opacity-50">
        Real data in a system
      </p>
    </div>
  );
};

export default StatsCard;
