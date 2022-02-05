import { styleType } from '@/utils/styles'
import React, { useState, useCallback } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import FastImage, { FastImageProps, OnLoadEvent } from 'react-native-fast-image'

type Props = {
  renderPlaceholder?: (() => React.ReactElement) | React.ReactElement
  renderErrorImage?: (() => React.ReactElement) | React.ReactElement
} & FastImageProps

const render = (
  arg?: (() => React.ReactElement) | React.ReactElement,
): React.ReactElement => {
  if (!arg) {
    return <></>
  }
  return (
    <View style={styles.image}>{typeof arg === 'function' ? arg() : arg}</View>
  )
}

export const CustomFastImage = (props: Props) => {
  const { renderPlaceholder, renderErrorImage, onLoad, onError } = props
  const [isLoading, setLoading] = useState(true)
  const [isErrored, setIsErrored] = useState(false)

  const onCustomLoad = useCallback(
    (event: OnLoadEvent) => {
      setLoading(false)
      onLoad?.(event)
    },
    [onLoad],
  )

  const onCustomError = useCallback(() => {
    setLoading(false)
    setIsErrored(true)
    onError?.()
  }, [onError])

  return (
    <View>
      <FastImage {...props} onLoad={onCustomLoad} onError={onCustomError} />
      {isLoading && render(renderPlaceholder)}
      {isErrored && render(renderErrorImage)}
    </View>
  )
}

const styles = StyleSheet.create({
  image: styleType<ViewStyle>({
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  }),
})
