import React from 'react'
import { Text, TextStyle, useColorScheme, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/CONSTANTS/COLOR'
import { Button } from '@/components/Button'
import { ItemType } from './types'
import FastImage, { ImageStyle } from 'react-native-fast-image'
import { CustomFastImage } from '@/components/CustomFastImage'

type Props = {
  item: ItemType
  onPress: () => void
}
type ComponentProps = Props & {
  title: string
  imageUrl: string | undefined
}

const Component: React.FC<ComponentProps> = ({ title, imageUrl, onPress }) => {
  const styles = useStyles()

  return (
    <Button style={styles.container} onPress={onPress}>
      <CustomFastImage
        source={{ uri: imageUrl }}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.image}
      />
      <Text style={styles.text}>{title}</Text>
    </Button>
  )
}

const Container: React.FC<Props> = (props) => {
  const {
    item: { name, depiction },
  } = props

  return <Component {...props} title={name} imageUrl={depiction} />
}

export { Container as Cell }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    backgroundColor: COLOR(colorScheme).BACKGROUND.PRIMARY,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
  }),
  text: styleType<TextStyle>({
    // textAlign: 'center',
  }),
  image: styleType<ImageStyle>({
    width: 100,
    height: 100,
  }),
}))
