import  { useState } from 'react';
import { maxContactImport } from '../../__minima__';

const InputImportContacts = ({setStep, setLength}: any) => {
  // const { addContact} = useContext(appContext);
  const [selectedFile, setSelectedFile] = useState(null);
  
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleImport = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = async (e: any) => {
        const _contacts = e.target.result;
        
        setStep(2);
        // Do something with the imported data
        try {
        

          const sizeImported = await maxContactImport(_contacts);          

          setLength(sizeImported);          

          setStep(3);
          
        } catch (error) {
          console.error(error);                 
        }

        
      };
      reader.readAsText(selectedFile);
      // Reset the selected file after importing
      setSelectedFile(null);
    }
  };

  

  return (
    <div>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="contacts">Upload file</label>
      <input
        id="contacts"
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
      />
      <div className="mt-5">
          <button
            onClick={handleImport}
            disabled={!selectedFile}
            className="disabled:opacity-50 disabled:mb-1 text-white w-full text-base font-bold py-3 rounded-xl bg-custom-purple"
          >
            Import Contacts
          </button>                
      </div>
    </div>
  );
};

export default InputImportContacts;