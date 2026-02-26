import { ENV } from '@/config/env'

export const uploadToCloudinary = async (file: File): Promise<string> => {
  if (!ENV.CLOUDINARY_CLOUD || !ENV.CLOUDINARY_PRESET)
    throw new Error('Cloudinary env vars missing. Check VITE_CLOUDINARY_CLOUD_NAME & VITE_CLOUDINARY_UPLOAD_PRESET')

  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', ENV.CLOUDINARY_PRESET)

  const res  = await fetch(`https://api.cloudinary.com/v1_1/${ENV.CLOUDINARY_CLOUD}/image/upload`, { method: 'POST', body: formData })
  const json = await res.json()

  if (!res.ok || !json.secure_url) throw new Error(`Cloudinary upload failed: ${json?.error?.message ?? res.statusText}`)
  return json.secure_url as string
}
