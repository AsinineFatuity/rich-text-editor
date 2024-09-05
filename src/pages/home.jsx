import { url } from "../urls";
import { useNavigate } from "react-router";

export function Home() {
    const navigate = useNavigate();
  return (
    <div>
      <button onClick={()=>navigate(url.selfhosted)}>Landlord Document</button>
      &nbsp; &nbsp;
      <button onClick={()=>navigate(url.tenantEdit)}>Tenant Document</button>
      &nbsp; &nbsp;
        <button onClick={()=>navigate(url.signaturePad)}>Signature Pad</button>
    </div>
  );
}