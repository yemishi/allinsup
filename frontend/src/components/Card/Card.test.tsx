import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import Card from "./Card";
import { BrowserRouter } from "react-router-dom";
import CardGrid from "./CardGrid";
import Provider from "../../context/Provider";

const cardProps = {
  _id: "1",
  amount: 1,
  coverPhoto: "",
  name: "card test",
  price: 20,
  stock: 10,
};

describe("Card component", () => {
  it("Render the component correctly", () => {
    const { getByText } = render(
      <BrowserRouter>
        <Card addToCart={() => {}} props={cardProps} />
      </BrowserRouter>
    );
    const price = getByText("$20.00");
    const amount = getByText("1");
    const name = getByText(/card test/i);
    expect(name).toBeTruthy();
    expect(price).toBeTruthy();
    expect(amount).toBeTruthy();
  });
});

describe("CardGrid component", () => {
  it("Render the component correctly", () => {
    const product = {
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
    };
    const { getByText } = render(
      <BrowserRouter>
        <Provider>
          <CardGrid products={[product]} />
        </Provider>
      </BrowserRouter>
    );
    const price = getByText("$22.00");
    const name = getByText(/product test flavor 1 size 1/i);
    expect(name).toBeTruthy();
    expect(price).toBeTruthy();
  });
});
