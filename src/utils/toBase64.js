const toBase64 = async(file) => {
  let data = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
  return {
    fileName: file.name,
    base64String: data,
    size: file.size,
    progress: 0
  }
}

export default toBase64