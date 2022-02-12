import { actionCreatorFactory } from 'typescript-fsa'

const actionCreator = actionCreatorFactory('clipboard')

export const copyToClipboard =
  actionCreator<{ text: string; showResult?: boolean }>('COPY_TO_CLIPBOARD')
