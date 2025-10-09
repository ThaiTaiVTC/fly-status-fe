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

export interface FlightDetail {
  id: string;
  flightNumber: string;
  aircraft: string;
  route: string;
  departure: string;
  arrival: string;
  status: 'active' | 'completed' | 'scheduled';
  passengers: number;
  connectedDevices: number;
  bandwidth: number;
  quality: 'excellent' | 'good' | 'fair' | 'poor';
  downtime: number;
  complaints: number;
}

export interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info';
  title: string;
  message: string;
  flightNumber?: string;
  timestamp: string;
  status: 'active' | 'resolved';
}

export interface Device {
  id: string;
  type: 'phone' | 'tablet' | 'laptop';
  os: string;
  bandwidth: number;
  duration: number;
  package: string;
}

export interface FilterOptions {
  dateRange?: { start: Date; end: Date };
  route?: string;
  aircraft?: string;
  servicePackage?: string;
  status?: string;
}