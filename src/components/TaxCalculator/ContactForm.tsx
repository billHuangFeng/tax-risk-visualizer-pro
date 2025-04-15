
import React from 'react';
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

const ContactForm = () => {
  const handleContactAdvisor = () => {
    window.open('https://work.weixin.qq.com/ca/cawcde03d69f2d37e9', '_blank');
  };

  return (
    <div className="space-y-4 mt-4">
      <p className="text-center text-gray-600">点击下方按钮直接联系税务顾问</p>
      <div className="flex justify-center pt-4">
        <Button 
          onClick={handleContactAdvisor} 
          className="bg-tax-blue hover:bg-tax-light-blue text-white w-full"
        >
          立即联系税务顾问
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
