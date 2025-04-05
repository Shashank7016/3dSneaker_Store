import { useState, useEffect } from 'react'

const colorNames: { [key: string]: string } = {
  '#FF0000': 'Red',
  '#00FF00': 'Green',
  '#0000FF': 'Blue',
  '#FFFF00': 'Yellow',
  '#FF00FF': 'Magenta',
  '#00FFFF': 'Cyan',
  '#000000': 'Black',
  '#FFFFFF': 'White',
  '#808080': 'Gray',
  '#800000': 'Maroon',
  '#808000': 'Olive',
  '#008000': 'Dark Green',
  '#800080': 'Purple',
  '#008080': 'Teal',
  '#000080': 'Navy',
  '#FFA500': 'Orange',
  '#A52A2A': 'Brown',
  '#FFC0CB': 'Pink',
  '#FFD700': 'Gold',
  '#C0C0C0': 'Silver',
}

function getColorName(hex: string): string {
  const normalizedHex = hex.toUpperCase()
  return colorNames[normalizedHex] || 'Custom'
}

interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [colorName, setColorName] = useState('')

  useEffect(() => {
    setColorName(getColorName(color))
  }, [color])

  return (
    <div className="flex items-center space-x-2">
      <input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-10 h-10 rounded-full overflow-hidden"
      />
      <span className="text-sm font-medium">
        {colorName} ({color})
      </span>
    </div>
  )
}