import React from 'react'
import { Section } from '@/components/List'
import { DetailCell } from './DetailCell'
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
          {!!item.exhibit && <DetailCell title={item.exhibit} />}
          {!!item.remarks && (
            <DetailCell title={item.remarks} subtitle="備考" />
          )}
        </Section>
      )}
      <Section title="所在地">
        <DetailCell title={item.place} subtitle="住所" navigateMap={item} />
      </Section>
      <Section title="情報">
        <DetailCell title={item.author} subtitle="作家名" />
        <DetailCell
          title={item.owner}
          subtitle="所蔵者"
          description={item.acquisitionMethod}
        />
        <DetailCell title={item.year} subtitle="制作年" />
        <DetailCell title={item.material} subtitle="素材" />
        {!!item.size && <DetailCell title={item.size} subtitle="サイズ" />}
        {!!item.weight && <DetailCell title={item.weight} subtitle="重量" />}
      </Section>
    </>
  )
}

const Container: React.FC<Props> = (props) => {
  return <Component {...props} />
}

export { Container as SculptureSections }
