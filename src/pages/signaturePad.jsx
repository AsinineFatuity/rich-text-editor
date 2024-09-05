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
    // Save the signature as a data URL
    const dataUrl = sigCanvas.current.getTrimmedCanvas().toDataURL('image/png');
    setImageUrl(dataUrl);
    // You can send this data URL to your backend or use it as needed
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
