import React from 'react'
import { Section } from '@/components/List'
import { Cell } from '@/components/List/Cell'
import { Sculpture } from '@/database/ube/model/Sculpture'

type Props = {
  item: Sculpture
}
type ComponentProps = Props & {}

const Component: React.FC<ComponentProps> = ({ item }) => {
  return (
    <>
      {(!!item.exhibit || !!item.remarks) && (
        <Section title="詳細">
          {!!item.exhibit && <Cell title={item.exhibit} />}
          {!!item.remarks && <Cell title={item.remarks} subtitle="備考" />}
        </Section>
      )}
      <Section title="所在地">
        <Cell title={item.place} subtitle="住所" />
      </Section>
      <Section title="情報">
        <Cell title={item.author} subtitle="作家名" />
        <Cell
          title={item.owner}
          subtitle="所蔵者"
          description={item.acquisitionMethod}
        />
        <Cell title={item.year} subtitle="制作年" />
        <Cell title={item.material} subtitle="素材" />
        {!!item.size && <Cell title={item.size} subtitle="サイズ" />}
        {!!item.weight && <Cell title={item.weight} subtitle="重量" />}
      </Section>
    </>
  )
}

const Container: React.FC<Props> = (props) => {
  return <Component {...props} />
}

export { Container as SculptureSections }
