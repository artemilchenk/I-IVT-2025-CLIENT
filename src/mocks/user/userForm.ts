import type {
  UserCreateFormControl,
  UserLoginFormControl,
} from "@/modules/user/types.ts";

export const userFormControls: UserCreateFormControl[] = [
  {
    id: 1,
    name: "firstname",
    title: "First Name",
    placeholder: "Type your first name",
    type: "text",
  },
  {
    id: 2,
    name: "lastname",
    title: "Last Name",
    placeholder: "Type your last name",
    type: "text",
  },

  {
    id: 3,
    name: "email",
    title: "Email",
    placeholder: "Type your email",
    type: "email",
  },

  {
    id: 4,
    name: "password",
    title: "Password",
    placeholder: "Type your password",
    type: "password",
  },
  {
    id: 5,
    name: "confirmpassword",
    title: "Confirm Password",
    placeholder: "Confirm your password",
    type: "password",
  },
];

export const loginFormControls: UserLoginFormControl[] = [
  {
    id: 1,
    name: "email",
    title: "Email",
    placeholder: "Type your email",
    type: "email",
  },

  {
    id: 2,
    name: "password",
    title: "Password",
    placeholder: "Type your password",
    type: "password",
  },
];
