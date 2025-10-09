import React from 'react';
import { Header } from '@/components/organisms/Header';
import { BottomNavigation } from '@/components/organisms/BottomNavigation';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/atoms/Card';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { Avatar, AvatarFallback } from '@/components/atoms/Avatar';
import { useAuth } from '@/context/AuthContext';
import { Settings, LogOut, Mail, Phone, IdCard, Clock, Shield } from 'lucide-react';

export default function AccountPage() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />
      
      <main className="container mx-auto px-6 py-8 space-y-8">
        {/* Profile Section */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4 mb-6">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
                <p className="text-muted-foreground">{user.role}</p>
                <Badge variant="success" className="mt-2">
                  <Shield className="h-3 w-3 mr-1" />
                  {user.status === 'verified' ? 'Đã xác thực' : user.status}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Information */}
        <Card>
          <CardHeader>
            <CardTitle>Thông tin tài khoản</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 py-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 py-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Điện thoại</p>
                <p className="font-medium">{user.phone}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 py-2">
              <IdCard className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Mã nhân viên</p>
                <p className="font-medium">ID: {user.employeeId}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Thao tác</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full justify-start"
            >
              <Settings className="h-4 w-4 mr-2" />
              Cài đặt tài khoản
            </Button>
            
            <Button 
              variant="danger" 
              className="w-full justify-start"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Đăng xuất
            </Button>
          </CardContent>
        </Card>

        {/* System Status */}
        <Card>
          <CardHeader>
            <CardTitle>Trạng thái hệ thống</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Phiên đăng nhập</span>
              <Badge variant="success">Hoạt động</Badge>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Lần cuối truy cập</span>
              <div className="text-right">
                <Badge variant="default">10:30 AM</Badge>
                <p className="text-xs text-muted-foreground mt-1">Hôm nay</p>
              </div>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-muted-foreground">Quyền truy cập</span>
              <Badge variant="warning">Toàn quyền</Badge>
            </div>
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
}