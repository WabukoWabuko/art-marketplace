export default function LimitedEditionBadge({ editionNumber, totalEditions }) {
  return (
    <div className="inline-block bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
      Limited Edition {editionNumber}/{totalEditions}
    </div>
  )
}