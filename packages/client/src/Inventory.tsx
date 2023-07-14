export type InventoryItem = {
  name: string
  emoji: string
}

type InventoryProps = {
  items: InventoryItem[],
  itemOnClick: (item: InventoryItem) => void,
}

export const Inventory = ({ items, itemOnClick }: InventoryProps) => {

  const handleItemClick = (index: number) => {
    if (!isItemAtIndex(index)) return;

    const item: InventoryItem = {
      name: items[index].name,
      emoji: items[index].emoji
    }

    itemOnClick(item);
  }

  const getItemAtIndex = (index: number) => {
    if (items.length <= index) return (<></>);
    return (
      <>{items[index].emoji}</>
    )
  }

  const isItemAtIndex = (index: number) => {
    if (items.length <= index) return false;
    return true;
  }

  return (
    <div className="m-12">
      <div className="text-2xl mb-2 text-center">
        Inventory
      </div>
      <div
        className="p-1 flex item-center flex-wrap bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-900 dark:border-gray-700 grid grid-cols-3"
      >
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className={`bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-12 h-12 flex items-center justify-center m-1 ${isItemAtIndex(index) && "hover:bg-gray-600 cursor-pointer"}`}
            onClick={() => handleItemClick(index)}
          >
            {getItemAtIndex(index)}
          </div>
        ))}
      </div>
    </div>
  )
}