import { actionCreatorFactory } from 'typescript-fsa'
import { ToastType } from './state'

const actionCreator = actionCreatorFactory('snackbar')

export const enqueueSnackbar =
  actionCreator<{ message: string; type?: ToastType }>('ENQUEUE_SNACKBAR')

export const dequeueSnackbar =
  actionCreator<{ createdAt: number }>('DEQUEUE_SNACKBAR')

export const clearSnackbar = actionCreator('CLEAR_SNACKBAR')
