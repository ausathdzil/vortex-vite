import { HouseIcon, LayoutIcon, LightningIcon } from '@phosphor-icons/react';
import { NavLink } from 'react-router';
import styled from 'styled-components';

const navItems = [
  {
    label: 'Home',
    href: '/',
    icon: <HouseIcon weight="bold" />,
  },
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: <LayoutIcon weight="bold" />,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <LightningIcon weight="bold" />
        Vortex
      </SidebarHeader>
      <SidebarContent>
        {navItems.map((item) => (
          <SidebarLink key={item.href} to={item.href}>
            {item.icon}
            {item.label}
          </SidebarLink>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  padding: calc(var(--spacing) * 4);
  height: 100%;
  width: 16rem;

  background: var(--sidebar);
  color: var(--sidebar-foreground);
  border-right: 1px solid var(--border);
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  padding: calc(var(--spacing) * 2);
`;

const SidebarContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
  min-height: calc(var(--spacing) * 0);
  overflow: auto;
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  padding: calc(var(--spacing) * 2);
  border-radius: var(--radius);

  font-size: var(--text-sm);
  font-weight: 500;

  & > svg {
    width: 1rem;
    height: 1rem;
  }

  &:hover {
    background: var(--sidebar-accent);
    color: var(--sidebar-accent-foreground);
  }

  &.active {
    background: var(--sidebar-primary);
    color: var(--sidebar-primary-foreground);
  }
`;
