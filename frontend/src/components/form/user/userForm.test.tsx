import "@testing-library/jest-dom";
import { fireEvent, render } from "@testing-library/react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import UserForm from "./UserForm";

jest.mock("../../../services/axios.config", () => ({
  createAxiosInstance: jest.fn(),
}));

describe("Sign in component", () => {
  it("Test the onchange events", () => {
    const { getByLabelText } = render(
      <SignInForm onClose={() => {}} openSignUp={() => {}} />
    );
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
    const { getByLabelText } = render(
      <SignUpForm onClose={() => {}} openSignIn={() => {}} />
    );
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

describe("User form component", () => {
  it("Test the onchange events", () => {
    const { getByPlaceholderText } = render(
      <UserForm
        onClose={() => {}}
        userInfo={{
          address: {
            address: "address test",
            cep: "2345",
            city: "city test",
            state: "state test",
            houseNumber: 0,
            complement: "complement test",
          },
          email: "email test",
          error: false,
          name: "name test",
        }}
      />
    );
    const nameInput = getByPlaceholderText("name test");
    const addressInput = getByPlaceholderText("address test");
    const stateInput = getByPlaceholderText("state test");
    const cityInput = getByPlaceholderText("city test");
    const houseInput = getByPlaceholderText("0");
    const cepInput = getByPlaceholderText("2345");
    const complementInput = getByPlaceholderText("complement test");

    fireEvent.change(nameInput, { target: { value: "example name" } });
    fireEvent.change(addressInput, { target: { value: "example address" } });
    fireEvent.change(stateInput, { target: { value: "example state" } });
    fireEvent.change(cityInput, { target: { value: "example city" } });
    fireEvent.change(houseInput, { target: { value: 2 } });
    fireEvent.change(cepInput, { target: { value: 1234 } });
    fireEvent.change(complementInput, {
      target: { value: "example complement" },
    });

    expect(nameInput).toHaveValue("example name");
    expect(addressInput).toHaveValue("example address");
    expect(stateInput).toHaveValue("example state");
    expect(cityInput).toHaveValue("example city");
    expect(houseInput).toHaveValue(2);
    expect(cepInput).toHaveValue(1234);
    expect(complementInput).toHaveValue("example complement");
  });
});
