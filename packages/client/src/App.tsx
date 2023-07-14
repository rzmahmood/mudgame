import { useComponentValue } from "@latticexyz/react";
import { SyncState } from "@latticexyz/network";
import { useMUD } from "./MUDContext";
import { GameBoard } from "./GameBoard";
import { useState } from "react";
import { TerrainStyle } from "./terrainTypes";
import { Inventory, InventoryItem } from "./Inventory";
import { ItemModal } from "./ItemModel";
import { ScoreView } from "./ScoreView";
import { MonsterType, monsterTypes } from "./monsterTypes";
import { Entity, getComponentValue } from "@latticexyz/recs";

export const App = () => {
  const {
    components: {
      LoadingState,
      Score,
      Encounter,
      Monster,
      MonsterCatchAttempt
    },
    network: { singletonEntity, playerEntity },
  } = useMUD();

  const loadingState = useComponentValue(LoadingState, singletonEntity, {
    state: SyncState.CONNECTING,
    msg: "Connecting",
    percentage: 0,
  });

  const [previousScore, setPreviousScore] = useState("0");
  const currentScore = useComponentValue(Score, playerEntity)?.value.toString();

  const [terrainStyle, setTerrainStyle] = useState<TerrainStyle | undefined>(undefined);
  const [openModal, setOpenModal] = useState(false);
  const [currentItem, setCurrentItem] = useState<InventoryItem | undefined>(undefined);

  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);

  const encounter = useComponentValue(Encounter, playerEntity);
  const monsterType = useComponentValue(Monster, encounter ? (encounter.monster as Entity) : undefined)?.value;
  const monster = monsterType != null && monsterType in MonsterType ? monsterTypes[monsterType as MonsterType] : null;
  let catchAttempt: any = 0;
  if (playerEntity) {
    catchAttempt = getComponentValue(MonsterCatchAttempt, playerEntity)?.result;
  }

  console.log(encounter, monsterType, monster, catchAttempt);

  const updateItems = (
    inMonsterType: number | undefined,
    inMonster: any
  ) => {
    if (!inMonsterType) {
      console.log("missing monster type");
      return;
    }
    if (!inMonster) {
      console.log("missing monster");
      return;  
    }
    console.log('Update items', inMonsterType, inMonster);
    inventoryItems.push({
      name: inMonster?.name,
      emoji: inMonster?.emoji,
    });
    setInventoryItems(inventoryItems);
    console.log('inventoryItems', inventoryItems);
  }

  // Current score been incremented, add monster to items
  if (currentScore && previousScore !== currentScore) {
    setPreviousScore(currentScore);
    updateItems(monsterType, monster);
  }

  const selectTerrainStyle = (selection: TerrainStyle) => {
    setTerrainStyle(selection);
  }

  const terrainStyleSelector = () => {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
          <div onClick={() => selectTerrainStyle(TerrainStyle.FieldAndStone)}>
              <img className="rounded-t-lg" src="../images/fieldandstone.png" alt="" />
          </div>
          <div className="p-5">
              <div onClick={() => selectTerrainStyle(TerrainStyle.FieldAndStone)}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">🌳 Field And Stone 🪨</h5>
              </div>
          </div>
        </div>
        <div className="w-5"></div>    
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 cursor-pointer">
          <div onClick={() => selectTerrainStyle(TerrainStyle.FireAndWater)}>
              <img className="rounded-t-lg" src="../images/fireandwater.png" alt="" />
          </div>
          <div className="p-5">
              <div onClick={() => selectTerrainStyle(TerrainStyle.FireAndWater)}>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">🔥 Fire And Water 💧</h5>
              </div>
          </div>
        </div>
      </div>
    )
  }

  const openAndPopulateModal = (item: InventoryItem) => {
    setOpenModal(true);
    setCurrentItem(item);
  }

  const renderGame = () => {
    if (terrainStyle === undefined) return;
    return (
      <>
        <div className="w-screen pt-24 flex items-center justify-center">
          <div className="flex flex-col">
            <Inventory
              items={inventoryItems}
              itemOnClick={openAndPopulateModal}
            />
            <ScoreView score={Score} player={playerEntity} />
          </div>
          <GameBoard terrainStyle={terrainStyle} />
        </div>
        {currentItem && <ItemModal
          isOpen={openModal}
          onClose={() => { 
            setOpenModal(false);
            setCurrentItem(undefined);
          }}
          item={currentItem}
        />}
      </>
    )
  }

  return (
    <>
      <div>
        {loadingState.state !== SyncState.LIVE &&
          (<div className="w-screen h-screen flex items-center justify-center">
            {loadingState.msg} ({Math.floor(loadingState.percentage)}%)
          </div>)
        }
        {(terrainStyle === undefined && loadingState.state === SyncState.LIVE) && (
          terrainStyleSelector()
        )}
        {terrainStyle !== undefined &&  renderGame() }
      </div>
    </>
  );
};
