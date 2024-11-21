// interface for the user information
export interface UserInfo {
  fullName: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

// interface for the shape of the error object
export interface SignUpErrors {
  fullName?: string;
  emailAddress?: string;
  password?: string;
  confirmPassword?: string;
}

// interface for the shape of the error object
export interface SignInErrors {
  loginEmailAddress?: string;
  loginPassword?: string;
}

export interface ButtonProps {
  name: string;
}
