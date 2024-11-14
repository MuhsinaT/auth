// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Form, Alert } from "react-bootstrap";
// import { Button } from "react-bootstrap";
// import "react-phone-number-input/style.css";
// import PhoneInput from "react-phone-number-input";
// import { useUserAuth } from "../context/UserAuthContext";

// const PhoneSignUp = () => {
//   const [error, setError] = useState("");
//   const [number, setNumber] = useState("");
//   const [flag, setFlag] = useState(false);
//   const [otp, setOtp] = useState("");
//   const [confirmObj,setConfirmObj]=useState("")
//   const [result, setResult] = useState("");
//   const { setUpRecaptcha} = useUserAuth();
//   const navigate = useNavigate();

//   const getOtp = async (e) => {
//     e.preventDefault();
//     console.log(number);
//     setError("");
//     if (number === "" || number === undefined)
//       return setError("Please enter a valid phone number!");
//     try {
//       const response = await setUpRecaptcha(number);
//       setResult(response);
//       setConfirmObj(response)
//       setFlag(true);


//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const verifyOtp = async (e) => {
//     e.preventDefault();
//     setError("");
//     if (otp === "" || otp === null) return;
//     try {
//       await result.confirm(otp);
//       navigate("/home");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <>
//       <div className="p-4 box">
//         <h2 className="mb-3">Firebase Phone Auth</h2>
//         {error && <Alert variant="danger">{error}</Alert>}
//         <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
//           <Form.Group className="mb-3" controlId="formBasicEmail">
//             <PhoneInput
//               defaultCountry="IN"
//               value={number}
//               onChange={setNumber}
//               placeholder="Enter Phone Number"
//             />
//             <div id="recaptcha-container"></div>
//           </Form.Group>
//           <div className="button-right">
//             <Link to="/">
//               <Button variant="secondary">Cancel</Button>
//             </Link>
//             &nbsp;
//             <Button type="submit" variant="primary">
//               Send Otp
//             </Button>
//           </div>
//         </Form>

//         <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
//           <Form.Group className="mb-3" controlId="formBasicOtp">
//             <Form.Control
//               type="otp"
//               placeholder="Enter OTP"
//               onChange={(e) => setOtp(e.target.value)}
//             />
//           </Form.Group>
//           <div className="button-right">
//             <Link to="/">
//               <Button variant="secondary">Cancel</Button>
//             </Link>
//             &nbsp;
//             <Button type="submit" variant="primary">
//               Verify
//             </Button>
//           </div>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default PhoneSignUp;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Alert } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useUserAuth } from "../context/UserAuthContext";

const PhoneSignUp = () => {
  const [error, setError] = useState("");
  const [number, setNumber] = useState("");
  const [flag, setFlag] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmObj, setConfirmObj] = useState(null);  // Store the confirmation object
  const { setUpRecaptcha } = useUserAuth();
  const navigate = useNavigate();

  // Get OTP by setting up reCAPTCHA
  const getOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (number === "" || number === undefined) {
      return setError("Please enter a valid phone number!");
    }
    try {
      const confirmationResult = await setUpRecaptcha(number);  // Receive confirmation result
      setConfirmObj(confirmationResult);  // Store it for OTP verification
      setFlag(true);  // Show OTP input form
    } catch (err) {
      setError(err.message);
    }
  };

  // Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    if (otp === "" || otp === null) return;
    try {
      await confirmObj.confirm(otp);  // Confirm OTP using the stored confirmation result
      navigate("/home");  // Navigate after successful OTP verification
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-4 box">
      <h2 className="mb-3">Firebase Phone Auth</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      
      {/* Get OTP form */}
      <Form onSubmit={getOtp} style={{ display: !flag ? "block" : "none" }}>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <PhoneInput
            defaultCountry="IN"
            value={number}
            onChange={setNumber}
            placeholder="Enter Phone Number"
          />
          <div id="recaptcha-container"></div>
        </Form.Group>
        <div className="button-right">
          <Link to="/">
            <Button variant="secondary">Cancel</Button>
          </Link>
          &nbsp;
          <Button type="submit" variant="primary">
            Send Otp
          </Button>
        </div>
      </Form>

      {/* Verify OTP form */}
      <Form onSubmit={verifyOtp} style={{ display: flag ? "block" : "none" }}>
        <Form.Group className="mb-3" controlId="formBasicOtp">
          <Form.Control
            type="text"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
          />
        </Form.Group>
        <div className="button-right">
          <Link to="/">
            <Button variant="secondary">Cancel</Button>
          </Link>
          &nbsp;
          <Button type="submit" variant="primary">
            Verify
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default PhoneSignUp;
