function Test() {
    return (
        <button onClick={() => {
            document.getElementById('cross_domain_page').contentWindow.postMessage({"test":"value"}, "http://localhost:3000/");
        }}>
            Test Post Message
        </button>
    );
}

export default Test;