"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

// ProtectAuth is a higher-order component that checks for authentication
const ProtectAuth = (Component: React.ComponentType<any>) => {
  // ProtectedComponent is the actual component that gets wrapped
  const ProtectedComponent: React.FC<any> = (props) => {
    const { currentUser, loading } = useAuth();
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false);

    useEffect(() => {
      setIsRedirecting(true); // Set redirect state to true while redirecting

      try {
        // If there is a currentUser, redirect to the home page
        if (currentUser) {
          const url = `/`;
          router.replace(url); // Redirect user
        }
      } catch (error) {
        toast.error(`Unknown error occured`);
      } finally {
        setIsRedirecting(false);
      }
    }, [currentUser, router]);

    // Show the loading spinner initially until the authentication state is checked
    if (loading || isRedirecting) {
      return (
        <div className="w-[100%] h-[100%] bg-white m-auto min-h-[100vh] flex justify-center pt-[2rem]">
          <svg
            width="57"
            height="57"
            viewBox="0 0 57 57"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#0077B6"
          >
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="2">
                <circle cx="5" cy="50" r="5">
                  <animate
                    attributeName="cy"
                    begin="0s"
                    dur="2.2s"
                    values="50;5;50;50"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cx"
                    begin="0s"
                    dur="2.2s"
                    values="5;27;49;5"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="27" cy="5" r="5">
                  <animate
                    attributeName="cy"
                    begin="0s"
                    dur="2.2s"
                    from="5"
                    to="5"
                    values="5;50;50;5"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cx"
                    begin="0s"
                    dur="2.2s"
                    from="27"
                    to="27"
                    values="27;49;5;27"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
                <circle cx="49" cy="50" r="5">
                  <animate
                    attributeName="cy"
                    begin="0s"
                    dur="2.2s"
                    values="50;50;5;50"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cx"
                    from="49"
                    to="49"
                    begin="0s"
                    dur="2.2s"
                    values="49;5;27;49"
                    calcMode="linear"
                    repeatCount="indefinite"
                  />
                </circle>
              </g>
            </g>
          </svg>
        </div>
      );
    }

    // If not redirecting, render the wrapped component with currentUser and other props
    return <Component currentUser={currentUser} {...props} />;
  };

  return ProtectedComponent;
};

export default ProtectAuth;
