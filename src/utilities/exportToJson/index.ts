export const exportToJson = (data: string, fileName: string) => {

  try {
    const blob = new Blob([data], {type: 'application/text'});
    const url = URL.createObjectURL(blob);

    if (
      window.navigator.userAgent.includes("Minima Browser")
    ) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return Android.fileDownload(
        (window as any).MDS.minidappuid,
        fileName
      );
    }

    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}.txt`;
    a.click();
    
    if (document.body.contains(a)) {
      document.body.removeChild(a);
    }
    URL.revokeObjectURL(url);
    

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }

}

export default exportToJson;