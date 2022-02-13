import { actionCreatorFactory } from 'typescript-fsa'
import { MainType } from './state'

const actionCreator = actionCreatorFactory('userSetting')

export const assignMainType = actionCreator<MainType>('ASSIGN_MAIN_TYPE')

export const assignCanCopyToClipboardOnLongPress = actionCreator<boolean>(
  'ASSIGN_CAN_COPY_TO_CLIPBOARD_ON_LONG_PRESS',
)

export const toggleCanCopyToClipboardOnLongPress = actionCreator(
  'TOGGLE_CAN_COPY_TO_CLIPBOARD_ON_LONG_PRESS',
)
