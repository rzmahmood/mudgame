import { useComponentValue } from "@latticexyz/react"
import { Entity, getComponentValue } from "@latticexyz/recs"
import { ReactNode } from "react"

type ScoreViewProps = {
  score: any,
  player: Entity | undefined,
}

export const ScoreView = ({ score, player }: ScoreViewProps) => {
  useComponentValue(score, player);

  const getScore = (): ReactNode => {
    if (!player) return;
    const s = getComponentValue(score, player);
    return (
      <>{s?.value?.toString()}</>
    )
  }

  return (
    <div className="text-center text-2xl p-12">
      Score: {getScore()}
    </div>
  )
}
