type VariantType = {
  flavor: string;
  photos: string[];
  isSelected?: boolean;
  sizeDetails: {
    size: string;
    price: number;
    stock: number;
    isHighlight?: boolean;
    promotion?: number;
    isSelected?: boolean;
  }[];
};

interface ProductType {
  name: string;
  desc: { title: string; text: string }[];
  category: string;
  brand: string;
  variants: VariantType[];
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
}
interface OrderType {
  userId: string;
  method: string;
  user?:
    | { isDeleted: true }
    | { name: string; email: string; isDeleted: false };
  products: {
    qtd: number;
    name: string;
    flavor: string;
    size: string;
    price: number;
    productId: string;
    coverPhoto: string;
  }[];
  status: string;
  totalPaid: number;
  purchaseDate: Date;
  receivedDate: Date;
  address: {
    address: string;
    cep: string;
    state: string;
    city: string;
    houseNumber: number;
    complement: string;
  };
}

interface SellType {
  userId: string;
  productId: string;
  productSize: string;
  productFlavor: string;
  totalPrice: number;
  qtd: number;
}

export type { ProductType, UserType, SellType, OrderType, VariantType };

declare global {
  namespace Express {
    interface Request {
      user: {
        name: string;
        email: string;
        isExpired?: boolean;
      };
    }
  }
}
