import schema from "../form/example-data-schema.json";
import { Form } from "@rjsf/daisyui";
import validator from "@rjsf/validator-ajv8";
import initFormData from "./init-form-data.json";
import { useEffect, useRef } from "react";

function App() {
  console.log(">>>initFormData", initFormData);
  console.log(">>>import.meta.env.VITE_APP_URL", import.meta.env.VITE_APP_URL);

  const handleSubmit = (e) => {
    console.log(">>>handleSubmit", e);
    msgToIframe(e.formData);
  };

  function msgToIframe(data) {
    // include type:config
    const iframe = document.getElementById("cross_domain_page");
    console.log("1>>>msgToIframe", data);
    if (iframe) {
      iframe.contentWindow.postMessage(
        { type: "config", config: data },
        import.meta.env.VITE_APP_URL
      );
    }
  }

  function initialFormLoad() {
    msgToIframe(initFormData);
    setTimeout(() => {
      msgToIframe(initFormData);
    }, 2000);
  }

  const iframeRef = useRef(null);

  // workaround for onload firing before iframe is loaded
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.src = import.meta.env.VITE_APP_URL;
    }
    iframeRef.current?.addEventListener("load", initialFormLoad);
    return () => {
      iframeRef.current?.removeEventListener("load", initialFormLoad);
    };
  }, []);

  return (
    <main
      className="bg-gray-100 min-h-screen w-full flex flex-row"
      style={{ width: "100vw" }}
    >
      <div className="w-1/2 mx-auto bg-gray-200 max-h-screen h-screen overflow-y-scroll">
        <div className="p-8 max-w-2xl w-full flex justify-center">
          <Form
            schema={schema}
            validator={validator}
            onSubmit={handleSubmit}
            formData={initFormData}
          />
        </div>
      </div>

      <div className="w-1/2 mx-auto max-h-screen h-screen bg-gray-300">
        <div className="w-full h-full overflow-y-scroll">
          <iframe
            ref={iframeRef}
            id="cross_domain_page"
            src={`${import.meta.env.VITE_APP_URL}?src=msg`}
            height="100%"
            width="100%"
            onLoad={initialFormLoad}
          ></iframe>
        </div>
      </div>
    </main>
  );
}

export default App;
