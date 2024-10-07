export interface User {
  id: number;
  email: string;
  password: string;
  name?: string;
  surname?: string;
  companyName?: string;
  pib?: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  role: RoleValues;
  type: TypeValues;
  package: PackageValues;
  registration: RegistrationValues;
  isDeleted?: boolean;
  isActive?: boolean;
}

export interface UserResponse {
  id: number;
  email: string;
  name?: string;
  surname?: string;
  companyName?: string;
  pib?: string;
  address: string;
  city: string;
  country: string;
  phoneNumber: string;
  role: RoleValues;
  type: TypeValues;
  package: PackageValues;
  registration: RegistrationValues;
  isDeleted?: boolean;
  isActive?: boolean;
}

export enum RoleValues {
  ADMIN = 'Admin',
  USER = 'User',
}

export enum TypeValues {
  PHYSICAL_PERSON = 'Phisical_Person',
  LEGAL_ENTITY = 'Legal_Entity',
}

export enum RegistrationValues {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
}

export enum PackageValues {
  BASIC = 'Basic',
  STANDARD = 'Standard',
  GOLDEN = 'Golden',
}
