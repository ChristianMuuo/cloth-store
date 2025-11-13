import React, { useState, useMemo, useEffect } from 'react';
import { CartItem } from '../types';
import { TrashIcon } from './Icons';
import { initiateStkPush } from '../services/mpesaService';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onRemoveItem: (productId: number) => void;
  onClearCart: () => void;
  onSuccessfulCheckout: () => void;
}

type PaymentStep = 'viewing' | 'paying' | 'processing' | 'success';

export const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem, onClearCart, onSuccessfulCheckout }) => {
  const [paymentStep, setPaymentStep] = useState<PaymentStep>('viewing');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentError, setPaymentError] = useState<string | null>(null);

  useEffect(() => {
    // Reset state when modal is closed or reopened
    if (isOpen) {
      setPaymentStep('viewing');
      setPhoneNumber('');
      setPaymentError(null);
    }
  }, [isOpen]);

  const total = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const handleMpesaPay = async () => {
    if (!phoneNumber.match(/^(254)?[7]\d{8}$/)) {
        setPaymentError('Please enter a valid Safaricom phone number (e.g., 254712345678).');
        return;
    }
    setPaymentError(null);
    setPaymentStep('processing');
    try {
      await initiateStkPush(phoneNumber, total);
      setPaymentStep('success');
      onClearCart();
      onSuccessfulCheckout();
    } catch (error) {
      if (error instanceof Error) {
        setPaymentError(error.message);
      } else {
        setPaymentError('An unknown error occurred. Please try again.');
      }
      setPaymentStep('paying');
    }
  };

  const handleClose = () => {
    if (paymentStep !== 'processing') {
      onClose();
    }
  }

  if (!isOpen) return null;

  const renderContent = () => {
    switch(paymentStep) {
        case 'processing':
            return (
                <div className="text-center p-8">
                    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500 mx-auto mb-4"></div>
                    <h3 className="text-xl font-semibold mb-2">Processing Payment...</h3>
                    <p className="text-gray-500 dark:text-gray-400">Please check your phone and enter your M-Pesa PIN to complete the transaction.</p>
                </div>
            );
        case 'success':
            return (
                <div className="text-center p-8">
                    <svg className="w-16 h-16 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h3 className="text-xl font-semibold mb-2">Payment Successful!</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Thank you for your purchase. Your order has been confirmed.</p>
                     <button
                        onClick={handleClose}
                        className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full transition"
                     >
                        Continue Shopping
                    </button>
                </div>
            );
        case 'paying':
             return (
                <>
                    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                        <h2 className="text-xl font-bold">Pay with M-Pesa</h2>
                        <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>
                    <div className="p-6 text-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/15/M-PESA_LOGO-01.svg" alt="M-Pesa Logo" className="h-12 mx-auto mb-4" />
                        <p className="mb-4 text-gray-600 dark:text-gray-300">You are about to pay <span className="font-bold text-lg text-gray-800 dark:text-white">${total.toFixed(2)}</span>.</p>
                         <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Enter your M-Pesa phone number below to receive a payment prompt.</p>
                         {paymentError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 text-left" role="alert">
                                <strong className="font-bold">Error: </strong>
                                <span className="block sm:inline">{paymentError}</span>
                            </div>
                         )}
                         <input
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            placeholder="e.g. 254712345678"
                            className="w-full bg-gray-100 dark:bg-gray-700 border-transparent focus:ring-2 focus:ring-indigo-500 focus:border-transparent rounded-full py-3 px-4 text-center mb-4"
                        />
                         <button
                            onClick={handleMpesaPay}
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition"
                         >
                            Confirm & Pay
                        </button>
                        <button onClick={() => setPaymentStep('viewing')} className="mt-4 text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                            Back to Cart
                        </button>
                    </div>
                </>
             );
        case 'viewing':
        default:
            return (
                <>
                    <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                        <h2 className="text-xl font-bold">Your Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</h2>
                        <button onClick={handleClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="p-4 flex-grow overflow-y-auto">
                    {cartItems.length > 0 ? (
                        <div className="space-y-4">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex items-center space-x-4">
                            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
                            <div className="flex-grow">
                                <h4 className="font-semibold">{item.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">${item.price.toFixed(2)}</p>
                                <div className="flex items-center mt-2">
                                <label htmlFor={`quantity-${item.id}`} className="text-sm mr-2">Qty:</label>
                                <input
                                    id={`quantity-${item.id}`}
                                    type="number"
                                    min="1"
                                    value={item.quantity}
                                    onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
                                    className="w-16 text-center bg-gray-100 dark:bg-gray-700 rounded-md py-1 border-transparent focus:ring-2 focus:ring-indigo-500"
                                />
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                                <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 mt-2">
                                    <TrashIcon className="w-5 h-5"/>
                                </button>
                            </div>
                            </div>
                        ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-xl text-gray-500">Your cart is empty.</p>
                        </div>
                    )}
                    </div>
                    
                    {cartItems.length > 0 && (
                        <div className="p-4 border-t dark:border-gray-700 space-y-4">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <button
                                onClick={() => setPaymentStep('paying')}
                                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full transition"
                            >
                                Proceed to Payment
                            </button>
                        </div>
                    )}
                </>
            );
        }
    };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" onClick={handleClose}>
        <div 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
        >
            {renderContent()}
        </div>
    </div>
  );
};
