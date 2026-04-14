export const ENV = {
  // API_URL: import.meta.env.VITE_API_URL ?? 'http://localhost:8080',
  API_URL:
    import.meta.env.VITE_API_URL ??
    "https://flipkart-style-ecommerce-backend.onrender.com",
  CLOUDINARY_CLOUD: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME ?? "",
  CLOUDINARY_PRESET: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET ?? "",
} as const;
