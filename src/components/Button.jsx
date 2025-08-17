function Button({ children, onClick }) {
  return (
    <button
      className={`bg-blue-600 hover:bg-blue-700
        text-white font-medium
        px-4 py-2 rounded-md
        transition-colors cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
