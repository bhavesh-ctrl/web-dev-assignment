export default function Home(){
  return (
    <main className="container py-8">
      <div className="card">
        <h1 className="text-2xl font-bold">Web Dev Assignment</h1>
        <p className="mt-2">Use the routes:</p>
        <ul className="list-disc ml-6 mt-2">
          <li><a className="text-blue-600 underline" href="/addSchool">/addSchool</a></li>
          <li><a className="text-blue-600 underline" href="/showSchools">/showSchools</a></li>
        </ul>
      </div>
    </main>
  );
}
