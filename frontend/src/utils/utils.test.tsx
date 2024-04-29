import "@testing-library/react";

import { render } from "@testing-library/react";
import { parseLocalCurrency } from "./formatting";
import { productDetails } from "./helpers";
import { ProductType } from "../types/response";

describe("Formatting component", () => {
  it("renders the value as currency correctly", () => {
    const { getByText } = render(<span>{parseLocalCurrency(22)}</span>);
    const value = getByText("$22.00");
    expect(value).toBeTruthy();
  });
});

describe("Helpers component", () => {
  it("return the correctly values", () => {
    const product: ProductType = {
      _id: "1",
      brand: "brand test",
      category: "desc test",
      desc: [{ title: "title test", text: "text test" }],
      name: "product test",
      variants: [
        {
          flavor: "flavor 1",
          photos: [""],
          sizeDetails: [{ price: 22, size: "size 1", stock: 10 }],
        },
        {
          flavor: "flavor 2",
          photos: [""],
          sizeDetails: [
            { price: 11, size: "size 1", stock: 5 },
            { price: 22, size: "size 2", stock: 10 },
            { price: 33, size: "size 3", stock: 15 },
          ],
        },
      ],
      error: false,
    };

    const { flavor, name, price, size, stock } = productDetails(
      product,
      undefined,
      1,
      2
    );

    expect(name === "product test flavor 2 size 3").toBeTruthy();
    expect(flavor === "flavor 2").toBeTruthy();
    expect(price === 33).toBeTruthy();
    expect(size === "size 3").toBeTruthy();
    expect(stock === 15).toBeTruthy();
  });
});
