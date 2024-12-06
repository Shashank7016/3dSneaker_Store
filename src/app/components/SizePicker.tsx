const sizeOptions = ['7', '8', '9', '10', '11']

export function SizePicker({ size, onChange }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">Choose Size</h3>
      <select
        value={size}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded-md"
      >
        {sizeOptions.map((option) => (
          <option key={option} value={option}>
            US {option}
          </option>
        ))}
      </select>
    </div>
  )
}