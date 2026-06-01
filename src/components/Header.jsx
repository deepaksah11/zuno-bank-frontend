// components/Header.jsx
const Header = ({ title }) => {
  return (
    <div className="flex justify-between items-center mb-12 bg-white px-8 py-6 rounded-2xl shadow">
      <h1 className="text-3xl font-bold text-[#0A2463]">{title}</h1>
    </div>
  );
};

export default Header;