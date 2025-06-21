import React, { useState, ChangeEvent, FocusEvent } from "react";
import sign_up from "../components/images/sign_up.jpg";

// Types
interface SignInButtonProps {
  text: string;
}

interface InputFieldProps {
  type?: string;
  placeholder: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

// InputField Component
const InputField: React.FC<InputFieldProps> = ({ 
  type = "text", 
  placeholder, 
  id, 
  value, 
  onChange 
}) => {
  const handleFocus = (e: FocusEvent<HTMLInputElement>) => {
    if (id === "mobile") {
      if (e.target.value === "") {
        e.target.value = "+91 ";
      }
    }
  };

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (id === "mobile") {
      if (e.target.value === "+91 ") {
        e.target.value = "";
      }
    }
  };

  const inputProps = {
    type,
    id,
    className: "flex-1 outline-none w-full text-sm",
    placeholder,
    value,
    onChange,
    onFocus: handleFocus,
    onBlur: handleBlur,
    autoComplete: id === "mobile" ? "tel" : "off",
    ...(id === "mobile" && { pattern: "^\\+91 [0-9]{10}$" }),
  };

  return (
    <div className="border rounded-lg w-full h-10 px-3 flex items-center">
      <input {...inputProps} />
    </div>
  );
};

// SignInButton Component
const SignInButton: React.FC<SignInButtonProps> = ({ text }) => {
  return (
    <button
      className="btn-sign-in mt-6 w-full max-w-xs h-10 font-semibold rounded-lg flex items-center justify-center text-sm cursor-pointer"
    >
      {text}
    </button>
  );
};

// Main Signup Component
const Signup: React.FC = () => {
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");
  const [organization, setOrganization] = useState<string>("");
  const [designation, setDesignation] = useState<string>("");
  const [department, setDepartment] = useState<string>("");

  const handleMobileChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (value === "") {
      setMobile("+91 ");
      return;
    }

    value = value.replace(/[^0-9+]/g, "");

    if (!value.startsWith("+91 ")) {
      value = "+91 " + value.replace(/^\+91\s*/, "");
    }

    if (value.length > 14) {
      return;
    }

    setMobile(value);
  };

  return (
    <div
      id="container_signup_wrapper"
      className="min-h-screen flex items-center justify-center px-4 bg-pink-300"
    >
      <div
        id="container_signup"
        className="w-full max-w-3xl flex flex-col md:flex-row shadow-lg relative rounded-lg overflow-hidden bg-white"
      >
        {/* Left Image Section */}
        <div id="left_image" className="md:w-1/2 hidden md:block">
          <img
            src={sign_up}
            alt="Library"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Section */}
        <div
          id="right_form"
          className="w-full md:w-1/2 flex items-center justify-center p-6 "
        >
          <div
            id="form_content"
            className="w-full h-130 rounded-xl flex flex-col items-center justify-start pt-8 shadow-md p-6 "
          >
            <h2 className="text-3xl mb-5 font-semibold text-center text-text font-imfell ">
              Author Sign Up
            </h2>

            <form id="signup_form" className="space-y-4 w-full max-w-xs">
              <InputField
                type="text"
                id="name"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <InputField
                type="email"
                id="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <InputField
                type="tel"
                id="mobile"
                placeholder="Mobile Number"
                value={mobile}
                onChange={handleMobileChange}
              />

              <InputField
                type="text"
                id="organization"
                placeholder="Organization"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
              />

              <InputField
                type="text"
                id="designation"
                placeholder="Designation"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
              />

              <InputField
                type="text"
                id="department"
                placeholder="Department"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />

              <SignInButton text="Next" />
            </form>

            <p className="text-sm text-text-light text-center mt-4">
              Existing User?{" "}
              <a
                href="#"
                className="text-primary font-semibold hover:underline"
              >
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;