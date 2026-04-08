export default function SocialShareButtons({ url, title }) {
  const shareUrl = encodeURIComponent(url)
  const shareTitle = encodeURIComponent(title)

  return (
    <div className="flex space-x-2">
      <a
        href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-400 text-white px-3 py-2 rounded hover:bg-blue-500"
      >
        Twitter
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
      >
        Facebook
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-700 text-white px-3 py-2 rounded hover:bg-blue-800"
      >
        LinkedIn
      </a>
    </div>
  )
}