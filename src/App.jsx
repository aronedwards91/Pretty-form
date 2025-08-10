import { useState } from "react";
import schema from "../form/example-data-schema.json";
import { Form } from "@rjsf/daisyui";
import validator from "@rjsf/validator-ajv8";
import Test from "./test";
import CyoaApp from "./cyoa-app";

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.value);
  };

  return (
    <main>
      <div className="">
        <header className="m-10">
          <h1>Pretty Form</h1>
          <p>A lightweight React webpage</p>
        </header>

        <Test />

        <CyoaApp />

        <div className="bg-white rounded-lg shadow-xl p-8 max-w-2xl w-full flex justify-center">
          <Form schema={schema} validator={validator} onSubmit={handleSubmit} />
        </div>
      </div>
    </main>
  );
}

export default App;
