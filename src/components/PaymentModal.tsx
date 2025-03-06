
import React, { useState } from 'react';
import { 
  CreditCard, 
  Wallet, 
  DollarSign,
  CheckCircle,
  Smartphone,
  Landmark,
  Gift,
  Bitcoin
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";

interface PaymentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bidAmount: number;
  auctionTitle: string;
  onConfirm: () => void;
}

const PaymentModal = ({
  open,
  onOpenChange,
  bidAmount,
  auctionTitle,
  onConfirm,
}: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState<string>("creditCard");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const paymentOptions = [
    { id: "creditCard", name: "Credit Card", icon: <CreditCard className="h-6 w-6" /> },
    { id: "wallet", name: "E-Wallet", icon: <Wallet className="h-6 w-6" /> },
    { id: "mobilePay", name: "Mobile Pay", icon: <Smartphone className="h-6 w-6" /> },
    { id: "bankTransfer", name: "Bank Transfer", icon: <Landmark className="h-6 w-6" /> },
    { id: "giftCard", name: "Gift Card", icon: <Gift className="h-6 w-6" /> },
    { id: "crypto", name: "Cryptocurrency", icon: <Bitcoin className="h-6 w-6" /> },
    { id: "cash", name: "Cash", icon: <DollarSign className="h-6 w-6" /> },
  ];

  const handleConfirmPayment = () => {
    if (!name || !email) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (paymentMethod === "creditCard" && !cardNumber) {
      toast.error("Please enter your card details");
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      // After showing success for a moment, close and reset
      setTimeout(() => {
        onConfirm();
        setIsComplete(false);
        setName("");
        setEmail("");
        setPhone("");
        setCardNumber("");
        onOpenChange(false);
      }, 1500);
    }, 1500);
  };

  const formatCardNumber = (value: string) => {
    // Remove non-digit characters
    const digits = value.replace(/\D/g, "");
    // Add space after every 4 digits
    const formatted = digits.replace(/(\d{4})(?=\d)/g, "$1 ");
    // Limit to 19 characters (16 digits + 3 spaces)
    return formatted.slice(0, 19);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardNumber(formatCardNumber(e.target.value));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        {isComplete ? (
          <div className="py-12 flex flex-col items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <h2 className="text-xl font-semibold text-center">Payment Successful!</h2>
            <p className="text-center text-muted-foreground mt-2">
              Your bid has been placed successfully.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Complete Your Bid</DialogTitle>
              <DialogDescription>
                You're placing a bid of ${bidAmount.toLocaleString()} for "{auctionTitle}"
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name *</Label>
                <Input 
                  id="name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="email">Email *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  placeholder="john@example.com"
                  required
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)} 
                  placeholder="(123) 456-7890"
                />
              </div>
              
              <div className="grid gap-2 pt-2">
                <Label>Payment Method *</Label>
                <RadioGroup 
                  value={paymentMethod} 
                  onValueChange={setPaymentMethod}
                  className="grid grid-cols-4 gap-2"
                >
                  {paymentOptions.map((option) => (
                    <div 
                      key={option.id}
                      className={`flex flex-col items-center justify-center border rounded-md p-2 cursor-pointer transition-all hover:bg-primary/5 ${
                        paymentMethod === option.id ? "border-primary bg-primary/5" : "border-input"
                      }`}
                    >
                      <RadioGroupItem value={option.id} id={option.id} className="sr-only" />
                      <Label htmlFor={option.id} className="cursor-pointer flex flex-col items-center gap-1.5">
                        {option.icon}
                        <span className="text-xs text-center">{option.name}</span>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              {paymentMethod === "creditCard" && (
                <div className="grid gap-2 mt-2">
                  <Label htmlFor="card">Card Number *</Label>
                  <Input 
                    id="card" 
                    placeholder="1234 5678 9012 3456" 
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    required
                  />
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button 
                type="submit" 
                onClick={handleConfirmPayment}
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : `Confirm Bid ($${bidAmount.toLocaleString()})`}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PaymentModal;
