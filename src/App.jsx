import schema from "../form/cyoa-schema.json";
import { Form } from "@rjsf/daisyui";
import validator from "@rjsf/validator-ajv8";
import initFormData from "./init-form-data.json";
import { useEffect, useRef, useState } from "react";
import SaveMenu from "./SaveMenu";

function App() {
  const [formData, setFormData] = useState(initFormData);

  const handleSubmit = (e) => {
    msgToIframe(e.formData);
  };

  function msgToIframe(data) {
    // include type:config
    const iframe = document.getElementById("cross_domain_page");
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
  const formRef = useRef(null);

  const handleApplyClick = () => {
    if (formRef.current) {
      formRef.current.submit();
    }
  };

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

  const handleLoad = (data) => {
    setFormData(data);
  };

  return (
    <main
      className="bg-gray-100 min-h-screen w-full flex flex-row"
      style={{ width: "100vw" }}
    >
      <div className="w-1/2 mx-auto bg-gray-200 max-h-screen h-screen overflow-y-scroll relative">
      <div className="mt-8 mx-8 flex justify-end gap-8">
        <SaveMenu onLoad={handleLoad} formRef={formRef} />
      </div>
        <div className="p-8 max-w-2xl w-full flex justify-center">
          <Form
            ref={formRef}
            schema={schema}
            validator={validator}
            onSubmit={handleSubmit}
            formData={formData}
            onChange={(e) => setFormData(e.formData)}
          />
        </div>

        <button 
          onClick={handleApplyClick}
          className={`fixed bottom-4 right-1/2 bg-blue-500
          hover:bg-blue-600 text-white font-semibold
          py-2 px-4 rounded-lg shadow-lg
          cursor-pointer transition-colors duration-200
          `}>
          Apply
        </button>
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
