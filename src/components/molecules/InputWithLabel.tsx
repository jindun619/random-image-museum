import {Input} from "../atoms/Input";

export function InputWithLabel({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="label">
        <span className="text-base label-text">{label}</span>
      </label>
      <Input type={type} placeholder={placeholder} />
    </div>
  );
}
