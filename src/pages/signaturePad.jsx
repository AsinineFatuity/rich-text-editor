import  { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = () => {
  const sigCanvas = useRef(null);
  const [imageUrl, setImageUrl] = useState(null);

  const clear = () => {
    sigCanvas.current.clear();
    setImageUrl(null);
  };

  const save = () => {
    // Save the signature as a data URL (base64 encoded string)
    const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setImageUrl(dataUrl);
    // console.log(dataUrl);
    const blob = dataURLtoBlob(dataUrl); // Convert data URL to Blob and send this to the backend like we do for file upload
    console.log(blob);
  };

  const dataURLtoBlob = (dataURL) => {
    const binary = atob(dataURL.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/png' });
  };

  
  return (
    <div>
      <h5 style={{textAlign: 'center'}}>Sign Below</h5>
      <SignatureCanvas
        ref={sigCanvas}
        penColor="black"
        canvasProps={{background:'white', width: 500, height: 200, className: 'sigCanvas' }}
      />
      <button onClick={clear}>Clear</button> &nbsp; &nbsp;
      <button onClick={save}>Save</button>
      {imageUrl && (
        <div>
          <h3>Preview:</h3>
          <img src={imageUrl} alt="Signature" />
        </div>
      )}
    </div>
  );
};

export default SignaturePad;
