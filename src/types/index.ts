// Type definitions for IFC application

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
  employeeId: string;
  status: 'verified' | 'pending' | 'inactive';
  avatar?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export interface MetricData {
  title: string;
  value: string;
  change: number;
  subtitle: string;
  icon: string;
  type: 'increase' | 'decrease' | 'warning';
}

export interface ChartData {
  name: string;
  value: number;
  month?: string;
}

export interface FlightData {
  active: number;
  total: number;
  flights: number;
  errors: number;
}

export interface QualityData {
  averageSpeed: number;
  complaints: number;
}

export interface RouteData {
  from: string;
  to: string;
  flights: number;
  passengers: number;
}