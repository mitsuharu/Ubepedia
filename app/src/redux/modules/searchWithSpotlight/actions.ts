import { actionCreatorFactory } from 'typescript-fsa'

const actionCreator = actionCreatorFactory('searchWithSpotlight')

export const assignIsValidatedSearchWithSpotlight = actionCreator<boolean>(
  'ASSIGN_IS_VALIDATED_SEARCH_WITH_SPOTLIGHT',
)

export const updatedSearchWithSpotlight = actionCreator(
  'UPDATED_SEARCH_WITH_SPOTLIGHT',
)
