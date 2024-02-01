export const webDownload = (data: string, fileName: string, type: string, ) => {

  try {
    const blob = new Blob([JSON.stringify(data)], {type});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName}`;
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

export default webDownload;