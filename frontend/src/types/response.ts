type DetailsType = {
  size: string;
  price: number;
  stock: number;
  isHighlight?: boolean;
  promotion?: number;
  isSelected?: boolean;
};

type VariantType = {
  flavor: string;
  photos: string[];
  sizeDetails: DetailsType[];
  imageFiles?: FileList[];
  isSelected?: boolean;
};

interface ProductType {
  _id: string;
  name: string;
  desc: { title: string; text: string }[];
  category: string;
  brand: string;
  variants: VariantType[];
  error?: false;
}

interface UserType {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  address: {
    name: string;
    cep: string;
    state: string;
    city: string;
    houseNumber: number;
    complement: string;
  };
  message: string;
  error: false;
}
interface OrderType {
  _id: string;
  orderId: string;
  method: "Cash on Delivery" | "Credit Card" | "Debit Card" | "PayPal";
  user: { userId: string; name: string; email: string };
  products: {
    _id: string;
    qtd: number;
    name: string;
    flavor: string;
    size: string;
    price: number;
    productId: string;
    coverPhoto: string;
  }[];
  status: "Pending" | "Processing" | "Shipped" | "Out for delivery" | "Delivered";
  totalPaid: number;
  purchaseDate: Date;
  receivedDate?: Date;
  address: {
    name: string;
    cep: string;
    state: string;
    city: string;
    houseNumber: number;
    complement: string;
  };
  error: false;
}

interface SellType {
  userId: string;
  productId: string;
  productSize: string;
  productFlavor: string;
  totalPrice: number;
  qtd: number;
  error: false;
}

interface CartType {
  _id: string;
  name: string;
  coverPhoto: string;
  price: number;
  stock: number;
  amount: number;
  flavor: string;
  size: string;
  promotion?: number;
}
type ErrorType = {
  message: string;
  error: true;
};

type DefaultResponse = { error: false; message: string } | ErrorType;
export type {
  DefaultResponse,
  ProductType,
  UserType,
  SellType,
  OrderType,
  VariantType,
  ErrorType,
  DetailsType,
  CartType,
};
