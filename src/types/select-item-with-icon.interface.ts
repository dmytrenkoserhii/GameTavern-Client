import { SelectItem } from '@/types';

export interface SelectItemWithIcon extends SelectItem {
  icon: React.ComponentType<{ size: number }>;
}
