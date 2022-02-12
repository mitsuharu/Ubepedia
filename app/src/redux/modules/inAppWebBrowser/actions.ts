import { actionCreatorFactory } from 'typescript-fsa'

const actionCreator = actionCreatorFactory('inAppWebBrowser')

export const openWeb = actionCreator<string>('OPEN_WEB')
