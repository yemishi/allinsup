import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import ProductForm from "./ProductForm";

describe("Product form component", () => {
  it("Test the onchange events", () => {
    const { getByPlaceholderText } = render(
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
    const descTitleInput = getByPlaceholderText("Title 1");
    const descTextInput = getByPlaceholderText("Text 1");
    const flavorInput = getByPlaceholderText("variant 1");
    const sizeInput = getByPlaceholderText("20g");
    const priceInput = getByPlaceholderText("$22.22");
    const stockInput = getByPlaceholderText(10);

    fireEvent.change(nameInput, { target: { value: "product test" } });
    fireEvent.change(brandInput, { target: { value: "brand test" } });
    fireEvent.change(categoryInput, { target: { value: "category test" } });

    fireEvent.change(flavorInput, { target: { value: "flavor test" } });
    fireEvent.change(sizeInput, { target: { value: "40g" } });
    fireEvent.change(priceInput, { target: { value: "$44,00" } });
    fireEvent.change(stockInput, { target: { value: 5 } });

    fireEvent.change(descTitleInput, { target: { value: "title test" } });
    fireEvent.change(descTextInput, { target: { value: "text test" } });

    expect(nameInput).toHaveValue("product test");
    expect(brandInput).toHaveValue("brand test");
    expect(categoryInput).toHaveValue("category test");
    expect(descTitleInput).toHaveValue("title test");
    expect(descTextInput).toHaveValue("text test");

    expect(sizeInput).toHaveValue("40g");
    expect(flavorInput).toHaveValue("flavor test");
    expect(priceInput).toHaveValue("$44,00");
    expect(stockInput).toHaveValue(5);
  });
});
