import React from 'react'
import { Text, TextStyle, useColorScheme, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { COLOR } from '@/CONSTANTS/COLOR'
import { Button } from '@/components/Button'
import FastImage, { ImageStyle } from 'react-native-fast-image'
import { CustomFastImage } from '@/components/CustomFastImage'
import { Spacer } from '@/components/Spacer'
import { UbeDataType } from '@/database/ube/type'

type Props = {
  item: UbeDataType
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
      <Spacer width={10} />
      <Text style={styles.text}>{title}</Text>
    </Button>
  )
}

const Container: React.FC<Props> = (props) => {
  const {
    item: { name, imageUrl },
  } = props

  return <Component {...props} title={name} imageUrl={imageUrl} />
}

export { Container as Cell }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    backgroundColor: COLOR(colorScheme).BACKGROUND.PRIMARY,
    paddingVertical: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  text: styleType<TextStyle>({
    flexShrink: 1,
  }),
  image: styleType<ImageStyle>({
    width: 100,
    height: 100,
  }),
}))
