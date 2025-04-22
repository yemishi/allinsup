import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";

import SignupForm from "./SignUpForm";
import SigninForm from "./SignInForm";

jest.mock("../../../services/axios.config", () => ({
  createAxiosInstance: jest.fn(),
}));

describe("Sign in component", () => {
  it("Test the onchange events", () => {
    const { getByLabelText } = render(<SigninForm onClose={() => {}} />);
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");
    fireEvent.change(emailInput, { target: { value: "example email" } });
    fireEvent.change(passwordInput, { target: { value: "example password" } });

    expect(emailInput).toHaveValue("example email");
    expect(passwordInput).toHaveValue("example password");
  });
});

describe("Sign up component", () => {
  it("Test the onchange events", () => {
    const { getByLabelText } = render(<SignupForm gotoSignIn={() => {}} />);
    const nameInput = getByLabelText("Name");
    const emailInput = getByLabelText("Email");
    const passwordInput = getByLabelText("Password");

    fireEvent.change(nameInput, { target: { value: "example name" } });
    fireEvent.change(emailInput, { target: { value: "example email" } });
    fireEvent.change(passwordInput, { target: { value: "example password" } });

    expect(emailInput).toHaveValue("example email");
    expect(passwordInput).toHaveValue("example password");
  });
});

// Todo test for userForm component