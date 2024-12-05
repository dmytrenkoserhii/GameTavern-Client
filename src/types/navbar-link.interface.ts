import { Routes } from '@/enums/routes.enum';

export interface NavbarLink {
  to: Routes;
  translationLabel: string;
  icon: React.ReactNode;
  isPremium?: boolean;
  highlight?: boolean;
  highlightType?: 'label' | 'badge';
  highlightLabel?: string;
}
