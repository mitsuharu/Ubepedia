import { actionCreatorFactory } from 'typescript-fsa'

const actionCreator = actionCreatorFactory('userSetting')

export const assignOnLongPressCopyToClipboard = actionCreator<boolean>(
  'ASSIGN_ON_LONG_PRESS_COPY_TO_CLIPBOARD',
)

export const toggleOnLongPressCopyToClipboard = actionCreator(
  'TOGGLE_ON_LONG_PRESS_COPY_TO_CLIPBOARD',
)
