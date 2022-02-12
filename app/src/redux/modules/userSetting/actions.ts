import { actionCreatorFactory } from 'typescript-fsa'

const actionCreator = actionCreatorFactory('userSetting')

export const assignCanCopyToClipboardOnLongPress = actionCreator<boolean>(
  'ASSIGN_CAN_COPY_TO_CLIPBOARD_ON_LONG_PRESS',
)

export const toggleCanCopyToClipboardOnLongPress = actionCreator(
  'TOGGLE_CAN_COPY_TO_CLIPBOARD_ON_LONG_PRESS',
)
