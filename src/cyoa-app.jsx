export default function CyoaApp() {
    return (
        <div className="bg-blue-200 rounded-lg shadow-xl p-2 max-w-2xl w-full flex justify-center">
            <h1>Cyoa App</h1>
            <iframe id="cross_domain_page" src="http://localhost:3000/form/" height="500px" width="500px"></iframe>
        </div>
    );
}