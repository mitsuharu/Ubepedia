import React from 'react'
import { SectionHeader } from './SectionHeader'
import { CellGroup } from './CellGroup'

type Props = {
  title?: string
  children?: React.ReactNode
}

/**
 * ScrollView で　List 風表示するときの Section
 *
 * @param title - セクション名（省略化）
 *
 * @example
 * <Section title={"セクション名"}>
 *  <Cell title={"セル名"} onPress={ ... } />
 * 　...
 * </Section>
 */
const Component: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <SectionHeader title={title} />
      <CellGroup>{children}</CellGroup>
    </>
  )
}

export { Component as Section }
