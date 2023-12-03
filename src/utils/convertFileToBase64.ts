export async function convertFileToBase64(file: File) {
  return new Promise<string | ArrayBuffer | null>((resolve, reject) => {
    try {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(null);
        console.error(error);
      };
    } catch (e) {
      console.error(e);
      reject(null);
    }
  });
}
