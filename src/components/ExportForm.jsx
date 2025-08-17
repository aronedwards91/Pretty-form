import Button from "./Button";

const FileSuffix = "cyoa-form";

function ExportForm({ formData }) {
  console.log(">>>formData", formData);
  const handleExport = () => {
    const blob = new Blob([JSON.stringify(formData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = formData.title.cyoaName
      ? `${formData.title.cyoaName}-${formData.title.version}.${FileSuffix}.json`
      : `my-cyoa-form.${FileSuffix}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return <Button onClick={handleExport}>Export</Button>;
}

export default ExportForm;
