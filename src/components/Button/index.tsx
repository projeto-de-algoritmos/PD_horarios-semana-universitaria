interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function Button({ text, ...rest } : ButtonProps) {
  return (
    <button 
      className="bg-blue-500 rounded-full px-4 py-2 mr-2 text-white active:bg-blue-200 hover:bg-blue-400 transition"
      {...rest}
    >
      {text}
    </button>
  );
}