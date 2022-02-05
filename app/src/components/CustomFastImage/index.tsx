import { styleType } from '@/utils/styles'
import React, { useState, useCallback, useMemo } from 'react'
import { View, StyleSheet, ViewStyle } from 'react-native'
import FastImage, { FastImageProps, OnLoadEvent } from 'react-native-fast-image'
import { LoadingView } from './LoadingView'
import { NoImageView } from './NoImageView'

type Props = {} & FastImageProps

export const CustomFastImage = (props: Props) => {
  const { style, onLoad, onError } = props
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

  const viewSizeStyle = useMemo(() => {
    if (style) {
      const { width, height } = StyleSheet.flatten(style)
      return styleType<ViewStyle>({
        width,
        height,
        backgroundColor: 'transparent',
      })
    }
    return undefined
  }, [style])

  return (
    <View style={viewSizeStyle}>
      <FastImage {...props} onLoad={onCustomLoad} onError={onCustomError} />
      <LoadingView style={styles.image} isVisible={isLoading} />
      <NoImageView style={styles.image} isVisible={isErrored} />
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
