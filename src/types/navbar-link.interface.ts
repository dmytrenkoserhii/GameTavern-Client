import { Routes } from '@/enums/routes.enum';

export interface NavbarLink {
  to: Routes;
  translationLabel: string;
  icon: React.ReactNode;
  isPremium?: boolean;
}
