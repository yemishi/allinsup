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
  photosData?: string[];
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
    address: string;
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
  userId: string;
  method: "Cash on Delivery" | "Credit Card" | "Debit Card" | "PayPal";
  user?: { isDeleted: true } | { name: string; email: string; isDeleted: false };
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
    address: string;
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
interface ProductFormType {
  desc: {
    title: string;
    text: string;
  }[];
  name: string;
  variants: {
    photos: FileList[];
    photosData?: string[];
    flavor: string;
    sizeDetails: {
      size: string;
      price: number;
      stock: number;
      isHighlight?: boolean | undefined;
      promotion?: number | undefined;
    }[];
  }[];
  category: string;
  brand: string;
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
  ProductFormType,
};
