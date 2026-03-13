import { X, Upload } from 'lucide-react'
import type { ImageType } from '@/types/product.types'

const COLORS = [
  { color: 'Black',  colorCode: '#000000' },
  { color: 'White',  colorCode: '#FFFFFF' },
  { color: 'Red',    colorCode: '#EF4444' },
  { color: 'Blue',   colorCode: '#3B82F6' },
  { color: 'Green',  colorCode: '#22C55E' },
  { color: 'Yellow', colorCode: '#EAB308' },
  { color: 'Gray',   colorCode: '#9CA3AF' },
    {color: "Deep Blue", colorCode: "#003049"},
    {color: "Cosmic Orange", colorCode: "#F77F00"},
    {color: "Silver", colorCode: "#F3F4F4"},
    {color: "Navy", colorCode: "#000080"},

]

interface Props {
  images: ImageType[]
  onChange: (color: string, colorCode: string, file: File | null) => void
}

const ColorImageSection = ({ images, onChange }: Props) => {
  const getImage = (color: string) => images.find(i => i.color === color)

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider">
        Product Images <span className="text-red-400">*</span>
      </h3>
      <p className="text-xs text-slate-400">Upload one image per color variant</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {COLORS.map(({ color, colorCode }) => {
          const existing = getImage(color)
          const preview = existing?.imageUrl instanceof File
            ? URL.createObjectURL(existing.imageUrl)
            : null

          return (
            <label key={color} className={`relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all
              ${existing ? 'border-primary bg-primary/5' : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'}`}>
              <input type="file" accept="image/*" className="sr-only"
                onChange={e => onChange(color, colorCode, e.target.files?.[0] ?? null)} />

              {/* Color dot */}
              <div className="flex items-center gap-1.5">
                <span className="w-3.5 h-3.5 rounded-full border border-slate-300 flex-shrink-0"
                  style={{ background: colorCode }} />
                <span className="text-xs font-medium text-slate-600">{color}</span>
              </div>

              {/* Preview or upload placeholder */}
              {preview ? (
                <div className="relative w-full">
                  <img src={preview} alt={color} className="w-full h-16 object-contain rounded" />
                  <button type="button"
                    onClick={e => { e.preventDefault(); onChange(color, colorCode, null) }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center shadow-sm">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <div className="w-full h-16 flex flex-col items-center justify-center text-slate-300 gap-1">
                  <Upload className="w-5 h-5" />
                  <span className="text-[10px]">Upload</span>
                </div>
              )}
            </label>
          )
        })}
      </div>
    </div>
  )
}
export default ColorImageSection
