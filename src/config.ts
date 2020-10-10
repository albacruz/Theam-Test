export const config = {
  jwtSecret: process.env.ACCESS_TOKEN || "0123456789",
  cloudinaryConfig: {
    // TODO: invalidate this tests config
    cloud_name: process.env["CLOUDINARY_NAME"] || "dzx8vimj3",
    api_key: process.env["CLOUDINARY_KEY"] || "331429352562424",
    api_secret:
      process.env["CLOUDINARY_API_SECRET"] || "E86ZxD_fb8S3VOjwAdvotBQjzTA",
  },
};
