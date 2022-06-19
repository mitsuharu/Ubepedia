import { actionCreatorFactory } from 'typescript-fsa'

const actionCreator = actionCreatorFactory('searchOnDevice')

export const assignIsValidatedSearchOnDevice = actionCreator<boolean>(
  'assign_Is_Validated_Search_On_Device',
)

export const updatedSearchOnDevice = actionCreator('updated_Search_On_Device')
