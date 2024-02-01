import pause from "../../utilities/pause";

const downloadBlobWithMinima = (name: string, file: any) => {  
  (window as any).MDS.file.save(name, file, async () => {
    
    // @ts-ignore
    Android.fileDownload(MDS.minidappuid, "/" + name);
   
    await pause(5000);

    (window as any).MDS.file.delete(name);
  })
}

export default downloadBlobWithMinima;