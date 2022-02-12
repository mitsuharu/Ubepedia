import React from 'react'
import { Section } from '@/components/List'
import { DetailCell } from './DetailCell'
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
          <DetailCell title={item.postalCode} subtitle="郵便番号" />
        )}
        <DetailCell title={item.address} subtitle="住所" />
        {!!item.phone && <DetailCell title={item.phone} subtitle="電話番号" />}
        {!!item.fax && <DetailCell title={item.fax} subtitle="FAX番号" />}
        {!!item.email && (
          <DetailCell title={item.email} subtitle="メールアドレス" />
        )}
      </Section>
      <Section title="業務時間">
        <DetailCell title={item.startTime} subtitle="開館時刻" />
        <DetailCell title={item.endTime} subtitle="閉館時刻" />
        {!!item.timeNotes && (
          <DetailCell title={item.timeNotes} subtitle="利用時間注意" />
        )}
      </Section>
      {item.enableClosures() && (
        <Section title="休日">
          {!!item.weekClosureDay && (
            <DetailCell title={item.weekClosureDay} subtitle="休日（曜日）" />
          )}
          {!!item.closureDay && (
            <DetailCell title={item.closureDay} subtitle="休日" />
          )}
          {!!item.closureDayNotes && (
            <DetailCell title={item.closureDayNotes} subtitle="休日注意" />
          )}
        </Section>
      )}
      {!!item.enableParkings() && (
        <Section title="駐車場">
          <DetailCell title={item.parking} subtitle="駐車場" />
          {!!item.parkingFee && (
            <DetailCell title={item.parkingFee} subtitle="駐車料" />
          )}
        </Section>
      )}
      {item.enableOthers() && (
        <Section title="その他">
          {!!item.disabledToilet && (
            <DetailCell title={item.disabledToilet} subtitle="障害者用トイレ" />
          )}
          {!!item.reservation && (
            <DetailCell title={item.reservation} subtitle="施設予約" />
          )}
        </Section>
      )}
    </>
  )
}

const Container: React.FC<Props> = (props) => {
  return <Component {...props} />
}

export { Container as CivicFacilitySections }
