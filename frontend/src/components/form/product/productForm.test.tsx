import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import ProductForm from "./ProductForm";

describe("Product form component", () => {
  it("Test the onchange events", () => {
    const { getByPlaceholderText, getByText } = render(
      <ProductForm
        action={async () => {
          return await new Promise((resolve) => setTimeout(resolve, 1000));
        }}
        onClose={() => {}}
      />
    );
    const nameInput = getByPlaceholderText("product name");
    const brandInput = getByPlaceholderText("product brand");
    const categoryInput = getByPlaceholderText("product category");

    fireEvent.change(nameInput, { target: { value: "product test" } });
    fireEvent.change(brandInput, { target: { value: "brand test" } });
    fireEvent.change(categoryInput, { target: { value: "category test" } });

    const descTitle = getByText("Title 1");
    fireEvent.click(descTitle);
    const descTitleInput = getByPlaceholderText("Title 1");

    const descText = getByText("Text 1");
    fireEvent.click(descText);
    const descTextInput = getByPlaceholderText("Text 1");

    const flavor = getByText("variant 1");
    fireEvent.click(flavor);
    const flavorInput = getByPlaceholderText("variant 1");

    const size = getByText("20g");
    fireEvent.click(size);
    const sizeInput = getByPlaceholderText("20g");

    const price = getByText("$22.22");
    fireEvent.click(price);
    const priceInput = getByPlaceholderText("$22.22");

    const stock = getByText("10");
    fireEvent.click(stock);
    const stockInput = getByPlaceholderText(10);

    expect(nameInput).toHaveValue("product test");
    expect(brandInput).toHaveValue("brand test");
    expect(categoryInput).toHaveValue("category test");

    expect(descTitleInput).toBeTruthy();

    expect(descTextInput).toBeTruthy();

    expect(sizeInput).toBeTruthy();
    expect(flavorInput).toBeTruthy();

    expect(priceInput).toBeTruthy();
    expect(stockInput).toBeTruthy();
  });
});
