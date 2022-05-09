export default function InputField({ setup, state }) {
  const { label, placeholder, type } = setup;
  const [value, setValue] = state;

  return (
    <label className="input-field">
      <span>{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    </label>
  );
}
