import { actionCreatorFactory } from 'typescript-fsa'
import { ToastType } from './state'

const actionCreator = actionCreatorFactory('toast')

export const enqueueToast =
  actionCreator<{ message: string; type?: ToastType }>('ENQUEUE_TOAST')

export const dequeueToast =
  actionCreator<{ createdAt: number }>('DEQUEUE_TOAST')

export const clearToast = actionCreator('CLEAR_TOAST')

export const _onHideToast =
  actionCreator<{ createdAt: number }>('ON_HIDE_TOAST')
