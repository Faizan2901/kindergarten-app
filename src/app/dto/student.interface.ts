export interface Student {
  playCenterId: string;
  firstName: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  contactNumber: string;
  fatherName: string;
  motherName: string;
  photoUrl: string;
  status?: boolean;
  roles?: string[]; // 👈 Add this line
}
