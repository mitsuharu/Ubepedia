import { styleType } from '@/utils/styles'
import React, { useState, useCallback, useMemo, useEffect } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import FastImage, {
  FastImageProps,
  OnLoadEvent,
  Source,
} from 'react-native-fast-image'
import { LoadingView } from './LoadingView'
import { NoImageView } from './NoImageView'
import { Button } from '@/components/Button'
import ImageViewing from 'react-native-image-viewing'

type Props = {
  canImageModal?: boolean
} & FastImageProps

/**
 * FastImage の props の Source か型判定する
 */
const isSource = (arg: any | undefined | null): arg is Source =>
  !!arg && arg.uri !== undefined

/**
 * FastImage の機能強化版
 * - ローディング画像とエラー画像を追加した
 * - 画像をモーダル表示する
 *
 * @param canImageModal 画像をモーダル表示したい場合は true を設定する
 */
export const CustomFastImage = (props: Props) => {
  const { canImageModal, style, source, onLoad, onError } = props

  const [isLoading, setLoading] = useState(true)
  const [isErrored, setIsErrored] = useState(false)
  const [canPress, setCanPress] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)

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

  const onPress = useCallback(() => {
    setVisibleModal(true)
  }, [])

  const onRequestClose = useCallback(() => {
    setVisibleModal(false)
  }, [])

  useEffect(() => {
    setCanPress(!!canImageModal && !isErrored && !isLoading)
  }, [canImageModal, isErrored, isLoading])

  const imageUrl = useMemo(
    () => (isSource(source) ? source.uri : undefined),
    [source],
  )

  return (
    <>
      <Button style={viewSizeStyle} onPress={canPress ? onPress : undefined}>
        <FastImage {...props} onLoad={onCustomLoad} onError={onCustomError} />
        <LoadingView style={styles.image} isVisible={isLoading} />
        <NoImageView style={styles.image} isVisible={isErrored} />
      </Button>
      {!!imageUrl && canImageModal && (
        <ImageViewing
          visible={visibleModal}
          imageIndex={0}
          images={[{ uri: imageUrl }]}
          onRequestClose={onRequestClose}
        />
      )}
    </>
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
