import schema from "../form/example-data-schema.json";
import { Form } from "@rjsf/daisyui";
import validator from "@rjsf/validator-ajv8";
import CyoaApp from "./cyoa-app";

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  function msgToIframe(event, data) {
    console.log(msgToIframe, {
      event,
      data,
    });

    document
      .getElementById("cross_domain_page")
      .contentWindow.postMessage({ test: "value" }, window.location.origin);
  }

  return (
    <main className="bg-gray-100 min-h-screen w-full flex flex-row">
      <div className="w-1/2 mx-auto">
        <div className="bg-white p-8 max-w-2xl w-full flex justify-center">
          <Form schema={schema} validator={validator} onSubmit={handleSubmit} />
        </div>
      </div>

      <div className="w-1/2 mx-auto">
        <button
          onClick={() => {
            msgToIframe();
          }}
        >
          Test Post Message
        </button>

        <CyoaApp />
      </div>
    </main>
  );
}

export default App;
