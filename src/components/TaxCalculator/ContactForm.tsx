
import React from 'react';
import { Button } from "@/components/ui/button";
import { Phone } from 'lucide-react';

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
          className="bg-vivid-purple hover:bg-secondary-purple text-white w-full"
        >
          <Phone className="mr-2 h-5 w-5" />
          立即联系税务顾问
        </Button>
      </div>
    </div>
  );
};

export default ContactForm;
