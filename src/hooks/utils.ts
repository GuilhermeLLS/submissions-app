import type { UseToastOptions } from '@chakra-ui/react';

type TriggerComponentAction = 'Submit' | 'Delete';

const actionVerbs: Record<
  TriggerComponentAction,
  { past: string; presentPerfect: string }
> = {
  Submit: {
    past: 'created',
    presentPerfect: 'creating', // ? is this the actuall name?
  },
  Delete: {
    past: 'deleted',
    presentPerfect: 'deleting',
  },
};

export function buildToastOptions(
  status: number,
  action: TriggerComponentAction,
  position: Pick<UseToastOptions, 'position'>['position'] = 'top-right'
): UseToastOptions {
  const toastType = status === 200 ? 'success' : 'error';
  const toastMessage =
    status === 200
      ? `Submission ${actionVerbs[action].past}!`
      : `Error while ${actionVerbs[action].presentPerfect}!`;

  return {
    position,
    status: toastType,
    isClosable: true,
    title: toastMessage,
  };
}
