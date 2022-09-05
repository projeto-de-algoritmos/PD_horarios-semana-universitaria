interface InputProps {
  label: string;
  type: 'text' | 'number';
  value?: string;
  setValue: (value: string) => void;
}

export function Input({ label, type, value, setValue } : InputProps) {
  return (
    <div className="flex flex-col">
      <label>{ label }</label>
      <input
        type={type}
        value={value}
        min="0"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Digite o nome do local"
        className="p-2 border-2 border-black rounded-md"
      />
    </div>
  );
}