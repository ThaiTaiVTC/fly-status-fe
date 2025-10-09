import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vietnamairlines.ifcanalyst',
  appName: 'IFC Analyst',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
