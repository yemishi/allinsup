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
    name: string;
    cep: string;
    state: string;
    city: string;
    houseNumber: number;
    complement: string;
  };
}
interface OrderType {
  orderId: string;
  user: { name: string; userId: string; email: string };
  method: string;
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
