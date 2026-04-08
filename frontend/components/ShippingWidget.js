export default function ShippingWidget({ onShippingChange }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const shippingInfo = {
      address: formData.get('address'),
      city: formData.get('city'),
      country: formData.get('country'),
      zipCode: formData.get('zipCode'),
    }
    onShippingChange(shippingInfo)
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Address</label>
          <input type="text" name="address" className="border rounded px-3 py-2 w-full" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">City</label>
          <input type="text" name="city" className="border rounded px-3 py-2 w-full" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Country</label>
          <input type="text" name="country" className="border rounded px-3 py-2 w-full" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Zip Code</label>
          <input type="text" name="zipCode" className="border rounded px-3 py-2 w-full" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Update Shipping</button>
      </form>
    </div>
  )
}