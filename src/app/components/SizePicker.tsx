const sizeOptions = ['7', '8', '9', '10', '11']

interface SizePickerProps {
  size: string;
  onChange: (size: string) => void;
}

export function SizePicker({ size, onChange }: SizePickerProps) {
  return (
    <div className="relative">
      <select
        value={size}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl text-sm text-gray-900 font-medium cursor-pointer appearance-none shadow-sm hover:border-gray-300 transition-colors duration-200"
      >
        {sizeOptions.map((option) => (
          <option key={option} value={option}>
            US {option}
          </option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
