import React, { createContext, useContext, useState, useEffect } from 'react';
import { Perfume, HamperBoxOption, HamperComplement } from '../data/perfumes';

export type CartItemType = 'perfume' | 'bespoke_perfume' | 'bespoke_hamper';

export interface CartItem {
  id: string; // unique item uuid in cart
  type: CartItemType;
  title: string;
  subtitle: string;
  price: number;
  quantity: number;
  image: string;
  details?: {
    size?: '50ml' | '100ml';
    engraving?: string;
    perfumeId?: string;
    // For bespoke lab creation
    baseFamily?: string;
    notes?: {
      top: string[];
      heart: string[];
      base: string[];
    };
    concentration?: string;
    capStyle?: string;
    // For bespoke hamper
    box?: HamperBoxOption;
    perfumes?: { name: string; size: string }[];
    complements?: HamperComplement[];
    recipientName?: string;
    giftOccasion?: string;
    giftMessage?: string;
    waxSeal?: string;
  };
}

interface CartContextValue {
  cart: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  updateQuantity: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  subtotal: number;
  discount: number;
  promoCode: string;
  applyPromoCode: (code: string) => boolean;
  removePromoCode: () => void;
  selectedSamples: string[];
  toggleSample: (sampleName: string) => void;
  isGiftWrapped: boolean;
  setIsGiftWrapped: (val: boolean) => void;
  total: number;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = 'orel_cart_v1';

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [selectedSamples, setSelectedSamples] = useState<string[]>([
    'Aura Nocturna (Smoky Oud)',
    'Fleur de Soie (Jasmine)',
  ]);
  const [isGiftWrapped, setIsGiftWrapped] = useState(true);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const addToCart = (newItem: Omit<CartItem, 'id' | 'quantity'>) => {
    setCart((prev) => {
      // If it's a standard perfume with identical size and engraving, group it
      if (newItem.type === 'perfume') {
        const existingIdx = prev.findIndex(
          (item) =>
            item.type === 'perfume' &&
            item.title === newItem.title &&
            item.details?.size === newItem.details?.size &&
            (item.details?.engraving || '') === (newItem.details?.engraving || '')
        );

        if (existingIdx > -1) {
          const updated = [...prev];
          updated[existingIdx].quantity += 1;
          return updated;
        }
      }

      const generatedId = 'item_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      return [...prev, { ...newItem, id: generatedId, quantity: 1 }];
    });

    setIsOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const removeItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'ORELLE10' || clean === 'OREL10' || clean === 'GENZ10' || clean === 'ATELIER') {
      setPromoCode(clean);
      setDiscountPercent(10);
      return true;
    }
    return false;
  };

  const removePromoCode = () => {
    setPromoCode('');
    setDiscountPercent(0);
  };

  const toggleSample = (sampleName: string) => {
    setSelectedSamples((prev) => {
      if (prev.includes(sampleName)) {
        return prev.filter((s) => s !== sampleName);
      }
      if (prev.length >= 2) {
        return [prev[1], sampleName];
      }
      return [...prev, sampleName];
    });
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = Math.round(subtotal * (discountPercent / 100));
  const total = Math.max(0, subtotal - discount);

  return (
    <CartContext.Provider
      value={{
        cart,
        isOpen,
        openCart,
        closeCart,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        discount,
        promoCode,
        applyPromoCode,
        removePromoCode,
        selectedSamples,
        toggleSample,
        isGiftWrapped,
        setIsGiftWrapped,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
