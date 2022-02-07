import React from 'react'
import { Section } from '@/components/List'
import { Cell } from '@/components/List/Cell'
import { CivicFacility } from '@/database/ube/model/CivicFacility'

type Props = {
  item: CivicFacility
}
type ComponentProps = Props & {}

const Component: React.FC<ComponentProps> = ({ item }) => {
  return (
    <>
      <Section title="所在地">
        {!!item.postalCode && (
          <Cell title={item.postalCode} subtitle="郵便番号" />
        )}
        <Cell title={item.address} subtitle="住所" />
        {!!item.phone && <Cell title={item.phone} subtitle="電話番号" />}
        {!!item.fax && <Cell title={item.fax} subtitle="FAX番号" />}
        {!!item.email && <Cell title={item.email} subtitle="メールアドレス" />}
      </Section>
      <Section title="業務時間">
        <Cell title={item.startTime} subtitle="開館時刻" />
        <Cell title={item.endTime} subtitle="閉館時刻" />
        {!!item.timeNotes && (
          <Cell title={item.timeNotes} subtitle="利用時間注意" />
        )}
      </Section>
      <Section title="休日">
        {!!item.weekClosureDay && (
          <Cell title={item.weekClosureDay} subtitle="休日（曜日）" />
        )}
        <Cell title={item.closureDay} subtitle="休日" />
        {!!item.closureDayNotes && (
          <Cell title={item.closureDayNotes} subtitle="休日注意" />
        )}
      </Section>
      <Section title="駐車場">
        <Cell title={item.parking} subtitle="駐車場" />
        <Cell title={item.parkingFee} subtitle="駐車料" />
      </Section>
      <Section title="その他">
        <Cell title={item.disabledToilet} subtitle="障害者用トイレ" />
        {!!item.reservation && (
          <Cell title={item.reservation} subtitle="施設予約" />
        )}
      </Section>
    </>
  )
}

const Container: React.FC<Props> = (props) => {
  return <Component {...props} />
}

export { Container as CivicFacilitySections }
