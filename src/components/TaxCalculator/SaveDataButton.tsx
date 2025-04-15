
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import PhoneAuthDialog from '../Auth/PhoneAuthDialog';

interface SaveDataButtonProps {
  calculatorData: any; // Replace with your actual calculator data type
}

const SaveDataButton: React.FC<SaveDataButtonProps> = ({ calculatorData }) => {
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const saveData = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        setShowAuthDialog(true);
        return;
      }

      const { error } = await supabase
        .from('calculator_data')
        .upsert({
          user_id: user.id,
          data: calculatorData,
          created_at: new Date().toISOString(),
        });

      if (error) throw error;

      toast({
        title: "保存成功",
        description: "您的数据已成功保存",
      });
    } catch (error: any) {
      toast({
        title: "保存失败",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={saveData}
        disabled={isSaving}
        className="w-full md:w-auto"
      >
        <Save className="w-4 h-4 mr-2" />
        {isSaving ? "保存中..." : "保存数据"}
      </Button>

      <PhoneAuthDialog
        isOpen={showAuthDialog}
        onClose={() => setShowAuthDialog(false)}
        onSuccess={saveData}
      />
    </>
  );
};

export default SaveDataButton;
