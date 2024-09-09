import { TrashIcon } from '@radix-ui/react-icons';

import { Button } from '../ui/button';

export const DeleteButton = () => {
  return (
    <Button size='icon' variant='outline'>
      <TrashIcon />
    </Button>
  );
};
