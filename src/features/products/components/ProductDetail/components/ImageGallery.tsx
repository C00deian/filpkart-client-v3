import { useState } from 'react'
import type { UploadedImageType } from '@/types/product.types'

interface Props { images: UploadedImageType[] }

const ImageGallery = ({ images }: Props) => {
  const [selected, setSelected] = useState(0)
  const [selectedColor, setSelectedColor] = useState(images[0]?.color ?? '')

  const current = images.find(i => i.color === selectedColor) ?? images[0]

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className="bg-white rounded shadow-card p-6 aspect-square flex items-center justify-center">
        <img
          src={current?.imageUrl ?? 'https://via.placeholder.com/400'}
          alt="Product"
          className="max-w-full max-h-[360px] object-contain"
        />
      </div>

      {/* Color Variants */}
      {images.length > 1 && (
        <div className="flex gap-2 flex-wrap">
          {images.map((img, i) => (
            <button key={img.color}
              onClick={() => { setSelectedColor(img.color); setSelected(i) }}
              className={`flex items-center gap-1.5 border-2 rounded px-2.5 py-1.5 text-xs font-medium transition-all
                ${selectedColor === img.color
                  ? 'border-primary bg-primary/5 text-primary'
                  : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
              <span className="w-3 h-3 rounded-full border border-white shadow-sm" style={{ background: img.colorCode }} />
              {img.color}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
export default ImageGallery
