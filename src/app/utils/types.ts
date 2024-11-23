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

// Define the type for each file object
export type FileType = {
  customId: string | null; // customId can be null or a string
  id: string; // id is a string
  key: string; // key is a string
  name: string; // name is a string
  status: "Uploaded"; // status is a string, specifically "Uploaded"
};

// Define the type for the array of files
export type FilesArrayType = {
  files: FileType[]; // Array of file objects
  hasMore: boolean; // hasMore is a boolean indicating if there are more files
};

export interface DashboardPaginationProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalEntries: any;
}

export interface DashboardProps {
  page: number | string;
  per_page: number;
}

export type ForgotPasswordErrors = {
  email?: string;
};
