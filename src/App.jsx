import schema from "../form/example-data-schema.json";
import { Form } from "@rjsf/daisyui";
import validator from "@rjsf/validator-ajv8";
import initFormData from "./init-form-data.json";

function App() {
  console.log('>>>initFormData', initFormData);

  const handleSubmit = (e) => {
    console.log('>>>handleSubmit', e);
    msgToIframe(e, e.formData);
  };

  function msgToIframe(event, data) {
    console.log("msgToIframe", {
      event,
      data,     
    });
    
    // include type:config
    document
      .getElementById("cross_domain_page")
      .contentWindow.postMessage({type:"config", config: data}, "http://localhost:5173");
  }

  return (
    <main className="bg-gray-100 min-h-screen w-full flex flex-row">
      <div className="w-1/2 mx-auto">
        <div className="bg-white p-8 max-w-2xl w-full flex justify-center">
          <Form schema={schema} validator={validator} onSubmit={handleSubmit} formData={initFormData} />
        </div>
      </div>

      <div className="w-1/2 mx-auto">
        <iframe id="cross_domain_page" src="http://localhost:5173?src=msg" height="500px" width="500px"></iframe>
      </div>
    </main>
  );
}

export default App;
