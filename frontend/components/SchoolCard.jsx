export default function SchoolCard({ school, apiBase }){
  const imgSrc = school.image ? `${apiBase}/${school.image}` : '/no-image.png';
  return (
    <div className="card">
      <div className="w-full h-40 overflow-hidden rounded-xl mb-3 bg-gray-100 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img alt={school.name} src={imgSrc} className="object-cover w-full h-full" />
      </div>
      <h3 className="text-lg font-semibold">{school.name}</h3>
      <p className="text-sm text-gray-600">{school.address}</p>
      <p className="text-sm text-gray-600">{school.city}</p>
    </div>
  );
}
