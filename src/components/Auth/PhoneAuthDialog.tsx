
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { QrCode } from 'lucide-react';

interface PhoneAuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const PhoneAuthDialog: React.FC<PhoneAuthDialogProps> = ({ isOpen, onClose, onSuccess }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPolling, setIsPolling] = useState(false);
  const { toast } = useToast();

  // Generate a unique session ID for this QR code session
  const sessionId = React.useMemo(() => {
    return Math.random().toString(36).substring(2, 15);
  }, []);

  useEffect(() => {
    if (isOpen) {
      generateQrCode();
    } else {
      setQrCodeUrl('');
      setIsPolling(false);
    }
  }, [isOpen]);

  const generateQrCode = async () => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      toast({
        title: "配置错误",
        description: "Supabase 未正确配置。请设置 VITE_SUPABASE_URL 和 VITE_SUPABASE_ANON_KEY 环境变量。",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);

    try {
      // For demo purposes, we'll generate a mock QR code URL
      // In a real implementation, this would come from a WeChat API call
      const mockQrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=wechat-auth:${sessionId}`;
      setQrCodeUrl(mockQrCodeUrl);
      
      // Start polling for authentication status
      startPolling();
      
      toast({
        title: "二维码已生成",
        description: "请使用微信扫描二维码完成登录",
      });
    } catch (error: any) {
      toast({
        title: "生成二维码失败",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startPolling = () => {
    setIsPolling(true);
    
    // In a real implementation, this would poll a backend endpoint
    // that checks if the WeChat scan was successful
    const pollingInterval = setInterval(() => {
      // For demo purposes, we'll simulate a successful auth after 5 seconds
      setTimeout(() => {
        if (isPolling) {
          // Simulate successful authentication
          clearInterval(pollingInterval);
          setIsPolling(false);
          
          // Create a Supabase user after successful WeChat auth
          // In production, this would be handled by a proper OAuth flow
          simulateSuccessfulAuth();
        }
      }, 5000);
    }, 2000);

    // Clean up interval if component unmounts
    return () => clearInterval(pollingInterval);
  };

  const simulateSuccessfulAuth = async () => {
    try {
      // In a real implementation, we would receive user data from WeChat
      // and create or sign in the user with Supabase
      const mockWechatData = {
        id: `wechat_${Math.random().toString(36).substring(2, 9)}`,
        name: "微信用户",
        avatar: "https://placeholder.com/avatar.png"
      };
      
      // Create a random email for this WeChat user (in production, you'd handle this differently)
      const randomEmail = `wechat_${mockWechatData.id}@example.com`;
      const randomPassword = Math.random().toString(36).substring(2, 15);
      
      const { data, error } = await supabase.auth.signUp({
        email: randomEmail,
        password: randomPassword,
        options: {
          data: {
            wechat_id: mockWechatData.id,
            wechat_name: mockWechatData.name,
            wechat_avatar: mockWechatData.avatar,
            auth_method: 'wechat'
          }
        }
      });

      if (error) throw error;

      toast({
        title: "微信登录成功",
        description: "您已成功通过微信登录",
      });

      onSuccess();
    } catch (error: any) {
      toast({
        title: "登录失败",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => !isLoading && !isPolling && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>微信扫码登录</DialogTitle>
          <DialogDescription>
            请使用微信扫描下方二维码，关注公众号并登录
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-4">
          {isLoading ? (
            <div className="w-48 h-48 border rounded-md flex items-center justify-center">
              <p className="text-gray-500">生成二维码中...</p>
            </div>
          ) : qrCodeUrl ? (
            <div className="flex flex-col items-center">
              <img src={qrCodeUrl} alt="微信登录二维码" className="w-48 h-48 border rounded-md" />
              {isPolling && <p className="mt-2 text-sm text-gray-500">等待扫码中...</p>}
            </div>
          ) : (
            <div className="w-48 h-48 border rounded-md flex items-center justify-center">
              <QrCode className="w-12 h-12 text-gray-300" />
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onClose} 
            disabled={isLoading || isPolling}
          >
            取消
          </Button>
          <Button 
            type="button" 
            onClick={generateQrCode} 
            disabled={isLoading || isPolling}
          >
            {qrCodeUrl ? "刷新二维码" : "生成二维码"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PhoneAuthDialog;
