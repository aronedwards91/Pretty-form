import { useState, useEffect, useRef } from "react";

const SAVE_KEY = "formSaves";
const SAVE_SLOT_COUNT = 10;

const SaveMenu = ({ onLoad, formRef }) => {
  const [saves, setSaves] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [saveName, setSaveName] = useState("");
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [deleteSlot, setDeleteSlot] = useState(null);
  const [showSaveMenu, setShowSaveMenu] = useState(false);
  const dialogRef = useRef(null);
  const confirmDialogRef = useRef(null);

  // Load saves from localStorage on component mount
  useEffect(() => {
    const loadSaves = () => {
      try {
        const savedData = localStorage.getItem(SAVE_KEY);
        const parsedData = JSON.parse(savedData);
        if (savedData && Array.isArray(parsedData)) {
          if (Array.isArray(parsedData)) {
            setSaves(parsedData);
          } else {
            localStorage.setItem(SAVE_KEY, JSON.stringify([]));
          }
        }
      } catch (error) {
        console.error("Error loading saves:", error);
      }
    };
    loadSaves();
  }, []);

  // Handle dialog open/close
  useEffect(() => {
    if (showSaveMenu && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!showSaveMenu && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [showSaveMenu]);

  const syncSavesToLocalStorage = (newSave, index) => {
    const newSaves = [...saves];
    newSaves[index] = newSave;
    localStorage.setItem(SAVE_KEY, JSON.stringify(newSaves));
    setSaves(newSaves);
  };

  const handleSave = (slotNumber) => {
    if (saveName === "") {
      alert("Please enter a save name");
      return;
    }

    if (!formRef.current?.state?.formData) {
      alert("No form data to save!");
      return;
    }

    syncSavesToLocalStorage(
      {
        data: formRef.current.state.formData,
        name: saveName || `Save ${slotNumber}`,
        timestamp: new Date().toISOString(),
      },
      slotNumber
    );
    setSaveName("");
    setSelectedSlot(null);
  };

  const handleLoad = (slotNumber) => {
    const saveData = saves[slotNumber];
    if (saveData && onLoad) {
      onLoad(saveData.data);
      setShowSaveMenu(false);
    }
  };

  const handleDelete = (slotNumber) => {
    const newSaves = { ...saves };
    delete newSaves[slotNumber];
    setSaves(newSaves);
    setShowConfirmDelete(false);
    setDeleteSlot(null);
  };

  const confirmDelete = (slotNumber) => {
    setDeleteSlot(slotNumber);
    setShowConfirmDelete(true);
    if (confirmDialogRef.current) {
      confirmDialogRef.current.showModal();
    }
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const getSlotStatus = (slotNumber) => {
    const save = saves[slotNumber];
    if (!save) return "empty";
    return "occupied";
  };

  const handleClose = () => {
    setShowSaveMenu(false);
    setSelectedSlot(null);
    setSaveName("");
  };

  const handleConfirmDeleteClose = () => {
    setShowConfirmDelete(false);
    setDeleteSlot(null);
    if (confirmDialogRef.current) {
      confirmDialogRef.current.close();
    }
  };

  return (
    <>
      {/* Save/Load Button */}
      <button
        onClick={() => setShowSaveMenu(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors cursor-pointer"
      >
        Save/Load
      </button>

      {/* Main Save/Load Dialog */}
      <dialog
        open={false}
        ref={dialogRef}
        className={`w-auto h-auto bg-white rounded-lg flex flex-col m-12 overflow-hidden backdrop:bg-black backdrop:bg-opacity-50 ${
          showSaveMenu ? "block" : "hidden"
        }`}
        onClose={handleClose}
      >
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">Save/Load Menu</h2>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 text-2xl font-bold cursor-pointer"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="flex gap-4 h-full pb-20 pr-4">
          {/* Save Slots */}
          <div className="p-6 overflow-y-auto w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: SAVE_SLOT_COUNT }, (_, i) => i + 1).map(
                (slotNumber) => {
                  const save = saves[slotNumber];
                  const status = getSlotStatus(slotNumber);

                  return (
                    <div
                      key={slotNumber}
                      className={`border-2 rounded-lg p-4 transition-all duration-200 ${
                        status === "occupied"
                          ? "border-green-300 bg-green-50 hover:bg-green-100"
                          : "border-gray-300 bg-gray-50 hover:bg-gray-100"
                      } ${
                        selectedSlot === slotNumber
                          ? "ring-2 ring-blue-500"
                          : ""
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">
                          Slot {slotNumber}
                        </h3>
                        <div className="flex gap-1">
                          {status === "occupied" && (
                            <>
                              <button
                                onClick={() => handleLoad(slotNumber)}
                                className="bg-blue-500 hover:bg-blue-600 text-white text-xs px-2 py-1 rounded"
                              >
                                Load
                              </button>
                              <button
                                onClick={() => confirmDelete(slotNumber)}
                                className="bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded"
                              >
                                Delete
                              </button>
                            </>
                          )}
                        </div>
                      </div>

                      {status === "occupied" ? (
                        <div className="space-y-2">
                          <p className="font-medium text-gray-800">
                            {save.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            Saved: {formatDate(save.timestamp)}
                          </p>
                          <button
                            onClick={() => {
                              setSelectedSlot(slotNumber);
                              setSaveName(save.name);
                            }}
                            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white text-sm py-1 px-2 rounded"
                          >
                            Overwrite
                          </button>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <p className="text-gray-500 text-sm">Empty slot</p>
                          <button
                            onClick={() => {
                              setSelectedSlot(slotNumber);
                              setSaveName("");
                            }}
                            className="w-full bg-green-500 hover:bg-green-600 text-white text-sm py-1 px-2 rounded"
                          >
                            Save Here
                          </button>
                        </div>
                      )}
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Save Form */}
          <div
            className={`w-1/3 mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200 ${
              selectedSlot ? "" : "opacity-50 pointer-events-none"
            }`}
          >
            <h3 className="font-semibold text-lg mb-3">
              {saves[selectedSlot] ? "Overwrite" : "Save to"} Slot{" "}
              {selectedSlot}
            </h3>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Save Name (optional)
                </label>
                <input
                  type="text"
                  required
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  placeholder={`Save ${selectedSlot}`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleSave(selectedSlot)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  {saves[selectedSlot] ? "Overwrite" : "Save"}
                </button>
                <button
                  onClick={() => {
                    setSelectedSlot(null);
                    setSaveName("");
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 px-6 py-3 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            {Object.keys(saves).length}/10 slots used
          </p>
          <button
            onClick={handleClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </dialog>

      {/* Delete Confirmation Dialog */}
      <dialog
        ref={confirmDialogRef}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4 backdrop:bg-black backdrop:bg-opacity-50"
        onClose={handleConfirmDeleteClose}
      >
        <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete the save in slot {deleteSlot}? This
          action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={handleConfirmDeleteClose}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={() => handleDelete(deleteSlot)}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </dialog>
    </>
  );
};

export default SaveMenu;
