import { HTMLAttributes } from 'react';

import { cn } from '@/utils/cn';

interface ListProps extends HTMLAttributes<HTMLUListElement> {
  className?: string;
}

const List = ({ children, className }: ListProps) => {
  return <ul className={cn('flex flex-col gap-4', className)}>{children}</ul>;
};

interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  className?: string;
}

const ListItem = ({ children, className }: ListItemProps) => {
  return (
    <li className={cn('flex items-center gap-4 px-2 py-1', className)}>
      {children}
    </li>
  );
};

interface ListItemLeadingProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const ListItemLeading = ({ children, className }: ListItemLeadingProps) => {
  return <span className={cn(className)}>{children}</span>;
};

interface ListItemContentProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const ListItemContent = ({ children, className }: ListItemContentProps) => {
  return (
    <div className={cn('flex flex-1 flex-col', className)}>{children}</div>
  );
};

interface ListItemTitleProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const ListItemTitle = ({ children, className }: ListItemTitleProps) => {
  return <span className={cn('text-lg', className)}>{children}</span>;
};

interface ListItemDescriptionProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const ListItemDescription = ({
  children,
  className,
}: ListItemDescriptionProps) => {
  return <span className={cn('text-lg', className)}>{children}</span>;
};

interface ListItemTrailingProps extends HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

const ListItemTrailing = ({ children, className }: ListItemTrailingProps) => {
  return <div className={cn(className)}>{children}</div>;
};

List.Item = ListItem;

ListItem.Leading = ListItemLeading;
ListItem.Content = ListItemContent;
ListItem.Title = ListItemTitle;
ListItem.Description = ListItemDescription;
ListItem.Trailing = ListItemTrailing;

export { List, ListItem };
