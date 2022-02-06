import React from 'react'
import { Text, TextStyle, useColorScheme, View, ViewStyle } from 'react-native'
import { styleType } from '@/utils/styles'
import { makeStyles } from 'react-native-swag-styles'
import { UbeDataType } from '@/database/ube/type'
import FastImage, { ImageStyle } from 'react-native-fast-image'
import { CustomFastImage } from '@/components/CustomFastImage'
import { Spacer } from '@/components/Spacer'

type Props = {
  item: UbeDataType
}
type ComponentProps = Props & {
  name: string
  imageUrl: string | undefined
}

const Component: React.FC<ComponentProps> = ({ name, imageUrl }) => {
  const styles = useStyles()

  return (
    <View style={styles.container}>
      <CustomFastImage
        source={{ uri: imageUrl }}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.image}
        canImageModal={true}
      />
      <Spacer height={8} />
      <Text style={styles.text}>{name}</Text>
    </View>
  )
}

const Container: React.FC<Props> = (props) => {
  const { item } = props
  const { name, imageUrl } = item

  return <Component {...props} name={name} imageUrl={imageUrl} />
}

export { Container as DetailHeaderComponent }

const useStyles = makeStyles(useColorScheme, (colorScheme) => ({
  container: styleType<ViewStyle>({
    padding: 16,
    backgroundColor: 'transparent',
  }),
  image: styleType<ImageStyle>({
    width: '100%',
    height: 200,
  }),
  text: styleType<TextStyle>({
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 32,
  }),
}))
