export interface routerType {
  path?: string;
  meta?: {
    title?: string;
    icon?: string;
    key?: string;
    disabled?: boolean;
  };
  element?: React.ReactNode;
  children?: routerType[];
}

export interface menuType {
  title?: string;
  label?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  key?: string;
  children?: menuType[];
}
