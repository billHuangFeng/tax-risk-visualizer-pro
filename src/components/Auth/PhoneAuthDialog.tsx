
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

interface PhoneAuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PhoneAuthDialog: React.FC<PhoneAuthDialogProps> = ({ isOpen, onClose, onSuccess }) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      toast({
        title: "配置错误",
        description: "Supabase 未正确配置。请确保环境变量已设置。",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        phone,
        password,
      });

      if (error) throw error;

      toast({
        title: "注册成功",
        description: "账号已创建，请使用手机号和密码登录",
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: "注册失败",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => !isLoading && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>创建账号</DialogTitle>
          <DialogDescription>
            请输入手机号和密码创建账号，以便保存您的数据
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="tel"
              placeholder="手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="设置密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
              取消
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "注册中..." : "注册"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneAuthDialog;
