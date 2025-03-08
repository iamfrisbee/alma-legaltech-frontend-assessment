'use client';

import Image from 'next/image';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  AppBar,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemButtonProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const DrawerHeader = styled(AppBar)({
  flexDirection: 'row',
  justifyContent: 'flex-end',
});

const DrawerContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
});

const ListLink = styled(ListItemButton)<ListItemButtonProps & LinkProps>(
  ({ theme }) => ({
    ['&.active']: {
      fontWeight: 'bold',
    },
  })
);

export default function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();
  return (
    <Drawer variant="temporary" open={open} anchor="left">
      <DrawerContent>
        <DrawerHeader position="static">
          <IconButton onClick={() => onClose()}>
            <FontAwesomeIcon width="25" height="25" icon={['fas', 'times']} />
          </IconButton>
        </DrawerHeader>
        <Link href="/">
          <Image src="/alma.svg" alt="Alma" width={50} height={50} />
        </Link>
        <Divider />
        <List>
          <ListItem>
            <ListLink
              onClick={onClose}
              className={pathname === '/admin' ? 'active' : undefined}
              component={Link}
              href="/admin"
            >
              Leads
            </ListLink>
          </ListItem>
          <ListItem>
            <ListLink
              onClick={onClose}
              className={pathname === '/admin/settings' ? 'active' : undefined}
              component={Link}
              href="/admin/settings"
            >
              Settings
            </ListLink>
          </ListItem>
        </List>
      </DrawerContent>
    </Drawer>
  );
}
