import React from 'react'
import { Section } from '@/components/List'
import { Cell } from '@/components/List/Cell'
import { CulturalProperty } from '@/database/ube/model/CulturalProperty'

type Props = {
  item: CulturalProperty
}
type ComponentProps = Props & {}

const Component: React.FC<ComponentProps> = ({ item }) => {
  return (
    <>
      {!!item.description && (
        <Section title="詳細">{<Cell title={item.description} />}</Section>
      )}
      <Section title="所在地">
        <Cell title={item.place} subtitle="住所" />
      </Section>
      <Section title="情報">
        <Cell title={item.category} subtitle="文化財区分" />
        {!!item.subCategory && (
          <Cell title={item.subCategory} subtitle="文化財区分（副）" />
        )}
        {!!item.designatedDate && (
          <Cell title={item.designatedDate} subtitle="登録・指定年月日" />
        )}
        {!!item.administrator && (
          <Cell
            title={item.administrator}
            subtitle="所有者・管理者・保存団体"
          />
        )}
        {!!item.productionAge && (
          <Cell title={item.productionAge} subtitle="制作年代等" />
        )}
      </Section>
    </>
  )
}

const Container: React.FC<Props> = (props) => {
  return <Component {...props} />
}

export { Container as CulturalPropertySections }
