export interface UserGet {
  id: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  address: string;
  city: string;
  country: { countryId: string; countryName: string };
  faculty?: { facultyId: string; facultyName: string; facultyCity: string };
  email: string;
  userName: string;
}

export interface UserPost {
  name: string;
  surname: string;
  dateOfBirth: Date;
  address: string;
  city: string;
  countryId: string;
  facultyId?: string;
  email: string;
  userName: string;
  password: string;
}

export interface UserPut {
  id: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
  address: string;
  city: string;
  countryId: string;
  facultyId?: string;
  email: string;
  userName: string;
}

export interface UserSignIn {
  userName: string;
  password: string;
}

export interface UserRole {
  userName: string;
  roleName: string;
}
