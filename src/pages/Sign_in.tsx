import React, { useState, ChangeEvent, FocusEvent } from "react";
import sign_in from "../components/images/sign_in.jpg";

// Types
interface InputFieldProps {
  type?: string;
  placeholder?: string;
  id?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

interface SignInButtonProps {
  text: string;
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
      type="submit"
    >
      {text}
    </button>
  );
};

// Main Signin Component
const Signin: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Sign in attempt:", { email, password });
  };

  return (
    <div
      id="signin_page_wrapper"
      className="min-h-screen flex items-center justify-center px-4 bg-pink-200"
    >
      <div
        id="signin_main_container"
        className="w-full max-w-3xl flex flex-col md:flex-row shadow-lg relative rounded-lg overflow-hidden"
      >
        {/* Left Image Section */}
        <div id="signin_left_image_container" className="md:w-1/2 hidden md:block ">
          <img
            src={sign_in}
            alt="Library"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Form Section - Outer Container */}
        <div
          id="right_form_outer_container"
          className="w-full md:w-1/2 flex items-center justify-center p-6  bg-slate-100"
        >
          {/* Right Form Section - Inner Container */}
          <div
            id="right_form_inner_container"
            className="w-full bg-slate-50"
          >
            {/* Form Content Card */}
            <div
              id="form_content_card"
              className="w-full h-130 rounded-xl flex flex-col items-center justify-start pt-8 shadow-md p-6 bg-form-bg"
            >
              {/* Header Section */}
              <div id="header_section" className="text-center">
                <h2 className="text-3xl font-semibold text-center text-text font-imfell">
                  Welcome to LPCPS ScholarSync...
                </h2>

                <p className="mt-2 text-sm text-center text-righttext">
                  – Where scholars unite, ideas ignite
                </p>

                <p className="mt-10 mb-4 text-xl md:text-2xl text-center font-semibold text-text font-imfell">
                  Sign In & Ignite Ideas
                </p>
              </div>

              {/* Form Section */}
              <div id="form_section" className="w-full flex flex-col items-center">
                <form 
                  id="signin_form" 
                  className="space-y-4 w-full max-w-xs"
                  onSubmit={handleSubmit}
                >
                  <InputField
                    type="email"
                    id="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <InputField
                    type="password"
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <SignInButton text="Sign In" />
                </form>
              </div>

              {/* Footer Section */}
              <div id="footer_section" className="text-center">
                <p className="text-sm text-center mt-4 text-text-light">
                  New user?{" "}
                  <a href="#" className="font-semibold hover:underline text-primary">
                    Create new account
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;