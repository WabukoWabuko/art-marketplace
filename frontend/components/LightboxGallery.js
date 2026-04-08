import { useState } from 'react'

export default function LightboxGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Artwork ${index + 1}`}
            className="w-full h-32 object-cover rounded cursor-pointer"
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Selected" className="max-w-full max-h-full" />
        </div>
      )}
    </>
  )
}