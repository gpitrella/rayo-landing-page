import { useState } from "react";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

function Checkbox({ label, checked = false, onChange }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(newChecked);
    }
  };

  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <input type="checkbox" checked={isChecked} onChange={handleChange} className="hidden" />
      <div className={`w-5 h-5 border rounded ${isChecked ? "bg-blue-500" : "bg-white"}`}></div>
      <span>{label}</span>
    </label>
  );
}

export { Checkbox }